import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { DataServiceService } from '../data-service.service';
import { Tools } from '../common/common';
@Component({
  selector: 'app-production-review',
  templateUrl: './production-review.component.html',
  styleUrls: ['./production-review.component.css'],
  providers: [DataServiceService,ConfirmationService,Tools]
})
export class ProductionReviewComponent implements OnInit {
  isActive:number = 0;
  checkDisplay:boolean = false;
  checklist:any[];
  carsCanapply:any[];
  application_list:any[] = [];
  select_check_user:number;
  constructor(private dataService:DataServiceService , private confirmationService:ConfirmationService , private tools:Tools) { }

  ngOnInit() {
    this.getCarsCanapply();
    // this.getCheckuser();
    this.getCheckList(this.isActive);

  }

  toogleStatus(value){
    this.isActive = value;
    this.getCheckList(value);
  }
  //可申请车辆
  getCarsCanapply(){
    this.dataService.getCarsCanapply().then(res => {
      if (res.code == 0) {
          this.carsCanapply = res.data.car_list;
          // console.log('可申请车辆',res.data.car_list);
      }else{
        alert(res.message);
      }
    })
  }
  getCheckList(status){
    this.dataService.getCheckList(status,this.cur_page,10).then(res => {
      // console.log('审核列表',res);
      if (res.code == 0) {
        this.checklist = res.data.check_list;

        this.checklist.map((value,index)=>{
          this.dataService.applicationDetail(value.car_application_id).then(data => {
            for (let key in data.data) {
                value[key] = data.data[key];
            }
          })
        });
        // console.log(this.checklist)
        this.cur_page = res.data.cur_page;
        this.total_num = res.data.total_num;
        this.total_page = res.data.total_page;
        this.getPage(res.data.total_page);
      }

    })
  }

  //页码生成
  cur_page:number = 1;
  total_num:number;
  total_page:number;
  pageArr:any[];
  getPage(number){
    let pageArr = [];
    for (let i = 1; i <= number; i++) {
        pageArr.push(i);
    }
    this.pageArr = pageArr;
    pageArr = null;
  }
  //页码翻页
  getPageData(i){
    // console.log(i)
    this.cur_page = i;
    this.getCheckList(this.isActive);
  }
  //上一页
  getPageDataLeft(){
    if (this.cur_page>1) {
      this.cur_page--;
      this.getCheckList(this.isActive);
    }
  }
  //下一页
  getPageDataRight(){
    if (this.cur_page<this.total_page) {
      this.cur_page++;
      this.getCheckList(this.isActive);
    }
  }
  car_check_id:any;
  check_level_number:number;
  confirmVerify(data){ // 审核
    // console.log(data)
    this.car_check_id = data.check_info;
    // console.log(this.car_check_id)
    this.check_level_number = parseInt(data.check_level);
    // console.log('审核等级',this.check_level_number)
    this.getCheckuser(data.check_level);
    this.checkDisplay = true;
  }
  submitCheck(status){
    this.dataService.checkApply(this.car_check_id[this.check_level_number].car_check_id,status,this.select_check_user).then(res => {
      // console.log(res);
      if (res.code == 0) {
          this.getCheckList(this.isActive);
          this.checkDisplay = false;
      }else{
        alert(res.message);
      }
    })
  }

  //等级人员
  check_level:any[];
  getCheckuser(check_level_number){
    // console.log(check_level_number);
    this.dataService.getCheckuser().then(res => {
      if (res.code == 0) {
          this.check_level = this.checkLevelMap(res.data,parseInt(check_level_number)+1);
          if (this.check_level) {
            this.select_check_user = this.check_level[0].user_id;
          }
          // console.log(this.check_level)
      }else{
        alert(res.message)
      }
    })
  }
  checkLevelMap(obj,num){
    let arr = [];
    let flag = false;
    for (let key in obj) {
        if (obj[key][0].check_level == num) {
            arr = obj[key];
            flag = true;
        }
    }
    if (flag) {
        return arr;
    }
  }

}