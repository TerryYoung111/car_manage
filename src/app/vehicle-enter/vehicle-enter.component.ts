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
      quality_status:""
    };

  }
  // 录入车辆筛选条件
  getAddcondition(){
    this.dataService.getAddcondition().then(res => {
      // console.log(res);
      if (res.code == 0) {
          this.add_condition = res.data;
          this.carsform.group_id = res.data.group[0].id;
      }else{
        alert(res.message);
      }
    })
  }
  addCars(carsForm:NgForm){
    let errorStr = "";
    let flag = true;
    for (let key in carsForm.controls) {
      console.log(key)
        if (!carsForm.controls[key].value) {
            flag = false;
            switch(key){
              case 'brand' : errorStr+="车辆品牌 ";
              break;
              case 'plate_num' : errorStr+="车牌号 ";
              break;
              case 'department' : errorStr+="所属部门 ";
              break;
              case 'driver' : errorStr+="驾驶员 ";
              break;
              case 'incharge' : errorStr+="负责人 ";
              break;
              case 'manager' : errorStr+="管理员 ";
              break;
              case 'car_status' : errorStr+="车辆状态 ";
              break;
              case 'quality_status' : errorStr+="质量状态";
              break;
            }
        }
    }
    if (flag) {
      this.dataService.addCar(this.carsform).then(res => {
        // console.log(res);
        if (res.code == 0) {
            alert('车辆录入成功！');
            this.carsform = {
              brand:"",
              plate_num:"",
              group_id:"",
              incharge:"",
              manager:"",
              driver:'',
              car_status:"",
              quality_status:""
            }
        }else{
          alert(res.message);
        }
      })
    }else{
      alert(errorStr+"不能为空！")
    }
  }
  cancelCars(){
    this.carsform = {
      brand:"",
      plate_num:"",
      group_id:"",
      incharge:"",
      manager:"",
      driver:'',
      car_status:"",
      quality_status:""
    };
  }
}
