import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from '../data-service.service';
import { Tools } from '../common/common';
@Component({
  selector: 'app-vehicle-enter',
  templateUrl: './vehicle-enter.component.html',
  styleUrls: ['./vehicle-enter.component.css'],
  providers: [DataServiceService,Tools]
})
export class VehicleEnterComponent implements OnInit {
  carsform:any;
  add_condition:any;
  constructor(private dataService:DataServiceService , private tools:Tools) { }

  ngOnInit() {
    this.getAddcondition();
    this.add_condition = {
      car_status:[],
      driver:[],
      group:[],
      incharge:[],
      manager:[]
    }
    this.carsform = {
      brand:"",
      plate_num:"",
      group_id:"",
      incharge:"",
      manager:"",
      driver:'',
      car_status:"",
    };

  }
  // 录入车辆筛选条件
  getAddcondition(){
    this.dataService.getAddcondition().then(res => {
      // console.log(res);
      if (res.code == 0) {
          this.add_condition = res.data;
      }else{
        alert(res.message);
      }
    })
  }
  addCars(carsForm:NgForm){
    // console.log(this.carsform);
    // console.log(carsForm);
    this.dataService.addCar(this.carsform).then(res => {
      // console.log(res);
      if (res.code == 0) {
          alert('车辆录入成功！');
      }else{
        alert(res.message);
      }
    })

  }
}
