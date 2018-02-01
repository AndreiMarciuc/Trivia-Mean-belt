import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import{ FormsModule} from '@angular/forms';
import {UsersService} from"./users.service";
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentuser;
  
  constructor(private _service:UsersService, private _router:Router){
    this.currentuser=this._service.activeuser
  }

  

  ngOnInit(){

  }
}