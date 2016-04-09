/// <reference path="../../../../typings/main.d.ts" />

import * as mongoose from 'mongoose';
import * as Promise from 'bluebird';
import twitterSchema from '../model/twitter-model';
import * as _ from 'lodash';

twitterSchema.static('getAll', ():Promise<any> => {
  return new Promise<any>((resolve:Function, reject:Function) => {
    let _query = {};

    Tweet
    .find(_query)
    .exec((err, tweets) => {
      err ? reject(err)
        : resolve(tweets);
    });
  });
});

twitterSchema.static('saveTweet', (tweet:any):Promise<any> => {
  return new Promise<any>((resolve:Function, reject:Function) => {
    if (!_.isObject(tweet)) {
      return reject(new TypeError('Tweet is not a valid object.'));
    }
    var _tweet = new Tweet(tweet);

    _tweet.save((err, saved) => {
      err ? reject(err)
        : resolve(saved);
    });
  });
});

let Tweet:any = mongoose.model('Tweet', twitterSchema);

export default Tweet;
