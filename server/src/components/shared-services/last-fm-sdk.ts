import {lastFm} from '../../config/keys';
const http = require('http');

export class LastFmSdk {
	rootUrl : string;
    errors : Object;
    userAgent : string;
    format : string;
    apiKey : string;
    version : string;

    constructor(options : LastFmInitOptions) {
        var options = options || new LastFmInitOptions();
        this.rootUrl = 'http://ws.audioscrobbler.com';
        this.userAgent = options.userAgent || 'appname/v1.0 MusicFactory';
        this.format = options.format || 'json';
        this.apiKey = lastFm.api_key;
        this.version = options.version || '2.0';
    }

    buildQueryString(options: string) : string {
        var queryString = '/' + this.version + '/?' + '&api_key=' + this.apiKey + '&format=' + this.format + options;
        return queryString;
    }

    queryOptionsBuilder(params: QueryStringParams) : string {
        var queryString = '';
        for (var item in params.items) {
            queryString += '&' + params.items[item].key + '=' + params.items[item].value;
        }
        return queryString;
    }

    trackInfo(track: string, artist: string, callback: Function) : void {
        let autocorrect = new KeyValuePair('autocorrect', '1');
        let artistName = new KeyValuePair('artist ', artist);
        let trackName = new KeyValuePair('track ', track);
        let method = new KeyValuePair('method ', 'track.getInfo');
        let options = this.queryOptionsBuilder(new QueryStringParams([method, artistName, trackName ,autocorrect]));
        let url = this.buildQueryString(options);
        this.makeRequest(url, callback);
    }

    makeRequest(url: string, callback: Function): any {
        let httpVerb = 'GET';
        let options = {
            host: this.rootUrl,
            port: 80,
            path: url,
            method: httpVerb,
            headers: this.requestHeaders()
        };

        http.request(options, callback).end();
    }

    requestHeaders():  any {
        return {
            'User-Agent': this.userAgent
        };
    }
};

export class LastFmInitOptions {
    userAgent: string;
    format: string;
    version: string;
}

export class QueryStringParams {
    items : KeyValuePair<string, string>[];

        constructor(items: KeyValuePair<string, string>[]) {
            this.items = items;
    }
}

export class KeyValuePair<K,V> {
    key: K;
    value: V;
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
};

