import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { Tools } from '../common/common';
@Component({
  selector: 'app-vehiclean-alysis',
  templateUrl: './vehiclean-alysis.component.html',
  styleUrls: ['./vehiclean-alysis.component.css'],
  providers:[DataServiceService,Tools]
})
export class VehicleanAlysisComponent implements OnInit {
  public cn:any;
  startDate:Date;
  endDate:Date;
  dateArr:any[];
  analysislist:any[];
  grouplist:any[];
  carlist:any[];
  group_id:string;
  car_id:string;
  constructor(private dataService :DataServiceService , private tools:Tools) { }

  ngOnInit() {
    this.cn = this.dataService.dataFormat;
    this.getCondition();
  }
  //搜索条件
  getCondition(){
    this.dataService.analysisCondition(false).then(res => {
      console.log('搜索条件',res);
      if (res.code == 0) {
          this.grouplist = res.data;
      }else{
        alert(res.message);
      }
    })
  }
  //车辆选择
  getCarlist(group_id){
    this.dataService.analysisCondition(group_id).then(res => {
      console.log('车辆列表',res);
      if (res.code == 0) {
          this.carlist = res.data;
      }else{
        alert(res.message);
      }
    })
  }
  searchAnalysis(){
    let start_time = this.tools.getStrTime(this.startDate);
    let end_time = this.tools.getStrTime(this.endDate);
    this.dataService.analysisSearch(this.group_id,this.car_id,start_time,end_time,this.cur_page).then(res => {
      if (res.code == 0) {
          this.getDay();
          this.analysislist = this.tools.mapObj(res.data.car_use_list);
          console.log(this.analysislist);
          this.cur_page = res.data.cur_page;
          this.total_page = res.data.total_page;
      }else{
        alert(res.message);
      }
    })

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
      console.log(this.cur_page)
    }
  }
  // 获取时间区间每一天
  getDay(){
    const startDate = this.startDate,endTime = this.endDate;
    let startTime = startDate;
    console.log(startTime,endTime);
    let dateArr = [];
    while((endTime.getTime()-startTime.getTime())>=0){
      console.log(this.startDate);
      // console.log(endTime.getTime()-startTime.getTime());
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
    startTime = startDate;
    console.log(dateArr);
    this.dateArr = dateArr;
    console.log(this.dateArr);
  }
}
