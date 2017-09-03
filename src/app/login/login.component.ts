import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [DataServiceService]
})
export class LoginComponent implements OnInit {
  idCard:number;
  constructor(private router:Router,private dataService:DataServiceService) { }

  ngOnInit() {
  }
  // login(){
  //   let options = {"id_card":this.idCard}
  //   this.dataService.login(options).then(res => {
  //     console.log(res);
  //     if (res.code == 0) {
  //       this.router.navigateByUrl('/home');
  //     }else{
  //       alert(res.message);
  //     }
  //   })
  // }
  loginGet(){
    this.dataService.loginGet(this.idCard).then(res => {
      console.log(res)
      if (res.code == 0) {
        this.router.navigateByUrl('/home');
      }else{
        alert(res.message)
      }
    })
  }

  mainPage(){
    this.router.navigateByUrl('/page');
  }
}
