import {YoutubeController} from '../controller/youtube-controller';

export class YoutubeRoutes {
  static init(router) {
    router
    .route('/youtube')
    .get(YoutubeController.get);
  }
}
