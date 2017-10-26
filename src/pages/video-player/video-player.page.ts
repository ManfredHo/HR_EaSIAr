import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";

@Component({
  selector: 'page-video-player',
  templateUrl: 'video-player.template.html'
})
export class VideoPlayerPage {
  videoSource: string;

  constructor(private navCtrl: NavController, private navParams: NavParams) {

  }

  ionViewWillEnter() {
    let applicant = this.navParams.get('item');
    let hash = applicant['hash'];

    this.videoSource = 'https://s3.amazonaws.com/team-easiar-media/video_pipe/videos/' + hash + '.mp4';

    console.log(this.videoSource);
  }
}
