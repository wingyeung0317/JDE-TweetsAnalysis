from flask import Flask, request
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pandas as pd
import numpy as np
from IPython.display import display
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import snscrape.modules.twitter as sntwitter
import re
import demoji
import datetime
import requests
from bs4 import BeautifulSoup
from wordcloud import STOPWORDS
from wordcloud import WordCloud
from PIL import Image
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from keybert import KeyBERT
from importlib import reload
import matplotlib.dates as mdates
plt=reload(plt)

app = Flask(__name__)

### SQL link ###
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/brand'
# db = SQLAlchemy(app)
CORS(app)

# class Event(db.Model):
#     id = db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.String, nullable=False)

#     def __repr__(self):
#         return f"Event: {self.name}"

#     def __init__(self, description):
#         self.description = description

headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:101.0) Gecko/20100101 Firefox/101.0'}
stopwords = STOPWORDS.update(['https', 't co', 't', 'co'])
like_pngfile = './like.png'
dislike_pngfile = './dislike.png'
loading_pngfile = './loading.jpeg'
like_color_mask = np.array(Image.open(like_pngfile))
dislike_color_mask = np.array(Image.open(dislike_pngfile))
loading_color_mask = np.array(Image.open(loading_pngfile))
kw_model = KeyBERT(model='all-mpnet-base-v2')

def url_in_tweets(df):
    linkInTweets = pd.DataFrame()
    for i in range(0, len(df)):
        for url in findURL(df.loc[i,'content']):
            try:
                response = requests.get(url, headers=headers, allow_redirects=True)
                soup = BeautifulSoup(response.text, "html.parser")
                soupText = rmEmoji(rmURL(soup.getText()))
                linkInTweets = pd.concat([pd.DataFrame({'textInURL': [soupText], 'SA':[sentiment_scores(soupText)['compound']], 'URL':[url], 'TweetID':[df.loc[i, 'id']]}), linkInTweets], ignore_index=True)
                linkInTweets['textInURL'] = linkInTweets['textInURL'].str.replace("\n", " ")
            except:
                print(f'{url} not accessable')
        # if i == 7:
        #     break
    return linkInTweets

def reFilterSpace(text):
    text = str(text)
    if text != '':
        while text[0] == ' ':
            text = text[1:]
        while text[-1] == ' ':
            text = text[:-1]
    return text

def sentiment_scores(sentence):
    sid_obj = SentimentIntensityAnalyzer()
    sentiment_dict = sid_obj.polarity_scores(sentence)
    return sentiment_dict

def rmURL(content, condition=True):
    return (re.sub(r'http\S+', '', content) if condition else content)

def findURL(content):
    return re.findall(r'http\S+', content)

def rmEmoji(content):
    return demoji.replace(content, repl='')

