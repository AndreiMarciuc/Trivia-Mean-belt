import { Component, OnInit } from '@angular/core';
import { UsersService } from './../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  activeuser;
  currentuser;
  games;
  searchtxt;
  lastgame;


  constructor(private _service: UsersService, private _router: Router) {
    this.activeuser = _service.activeuser;
    this._service.games.subscribe(
      (games) => {
        this.games = games;
      }
    )
    this.searchtxt = "";
    this._service.lastgame.subscribe(
      (game) => {
        this.lastgame = game;
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

  viewaddquestion() {
    this._service.lastgame.next({})
    this._service.viewaddquestion()
  }

  makegame() {
    this._service.makegame((res) => {
      this._service.router.navigate(["play"])
    })
  }

  getgames() {
    this._service.getallgames(
      (games) => {
      }
    )
  }

  search() {
    this._service.searchgames(this.searchtxt, () => {
      this.searchtxt = "";
      this._service.lastgame.next({})

    })
  }

  logout() {
    this._service.logout(() => {
      this._router.navigate(["/"])
    })
  }
}
