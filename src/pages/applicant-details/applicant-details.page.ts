import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ApplicantsService} from "../../common/applicants.service";

@Component({
  selector: 'page-applicant-detail',
  templateUrl: 'applicant-details.template.html'
})
export class ApplicationDetailsPage {

  applicant: object;

  constructor(public navCtrl: NavController, private navParams: NavParams, private applicantsService: ApplicantsService) {

  }

  ionViewDidLoad() {
    this.applicant = this.navParams.get('item');
    if (this.applicant === undefined) {
      this.applicantsService.getApplicant(1).subscribe(data => {
        this.applicant = data;
      });
    }
  }

}
