import TwitterDAO from '../dao/twitter-dao';
import {twitterConf} from '../../../config/keys';
let Twitter = require('twitter');

export class TwitterController {
  static getAll(req:any, res:any):void {
    TwitterDAO
    .getAll()
    .then(tweets => res.status(200).json(tweets))
    .catch(error => res.status(400).json(error));
  }

  static saveTweets(req:any, res:any):void {
    var client = new Twitter({
      consumer_key: twitterConf.consumer_key,
      consumer_secret: twitterConf.consumer_secret,
      access_token_key : twitterConf.access_token_key,
      access_token_secret: twitterConf.access_token_secret
    });

    let requestedHashtag = req.body.hashtag;

    if (requestedHashtag) {
      console.log('Saving tweets for ' + requestedHashtag);

      client.stream('statuses/filter', {track: requestedHashtag}, function(stream) {
        stream.on('data', function(tweet) {
          //Discard retweets
          if (!tweet.retweeted) {
            TwitterDAO.saveTweet(tweet);
            console.log('Tweet for ' + requestedHashtag + ' saved');
          }
        });

        stream.on('error', function(error) {
          throw error;
        });
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  }
}
