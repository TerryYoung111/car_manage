import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { DataServiceService } from'../data-service.service';
import { Http,Headers} from '@angular/http';
import { Tools } from '../common/common';

@Component({
  selector: 'app-cars-manage',
  templateUrl: './cars-manage.component.html',
  styleUrls: ['./cars-manage.component.css'],
  providers: [DataServiceService,Tools,ConfirmationService]
})
export class CarsManageComponent implements OnInit {
  testData:any[];
  car_list:any[];
  cur_page:number = 1;
  total_num:number;
  total_page:number;
  carsDisplay:boolean = false;
  searchcondition:any;
  add_condition:any;
  editcars:any;
  constructor(private dataService:DataServiceService,private tools : Tools,private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.searchcondition = {
      brand:[],
      car_status:[],
      group:[]
    };
    this.add_condition = {
      car_status:[],
      driver:[],
      group:[],
      incharge:[],
      manager:[]
    }
    this.editcars = {
      group:'',
      plate_num:'',
      incharge:'',
      manager:'',
      brand:'',
      driver:'',
      car_status:'',
      quality_status:''
    }
    this.getLogininfo();
    this.getAddcondition();
    this.getSearchcondition();

  }
  // 获取登录信息
  getLogininfo(){
    this.dataService.getLogininfo().then(res => {
      // console.log("登录信息",res);
      if (res.code == 0) {
          this.getUserInfo(res.data.user_id);
          this.getPrivilege(res.data.user_id);
      }else{
        alert(res.message)
      }
    })
  }
  userInfo:any;
  apply_group:string;
  application_user_name:string;
  id_card:string;
  privilegeInfo:any;
  group_id:string;
  department_type:string;
  getUserInfo(user_id){
    this.dataService.getUserInfo(user_id).then(res => {
      console.log('用户信息',res)
      if (res.code == 0) {
        this.userInfo = res.data;
        this.group_id = res.data.group_id;
        this.apply_group = res.data.department;
        this.application_user_name = res.data.name;
        this.id_card = res.data.idCard;
        this.department_type = res.data.department_type;
        console.log(this.group_id);
        this.getCarsList();
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
  // 获取搜索级联条件
  group:any[];
  search_name:string;
  select_groupid:string;
  select_brand:string = "null";
  selecte_status:number = -1;
  getSearchcondition(){
    this.dataService.getSearchcondition().then(res => {
      console.log(res);
      if (res.code == 0) {
          this.searchcondition = res.data;
          // this.group = this.tools.mapObj(res.data.group);
          // this.select_groupid = this.group[0].value.group_id;

          // this.select_brand = this.searchcondition.brand[0];
          this.select_brand = "null";
          // this.selecte_status = this.searchcondition.car_status[0].id;
          this.selecte_status = -1;
          // console.log(this.group)
      }else{
        alert(res.message);
      }

    })
  }
  selectGroup(event){
    this.cur_page = 1;
    this.select_groupid = event;
  }
  selectCar(event){
    this.cur_page = 1;
    this.select_brand = event;
  }
  selectStatus(event){
    this.cur_page = 1;
    this.selecte_status = event;
  }
  buttonSearch(){
    this.cur_page = 1;
    this.getCarsList();
  }
  // 搜索车辆列表
  getCarsList(){
    let options = {
      name:this.search_name ? this.search_name : "",
      page_size:5,
      page:this.cur_page,
      group_id:this.group_id,
      brand:this.select_brand,
      status:this.selecte_status,
      is_deleted:0
    };
    console.log(options)
    this.dataService.getCars(options).then(res => {
      // console.log('车辆列表',res);
      if (res.code == 0) {
          this.car_list = res.data.car_list;
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
    this.getCarsList();
  }
  //上一页
  getPageDataLeft(){
    if (this.cur_page>1) {
      this.cur_page--;
      this.getCarsList();
    }
  }
  //下一页
  getPageDataRight(){
    if (this.cur_page<this.total_page) {
      this.cur_page++;
      this.getCarsList();
    }
  }
  edit(data){
    this.carsDisplay = true;
    // console.log(data);
    this.editcars = {
      car_id:data.car_id,
      group:data.group_id,
      plate_num:data.plate_num,
      incharge:data.incharge_user_name,
      manager:data.manage_user_name,
      brand:data.brand,
      driver:data.drive_user_name,
      car_status:data.car_status,
      quality_status:data.quality_status
    }
  }
  sureEdit(){
    this.dataService.modifyCar(this.editcars).then(res => {
      // console.log("修改结果",res);
      if (res.code == 0) {
        this.getSearchcondition();
          this.getCarsList();
          // alert('修改成功')
          this.carsDisplay = false;
      }else{
        alert(res.message);
      }
    })
  }

  delete(data){
    this.confirmationService.confirm({
      message: `确定删除该车辆？`,
      header: '提示',
      accept: () => {
        this.sureDelete(data);
      }
    })
  }
  sureDelete(data){
    this.dataService.deleteCar(data.car_id).then(res => {
      console.log(res);
      if (res.code == 0) {
          this.getCarsList();
      }else{
        alert(res.message);
      }
    })
  }

}
