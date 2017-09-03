import { Component, OnInit,Input } from '@angular/core';
import { DataServiceService } from'../data-service.service';
import { Http, Headers} from '@angular/http';
import { Tools } from '../common/common';
@Component({
  selector: 'app-formal-plan',
  templateUrl: './formal-plan.component.html',
  styleUrls: ['./formal-plan.component.css'],
  providers: [DataServiceService,Tools]
})
export class FormalPlanComponent implements OnInit {
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
  detailform:any;
  constructor(private dataService: DataServiceService, private http: Http,private tools:Tools) { }

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
      apply_for:'',
      check_user_id:''
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
      check_info:{1:{}}
    }
    this.getAddcondition();
    this.getCheckuser();
    this.getApplyGroupList();
    // this.getApplyuserlist();
    this.getCarsCanapply();
    console.log(this.add_condition);
    this.getApplicationList(0);
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
      console.log("录入条件",res);
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
      console.log('审核等级',res);
      if (res.code == 0) {
          this.check_level = this.checkLevelMap(res.data,1);
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
      console.log('可申请组',res);
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
        console.log('可申请人',res.data)
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
          console.log('可申请车辆',res.data.car_list);
      }else{
        alert(res.message);
      }
    })
  }

  //提交申请
  submitApply(){
    console.log(this.applyform);
    let startDate,callbackDate;
    startDate = this.tools.getStrTime(this.applyform.startDate);
    callbackDate = this.tools.getStrTime(this.applyform.callbackDate);
    this.dataService.addApplication(this.applyform,startDate,callbackDate,0).then(res => {
      console.log(res);
      if (res.code == 0) {
        this.getApplicationList(this.isActive);
          this.addDisplay = false;
      }else{
        alert(res.message);
      }
    })
  }

  //获取申请用车计划表
  getApplicationList(status){
    this.dataService.applicationList(0,status,this.cur_page,10).then(res => {
      console.log('申请列表',res);
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
    console.log(i)
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
  //切换状态
  toggleStatus(status){
    this.isActive = status;
    this.getApplicationList(status);
  }
  //获取申请单详细
  applicationDetail(car_application_id){
    this.planDisplay = true;
    this.dataService.applicationDetail(car_application_id).then(res => {
      console.log(res.data);
      this.detailform = res.data;
    })
  }

}
