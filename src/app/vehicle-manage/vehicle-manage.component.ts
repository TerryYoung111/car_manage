import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vehicle-manage',
  templateUrl: './vehicle-manage.component.html',
  styleUrls: ['./vehicle-manage.component.css']
})
export class VehicleManageComponent implements OnInit {
  menuActive:string;
  constructor(private router:Router) { }

  ngOnInit() {
    this.menuActive = this.router.url.split('/')[3];
  }

}
