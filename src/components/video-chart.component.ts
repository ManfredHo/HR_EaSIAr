import {Component, ElementRef, Input, OnInit} from "@angular/core";
import * as d3 from 'd3'


@Component({
  selector: 'video-chart',
  templateUrl: 'video-chart.template.html'
})
export class VideoChartComponent implements OnInit {

  chartType: string = "smile";

  @Input()
  set frames(frames) {
    if (frames !== undefined && frames !== null) {
      this.generateGraph(frames);
    }
  }

  @Input()
  set type(value: string) {
    this.chartType = value;
  }

  constructor(private elementRef: ElementRef) {

  }

  ngOnInit() {
  };

  // extractData(frameData) {
  //   let data = [];
  //   frameData.forEach(item => {
  //     let result = {
  //       time: item.time,
  //     };
  //
  //     switch (this.chartType) {
  //       case 'smile':
  //         if (item['face_details'][0]['Smile']['Value']) {
  //           result['value'] = item['face_details'][0]['Smile']['Confidence'];
  //         } else {
  //           result['value'] = 0;
  //         }
  //         break;
  //       case 'brightness':
  //         result['value'] = item['face_details'][0]['Quality']['Brightness'];
  //         break;
  //       case 'sharpness':
  //         result['value'] = item['face_details'][0]['Quality']['Sharpness'];
  //         break;
  //       case 'emotion-happy':
  //         result['value'] = this.getEmotion(item['face_details'][0]['Emotions'], 'HAPPY');
  //         if (result['value'] === null) {
  //           return;
  //         }
  //         break;
  //       case 'emotion-calm':
  //         result['value'] = this.getEmotion(item['face_details'][0]['Emotions'], 'CALM');
  //         if (result['value'] === null) {
  //           return;
  //         }
  //         break;
  //
  //       case 'emotion-confused':
  //         result['value'] = this.getEmotion(item['face_details'][0]['Emotions'], 'CONFUSED');
  //         if (result['value'] === null) {
  //           return;
  //         }
  //         break;
  //     }
  //
  //     data.push(result);
  //   });
  //
  //   return data;
  // }


  generateGraph(frameData) {
    let targetData = frameData;//this.extractData(frameData);

    let xMin = 100, xMax = 0;
    let yMin = 100, yMax = 0;

    targetData.forEach(frame => {
      xMin = Math.min(xMin, frame.time);
      xMax = Math.max(xMax, frame.time);

      yMin = Math.min(yMin, frame.value);
      yMax = Math.max(yMax, frame.value);
    });

    // increase the range
    yMin *= 0.9;
    yMax *= 1.1;

    if (yMax > 100) {
      yMax = 100;
    }

    let chartWidth = 400;
    let chartHeight = 120;

    let marginBottom = 30;
    let marginLeft = 30;
    let marginRight = 10;
    let marginTop = 10;

    let svg = d3.select(this.elementRef.nativeElement).select('.container').append('svg').attr('width', chartWidth).attr('height', chartHeight);
    let g = svg.append("g");

    // range
    let x = d3.scaleLinear().range([0, chartWidth - marginLeft - marginRight]).domain([xMin, xMax]);
    let y = d3.scaleLinear().range([0, chartHeight - marginBottom - marginTop]).domain([yMax, yMin]);

    let valueline = d3.line()
      .x(function (d) {
        return x(d['time']);
      })
      .y(function (d) {
        return y(d['value']);
      });

    g.append("path")
      .data([targetData])
      .attr("class", "line")
      .attr("d", valueline)
      .attr('fill', 'none')
      .attr('stroke-width', '2px')
      .attr('stroke', '#000')
      .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')');

    // x axis
    g.append("g")
      .attr('transform', 'translate(' + marginLeft + ',' + (chartHeight - marginBottom) + ')')
      .call(d3.axisBottom(x).ticks(5));

    // y axis
    g.append("g")
      .attr('transform', 'translate(' + marginLeft + ',' + marginTop + ')')
      .call(d3.axisLeft(y).ticks(5));
  }
}
