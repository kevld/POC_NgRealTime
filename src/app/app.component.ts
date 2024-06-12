import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagesComponent } from "./component/messages/messages.component";
import { RandomStringComponent } from "./component/random-string/random-string.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MessagesComponent, RandomStringComponent]
})
export class AppComponent {
  title = 'POC_NgRealTime';
}
