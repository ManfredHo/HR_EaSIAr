import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {MainConfig} from "./mainConfig";

@Injectable()
export class ApplicantsService {

  private baseUrl: string = MainConfig.baseUrl;

  constructor(private http: Http) {

  }

  getApplicantLists(): Observable<Applicant[]> {
    return Observable.create(observer => {
      this.http.get(this.baseUrl + 'form-submission/list').subscribe(response => {
        observer.next(response.json()['response']);
      });
    });
  }

  getApplicant(id): Observable<object> {
    return Observable.create(observer => {
      this.http.get(this.baseUrl + 'form-submission/get/' + id).subscribe(response => {
        observer.next(response.json()['response']);
      });
    });
  }
}

export interface Applicant {
  fullName: string;
  gender: number;
}
