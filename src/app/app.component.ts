import { Component } from '@angular/core';
import { Notification } from './shared/notification.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TCS-TICKETLOG-FRONT';
  notification = new Notification;
}
