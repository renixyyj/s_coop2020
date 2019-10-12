import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';


@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html'
})
export class SharedComponent implements OnInit {

  @Input() navtype: String;
  @Input() nomessage: Boolean;
 
  constructor(private u: UserService) {
  
  }

  ngOnInit() {

  }

}

export enum NavType {
  Topnav,
  Footer
}