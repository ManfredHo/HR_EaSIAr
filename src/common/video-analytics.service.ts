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
      this.http.get('https://s3.amazonaws.com/team-easiar/video_pipe/results/' + name + '.json').subscribe(response => {
        observer.next(response.json()['response']);
      });
    });
  }

  extractData(frameData, chartType: string) {
    let data = [];
    frameData.forEach(item => {
      let result = {
        time: item.time,
      };

      switch (chartType) {
        case 'smile':
          if (item['face_details'][0]['Smile']['Value']) {
            result['value'] = item['face_details'][0]['Smile']['Confidence'];
          } else {
            result['value'] = 0;
          }
          break;
        case 'brightness':
          result['value'] = item['face_details'][0]['Quality']['Brightness'];
          break;
        case 'sharpness':
          result['value'] = item['face_details'][0]['Quality']['Sharpness'];
          break;
        case 'emotion-happy':
          result['value'] = this.getEmotion(item['face_details'][0]['Emotions'], 'HAPPY');
          if (result['value'] === null) {
            return;
          }
          break;
        case 'emotion-calm':
          result['value'] = this.getEmotion(item['face_details'][0]['Emotions'], 'CALM');
          if (result['value'] === null) {
            return;
          }
          break;

        case 'emotion-confused':
          result['value'] = this.getEmotion(item['face_details'][0]['Emotions'], 'CONFUSED');
          if (result['value'] === null) {
            return;
          }
          break;
      }

      data.push(result);
    });

    return data;
  }

  getEmotion(emotions, type) {
    let confidence: number = null;
    emotions.forEach(item => {
      if (item['Type'] === type) {
        confidence = item['Confidence'];
      }
    });

    return confidence;
  }

}
