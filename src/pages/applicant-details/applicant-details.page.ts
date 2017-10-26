import {Component, OnInit} from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {ApplicantsService} from "../../common/applicants.service";
import {VideoAnalyticsService} from "../../common/video-analytics.service";

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
    this.userImage = 'https://s3.amazonaws.com/team-easiar-media/video_pipe/frames/' + hash + '-0.jpg';
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
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Actions',
      buttons: [
        {
          text: 'Delete',
          handler: () => {
            this.applicantsService.deleteApplicant(this.applicant.hash).subscribe(response => {
              this.navCtrl.pop();
            });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
      ]
    });

    actionSheet.present();
  }


}
