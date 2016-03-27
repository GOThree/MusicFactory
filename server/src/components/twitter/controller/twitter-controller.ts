import TwitterDAO from '../dao/twitter-dao';
import {twitterConf} from '../../../config/keys';
// import * as Twitter from 'twitter';
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

    if (req.body.hashtag) {
      console.log('Saving tweets for ' + req.body.hashtag);
      client.stream('statuses/filter', {track: req.body.hashtag}, function(stream) {
        stream.on('data', function(tweet) {
          console.log(tweet.text);
          TwitterDAO
          .saveTweet(tweet);
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
