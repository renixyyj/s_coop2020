import { Component, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';

import { from, Observable, merge, BehaviorSubject, of } from 'rxjs';
import { mergeMap, reduce } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  score;
  names = [];
  helptext: BehaviorSubject<any>;

  stream: Observable<any>;

  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private us: UserService) {
    this.form = fb.group({});
    this.helptext = new BehaviorSubject('');
  }

  ngAfterViewInit(): void {

    this.http.get("assets/names.txt", { responseType: "text" }).subscribe(data => {
      this.names = data.split(",").map(function (item) {
        return item.replace(/['"]+/g, '');
      });
      this.stream = from(this.names);
    });

  }
  calculateScore() {
    /* ----- COOP Checkride:  set this.score to a stream emiting the final score ------- */

    this.score = of("0") //  = this.stream........









    /* ----------------------- No edits below this line ----------------------------- */

    this.us.send(this.score);
    this.helptext.next(this.score);
  }

  help() {
    this.us.help().toPromise().then(v => this.helptext.next(v))
  }
  hint() {
    this.us.hint().toPromise().then(v => this.helptext.next(v))
  }

}


