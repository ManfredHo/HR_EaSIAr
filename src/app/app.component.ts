import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ApplicantsPage} from '../pages/list/list';
import {Phase2ApplicantsPage} from "../pages/list2/list";
import {Http} from "@angular/http";
import {MainConfig} from "../common/mainConfig";
import {HomePage} from "../pages/home/home";
import {HistoryPage} from "../pages/history/history.page";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any, count: number }>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              public http: Http,) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Home', component: HomePage, count: 0},
      {title: 'Phase 1 Applicants', component: ApplicantsPage, count: 0},
      {title: 'Phase 2 Applicants', component: Phase2ApplicantsPage, count: 0},

      {title: 'History', component: HistoryPage, count: 0},
    ];

    this.loadPhasesCount();
  }

  menuOpened() {
    this.loadPhasesCount();
  }

  loadPhasesCount() {
    this.http.get(MainConfig.baseUrl + 'form-submission/count-phases/').subscribe(response => {
      let json = response.json()['response'];

      this.pages[1]['count'] = json['phase1'];
      this.pages[2]['count'] = json['phase2'];
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
