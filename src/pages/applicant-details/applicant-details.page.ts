import {Component, OnInit} from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {ApplicantsService} from "../../common/applicants.service";
import {VideoAnalyticsService} from "../../common/video-analytics.service";
import {VideoPlayerPage} from "../video-player/video-player.page";

@Component({
  selector: 'page-applicant-detail',
  templateUrl: 'applicant-details.template.html'
})
export class ApplicationDetailsPage implements OnInit {

  applicant: object;
  analysisFrames = {
    'smile': null,
    'emotion-happy': null,
    'emotion-calm': null,
    'emotion-confused': null,
    'brightness': null,
    'sharpness': null,
  }

  userImage: string = '';

  videoDuration: string = '';
  videoQuality: string = '';

  constructor(public navCtrl: NavController, private navParams: NavParams,
              private applicantsService: ApplicantsService,
              private videoAnalyticsService: VideoAnalyticsService,
              private actionSheetCtrl: ActionSheetController) {

  }

  ngOnInit() {

  }

  ionViewDidLoad() {
    this.applicant = this.navParams.get('item');
    if (this.applicant === undefined) {
      this.applicantsService.getApplicant(1).subscribe(data => {
        this.applicant = data;
        this.applicationLoaded();
      });
    } else {
      this.applicationLoaded();
    }
  }

  // show the image
  applicationLoaded() {
    let hash = this.applicant['hash'];

    this.loadVideoAnalysis(hash);
    this.userImage = 'https://s3-eu-west-1.amazonaws.com/team-easiar/video_pipe/frames/' + hash + '-0.jpg';
  }

  loadVideoAnalysis(applicantHash: string) {
    this.videoAnalyticsService.getAnalysis(applicantHash).subscribe(report => {
      let analysis = report['analysis'];
      this.videoDuration = report['video']['duration'] + " seconds";
      for (let prop in this.analysisFrames) {
        this.analysisFrames[prop] = this.videoAnalyticsService.extractData(analysis, prop);
      }

      this.displayAnalysis();
    });
  }

  displayAnalysis() {
    this.checkVideoQuality();
  }

  checkVideoQuality() {
    let brightness = this.analysisFrames['brightness'];
    let sharpness = this.analysisFrames['sharpness'];

    let brightnessValue = brightness.map(item => {
      return item.value;
    });

    let sharpnessValue = sharpness.map(item => {
      return item.value;
    });

    let minBrightness = Math.min.apply(null, brightnessValue);
    let minSharpness = Math.min.apply(null, sharpnessValue);

    console.log('Min values', minBrightness, minSharpness);

    if (minBrightness > 90 && minSharpness > 40) {
      this.videoQuality = 'Excellent';
    } else if (minBrightness < 30 || minSharpness < 60) {
      this.videoQuality = 'Terrible';
    } else {
      this.videoQuality = 'Average';
    }
  }

  showActions() {
    let buttons =
      [
        {
          text: 'Advance to Phase 2',
          handler: () => {
            this.applicantsService.changePhase(this.applicant['hash'], 2).subscribe(response => {
              this.navCtrl.pop();
            });
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.applicantsService.deleteApplicant(this.applicant['hash']).subscribe(response => {
              this.navCtrl.pop();
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ];

    if (this.applicant['application_stage'] === 2) {
      buttons[0] = {
        text: 'Move back to Phase 1',
        handler: () => {
          this.applicantsService.changePhase(this.applicant['hash'], 1).subscribe(response => {
            this.navCtrl.pop();
          });
        }
      }
    }
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: buttons,
    });

    actionSheet.present();
  }

  playVideo() {
    this.navCtrl.push(VideoPlayerPage, {
      item: this.applicant
    });
  }

  decodeRace(id: number) {
    switch (id) {
      case 1:
        return 'Chinese';
      case 2:
        return 'Malay';
      case 3:
        return 'Indian';
      case 4:
        return 'Others';
    }
  }
}
