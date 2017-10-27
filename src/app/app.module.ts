import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ApplicantsPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ApplicantsService} from "../common/applicants.service";
import {ApplicationDetailsPage} from "../pages/applicant-details/applicant-details.page";
import {VideoAnalyticsService} from "../common/video-analytics.service";
import {VideoChartComponent} from "../components/video-chart.component";
import {VideoPlayerPage} from "../pages/video-player/video-player.page";
import {Phase2ApplicantsPage} from "../pages/list2/list";
import {HistoryPage} from "../pages/history/history.page";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ApplicantsPage,
    Phase2ApplicantsPage,
    ApplicationDetailsPage,
    HistoryPage,

    VideoChartComponent,
    VideoPlayerPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ApplicantsPage,
    Phase2ApplicantsPage,
    ApplicationDetailsPage,
    VideoPlayerPage,
    HistoryPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    ApplicantsService,
    VideoAnalyticsService
  ]
})
export class AppModule {
}
