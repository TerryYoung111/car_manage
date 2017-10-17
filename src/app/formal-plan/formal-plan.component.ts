import { Component,ViewChild, OnInit,Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { DataServiceService } from'../data-service.service';
import { Http, Headers} from '@angular/http';
import { Tools } from '../common/common';

import { ApplicationDetailComponent } from '../application-detail/application-detail.component';
@Component({
  selector: 'app-formal-plan',
  templateUrl: './formal-plan.component.html',
  styleUrls: ['./formal-plan.component.css'],
  providers: [DataServiceService,Tools,ConfirmationService]
})
export class FormalPlanComponent implements OnInit {
  applylist: any[];
  cn: any;
  precautions:any[];
  addDisplay: boolean = false;
  planDisplay: boolean = false;
  isActive: number = 0;
  startDate: Date;
  endDate: Date;
  plate_num:string = "";
  add_condition:any;
  group:string;
  applyGroup:any[];
  applyUsers:any[];
  carsCanapply:any[];
  carlist:any[];
  applyform:any;
  minDate:Date;
  selectedPrecautions:any[];
  constructor(private dataService: DataServiceService,private confirmationService: ConfirmationService,
    private http: Http,private tools:Tools,private router:Router) { }

  ngOnInit() {
    // this.startDate = new Date();
    // this.endDate = new Date();

    let today = new Date();
    this.minDate = new Date();
    this.minDate.setDate(today.getDate()+1);
    this.cn = this.dataService.dataFormat;
    this.precautions = [];
    this.precautions = [
      {value:"严禁闯红灯，违章占用应急车道",label:"严禁闯红灯，违章占用应急车道"},
      {value:"严禁超速，违章占用应急车道",label:"严禁超速，违章占用应急车道"},
      {value:"注意避让行人和非机动车，严禁乱停乱放",label:"注意避让行人和非机动车，严禁乱停乱放"},
      {value:"冰雪、泥泞路段注意控制车速",label:"冰雪、泥泞路段注意控制车速"},
      {value:"严禁酒后驾车，开斗气车，英雄车",label:"严禁酒后驾车，开斗气车，英雄车"},
      {value:"注意塌方落石，严禁疲劳驾驶",label:"注意塌方落石，严禁疲劳驾驶"},
      {value:"雨雾天气，严格控制车速",label:"雨雾天气，严格控制车速"},
      {value:"严禁占用公交车道，非机动车道",label:"严禁占用公交车道，非机动车道"},
      {value:"严禁故意遮挡号牌",label:"严禁故意遮挡号牌"}
    ];
    this.add_condition = {
      car_status:[],
      driver:[],
      group:[],
      incharge:[],
      manager:[]
    }
    this.applyform = {
      application_user_id:'',
      car_id:'',
      start_city:'',
      end_city:'',
      startDate:'',
      callbackDate:'',
      apply_for:'',
      check_user_id:'',
      person_num:'',
      monitor:'',
      driver_name:'',
      precautions:''
    }
    this.getLogininfo();
    this.getCheckuser();
    this.getApplyGroupList();
    this.getAllCar();
    this.getApplicationList(0);
  }
  // 获取登录信息
  getLogininfo(){
    this.dataService.getLogininfo().then(res => {
      // console.log("登录信息",res);
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
      // console.log('用户信息',res)
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
    this.getCheckuser();
    this.getCarsCanapply();
    this.addDisplay = true;

  }
  //等级人员
  check_level:any[];
  getCheckuser(){
    this.check_level = [];
    this.dataService.getCheckuser(this.apply_group).then(res => {
      // console.log('审核等级',res);
      if (res.code == 0) {
        // console.log(res.data[1])
        if (res.data[1]) {
          this.check_level = this.checkLevelMap(res.data,1);
          this.applyform.check_user_id = this.check_level[0].user_id;
        }
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
  //所有车辆
  getAllCar(){
    this.dataService.getAllCar().then(res => {
      if (res.code == 0) {
          this.carlist = res.data.car_list;
          // console.log("所有车辆",this.carlist);
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
              case 'driver_name' : errorStr+="司机";
              break;
            }
        }
    }
    if (flag) {
      let startDate,callbackDate,safe_tip="";
      startDate = this.tools.getStrTime(this.applyform.startDate);
      callbackDate = this.tools.getStrTime(this.applyform.callbackDate);
      this.selectedPrecautions.map(value => {
        safe_tip+=value+","
      });
      this.applyform.precautions = safe_tip;
      if (this.applyform.startDate < this.applyform.callbackDate) {
        console.log(this.applyform)
        this.dataService.addApplication(this.applyform,startDate,callbackDate,0).then(res => {
          if (res.code == 0) {
            this.getApplicationList(this.isActive);
            this.addDisplay = false;
            this.applyform = {
              application_user_id:"",
              car_id:'',
              start_city:'',
              end_city:'',
              startDate:'',
              callbackDate:'',
              apply_for:'',
              check_user_id:'',
              precautions:''
            }
            this.selectedPrecautions = [];
          }else{
            alert(res.message);
          }
        })
      }else{
        alert("出发时间不能大于收车时间！")
      }
    }else{
      alert(errorStr+"不能为空")
    }
  }
  //删除申请
  deleteApplication(application_id){
    this.confirmationService.confirm({
        message: `确定删除申请单？`,
        header: '提示',
        accept: () => {
          this.dataService.deleteApplication(application_id).then(res => {
            if (res.code == 0) {
                this.getApplicationList(this.isActive);
            }else{
              alert(res.message)
            }
          })
        }
    })
  }

  //撤销通过审核的申请单
  cancelApplication(application_id){
    this.confirmationService.confirm({
        message: `确定删除申请单？`,
        header: '提示',
        accept: () => {
          this.dataService.checkCancel(application_id).then(res => {
            if (res.code == 0) {
                this.getApplicationList(this.isActive);
            }else{
              alert(res.message)
            }
          })
        }
    })
  }
  //收车
  display:boolean = false;
  callback_car_application_id:string;
  callbackTime:Date;
  callbackcar(data){
    this.callbackTime = new Date();
    this.callback_car_application_id = data.car_application_id;
    // console.log(data);
    this.display = true;
    // this.confirmationService.confirm({
    //     message: `确定${this.tools.getStrDate(false)}收车？`,
    //     header: '提示',
    //     accept: () => {
    //       this.dataService.modifyCarStatus(data.car_application_id,3).then(res => {
    //         // console.log(res);
    //         if (res.code == 0) {
    //             this.getApplicationList(this.isActive);
    //         }else{
    //           alert(res.message);
    //         }
    //       })
    //     }
    // })
  }
  note:string = '';
  sureCallback(){
    let time = this.tools.getStrTime(this.callbackTime);
    this.dataService.modifyCarStatusCallback(time,this.callback_car_application_id,3,this.note).then(res => {
      // console.log(res);
      if (res.code == 0) {
          this.getApplicationList(this.isActive);
          this.display = false;
      }else{
        alert(res.message);
      }
    })
  }
  buttonSearch(){
    this.cur_page = 1;
      this.getApplicationList(this.isActive);
  }
  //获取申请用车计划表
  getApplicationList(status){
    if (this.startDate) {
      this.startDate.setHours(0);
      this.startDate.setMinutes(0);
      this.startDate.setSeconds(0);
    }
    if (this.endDate) {
      this.endDate.setHours(23);
      this.endDate.setMinutes(59);
      this.endDate.setSeconds(59);
    }

      let creat_time_st = this.tools.getStrTime(this.startDate) ? this.tools.getStrTime(this.startDate) : "";
      let creat_time_ed = this.tools.getStrTime(this.endDate) ? this.tools.getStrTime(this.endDate) : "";
      this.dataService.applicationList(0,status,creat_time_st,creat_time_ed,this.plate_num,this.cur_page,10).then(res => {
        // console.log('申请列表',res);
        if (res.code == 0) {
            this.applylist = res.data.application_list;
            this.cur_page = res.data.cur_page;
            this.total_num = res.data.total_num;
            this.total_page = res.data.total_page;
            this.getPage(res.data.total_page);
        }else{
          alert(res.message);
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
    // if (this.isActive == -1) {
    //     this.refusedApplication();
    // }else{
      this.getApplicationList(this.isActive);
    // }
  }
  //上一页
  getPageDataLeft(){
    if (this.cur_page>1) {
      this.cur_page--;
      // if (this.isActive == -1) {
      //     this.refusedApplication();
      // }else{
        this.getApplicationList(this.isActive);
      // }
    }
  }
  //下一页
  getPageDataRight(){
    if (this.cur_page<this.total_page) {
      this.cur_page++;
      // if (this.isActive == -1) {
      //     this.refusedApplication();
      // }else{
        this.getApplicationList(this.isActive);
      // }
    }
  }
  //切换状态
  toggleStatus(status){
    this.cur_page = 1;
    this.isActive = status;
    this.getApplicationList(status);
  }
  refused(status){
    this.isActive = status;
    // this.refusedApplication();
    this.getApplicationList(status);
  }
  // refusedApplication(){
  //   let creat_time_st = this.tools.getStrTime(this.startDate) ? this.tools.getStrTime(this.startDate) : "";
  //   let creat_time_ed = this.tools.getStrTime(this.endDate) ? this.tools.getStrTime(this.endDate) : "";
  //   this.dataService.checkedNosetoff(0,-1,this.cur_page,10,creat_time_st,creat_time_ed,this.plate_num).then(res => {
  //     console.log(res);
  //     if (res.code == 0) {
  //       this.applylist = res.data.application_list;
  //       this.cur_page = res.data.cur_page;
  //       this.total_num = res.data.total_num;
  //       this.total_page = res.data.total_page;
  //       this.getPage(res.data.total_page);
  //     }else{
  //       alert(res.message);
  //     }
  //   })
  // }

  //获取申请单详细
  applicationDetail(applicationPrint:ApplicationDetailComponent,car_application_id,title){
    applicationPrint.dialog(car_application_id,'formal',title);
  }

}
