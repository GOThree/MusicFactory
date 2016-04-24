process.env.NODE_ENV = 'test';

import {LastFmSdk, LastFmInitOptions, QueryStringParams, KeyValuePair} from '../components/shared-services/last-fm-sdk';
var expect = require('chai').expect;

describe('Initialize LastFmSdk correctly', () => {
    it('with default options', (done) => {
        var client = new LastFmSdk(new LastFmInitOptions());
        expect(client.format).to.equal('json');
        expect(client.userAgent).to.equal('appname/v1.0 MusicFactory');
        expect(client.version).to.equal('2.0');
        done();
    });

    it('with custom options', (done) => {
        var options = new LastFmInitOptions();
        options.format = 'xml';
        options.userAgent = 'custom.agent';
        options.version = '1.0';
        var client = new LastFmSdk(options);
        expect(client.format).to.equal('xml');
        expect(client.userAgent).to.equal('custom.agent');
        expect(client.version).to.equal('1.0');
        done();
    });
});

describe('Build query string', () => {
    it('with artist and track', (done) => {
        var client = new LastFmSdk(new LastFmInitOptions());
        let autocorrect = new KeyValuePair('autocorrect', '1');
        let artistName = new KeyValuePair('artist', 'Cher');
        let trackName = new KeyValuePair('track', 'Believe');
        let method = new KeyValuePair('method', 'track.getInfo');
        let queryUrl = client.queryOptionsBuilder(new QueryStringParams([method, artistName, trackName ,autocorrect]));
        expect(queryUrl).to.equal('&method=track.getInfo&artist=Cher&track=Believe&autocorrect=1');
        done();
    });
});
