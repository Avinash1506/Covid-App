import { Component, OnInit } from '@angular/core';
import { SlotbookingComponent } from '../slotbooking/slotbooking.component';

@Component({
  selector: 'app-searchbypincode',
  templateUrl: './searchbypincode.component.html',
  styleUrls: ['./searchbypincode.component.css'],
})
export class SearchbypincodeComponent implements OnInit {
  constructor(private slotbookingObj: SlotbookingComponent) {}

  ngOnInit(): void {
    this.slotbookingObj.activate('pincode');
  }
}
