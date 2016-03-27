import {TwitterController} from '../controller/twitter-controller';

export class TwitterRoutes {
    static init(router) {
      router
        .route('/api/tweets')
        .get(TwitterController.getAll)
        .post(TwitterController.saveTweets);
    }
}
