import { Component, OnInit } from '@angular/core';
import { UsersService } from './../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addquestion',
  templateUrl: './addquestion.component.html',
  styleUrls: ['./addquestion.component.css']
})
export class AddquestionComponent implements OnInit {
  currentuser;
  activeuser;
  new_question = {
    prompt: "",
    correct: "",
    false1: "",
    false2: "",
  }

  constructor(private _service: UsersService, private _router: Router) { }

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

  submitquestion() {
    this._service.addnewquestion(this.new_question, () => {
      this.new_question = {
        prompt: "",
        correct: "",
        false1: "",
        false2: "",
      }
      this._service.router.navigate(['dashboard'])
    })
  }

  goback() {
    this._service.router.navigate(["dashboard"])
  }

}
