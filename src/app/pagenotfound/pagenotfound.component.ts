import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css'],
})
export class PagenotfoundComponent implements OnInit {
  constructor(private ds: DataService, private router: Router) {}
  takeToHome() {
    console.log('Inside pagenot found');
    this.ds.changeData('Changed Data');
    this.router.navigate(['./cases']);
  }
  ngOnInit(): void {
    let val = <HTMLElement>document.querySelector('#bt');
    val.click();
    console.log(val);
  }
}
