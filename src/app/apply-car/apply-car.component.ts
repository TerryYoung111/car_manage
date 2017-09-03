import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
@Component({
  selector: 'app-apply-car',
  templateUrl: './apply-car.component.html',
  styleUrls: ['./apply-car.component.css'],
  providers: [DataServiceService]
})
export class ApplyCarComponent implements OnInit {
  menuActive:string;

  constructor(private router:Router,private dataService:DataServiceService) { }

  ngOnInit() {
    this.menuActive = this.router.url.split('/')[3];

  }

}
