import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {MainConfig} from "./mainConfig";

@Injectable()
export class VideoAnalyticsService {

  private baseUrl: string = MainConfig.baseUrl;

  constructor(private http: Http) {

  }

  getAnalysis(name: string): Observable<object> {
    return Observable.create(observer => {
      this.http.get(this.baseUrl + 'form-submission/analysis-results/' + name).subscribe(response => {
        observer.next(response.json()['response']);
      });
    });
  }

}
