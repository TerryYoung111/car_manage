import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfirmationService } from 'primeng/primeng';
import { DataServiceService } from'../data-service.service';
import { Http, Headers} from '@angular/http';
import { Tools } from '../common/common';

@Component({
  selector: 'app-urgent-plan',
  templateUrl: './urgent-plan.component.html',
  styleUrls: ['./urgent-plan.component.css'],
  providers: [ConfirmationService]
})
export class UrgentPlanComponent implements OnInit {
  applylist: any[];
  cn: any;
  addDisplay: boolean = false;
  planDisplay: boolean = false;
  isActive: number = 0;
  startDate: Date;
  callabckDate: Date;
  add_condition:any;
  group:string;
  applyGroup:any[];
  applyUsers:any[];
  carsCanapply:any[];
  applyform:any;
  constructor(private dataService: DataServiceService,private confirmationService:ConfirmationService, private http: Http,private tools:Tools) { }

  ngOnInit() {
    this.cn = this.dataService.dataFormat;
    this.add_condition = {
      car_status:[],
      driver:[],
      group:[],
      incharge:[],
      manager:[]
    }
    this.applyform = {
      application_user_id:"",
      car_id:'',
      start_city:'',
      end_city:'',
      startDate:'',
      callbackDate:'',
      apply_for:''
    }
    this.detailform = {
      application_user_id:"",
      car_id:'',
      start_city:'',
      end_city:'',
      startDate:'',
      callbackDate:'',
      apply_for:'',
      check_user_id:'',
      check_info:{4:{}}
    }
    this.getAddcondition();
    this.getCheckuser();
    this.getApplyGroupList();
    // this.getApplyuserlist();
    this.getCarsCanapply();
    // console.log(this.add_condition);
    this.getApplicationList(this.isActive);
  }
  showAdd() {
    this.addDisplay = true;
  }
  showPlan() {
    this.planDisplay = true;
  }
  // 录入车辆筛选条件
  getAddcondition(){
    this.dataService.getAddcondition().then(res => {
      // console.log("录入条件",res);
      if (res.code == 0) {
          this.add_condition = res.data;
      }else{
        alert(res.message);
      }
    })
  }
  //等级人员
  check_level:any[];
  getCheckuser(){
    this.dataService.getCheckuser().then(res => {
      // console.log('审核等级',res);
      if (res.code == 0) {
          this.check_level = this.checkLevelMap(res.data,3);
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
  //可申请组
  getApplyGroupList(){
    this.dataService.getApplyuserlist().then(res => {
      // console.log('可申请组',res);
      if (res.code == 0) {
        this.applyGroup = res.data;
      }else{
        alert(res.message);
      }
    })
  }
  //可申请人员
  getApplyuserlist(group){
    this.dataService.getApplyuser(group).then(res => {
      if (res.code == 0) {
        // console.log('可申请人',res.data)
          this.applyUsers = res.data;
      }else{
        alert(res.message);
      }
    })
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

  //提交申请
  submitApply(addform:NgForm){
    let errorStr = "";
    let flag = true;
    for (let key in addform.controls) {
        if (!addform.controls[key].value) {
            flag = false;
            switch(key){
              case 'department' : errorStr+="申请部门 ";
              break;
              case 'application_user_id' : errorStr+="申请人 ";
              break;
              case 'car' : errorStr+="车辆 ";
              break;
              case 'start_city' : errorStr+="出发城市 ";
              break;
              case 'end_city' : errorStr+="目的城市 ";
              break;
              case 'startDate' : errorStr+="出发时间 ";
              break;
              case 'callbackDate' : errorStr+="收车时间 ";
              break;
              case 'check_user_id' : errorStr+="审核人 ";
              break;
              case 'apply_for' : errorStr+="车辆用途";
              break;
            }
        }
    }
    if (flag) {
      let startDate,callbackDate;
      startDate = this.tools.getStrTime(this.applyform.startDate);
      callbackDate = this.tools.getStrTime(this.applyform.callbackDate);
      this.dataService.addApplication(this.applyform,startDate,callbackDate,2).then(res => {
        // console.log(res);
        if (res.code == 0) {
            this.getApplicationList(this.isActive);
            this.addDisplay =false;
            this.applyform = {
              application_user_id:"",
              car_id:'',
              start_city:'',
              end_city:'',
              startDate:'',
              callbackDate:'',
              apply_for:'',
              check_user_id:''
            }
        }else{
          alert(res.message);
        }
      })
    }else{
      alert(errorStr+"不能为空！");
    }
  }
  //收车
  callbackcar(data){
    console.log(data);
    this.confirmationService.confirm({
        message: `确定${this.tools.getStrDate(false)}收车？`,
        header: '提示',
        accept: () => {
          this.dataService.modifyCarStatus(data.car_application_id,3).then(res => {
            console.log(res);
            if (res.code == 0) {
                this.getApplicationList(this.isActive);
            }else{
              alert(res.message);
            }
          })
        }
    })
  }
  //获取申请用车计划表
  getApplicationList(status){
    this.dataService.applicationList(2,status,this.cur_page,10).then(res => {
      // console.log('申请列表',res);
      if (res.code == 0) {
          this.applylist = res.data.application_list;
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
    this.cur_page = i;
    this.getApplicationList(this.isActive);
  }
  //上一页
  getPageDataLeft(){
    if (this.cur_page>1) {
      this.cur_page--;
      this.getApplicationList(this.isActive);
    }
  }
  //下一页
  getPageDataRight(){
    if (this.cur_page<this.total_page) {
      this.cur_page++;
      this.getApplicationList(this.isActive);
    }
  }
  toggleStatus(status){
    this.isActive = status;
    this.getApplicationList(status);
  }
  //获取申请单详细
  detailform:any;
  applicationDetail(car_application_id){
    this.planDisplay = true;
    this.dataService.applicationDetail(car_application_id).then(res => {
      if (res.code == 0) {
          this.detailform = res.data;
      }else{
        alert(res.message);
      }

    })
  }
}
