import { Injectable } from '@angular/core';
import { HttpClient,  } from '@angular/common/http';
import { catchError, switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs';

const TOKEN = "2020"
const URL = "http://coop.renix.net"

const USER = "COOP_2020";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  options = {
    headers: {
      'Authorization': 'Bearer ' + TOKEN
    }
  }

  constructor(private httpClient: HttpClient) { }

  public help() {
    return this.httpClient.get(URL + "/help", this.options)
      .pipe(catchError(e => of({ error: "Error" })))
  }

  public hint() {
    return this.httpClient.get(URL + "/hint", this.options)
      .pipe(catchError(e => of({ error: "Error" })))
  }

  public send(res) {

    const cpt = this.httpClient.get("assets/app.component.html", { responseType: "text" })
    const html = this.httpClient.get("assets/app.component.ts", { responseType: "text" })

    cpt.pipe(switchMap(cptT => res.pipe(switchMap(num => html.pipe(map(htmlT => { return { cpt: cptT, html: htmlT, score:num } }))))))
      .subscribe(o => {
        this.httpClient.post(URL + "/score", { data:o, user:USER }, this.options).subscribe();
      })
  }

}

