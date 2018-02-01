import { Component, OnInit } from '@angular/core';
import { UsersService } from './../users.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-playgame',
  templateUrl: './playgame.component.html',
  styleUrls: ['./playgame.component.css']
})
export class PlaygameComponent implements OnInit {
  currentuser;
  activeuser;
  questions = [];
  quiz = {
    question1: "",
    question2: "",
    question3: "",
  }
  errors = []
  constructor(private _service: UsersService, private _router: Router) {
    this.activeuser = _service.activeuser;
  }
  checksession(callback) {
    this._service.checksess(() => {
      this.currentuser = this._service.activeuser
      callback(this._service.activeuser)
    })
  }

  ngOnInit() {
    this._service.makegame(() => {
      this._service.game.subscribe((res) => {
        this.questions = res;
      })
    })

    this.activeuser = this._service.activeuser
    this.checksession((res) => {
      if (!res) {
        this._router.navigate(["/"])
      }
    })

  }

  submitgame() {
    var qs = this.quiz
    var check = true
    var errors = []
    if (qs.question1 == "") {
      errors.push("First question must be answered !")
    }
    if (qs.question2 == "") {
      errors.push("Second question must be answered !")
    }
    if (qs.question3 == "") {
      errors.push("Third question must be answered !")
    }
    if (errors.length > 0) {
      this.errors = errors
    } else {
      var score = 0
      if (qs.question1 == this.questions[0].correct) {
        score++
      }
      if (qs.question2 == this.questions[1].correct) {
        score++
      }
      if (qs.question3 == this.questions[2].correct) {
        score++;
      }
      this._service.checksess(
        (res) => {
          this._service.activeuser = res
          var result = {
            user: res.username,
            score: score,
            percentage: score / 3 * 100,
          }
          this._service.postgame(result,
            (res) => {
              this._service.getallgames((games) => {
                this._service.games.next(games)
                this._router.navigate(["dashboard"])
              })
            }
          )
        }
      )
    }
  }
  goback() {
    this._service.router.navigate(["dashboard"])
  }
}
