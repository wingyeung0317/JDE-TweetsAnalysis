from flask import Flask, request
# from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import pandas as pd
from IPython.display import display
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import snscrape.modules.twitter as sntwitter
import re
import demoji
import datetime

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
def reFilterSpace(text):
    while text[0] == ' ':
        text = text[1:]
    while text[-1] == ' ':
        text = text[:-1]
        reFilterSpace(text)
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

def grapTweets(name, cashTag, qFilter, qFilterLinks, qFilterReplies, lang, qFilterVerified, qLocation, qStartTime, qEndTime, qWithinTime, qMinLike, qMinRetweets, qMinReplies, samples, fromid):
    # init #
    orCashTag = ''
    qFilterText = ''
    addfilter = ''
    ### Transform User input to Query ###
    for text in cashTag.split(','):
        orCashTag += f' -"{reFilterSpace(text)}"'
    for text in qFilter.split(','):
        qFilterText += f' -"{reFilterSpace(text)}"'
    if qFilterLinks:
        addfilter += ' -filter:links'
    if qFilterReplies:
        addfilter += ' -filter:replies'
    if qFilterVerified:
        addfilter += ' filter:verified'
    if reFilterSpace(qLocation) != '':
        addfilter += f' near:"{reFilterSpace(qLocation)}"'
    if qWithinTime == '':
        if qStartTime != '':
            addfilter += f' since_time:{qStartTime}'
        if qEndTime != '':
            addfilter += f' until_time:{qEndTime}'
    else:
        addfilter += f' within_time:{qWithinTime}'

    ### Grapping ###
    scraper = sntwitter.TwitterSearchScraper(f'(({name}){cashTag}){qFilterText}{addfilter} lang:{lang} min_retweets:{qMinRetweets} min_faves:{qMinLike} min_replies:{qMinReplies}')
    print(f'(({name}){cashTag}){qFilterText}{addfilter} lang:{lang}')
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
            fromid
        ]
        tweets.append(data)
        ### Grap how many Data ###
        if i>samples:
            break
    return pd.DataFrame(tweets, columns=['date', 'id', 'content', 'username', 'likes', 'retweets', 'url', 'from_query_id'])

def returnGrap(i, input):
    now = datetime.datetime.now().timestamp()
    # print(
    return grapTweets(
        # input.iloc[i:0],
        # input.iloc[i:1],
        # input.iloc[i:2],
        # input.iloc[i:3],
        # input.iloc[i:4],
        # input.iloc[i:5],
        # input.iloc[i:6],
        # input.iloc[i:7],
        # input.iloc[i:8],
        # input.iloc[i:9],
        # input.iloc[i:10],
        # input.iloc[i:11],
        # input.iloc[i:12],
        input.loc[i: 'name'],
        input.loc[i: 'cashtag'],
        input.loc[i: 'qFilter'],
        input.loc[i: 'qFilterLinks'],
        input.loc[i: 'qFilterReplies'],
        input.loc[i: 'lang'],
        input.loc[i: 'qFilterVerified'],
        input.loc[i: 'qLocation'],
        input.loc[i: 'qStartTime'],
        input.loc[i: 'qEndTime'],
        input.loc[i: 'qWithinTime'],
        input.loc[i: 'qMinLike'],
        input.loc[i: 'qMinRetweets'],
        input.loc[i: 'qMinReplies'],
        7, now
    )


@app.route('/')
def hello():
    return 'Hello world!'

@app.route('/eBrands', methods=['POST'])
def lBrands():
    brand_list = request.get_json(force=True)
    userInput = pd.DataFrame()
    # print(brand_list[f'brand0'])
    for i in range(0, len(brand_list)):
        userInput = pd.concat([userInput, pd.DataFrame([brand_list[f'brand{i}']])])
    userInput.reset_index(inplace=True)
    userInput.drop(columns=['index'], inplace=True)
    
    return userInput.drop(columns=['id']).to_html()

if __name__ == '__main__':
    app.run()