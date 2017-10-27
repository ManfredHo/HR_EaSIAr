import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {MainConfig} from "./mainConfig";

@Injectable()
export class ApplicantsService {

  private baseUrl: string = MainConfig.baseUrl;

  constructor(private http: Http) {
  }

  getApplicantLists(type: number): Observable<Applicant[]> {
    return Observable.create(observer => {
      this.http.get(this.baseUrl + 'form-submission/list/phase/' + type).subscribe(response => {
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

  deleteApplicant(hash): Observable<object> {
    return Observable.create(observer => {
      this.http.get(this.baseUrl + 'form-submission/delete/' + hash).subscribe(response => {
        observer.next(response.json()['response']);
      });
    });
  }

  changePhase(hash: string, phase: number) {
    return Observable.create(observer => {
      this.http.get(this.baseUrl + 'form-submission/change-phase/' + hash + '/phase/' + phase).subscribe(response => {
        observer.next(response.json()['response']);
      });
    });
  }
}

export interface Applicant {
  fullName: string;
  gender: number;
}
