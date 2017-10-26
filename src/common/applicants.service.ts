import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";

@Injectable()
export class ApplicantsService {

  private baseUrl: string = "http://127.0.0.1:8000/";

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
