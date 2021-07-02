import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { AppComponent } from '../app.component';
// import { info } from 'node:console';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  constructor(private ds: DataService, private appObj: AppComponent) {}
  ngOnInit(): void {
    this.appObj.underline('maps');
  }
}
