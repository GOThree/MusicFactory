/// <reference path="../../../../typings/main.d.ts" />

import * as mongoose from 'mongoose';
import twitterUserSchema from '../model/twitter-user-model';

const _tweetSchema = {
  text: {type: String },
  user: twitterUserSchema,
  created_at: {type: Date, default: Date.now}
};

export default new mongoose.Schema(_tweetSchema);
