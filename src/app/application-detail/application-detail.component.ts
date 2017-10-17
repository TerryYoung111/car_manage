import { Component, OnInit,Input,ViewChild,ElementRef } from '@angular/core';
import { DataServiceService } from '../data-service.service';
@Component({
  selector: 'app-application-detail',
  templateUrl: './application-detail.component.html',
  styleUrls: ['./application-detail.component.css']
})
export class ApplicationDetailComponent implements OnInit {
  title:string;
  planDisplay:boolean = false;
  detailform:any;
  @Input() carsCanapply;
  constructor(private dataService:DataServiceService) { }
  @ViewChild("printform") printform:ElementRef;
  ngOnInit() {
    this.detailform = {
      application_user_id:"",
      car_id:'',
      start_city:'',
      end_city:'',
      startDate:'',
      callbackDate:'',
      apply_for:'',
      check_user_id:'',
      check_info:{1:{}}
    }
  }
  type:string;
  dialog(car_application_id,type,title){
    this.title = title;
    this.type = type;
    this.planDisplay = true;
    this.applicationDetail(car_application_id);
  }
  applicationDetail(car_application_id){
    this.planDisplay = true;
    this.dataService.applicationDetail(car_application_id).then(res => {
      console.log(res.data);
      if (res.code == 0) {
          this.detailform = res.data;
      }else{
        alert(res.message);
      }

    })
  }
  printDetail(){
    let style = `
      <style>
        h3{
          width: 600px;
          margin: auto;
          text-align: center;
          margin-bottom: 5px;
          padding-bottom: 10px;
          border-bottom: 2px solid #000;
        }
        .detailform{
          width: 600px;
          padding-left: 50px;
          margin: auto;
        }
        div.input-box{
          margin: 10px 0;
          overflow: hidden;
        }
        div.input-box p{
          float: left;
        }
        div.input-box p label{
          display: inline-block;
          width: 90px;
        }
        div.input-box p span{
          display: inline-block;
          width: 180px;
        }
        div.input-box p.check_user span{
          display: inline;
        }
        div.input-box p.text-area{
          width: 100%;
        }

      </style>
    `;
    let content = `<h3>派车单详情</h3><div class="detailform">${this.printform.nativeElement.innerHTML}</div>`;
    let html = `<html><head><title>打印派车单</title>${style}</head><body>${content}</body></html>`;
    let w = window.open("","_blank","k");
    w.document.write(html);
    if (navigator.appName == 'Microsoft Internet Explorer') {
      window.print();
    }else{
      w.print();
    }
  }

}
