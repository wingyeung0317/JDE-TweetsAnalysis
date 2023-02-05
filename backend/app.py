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
import math

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

tweets = pd.DataFrame()

def __reFilterSpace(text):
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

def grapTweets(name, cashTag, qFilter, qFilterLinks, qFilterReplies, lang, qFilterVerified, qLocation, qStartTime, qEndTime, qWithinTime, qMinLike, qMinRetweets, qMinReplies, searchTime, id, samples):
    # init #
    orCashTag = ''
    qFilterText = ''
    addfilter = ''
    cashTag = str(cashTag)
    qFilter = str(qFilter)
    qWithinTime = __reFilterSpace(str(qWithinTime))

    ### Transform User input to Query ###
    if (cashTag != '') or (cashTag=='nan'):
        for text in cashTag.split(','):
            orCashTag += f' OR {__reFilterSpace(text)}'
    if (qFilter != '') or (qFilter=='nan'):
        for text in qFilter.split(','):
            qFilterText += f' -"{__reFilterSpace(text)}"'
    if qFilterLinks:
        addfilter += ' -filter:links'
    if qFilterReplies:
        addfilter += ' -filter:replies'
    if qFilterVerified:
        addfilter += ' filter:verified'
    if type(qLocation)==str: # NaN's type is float
        addfilter += f' near:"{__reFilterSpace(qLocation)}"' if qLocation!='' else ''
    if (qWithinTime == '') or (qWithinTime=='nan'):
        if str(qStartTime) != 'nan':
            qStartTime = str(qStartTime).split('.')[0]
            addfilter += f' since_time:{qStartTime}'
        if str(qEndTime) != 'nan':
            qStartTime = str(qEndTime).split('.')[0]
            addfilter += f' until_time:{qEndTime}'
    else:
        addfilter += f' within_time:{qWithinTime}'

    ### Grapping ###
    queryText = f'{name}{orCashTag}{qFilterText}{addfilter} lang:{lang} min_retweets:{qMinRetweets} min_faves:{qMinLike} min_replies:{qMinReplies}'
    scraper = sntwitter.TwitterSearchScraper(queryText)
    print(queryText)
    tweets = []
    for i, tweet in enumerate(scraper.get_items()):
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
            name
        ]
        tweets.append(data)
        ### Grap how many Data ###
        if i==samples:
            break
    return pd.DataFrame(tweets, columns=['date', 'id', 'content', 'username', 'likes', 'retweets', 'url', 'from_query_time', 'from_query_id', 'from_query_name'])

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
        samples
    )

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
    userInput.to_csv('userInput.csv')
    
    tweets = pd.DataFrame()
    for i in range(0, len(userInput)):
        tweetsGrapped = returnGrap(i, userInput, 19)
        tweets = pd.concat([tweets, tweetsGrapped])

    # grap_result_to_list_by_queryID = [tweets[tweets['from_query_id']==i] for i in tweets['from_query_id'].unique()]
    for i in tweets['from_query_id'].unique():
        tweets[tweets['from_query_id']==i].to_csv(f'result{i}.csv')
    
    displayResult = ['<div class="df-style">'+tweets[tweets['from_query_id']==i].drop(columns=['from_query_time', 'from_query_id', 'id'], inplace=False).to_html(render_links=True, justify='center', formatters={
        'date': lambda __date: ' <div class="df-date"> '+' <br><br> +'.join(str(__date).split('+'))+' </div> ',
        'url': lambda __url: '<a href="'+__url+'">Click me</a>'
    }, escape=False)+'</div>' for i in tweets['from_query_id'].unique()]

    return ''.join(displayResult)

if __name__ == '__main__':
    app.run()