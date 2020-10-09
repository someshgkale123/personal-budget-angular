import { Component, AfterViewInit } from '@angular/core';


import { Chart } from 'chart.js';
import * as d3 from 'd3';
import {arc, pie} from 'd3-shape';
import { select } from 'd3-selection';
import { scaleOrdinal } from 'd3-scale';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements AfterViewInit {

  constructor(public dataService: DataService) {
  }

  ngAfterViewInit(): void {
      if (this.dataService.d3labels.length === 0)
      {
        this.dataService.getdata();
      }
      setTimeout(() => {
          this.createChart();
          this.createD3();
          }, 400);

  }
  // tslint:disable-next-line: typedef
  createChart()
  {
    const ctx = document.getElementById('myChart');
    const myPieChart = new Chart(ctx, {
        type: 'pie',
        data: this.dataService.dataSource
    });
  }

  // tslint:disable-next-line: typedef
   createD3()
        {
            const width = 550;
            const height = 550;
            const margin = 100;

            const radius = Math.min(width, height) / 2 - margin;
            const svg = select('#d3chart')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

            const color = scaleOrdinal()
          .domain(this.dataService.d3labels)
          .range(this.dataService.dataSource.datasets[0].backgroundColor);
            const donut = pie()
            .sort(null)
            .value((d: any) => d.value );
            let data_ready = donut(d3.entries(this.dataService.d3data));


            const angle = arc()
        .innerRadius(radius * 0.3)
        .outerRadius(radius * 0.8);

            const outerArc = arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.8);

            svg
        .selectAll('allSlices')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', angle)
        .attr('fill', (d: any) => (color(d.data.key)))
        .attr('stroke', 'white')
        .style('stroke-width', '2px')
        .style('opacity', 1);

            svg
        .selectAll('allPolyLines')
        .data(data_ready)
        .enter()
        .append('polyline')
            .attr('stroke', 'black')
            .style('fill', 'none')
            .attr('stroke-width', 1)
            .attr('points', (d: any) => {
            const posA = angle.centroid(d);
            const posB = outerArc.centroid(d);
            const posC = outerArc.centroid(d);
            const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            posC[0] = radius * 0.98 * (midAngle < Math.PI ? 1 : -1);
            return [posA, posB, posC];
            });
            svg
        .selectAll('allLabels')
        .data(data_ready)
        .enter()
        .append('text')
            .text( (d: any) => { console.log(d.data.key) ; return d.data.key; } )
            .attr('transform', (d: any) => {
                const pos = outerArc.centroid(d);
                const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                pos[0] = radius * 1.1 * (midAngle < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
            })
            .style('text-anchor', (d: any) => {
                const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                return (midAngle < Math.PI ? 'start' : 'end');
            });
        }

}