def grapTweets(name, cashTag, qFilter, qFilterLinks, qFilterReplies, lang, qFilterVerified, qLocation, qStartTime, qEndTime, qWithinTime, qMinLike, qMinRetweets, qMinReplies, searchTime, id, sa_rmEmoji, samples):
    # init #
    orCashTag = ''
    qFilterText = ''
    addfilter = ''
    cashTag = str(cashTag)
    qFilter = str(qFilter)
    qWithinTime = reFilterSpace(str(qWithinTime))

    ### Transform User input to Query ###
    if (cashTag != '') or (cashTag=='nan'):
        for text in cashTag.split(','):
            orCashTag += f' OR {reFilterSpace(text)}'
    if (qFilter != '') or (qFilter=='nan'):
        for text in qFilter.split(','):
            qFilterText += f' -"{reFilterSpace(text)}"'
    if qFilterLinks:
        addfilter += ' -filter:links'
    if qFilterReplies:
        addfilter += ' -filter:replies'
    if qFilterVerified:
        addfilter += ' filter:verified'
    if type(qLocation)==str: # NaN's type is float
        addfilter += f' near:"{reFilterSpace(qLocation)}"' if qLocation!='' else ''
    if (qWithinTime == '') or (qWithinTime=='nan'):
        if str(qStartTime) != 'nan':
            addfilter += f' since:{qStartTime}'
        if str(qEndTime) != 'nan':
            addfilter += f' until:{qEndTime}'
    else:
        addfilter += f' within_time:{qWithinTime}'

    ### Grapping ###
    queryText = f'{name}{orCashTag}{qFilterText}{addfilter} lang:{lang} min_retweets:{qMinRetweets} min_faves:{qMinLike} min_replies:{qMinReplies}'
    scraper = sntwitter.TwitterSearchScraper(queryText)
    print(queryText)
    tweets = []
    for i, tweet in enumerate(scraper.get_items()):
        sa_score = (TextBlob(rmEmoji(rmURL(tweet.content))).polarity + sentiment_scores(rmEmoji(rmURL(tweet.content)))['compound'])/2 if sa_rmEmoji else (TextBlob(rmURL(tweet.content)).polarity + sentiment_scores(rmURL(tweet.content))['compound'])/2
        data = [
            tweet.date,
            tweet.id,
            tweet.content,
            tweet.user.username,
            tweet.likeCount,
            tweet.retweetCount,
            tweet.url,
            searchTime,
            id,
            name,
            sa_score
        ]
        tweets.append(data)
        ### Grap how many Data ###
        if i==samples:
            break
    returnDF = pd.DataFrame(tweets, columns=['date', 'id', 'content', 'username', 'likes', 'retweets', 'url', 'from_query_time', 'from_query_id', 'from_query_name', 'sa_score'])
    returnDF['content'] = returnDF['content'].str.replace("\n", " ")
    return returnDF

def returnGrap(row, input, samples=20):
    # print(
    return grapTweets(
        input.loc[row, 'name'],
        input.loc[row, 'cashtag'],
        input.loc[row, 'qFilter'],
        input.loc[row, 'qFilterLinks'],
        input.loc[row, 'qFilterReplies'],
        input.loc[row, 'lang'],
        input.loc[row, 'qFilterVerified'],
        input.loc[row, 'qLocation'],
        input.loc[row, 'qStartTime'],
        input.loc[row, 'qEndTime'],
        input.loc[row, 'qWithinTime'],
        input.loc[row, 'qMinLike'],
        input.loc[row, 'qMinRetweets'],
        input.loc[row, 'qMinReplies'],
        input.loc[row, 'searchTime'],
        input.loc[row, 'id'],
        input.loc[row, 'sa_rmEmoji'],
        samples
    )

def graphPlot(df):
    global plt
    plt=reload(plt)
    plt.scatter(df['date'], df['sa_score'])
    plt.axis(True)
    plt.xlabel='Date'
    plt.ylabel='Sentiment'
    plt.axis(ymin=-1, ymax=1)
    plt.gca().xaxis.set_major_formatter(mdates.DateFormatter('%m/%d/%Y'))
    plt.gca().xaxis.set_major_locator(mdates.DayLocator())
    plt.gcf().autofmt_xdate()
    __tmpfile = BytesIO()
    plt.savefig(__tmpfile, format='png')
    __encoded = base64.b64encode(__tmpfile.getvalue()).decode('utf-8')
    imghtml = '<img class="pltimg" src=\'data:image/png;base64,{}\'>'.format(__encoded)
    plt.close()
    return imghtml

def graphKeyword(df, sentiment):
    global plt
    plt=reload(plt)
    text = []
    imgMask = loading_color_mask
    if sentiment:
        text = df[df['sa_score']>0].content.to_list()
        imgMask = like_color_mask
    else:
        text = df[df['sa_score']<0].content.to_list()
        imgMask = dislike_color_mask
    text = ' '.join(text)
    wordcloud = WordCloud(stopwords=stopwords, background_color='white', mask=imgMask, max_words=200).generate(text)
    plt.axis(False)

    __tmpfile = BytesIO()
    wordcloud.to_image().save(__tmpfile, format='png')
    __encoded = base64.b64encode(__tmpfile.getvalue()).decode('utf-8')
    imghtml = '<img class="wordcloud" src=\'data:image/png;base64,{}\'>'.format(__encoded)
    plt.close()
    return imghtml

