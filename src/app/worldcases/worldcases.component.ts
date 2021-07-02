import { Component, OnInit } from '@angular/core';
import { CasesComponent } from '../cases/cases.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-worldcases',
  templateUrl: './worldcases.component.html',
  styleUrls: ['./worldcases.component.css'],
})
export class WorldcasesComponent implements OnInit {
  active: number;
  deaths: number;
  recovered: number;
  total: number;
  arr = [];
  constructor(private casesObj: CasesComponent, private ds: DataService) {}

  ngOnInit(): void {
    this.casesObj.removeSearch();
    this.casesObj.addUnderline('world');
    this.ds.getWorldcases().subscribe((data1) => {
      let data = data1['world_data'];
      console.log(data);
      this.active = data['world_total']['active_cases'];
      this.total = data['world_total']['total_cases'];
      this.deaths = data['world_total']['total_deaths'];
      this.recovered = data['world_total']['total_recovered'];
      for (let val of data['countries_stat']) {
        this.arr.push({
          country_name: val['country_name'],
          active_cases: val['active_cases'],
          total_cases: val['cases'],
          deaths: val['deaths'],
          recovered: val['total_recovered'],
        });
      }
    });
  }
}
