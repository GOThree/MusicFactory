import {lastFm} from '../../config/keys';

export class LastFmSdk {
	rootUrl : string;
    errors : Object;
    userAgent : string;
    format : string;
    apiKey : string;
    version : string;

    constructor(options : LastFmInitOptions) {
        var options = options || new LastFmInitOptions();
        this.rootUrl = 'http://ws.audioscrobbler.com/';
        this.userAgent = options.userAgent || 'appname/v1.0 MusicFactory';
        this.format = options.format || 'json';
        this.apiKey = lastFm.api_key;
        this.version = options.version || '/2.0';
        this.errors = {
           2 : 'Invalid service - This service does not exist',
           3 : 'Invalid Method - No method with that name in this package',
           4 : 'Authentication Failed - You do not have permissions to access the service',
           5 : 'Invalid format - This service doesn\'t exist in that format',
           6 : 'Invalid parameters - Your request is missing a required parameter',
           7 : 'Invalid resource specified',
           8 : 'Operation failed - Something else went wrong',
           9 : 'Invalid session key - Please re-authenticate',
           10 : 'Invalid API key - You must be granted a valid key by last.fm',
           11 : 'Service Offline - This service is temporarily offline. Try again later.',
           13 : 'Invalid method signature supplied',
           16 : 'There was a temporary error processing your request. Please try again',
           26 : 'Suspended API key - Access for your account has been suspended, please contact Last.fm',
           29 : 'Rate limit exceeded - Your IP has made too many requests in a short period'
        };
    }

    buildQueryString(params: QueryStringParams) : string{
        var queryString = '/' + this.version + '&api_key=' + this.apiKey + '&format=' + this.format;
        for (var item in params.items){
            queryString += '&' + item[0] + '=' + item[1];
        }
        return queryString;
    }
};

class LastFmInitOptions {
    userAgent: string;
    format: string;
    version: string;
}

class QueryStringParams {
    items : IKeyValuePair<string, string>[];
}

interface IKeyValuePair<K,V> {
    0: K;
    1: V;
};

