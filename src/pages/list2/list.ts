import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ApplicantsService} from "../../common/applicants.service";
import {ApplicationDetailsPage} from "../applicant-details/applicant-details.page";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class Phase2ApplicantsPage {
  private applicants: object[];

  constructor(public navCtrl: NavController, private applicantsService: ApplicantsService) {
  }

  ionViewWillEnter() {
    this.applicantsService.getApplicantLists(2).subscribe(applicants => {
      this.applicants = applicants;
      console.log('Got list of applicants', applicants);
    });
  }

  showApplicantDetails(applicant) {
    this.navCtrl.push(ApplicationDetailsPage, {
      item: applicant
    })
  }
}
