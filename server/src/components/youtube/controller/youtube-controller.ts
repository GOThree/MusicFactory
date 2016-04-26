// <reference path="../../../../typings/main.d.ts" />

import {youtubeKeys} from '../../../config/keys';
let google = require('googleapis');
let apiKey = youtubeKeys.api_key;
let youtube = google.youtube('v3');

export class YoutubeController {
  static get(req:any, res:any):void {
    let searchQuery = req.query.search;

    youtube.search.list({ key:apiKey, part:'snippet', q:searchQuery , maxResults:5 }, function (err, data){
      var firstResultId = data.items[0].id.videoId;
      let firstResultLink = 'http://youtube.com/watch?v=' + firstResultId;
      res.status(200).json(firstResultLink);
    });
  }
}
