import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { DataServiceService } from'../data-service.service';
import { Http, Headers} from '@angular/http';
import { Tools } from '../common/common';
import { ApplicationDetailComponent } from '../application-detail/application-detail.component';

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
  isActive: number = 3;
  startDate: Date;
  endDate: Date;
  plate_num:string = "";
  add_condition:any;
  group:string;
  applyGroup:any[];
  applyUsers:any[];
  carlist:any[];
  carsCanapply:any[];
  applyform:any;
  minDate:Date;
  maxDate:Date;
  constructor(private dataService: DataServiceService,private confirmationService:ConfirmationService,
     private http: Http,private tools:Tools,private router:Router) { }

  ngOnInit() {

    this.minDate = new Date();
    this.maxDate = new Date();
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
      apply_for:'',
      person_num:'',
      monitor:'',
      driver_name:''
    }
    this.getLogininfo();
    this.getApplyGroupList();
    // this.getApplyuserlist();
    this.getAllCar();
    // console.log(this.add_condition);
    this.getApplicationList(this.isActive);
  }
  // 获取登录信息
  getLogininfo(){
    this.dataService.getLogininfo().then(res => {
      console.log("登录信息",res);
      if (res.code == 0) {
          this.getUserInfo(res.data.user_id);
          this.getPrivilege(res.data.user_id);
      }else{
        this.router.navigateByUrl('login');
      }
    })
  }
  userInfo:any;
  apply_group:string;
  application_user_name:string;
  id_card:string;
  privilegeInfo:any;
  group_id:string;
  getUserInfo(user_id){
    this.dataService.getUserInfo(user_id).then(res => {
      console.log('用户信息',res)
      if (res.code == 0) {
        this.userInfo = res.data;
        this.group_id = res.data.group_id;
        this.apply_group = res.data.department;
        this.applyform.application_user_id = res.data.user_id;
        this.application_user_name = res.data.name;
        this.id_card = res.data.idCard;
      }else{
        alert(res.message);
      }
    })
  }
  getPrivilege(user_id){
    this.dataService.getPrivilege(user_id).then(res => {
      // console.log("权限",res);
      if (res.code == 0) {
          this.privilegeInfo = res.data;
      }else{
        alert(res.message);
      }
    })
  }
  showAdd() {
    this.getLogininfo();
    this.getCarsCanapply();
    this.addDisplay = true;
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
  // check_level:any[];
  // getCheckuser(){
  //   this.dataService.getCheckuser().then(res => {
  //     // console.log('审核等级',res);
  //     if (res.code == 0) {
  //         this.check_level = this.checkLevelMap(res.data,3);
  //     }else{
  //       alert(res.message)
  //     }
  //   })
  // }
  // checkLevelMap(obj,num){
  //   let arr = [];
  //   let flag = false;
  //   for (let key in obj) {
  //       if (obj[key][0].check_level == num) {
  //           arr = obj[key];
  //           flag = true;
  //       }
  //   }
  //   if (flag) {
  //       return arr;
  //   }
  // }
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
  //所有车辆
  getAllCar(){
    this.dataService.getAllCar().then(res => {
      if (res.code == 0) {
          this.carlist = res.data.car_list;
          console.log(this.carlist);
      }else{
        alert(res.message);
      }
    })
  }
  //可申请车辆
  getCarsCanapply(){
    this.dataService.getCarsCanapply(this.group_id).then(res => {
      if (res.code == 0) {
          this.carsCanapply = res.data.car_list;
          if(res.data.car_list.length>0) this.applyform.car_id = res.data.car_list[0].car_id;
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
              case 'person_num' : errorStr+="人数";
              break;
              case 'monitor' : errorStr+="监控人";
              break;
            }
        }
    }
    if (flag) {
      let startDate,callbackDate;
      startDate = this.tools.getStrTime(this.applyform.startDate);
      callbackDate = this.tools.getStrTime(this.applyform.callbackDate);
      if (this.applyform.startDate < this.applyform.callbackDate) {
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
        alert("出发时间不能大于收车时间！")
      }
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
  buttonSearch(){
    this.cur_page = 1;
    this.getApplicationList(this.isActive);
  }
  //获取申请用车计划表
  getApplicationList(status){
    let creat_time_st = this.tools.getStrTime(this.startDate) ? this.tools.getStrTime(this.startDate) : "";
    let creat_time_ed = this.tools.getStrTime(this.endDate) ? this.tools.getStrTime(this.endDate) : "";
    this.dataService.applicationList(2,status,creat_time_st,creat_time_ed,this.plate_num,this.cur_page,10).then(res => {
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
  applicationDetail(applicationPrint:ApplicationDetailComponent,car_application_id){
    applicationPrint.dialog(car_application_id,'urgent');
  }
}
