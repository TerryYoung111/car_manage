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
  loginGet(){
    this.dataService.loginGet(this.idCard).then(res => {
      // console.log(res)
      if (res.code == 0) {
        this.router.navigateByUrl('/page');
      }else{
        alert(res.message)
      }
    })
  }
}
