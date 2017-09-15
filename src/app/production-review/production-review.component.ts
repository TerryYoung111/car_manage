import { Component, OnInit,Input } from '@angular/core';
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
  @Input() type;
  cn:any;
  isActive:number = 0;
  checkDisplay:boolean = false;
  checklist:any[]=[];
  carsCanapply:any[];
  application_list:any[] = [];
  select_check_user:number;
  today:string;
  startDate:Date;
  endDate:Date;
  plate_num:string = "";
  select_check_weather:string;
  constructor(private dataService:DataServiceService , private confirmationService:ConfirmationService , private tools:Tools) { }

  ngOnInit() {
    this.cn = this.dataService.dataFormat;
    this.today = this.tools.getStrDate(false);
    this.getCarsCanapply();
    // this.getCheckuser();
    this.getCheckList(this.isActive);

  }

  toogleStatus(value){
    this.isActive = value;
    if (value == 2) {
      this.getCheckListNosetoff(1);
    }else{
      this.getCheckList(value);
    }
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
  getCheck(type){
    this.type = type;
    if (this.isActive == 2) {
        this.getCheckListNosetoff(1);
    }else{
      this.getCheckList(this.isActive);
    }
  }
  buttonSearch(){
    this.cur_page = 1;
    if (this.isActive == 2) {
        this.getCheckListNosetoff(1);
    }else{
      this.getCheckList(this.isActive);
    }
  }
  //审核完成待出发
  getCheckListNosetoff(status){
    let creat_time_st = this.tools.getStrTime(this.startDate) ? this.tools.getStrTime(this.startDate) : "";
    let creat_time_ed = this.tools.getStrTime(this.endDate) ? this.tools.getStrTime(this.endDate) : "";
    this.dataService.checkedNosetoff(this.type,status,this.cur_page,10,creat_time_st,creat_time_ed,this.plate_num).then(res =>{
      if (res.code == 0) {
        this.checklist = res.data.application_list;
        this.cur_page = res.data.cur_page;
        this.total_num = res.data.total_num;
        this.total_page = res.data.total_page;
        this.getPage(res.data.total_page);
      }else{
        alert(res.message);
      }
    })
  }
  //待审核和审核历史
  getCheckList(status){
    let creat_time_st = this.tools.getStrTime(this.startDate) ? this.tools.getStrTime(this.startDate) : "";
    let creat_time_ed = this.tools.getStrTime(this.endDate) ? this.tools.getStrTime(this.endDate) : "";
    this.dataService.getCheckList(this.type,status,creat_time_st,creat_time_ed,this.plate_num,this.cur_page,10).then(res => {
      // console.log('审核列表',res);
      if (res.code == 0) {
        this.checklist = res.data.check_list;
        console.log(res.data.check_list);
        let applylist = [];
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
      }else{
        alert(res.message);
      }

    })

  }
  setoff(data){
    console.log(data);
    this.confirmationService.confirm({
        message: '是否确定派车？',
        header: '提示',
        accept: () => {
          this.dataService.modifyCarStatus(data.car_application_id,2).then(res => {
            console.log(res);
            if (res.code == 0) {
                // this.getCheckList(this.isActive);
                this.getCheckListNosetoff(1);
            }else{
              alert(res.message);
            }
          })
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
    if (this.isActive == 2) {
        this.getCheckListNosetoff(1);
    }else{
      this.getCheckList(this.isActive);
    }
  }
  //上一页
  getPageDataLeft(){
    if (this.cur_page>1) {
      this.cur_page--;
      if (this.isActive == 2) {
          this.getCheckListNosetoff(1);
      }else{
        this.getCheckList(this.isActive);
      }
    }
  }
  //下一页
  getPageDataRight(){
    if (this.cur_page<this.total_page) {
      this.cur_page++;
      if (this.isActive == 2) {
          this.getCheckListNosetoff(1);
      }else{
        this.getCheckList(this.isActive);
      }
    }
  }
  car_check_id:any;
  check_level_number:number;
  confirmVerify(data){ // 审核
    console.log(data)
    this.car_check_id = data.check_info;
    // console.log(this.car_check_id)
    this.check_level_number = parseInt(data.check_level);
    // console.log('审核等级',this.check_level_number)
    if (data.check_level == 1) {
        this.getCheckuser(data.check_level);
    }
    this.checkDisplay = true;
  }
  submitCheck(status){
    console.log(status)
    let weather = this.select_check_weather;
    if (weather) {
      this.dataService.checkApply(this.car_check_id[this.check_level_number].car_check_id,status,this.select_check_user,weather).then(res => {
        // console.log(res);
        if (res.code == 0) {
            this.getCheckList(this.isActive);
            this.checkDisplay = false;
        }else{
          alert(res.message);
        }
      })
    }else{
      alert("请选择天气！")
    }

  }

  //等级人员
  check_level:any[];
  getCheckuser(check_level_number){
    // let group = "";
    // console.log(check_level_number);
    this.dataService.getCheckuser(false).then(res => {
      if (res.code == 0) {
          this.check_level = this.checkLevelMap(res.data,parseInt(check_level_number)+1);
          if (this.check_level) {
            if (check_level_number == 1) {
                this.select_check_user = this.check_level[0].user_id;
            }
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
