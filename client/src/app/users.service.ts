import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'Rxjs/behaviorsubject'
import { Router } from '@angular/router';

@Injectable()
export class UsersService {
  activeuser;
  users: BehaviorSubject<any[]> = new BehaviorSubject([]);
  questions: BehaviorSubject<any[]> = new BehaviorSubject([]);
  game: BehaviorSubject<any[]> = new BehaviorSubject([]);
  games: BehaviorSubject<any[]> = new BehaviorSubject([]);
  searchres: BehaviorSubject<any[]> = new BehaviorSubject([]);
  lastgame: BehaviorSubject<any> = new BehaviorSubject({});
  targetuser: Object;

  updateData(newData: any): void {
    this.users.next(newData);
  };

  constructor(private http: HttpClient, public router: Router) {
    this.targetuser = {};
    this.activeuser = {};
    this.getall((res) => {
      this.users.next(res);
    })
    this.getallquestions((res) => {
      this.questions.next(res)
    })
    this.getallgames((res) => {
      this.games.next(res)
    })
  }

  login(user, callback) {
    this.http.post('/login', user).subscribe(
      (response) => {
        this.activeuser = response
        this.getall(() => { })
        callback(response);
      }
    )
  };

  checksess(callback) {
    this.http.get("/session").subscribe(
      (response) => {
        this.activeuser = response
        callback(response);
      }
    )
  };

  logout(callback) {
    this.http.get("/clearsession").subscribe(
      (response) => {
        callback();
      }
    )
  }

  getall(callback) {
    this.http.get("/getusers").subscribe(
      (response) => {
        this.updateData(response)
        callback(response)
      }

    )

  };

  viewaddquestion() {
    this.router.navigate(["newquestion"])
  }

  addnewquestion(question, cb) {
    var finalq = {
      prompt: question.prompt,
      correct: question.correct,
      answers: [],
    }
    var tar = 0
    tar = (Math.floor(Math.random() * 3))
    var count = 0;
    for (let i = 0; i < 3; i++) {
      if (i == tar) {
        finalq.answers.push(question.correct)
      } else if (count == 0) {
        finalq.answers.push(question.false1)
        count++;
      } else {
        finalq.answers.push(question.false2)
      }
    }
    this.http.post("/addquestion", finalq).subscribe((res) => {
      this.getallquestions((res) => {
      })
    })
    cb()
  }
  getallquestions(cb) {
    this.http.get("/allquestions").subscribe(
      (questions) => {
        cb(questions)
      }
    )
  }

  makegame(cb) {
    this.getallquestions(() => {
      var questions = this.questions.getValue()
      var game = [];
      var tar = {};
      var tari = 0
      let check = false;
      var dquest = {
      }
      while (game.length < 3) {
        if (questions.length == 0) {
          game.push(dquest)
        }
        tari = Math.floor(Math.random() * questions.length)
        tar = questions[tari]
        questions[tari] = questions[questions.length - 1]
        questions.pop()
        game.push(tar)
      }

      this.game.next(game);
      this.getallquestions((res) => {
        this.questions.next(res)
        cb(game)
      })
    })
  };

  postgame(game, cb) {
    this.http.post("/postgame", game).subscribe(
      (result) => {
        this.lastgame.next(game)
        cb(result)
      }
    )
  }

  getallgames(cb) {
    this.http.get("/allgames").subscribe(
      (games) => {
        cb(games)
      }
    )
  }

  searchgames(txt, cb) {
    function charmatch(comp, string) {
      var current = 0;
      var check = false;
      for (let i = 0; i < string.length; i++) {
        current = 0
        while (string[current + i] == comp[current] && current < comp.length) {
          check = true
          current++;
        }
        if (check && current == comp.length) {
          return true
        }
      }
      return false
    }
    var arr = this.games.getValue()
    var ans = []
    for (let i = 0; i < arr.length; i++) {
      if (charmatch(txt, arr[i].user) || charmatch(txt, arr[i].score) || charmatch(txt, arr[i].percentage)) {
        ans.push(arr[i])
      }
    }
    this.searchres.next(ans)
    this.router.navigate(["search"])
    cb(ans)
  }
}
