import * as d3 from 'd3';

export class RealTimeChart {
  private data = [];
  private width: number;
  private height: number;
  private globalX = 0;
  private duration: number;
  private max: number;
  private step: number;
  private chartItem: string;
  private chart;
  private x;
  private y;
  private line;
  private path;
  private areaPath;
  private smoothLine;
  private lineArea;
  private xAxis;
  private axisX;
  private parseTime = d3.timeParse('%d-%b-%y');

  constructor(options: any) {
    for (const field in options) {
      this[field] = options[field];
    }
    this.chart = d3.select(this.chartItem)
      .attr('width', this.width + 50)
      .attr('height', this.height + 50);
    this.x = d3.scaleLinear().domain([0, this.width]).range([0, this.width]);
    this.y = d3.scaleLinear().domain([0, this.height]).range([this.height, 0]);
    // -----------------------------------
    this.line = d3.line()
      .x((d) => this.x(d.x))
      .y((d) => this.y(d.y));
    this.smoothLine = d3.line().curve(d3.curveCardinal)
      .x((d) => this.x(d.x))
      .y((d) => this.y(d.y));
    this.lineArea = d3.area()
      .x((d) => this.x(d.x))
      .y0(this.y(0))
      .y1((d) => this.y(d.y))
      .curve(d3.curveCardinal);
    // -----------------------------------
    // Draw the axis
    this.xAxis = d3.axisBottom().scale(this.x);
    this.axisX = this.chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0, 500)')
      .call(this.xAxis);
    // Draw the grid
    this.chart.append('path').datum([{ x: 0, y: 150 }, { x: 500, y: 150 }])
      .attr('class', 'grid')
      .attr('d', this.line);
    this.chart.append('path').datum([{ x: 0, y: 300 }, { x: 500, y: 300 }])
      .attr('class', 'grid')
      .attr('d', this.line);
    this.chart.append('path').datum([{ x: 0, y: 450 }, { x: 500, y: 450 }])
      .attr('class', 'grid')
      .attr('d', this.line);
    this.chart.append('path').datum([{ x: 50, y: 0 }, { x: 50, y: 500 }])
      .attr('class', 'grid')
      .attr('d', this.line);
    this.chart.append('path').datum([{ x: 250, y: 0 }, { x: 250, y: 500 }])
      .attr('class', 'grid')
      .attr('d', this.line);
    this.chart.append('path').datum([{ x: 450, y: 0 }, { x: 450, y: 500 }])
      .attr('class', 'grid')
      .attr('d', this.line);
    // Append the holder for line chart and fill area
    this.path = this.chart.append('path');
    this.areaPath = this.chart.append('path');
  }

  public addPoint(point) {
    point.x = this.parseTime(point.x);
    // Generate new data
    // const point = {
    //   x: this.globalX,
    //   y: ((Math.random() * 450 + 50)),
    // };
    console.log(point);
    this.data.push(point);
    this.globalX += this.step;
    // this.globalX = point.x;
    // Draw new line
    this.path.datum(this.data)
      .attr('class', 'smoothLine')
      .attr('d', this.smoothLine);
    // Draw new fill area
    this.areaPath.datum(this.data)
      .attr('class', 'area')
      .attr('d', this.lineArea);
    // Shift the chart left
    this.x.domain([this.globalX - (this.max - this.step), this.globalX]);
    this.axisX.transition()
      .duration(this.duration)
      .ease(d3.easeLinear, 2)
      .call(this.xAxis);
    this.path.attr('transform', null)
      .transition()
      .duration(this.duration)
      .ease(d3.easeLinear, 2)
      .attr('transform', 'translate(' + this.x(this.globalX - this.max) + ')');
    this.areaPath.attr('transform', null)
      .transition()
      .duration(this.duration)
      .ease(d3.easeLinear, 2)
      .attr('transform', 'translate(' + this.x(this.globalX - this.max) + ')');
    // .on('end', tick);
    // Remote old data (max 50 points)
    if (this.data.length > 50) {
      this.data.shift();
    }
  }

}
