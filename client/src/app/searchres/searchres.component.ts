import { Component, OnInit } from '@angular/core';
import { UsersService } from './../users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-searchres',
  templateUrl: './searchres.component.html',
  styleUrls: ['./searchres.component.css']
})
export class SearchresComponent implements OnInit {
  currentuser;
  activeuser;
  games;

  constructor(private _service: UsersService, private _router:Router) {
    this._service.searchres.subscribe(
      (games) => {
        this.games = games;
      }

    )

  }
  checksession(callback) {
    this._service.checksess(() => {
      this.currentuser = this._service.activeuser
      callback(this._service.activeuser)
    })
  }

  ngOnInit() {
    this.activeuser = this._service.activeuser
    this.checksession((res) => {
      if (!res) {
        this._router.navigate(["/"])
      }
    })
  }

  goback() {
    this._service.router.navigate(["dashboard"])
  }

}
