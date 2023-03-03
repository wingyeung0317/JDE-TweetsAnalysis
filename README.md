# For Non-Tech Use (REMOVED)
1. Enter [the website](http://tweet-analysis.killicit.com/) that we hosted on Azure(REMOVED)
    - (Running slow due to limited resources)
1. Using GUI to filter tweets
1. Select how the sentiment analysis works
1. Enter how many tweets you want to analyse
1. Submit
1. Wait For Change
1. View the tweets
    - (Waited for improvement: ) Delete the tweets which is not related to topic manually.
1. Click "Show Analysis" to view
    - Graph 📈 of keywords and sentiment by time
    - Keywords
    - Total Sentiment Scores

---

# For Tech Use:
1. Git pull the [Tweets Analysis](https://github.com/wingyeung0317/JDE-TweetsAnalysis)
1. Download NodeJS
    > While in the ```./client/``` folder
    1. Retype your localhost on ```./src/client/src/global/constrants.js```
    1. Run ```npm install```
    1. Run ```npm start```
1. Download Python
    > While in the ```./backend/``` folder
    1. Run ```python3 -m pip install -r requirment.txt```
    1. Run ```flask run --host=0.0.0.0``` or 
    ```flask run``` if you only use it at a local PC
1. Retype your SQL address
    1. Modify ```./backend/app.py```, retype your SQL connection to the variable ```connect_str``` (Line: 33)
    2. A sample build of SQL:
    ```
    CREATE TABLE [twitter_proj].[userInput] (
        "id" CHAR(63)   NOT NULL,
        "name" VARCHAR(MAX)   NOT NULL,
        "cashtag" VARCHAR(MAX)   NULL,
        "qFilter" VARCHAR(MAX)   NULL,
        "qFilterLinks" BIT   NOT NULL,
        "qFilterReplies" BIT   NOT NULL,
        "lang" VARCHAR(MAX)   NOT NULL,
        "qFilterVerified" BIT   NOT NULL,
        "qLocation" VARCHAR(MAX)   NULL,
        "qStartTime" VARCHAR(MAX)   NULL,
        "qEndTime" VARCHAR(MAX)   NULL,
        "qWithinTime" VARCHAR(MAX)   NULL,
        "qMinLike" INT   NOT NULL,
        "qMinRetweets" INT   NOT NULL,
        "qMinReplies" INT   NOT NULL,
        "sa_rmEmoji" BIT   NOT NULL,
        "sa_rmNewLine" BIT   NOT NULL,
        "sa_rmHashtag" BIT   NOT NULL,
        "sa_rmCashtag" BIT   NOT NULL,
        "sa_rmACtag" BIT   NOT NULL,
        "sa_rmPunc" BIT   NOT NULL,
        "sa_rmNum" BIT   NOT NULL,
        "anaURL" BIT   NOT NULL,
        "samples" INT   NOT NULL,
        CONSTRAINT "pk_userInput" PRIMARY KEY (
            "id"
        )
    );

    CREATE TABLE [twitter_proj].[result] (
        "index" CHAR(63)   NOT NULL,
        "date" VARCHAR(MAX)   NOT NULL,
        "id" CHAR(19)   NOT NULL,
        "content" VARCHAR(MAX)   NOT NULL,
        "username" VARCHAR(MAX)   NOT NULL,
        "likes" INT   NOT NULL,
        "retweets" INT   NOT NULL,
        "url" VARCHAR(MAX)   NOT NULL,
        "from_query_name" VARCHAR(MAX)   NOT NULL,
        "sa_score" FLOAT   NOT NULL,
        "sa_content" VARCHAR(MAX)   NOT NULL
    );

    CREATE TABLE [twitter_proj].[url_in_tweets] (
        "text_in_url" VARCHAR(MAX)   NULL,
        "from_query_ID" CHAR(63)   NOT NULL,
        "sa" FLOAT   NULL,
        "url" VARCHAR(MAX)   NOT NULL,
        "tweet_id" CHAR(19)   NOT NULL
    );

    CREATE TABLE [twitter_proj].[tweets] (
        "id" CHAR(19)   NOT NULL,
        "content" VARCHAR(MAX)   NULL,
        CONSTRAINT "pk_tweets" PRIMARY KEY (
            "id"
        )
    );

    ALTER TABLE [twitter_proj].[result] ADD CONSTRAINT "fk_result_index" FOREIGN KEY("index")
    REFERENCES [twitter_proj].[userInput] ("id");

    ALTER TABLE [twitter_proj].[result] ADD CONSTRAINT "fk_result_id" FOREIGN KEY("id")
    REFERENCES [twitter_proj].[tweets] ("id");

    ALTER TABLE [twitter_proj].[url_in_tweets] ADD CONSTRAINT "fk_url_in_tweets_from_query_ID" FOREIGN KEY("from_query_ID")
    REFERENCES [twitter_proj].[userInput] ("id");

    ALTER TABLE [twitter_proj].[url_in_tweets] ADD CONSTRAINT "fk_url_in_tweets_tweet_id" FOREIGN KEY("tweet_id")
    REFERENCES [twitter_proj].[tweets] ("id");
    ```
    ![image](https://user-images.githubusercontent.com/121206892/219228476-4fc9d46c-47cd-47eb-88c1-93d830caf041.png)

1. The website should be working now.
1. Your input and the tweets result would be stored at SQL
1. **Happy Coding to analyse the tweets**
