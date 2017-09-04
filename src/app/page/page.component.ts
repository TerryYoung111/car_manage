import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { Tools } from '../common/common';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css'],
  providers:[ DataServiceService,Tools ]
})
export class PageComponent implements OnInit {
  mowTime:string;
  routerActive:string;
  userInfo:any;
  privilegeInfo:any;
  constructor(private dataService:DataServiceService, private router:Router , private tools:Tools) { }

  ngOnInit() {
    this.routerActive = this.router.url.split('/')[2];
    setInterval(() => {
      this.mowTime = this.tools.getStrDate(true);
    }, 800);
    this.userInfo = {name:""};
    this.getLogininfo();
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
  getUserInfo(user_id){
    this.dataService.getUserInfo(user_id).then(res => {
      // console.log('用户信息',res)
      if (res.code == 0) {
        this.userInfo = res.data;
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
  logout(){
    this.dataService.logout().then(res => {
      // console.log(res);
      if (res.code == 0) {
          this.router.navigateByUrl('login');
      }else{
        alert(res.message);
      }
    })
  }
}
