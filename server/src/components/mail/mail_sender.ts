var mailgun = require('mailgun-js');
import {mail_gun} from '../../config/keys';
import {Message} from './models';

export class MailSender {
    sender: any;

    initialize() {
        this.sender = mailgun({apiKey: mail_gun.api_key, domain: mail_gun.default_domain});
    };

    send(args: Message): void {
      this.sender.messages().send(args, function (error, body) {
        console.log(body);
      });
    };
}
