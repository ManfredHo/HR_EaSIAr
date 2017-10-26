import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ApplicantsService} from "../../common/applicants.service";
import {VideoAnalyticsService} from "../../common/video-analytics.service";

@Component({
  selector: 'page-applicant-detail',
  templateUrl: 'applicant-details.template.html'
})
export class ApplicationDetailsPage {

  applicant: object;
  analysisFrames: object;

  constructor(public navCtrl: NavController, private navParams: NavParams,
              private applicantsService: ApplicantsService,
              private videoAnalyticsService: VideoAnalyticsService) {

  }

  ionViewDidLoad() {
    this.applicant = this.navParams.get('item');
    if (this.applicant === undefined) {
      this.applicantsService.getApplicant(1).subscribe(data => {
        this.applicant = data;
        this.loadVideoAnalysis();
      });
    }
  }

  loadVideoAnalysis() {
    this.videoAnalyticsService.getAnalysis('test-video1').subscribe(report => {
      this.analysisFrames = report['analysis'];
      console.log('frames analyzed', this.analysisFrames);
    });
  }

}
