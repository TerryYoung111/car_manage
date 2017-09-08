import { Component, OnInit } from '@angular/core';
import { ProductionReviewComponent } from '../production-review/production-review.component';
@Component({
  selector: 'app-vehicle-review',
  templateUrl: './vehicle-review.component.html',
  styleUrls: ['./vehicle-review.component.css']
})
export class VehicleReviewComponent implements OnInit {
  type:number = 0;
  constructor() { }

  ngOnInit() {
  }
  getChecklist(num,child:ProductionReviewComponent){
    this.type = num;
    child.getCheck(this.type);
  }

}
