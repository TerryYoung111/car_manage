import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { Tools } from '../common/common';
import { OverlayPanel } from 'primeng/primeng';
@Component({
  selector: 'app-vehiclean-alysis',
  templateUrl: './vehiclean-alysis.component.html',
  styleUrls: ['./vehiclean-alysis.component.css'],
  providers:[DataServiceService,Tools]
})
export class VehicleanAlysisComponent implements OnInit {
  public cn:any;
  startDate:Date = new Date();
  endDate:Date = new Date();

  dateArr:any[];
  analysislist:any[];
  grouplist:any[];
  carlist:any[];
  group_id:number = 0;
  car_id:number = 0;
  constructor(private dataService :DataServiceService , private tools:Tools) { }

  ngOnInit() {
    this.startDate.setHours(0);
    this.startDate.setMinutes(0);
    this.startDate.setSeconds(0);
    this.endDate.setHours(23);
    this.endDate.setMinutes(59);
    this.endDate.setSeconds(59);
    this.cn = this.dataService.dataFormat;
    this.getCondition();
    this.searchAnalysis();
  }
  //搜索条件
  getCondition(){
    this.dataService.analysisCondition(false).then(res => {
      // console.log('搜索条件',res);
      if (res.code == 0) {
          this.grouplist = res.data;
          this.getCarlist(0);
      }else{
        alert(res.message);
      }
    })
  }
  //车辆选择
  getCarlist(group_id){
    this.car_id = null;
    this.dataService.analysisCondition(group_id).then(res => {
      console.log('车辆列表',res);
      if (res.code == 0) {
          this.carlist = res.data;
          this.car_id = 0;
      }else{
        alert(res.message);
      }
    })
  }
  searchAnalysisButton(){
    this.cur_page = 1;
    this.searchAnalysis();
  }
  searchAnalysis(){
    let flag = false;
    this.startDate.setHours(0);
    this.startDate.setMinutes(0);
    this.startDate.setSeconds(0);
    this.endDate.setHours(23);
    this.endDate.setMinutes(59);
    this.endDate.setSeconds(59);
    let start_time = this.tools.getStrTime(this.startDate);
    let end_time = this.tools.getStrTime(this.endDate);
    if (this.startDate < this.endDate) {
      this.dataService.analysisSearch(this.group_id,this.car_id,start_time,end_time,this.cur_page).then(res => {
        if (res.code == 0) {
            this.getDay();
            this.analysislist = this.tools.mapObj(res.data.car_use_list);
            this.cur_page = res.data.cur_page;
            this.total_page = res.data.total_page;
        }else{
          alert(res.message);
        }
      })
    }else{
      alert("起始时间不能大于结束时间！");
    }
  }
  // 分页
  isActive:string;
  cur_page:number = 1;
  total_page:number;
  leftPage(){
    if (this.cur_page>1) {
        this.cur_page--;
        this.isActive = 'left';
        this.searchAnalysis();
    }
  }
  rightPage(){
    if (this.cur_page<this.total_page) {
      this.cur_page++;
      this.isActive = 'right';
      this.searchAnalysis();
    }
  }
  cheangePage(num){
    this.cur_page = num;
    this.searchAnalysis();
  }
  // deepCopy(source) {
  //   var result={};
  //   for (var key in source) {
  //        result[key] = typeof source[key]==='object'? this.deepCopy(source[key]): source[key];
  //     }
  //     return result;
  // }
  // 获取时间区间每一天
  getDay(){
    let startTime = new Date(this.startDate);
    let endTime = new Date(this.endDate);
    let dateArr = [];
    while((endTime.getTime()-startTime.getTime())>=0){
      let obj = {};
      let year = startTime.getFullYear();
      let month = (startTime.getMonth()+1).toString().length==1?"0"+(startTime.getMonth()+1).toString():startTime.getMonth()+1;
      let day = startTime.getDate().toString().length==1?"0"+startTime.getDate():startTime.getDate();
      let week;
      switch(startTime.getDay()){
        case 0 : week = "周日";break;
        case 1 : week = "周一";break;
        case 2 : week = "周二";break;
        case 3 : week = "周三";break;
        case 4 : week = "周四";break;
        case 5 : week = "周五";break;
        case 6 : week = "周六";break;
      };
      obj['date'] = year+"-"+month+"-"+day;
      obj['day'] = day;
      obj['week'] = week;
      dateArr.push(obj);
      obj=null;
      startTime.setDate(startTime.getDate()+1);
    }
    this.dateArr = dateArr;
  }

  //用车详情悬浮
  overlayShowNormal(data,day,event,overlay:OverlayPanel){
    // console.log(data)
    if (data.value.use_info.normal[day.date]) {
        this.applicationDetail(data.value.use_info.normal[day.date]);
        overlay.show(event);
    }
  }
  overlayShowTem(data,day,event,overlay:OverlayPanel){
    // console.log(data)
    if (data.value.use_info.temp[day.date]) {
      this.applicationDetail(data.value.use_info.temp[day.date]);
        overlay.show(event)
    }
  }
  overlayShowCritical(data,day,event,overlay:OverlayPanel){
    // console.log(data)
    if (data.value.use_info.critical[day.date]) {
      this.applicationDetail(data.value.use_info.critical[day.date]);
        overlay.show(event)
    }
  }
  detail_list:any[] = [];
  applicationDetail(arr){
    let detail_list = [];
    arr.map(value => {
      this.dataService.applicationDetail(value).then(res => {
        if (res.code == 0) {
            detail_list.push(res.data);
            this.detail_list = detail_list;
        }else{
          alert(res.message);
        }
      });
    });
  }
// 导出分析报表
  analysisDownload(){
    let flag = false;
    this.startDate.setHours(0);
    this.startDate.setMinutes(0);
    this.startDate.setSeconds(0);
    this.endDate.setHours(23);
    this.endDate.setMinutes(59);
    this.endDate.setSeconds(59);
    let start_time = this.tools.getStrTime(this.startDate);
    let end_time = this.tools.getStrTime(this.endDate);
    if (this.startDate < this.endDate) {
      let url = `${this.dataService.ip}/web_car/index.php/car/caranalysis/download?start_time=${start_time}&end_time=${end_time}&page=${this.cur_page}&page_size=5&group_id=${this.group_id}&car_id=${this.car_id}`;
      window.open(url)
    }else{
      alert("起始时间不能大于结束时间！");
    }
  }
}
