import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data.service';
import * as d3 from 'd3';
import { Total } from '../../../shared/models/total.model';

interface TotalChartData {
  hour: number;
  totals: Total;
}

@Component({
  selector: 'nga-total-chart',
  templateUrl: 'total-chart.component.html',
  styleUrls: ['total-chart.component.scss']
})
export class TotalChartComponent implements OnInit {
  constructor(private dataService: DataService) {
  }

  public ngOnInit() {
    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const parseTime = d3.timeFormat('%H');

// set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const valueLine = d3.line()
      .x((d: any) => x(d.hour))
      .y((d: any) => y(d.total.accepts));

    const valueLine2 = d3.line()
      .x((d: any) => x(d.hour))
      .y((d: any) => y(d.total.responses));
    //
    // const valueline3 = d3.line()
    //   .x((d) => x(d.hour))
    //   .y((d) => y(d.totals.declines));
    //
    // const valueline4 = d3.line()
    //   .x((d) => x(d.hour))
    //   .y((d) => y(d.totals.responses));


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
    const svg = d3.select('#total-chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);
    this.dataService.getTotalData().subscribe((data) => {

      // format the data
      data.forEach((d) => {
        d.hour = parseTime(d.hour);
      });
      console.log(data);
      // // Scale the range of the data
      x.domain(d3.extent(data, (d) => {
        console.log(d);
        return d.hour;
      }));
      // y.domain([0, d3.max(data, (d: Total) =>
      //     Math.max(d.totals.accepts, d.totals.contacts, d.totals.contacts, d.totals.declines))]);
        // Add the valueline path.
        svg.append('path')
          .data([data])
          .attr('class', 'line')
          .attr('d', valueLine);
      //
      // // Add the valueline2 path.
      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', 'red')
        .attr('d', valueLine2);
      //
      // // Add the X Axis
      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));
      //
      // // Add the Y Axis
      svg.append('g')
        .call(d3.axisLeft(y));
    });


  }
}