def grapKeyword(df, sentiment):
    text = []
    text = df[df['sa_score']>0].content.to_list() if sentiment else df[df['sa_score']<0].content.to_list()
    text = ' '.join(text)
    keywords = kw_model.extract_keywords(text, keyphrase_ngram_range=(1, 3), stop_words='english', highlight=False, top_n=25)
    keywords_list= list(dict(keywords).keys())
    return str(keywords_list)

@app.route('/')
def hello():
    return 'Hello world!'

@app.route('/connect', methods=['POST'])
def connect():
    status = request.get_data()
    return status

@app.route('/lsTweets', methods=['POST'])
def tweets_list():
    brand_list = request.get_json(force=True)
    userInput = pd.DataFrame()
    now = datetime.datetime.now()
    for i in range(0, len(brand_list)):
        userInput = pd.concat([userInput, pd.DataFrame([brand_list[f'brand{i}']])])
    userInput['searchTime'] = now
    userInput.reset_index(inplace=True)
    userInput.drop(columns=['index'], inplace=True)
    userInput = userInput.fillna(value=np.nan)
    # userInput.to_csv('userInput.csv')
    
    tweets = pd.DataFrame()
    displaySA = ''
    df_urlInTweets = pd.DataFrame(columns=['textInURL', 'from_ID'])
    for i in range(0, len(userInput)):
        tweetsGrapped = returnGrap(i, userInput, int(userInput.loc[i, 'samples'])-1)
        tweets = pd.concat([tweets, tweetsGrapped])
        displaySA += '<div class="analysisResult">'+'<span class="analysis_topic">'+str(userInput.loc[i, 'name'])+'</span>'+': <br>Sum of Sentiment Score = '+str(tweetsGrapped['sa_score'].sum())+'<br>'+graphKeyword(tweetsGrapped, True)+'<br>'+grapKeyword(tweetsGrapped,True)+'<br>'+graphKeyword(tweetsGrapped, False)+'<br>'+grapKeyword(tweetsGrapped,False)+'<br>'+graphPlot(tweetsGrapped)+'</div><br><br><br>'
        if userInput.loc[i, 'anaURL']==True:
            __df_urlInTweets = url_in_tweets(tweetsGrapped)
            __df_urlInTweets['from_ID'] = userInput.loc[i, 'id']
            __df_urlInTweets['from_query_name'] = userInput.loc[i, 'name']
            __df_urlInTweets = __df_urlInTweets.drop_duplicates(['textInURL']) #remove same content
            df_urlInTweets = pd.concat([df_urlInTweets, __df_urlInTweets])

    # tweets_list_by_queryID = [tweets[tweets['from_query_id']==i] for i in tweets['from_query_id'].unique()]

    # for i in tweets['from_query_id'].unique():
    #     tweets[tweets['from_query_id']==i].to_csv(f'result{i}.csv')

    # tweets.to_csv('allResult.csv')

    # df_urlInTweets.to_csv('url_in_tweets.csv')
    
    displayTweets = ['<div class="df-style">'+tweets[tweets['from_query_id']==i].drop(columns=['from_query_time', 'from_query_id', 'id'], inplace=False).to_html(render_links=True, justify='center', formatters={
        'date': lambda __date: ' <div class="df-date"> '+' <br><br> +'.join(str(__date).split('+'))+' </div> ',
        'url': lambda __url: '<a href="'+__url+'">Click me</a>'
    }, escape=False)+'</div>' for i in tweets['from_query_id'].unique()]

    displayUrlInTweets = ['<div class="df-style">'+df_urlInTweets[df_urlInTweets['from_ID']==i].query('textInURL != ""').drop(columns=['from_ID'], inplace=False).to_html(render_links=True, justify='center')+'</div>' for i in df_urlInTweets['from_ID'].unique()]

    return '<div id="tweets">'+''.join(displayTweets)+'</div>' + '<div id="analysisInfo"> '+''.join(displayUrlInTweets)+displaySA+'</div><script>$("#analysisInfo").hide()</script>'

if __name__ == '__main__':
    app.run()