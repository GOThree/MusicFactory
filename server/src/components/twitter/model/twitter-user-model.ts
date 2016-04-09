/// <reference path="../../../../typings/main.d.ts" />

import * as mongoose from 'mongoose';

const _twitterUserSchema = {
  screen_name: {type: String},
  location: {type: String},
  profile_image_url: {type: String}
};

export default new mongoose.Schema(_twitterUserSchema);
