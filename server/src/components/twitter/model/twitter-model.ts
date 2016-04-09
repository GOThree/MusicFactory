/// <reference path="../../../../typings/main.d.ts" />

import * as mongoose from 'mongoose';

const _tweetSchema = {
  text: {type: String },
  createdAt: {type: Date, default: Date.now}
};

export default new mongoose.Schema(_tweetSchema);
