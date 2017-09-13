import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { DataService } from '../../../shared/services/data.service';

@Component({
  selector: 'nga-total-chart',
  templateUrl: 'total-chart.component.html',
  styleUrls: ['total-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TotalChartComponent implements OnInit {
  constructor(private dataService: DataService) {
  }

  public ngOnInit() {
    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = window.innerWidth - 300 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const parseTime = d3.timeFormat('%H');

// set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    const valueLine = d3.line()
      .x((d) => x(d.hour))
      .y((d) => y(d.total.accepts))
      .curve(d3.curveMonotoneX);

    const area1 = d3.area()
      .x((d) => x(d.hour))
      .y0(height)
      .y1((d) => y(d.total.accepts))
      .curve(d3.curveMonotoneX);

    const valueLine2 = d3.line()
      .x((d) => x(d.hour))
      .y((d) => y(d.total.contacts))
      .curve(d3.curveMonotoneX);

    const area2 = d3.area()
      .x((d) => x(d.hour))
      .y0(height)
      .y1((d) => y(d.total.contacts))
      .curve(d3.curveMonotoneX);

    const valueLine3 = d3.line()
      .x((d) => x(d.hour))
      .y((d) => y(d.total.declines))
      .curve(d3.curveMonotoneX);

    const area3 = d3.area()
      .x((d) => x(d.hour))
      .y0(height)
      .y1((d) => y(d.total.declines))
      .curve(d3.curveMonotoneX);

    const valueLine4 = d3.line()
      .x((d) => x(d.hour))
      .y((d) => y(d.total.responses))
      .curve(d3.curveMonotoneX);

    const area4 = d3.area()
      .x((d) => x(d.hour))
      .y0(height)
      .y1((d) => y(d.total.responses))
      .curve(d3.curveMonotoneX);

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
      x.domain(d3.extent(data, (d) => d.hour));
      y.domain([0, d3.max(data, (d) =>
        Math.max(d.total.accepts, d.total.contacts, d.total.contacts, d.total.declines))]);
      // Add the valueline path.

      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .attr('d', valueLine);

      svg.append('path')
        .data([data])
        .attr('class', 'area1')
        .attr('d', area1);

      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', 'red')
        .attr('d', valueLine2);

      svg.append('path')
        .data([data])
        .attr('class', 'area2')
        .attr('d', area2);

      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', 'green')
        .attr('d', valueLine3);

      svg.append('path')
        .data([data])
        .attr('class', 'area3')
        .attr('d', area3);

      svg.append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', 'yellow')
        .attr('d', valueLine4);

      svg.append('path')
        .data([data])
        .attr('class', 'area4')
        .attr('d', area4);

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x));

      svg.append('g')
        .call(d3.axisLeft(y));
    });
  }
}
