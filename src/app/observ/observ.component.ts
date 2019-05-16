import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-observ',
  template: `<div><code>observable|async</code>:
       Time: {{ time | async }}</div>`
})
export class ObservComponent {

  //time = new Observable(observer =>
  //  setInterval(() => observer.next(new Date().toString()), 1000)
  //);

}
