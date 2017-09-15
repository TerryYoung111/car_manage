import { Injectable } from '@angular/core';
import { Http ,Headers,RequestOptions,Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { DefaultData } from './data';
@Injectable()
export class DataServiceService {
  ip:string = "http://118.190.35.37";
  // ip:string = "";
  headers = new Headers({'Content-Type':'application/x-www-form-urlencoded','withCredentials': true});
  public dataFormat:any = {
            firstDayOfWeek: 0,
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
            monthNamesShort: [ "1", "2", "3", "4", "5", "6","7", "8", "9", "10", "11", "12" ]
        };
  constructor(private http:Http) { }
  //登录
  loginGet(id_number){
    // console.log(this.headers)
    let url = `${this.ip}/web_car/index.php/car/login/loginbyidcard?id_card=${id_number}`;
    return this.http.get(url,{withCredentials: true}).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  //登出
  logout(){
    let url = `${this.ip}/web_car/index.php/car/login/logout`;
    return this.http.get(url,{withCredentials: true}).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  //获取登录信息
  getLogininfo(){
    let url = `${this.ip}/web_car/index.php/car/login/logininfo`;
    return this.http.get(url,{withCredentials: true}).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  //获取用户信息
  getUserInfo(user_id){
    let url = `${this.ip}/web_car/index.php/car/user/info?user_id=${user_id}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  //获取权限信息
  getPrivilege(user_id){
    let url = `${this.ip}/web_car/index.php/car/user/privilege?user_id=${user_id}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }

  //录入车辆筛选条件(部门、品牌以及状态)
  getAddcondition(){
    let url = `${this.ip}/web_car/index.php/car/carmanager/addcondition`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }

  //录入车辆
  addCar(obj){
    let url = `${this.ip}/web_car/index.php/car/carmanager/add?car_status=${obj.car_status}&group_id=${obj.group_id}&brand=${obj.brand}&plate_num=${obj.plate_num}&incharge_user_name=${obj.incharge}&manage_user_name=${obj.manager}&drive_user_name=${obj.driver}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }

  //修改车辆信息
  modifyCar(obj){
    let url = `${this.ip}/web_car/index.php/car/carmanager/modify?car_id=${obj.car_id}&car_status=${obj.car_status}&drive_user_name=${obj.driver}&incharge_user_name=${obj.incharge}&manage_user_name=${obj.manager}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }

  // 获取车辆详情
  getDetail(car_id){
    let url = `${this.ip}/web_car/index.php/car/carmanager/detail?car_id=${car_id}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }

  //获取搜索级联条件
  getSearchcondition(){
    let url = `${this.ip}/web_car/index.php/car/carmanager/searchcondition`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  // 搜索车辆列表
  getCars(obj){
    let group_id,brand,status;
    obj.group_id == -1 ? group_id=" " : group_id=`&group_id=${obj.group_id}`;
    obj.brand === "null" ? brand=" " : brand=`&brand=${obj.brand}`;
    obj.status == -1 ? status=" " : status=`&status=${obj.status}`;

    let url = `${this.ip}/web_car/index.php/car/carmanager/search?name=${obj.name}&page_size=${obj.page_size}&page=${obj.page}${group_id}${brand}${status}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }

  //等级人员接口
  getCheckuser(group){
    // let url = `${this.ip}/web_car/index.php/car/carapplication/checkuserlist`;
    let group_name = group ? group : "";
    let url = `${this.ip}/web_car/index.php/car/carapplication/checkuserlist?group=${group_name}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  //可申请组接口
  getApplyuserlist(){
    let url = `${this.ip}/web_car/index.php/car/carapplication/applyuserlist`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  // 可申请人员接口
  getApplyuser(event){
    let url = `${this.ip}/web_car/index.php/car/carapplication/applyuserlist?group=${event}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  // 可申请车辆接口
  getCarsCanapply(){
    let url = `${this.ip}/web_car/index.php/car/carmanager/search?car_status=0&page_size=100`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  // 车辆申请接口
  addApplication(form,startDate,callbackDate,type){
    let url;
    if (form.check_user_id) {
        url = `${this.ip}/web_car/index.php/car/carapplication/add?application_user_id=${form.application_user_id}&car_id=${form.car_id}&application_type=${type}&start_time=${startDate}&end_time=${callbackDate}&start_city=${form.start_city}&end_city=${form.end_city}&use_for=${form.apply_for}&check_user_id=${form.check_user_id}&person_num=${form.person_num}&monitor=${form.monitor}&driver_name=${form.driver_name}`;
    }else{
      url = `${this.ip}/web_car/index.php/car/carapplication/add?application_user_id=${form.application_user_id}&car_id=${form.car_id}&application_type=${type}&start_time=${startDate}&end_time=${callbackDate}&start_city=${form.start_city}&end_city=${form.end_city}&use_for=${form.apply_for}&check_user_id=1&person_num=${form.person_num}&monitor=${form.monitor}&driver_name=${form.driver_name}`;
    }
    console.log(url)
    return this.http.get(url,{withCredentials: true}).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  // 申请列表
  applicationList(type,status,creat_time_st,creat_time_ed,plate_num,cur_page,page_size){
    let param = `type=${type}&status=${status}&page=${cur_page}&page_size=${page_size}&creat_time_st=${creat_time_st}&creat_time_ed=${creat_time_ed}&plate_num=${plate_num}`;
    let url = `${this.ip}/web_car/index.php/car/carapplication/lists?${param}`;
    return this.http.get(url,{withCredentials: true}).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  // 审核完成待出发&已拒绝审核
  checkedNosetoff(type,status,cur_page,page_size,creat_time_st,creat_time_ed,plate_num){
    let param = `type=${type}&status=${status}&page=${cur_page}&page_size=${page_size}&creat_time_st=${creat_time_st}&creat_time_ed=${creat_time_ed}&plate_num=${plate_num}&is_check=1`;
    let url = `${this.ip}/web_car/index.php/car/carapplication/lists?${param}`;
    return this.http.get(url,{withCredentials: true}).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  //申请单详情
  applicationDetail(application_id){
    let url = `${this.ip}/web_car/index.php/car/carapplication/detail?id=${application_id}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data});
  }
  modifyCarStatus(car_id,status){
    let url = `${this.ip}/web_car/index.php/car/carapplication/modify?id=${car_id}&status=${status}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  //获取审核列表
  getCheckList(type,status,creat_time_st,creat_time_ed,plate_num,page,page_size){
    let url = `${this.ip}/web_car/index.php/car/carcheck/lists?page=${page}&page_size=${page_size}&application_type=${type}&status=${status}&creat_time_st=${creat_time_st}&creat_time_ed=${creat_time_ed}&plate_num=${plate_num}`;
    return this.http.get(url,{withCredentials: true}).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  //审核
  checkApply(id,status,check_user_id,weather){
    let url:string;
    if (check_user_id) {
        url = `${this.ip}/web_car/index.php/car/carcheck/modify?id=${id}&status=${status}&check_user_id=${check_user_id}&weather=${weather}`;
    }else{
      url = `${this.ip}/web_car/index.php/car/carcheck/modify?id=${id}&status=${status}&check_user_id=0&weather=${weather}`;
    }
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }

  //车辆分析筛选条件
  analysisCondition(group_id){
    // console.log(group_id)
    let param,url;
    group_id !==false ? param = `?group_id=${group_id}` : param = '';
    url = `${this.ip}/web_car/index.php/car/caranalysis/carcondition${param}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
  // 车辆使用搜索接口
  analysisSearch(group_id,car_id,start_time,end_time,page){
    let group,car,url;
    group_id ? group = `&group_id=${group_id}` : ' ';
    car_id ? car = `&car_id=${car_id}` : ' ';
    url = `${this.ip}/web_car/index.php/car/caranalysis/search?start_time=${start_time}&end_time=${end_time}&page=${page}&page_size=5${group}${car}`;
    return this.http.get(url).toPromise()
    .then(res => <DefaultData> res.json())
    .then(data => {return data})
  }
}
