import { Component, OnInit } from '@angular/core';
import { AdminserviceService } from '../adminservice.service';

@Component({
  selector: 'app-deletedata',
  templateUrl: './deletedata.component.html',
  styleUrls: ['./deletedata.component.css'],
})
export class DeletedataComponent implements OnInit {
  constructor(private as: AdminserviceService) {}

  ngOnInit(): void {}
  deleteData(data) {
    console.log(data);
    alert('This will delete the center permanently');
    this.as.deleteData(data).subscribe((data) => {
      if (data['message'] === 'success') {
        alert('Center data deleted successfully');
        window.location.reload();
      } else {
        alert("Center doesn't exist");
      }
    });
  }
}
