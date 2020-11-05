import {Component, OnInit} from '@angular/core';
import {ImageService} from './image.service';
import {environment} from '../environments/environment';
import {Session} from '@oryd/kratos-client';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DemoXRayWeb2';
  identity$ = new BehaviorSubject<Session>(null);

  constructor(public imageService: ImageService, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<Session>(`${environment.kratosUrl}/sessions/whoami`, {withCredentials: true})
      .subscribe(sess => this.identity$.next(sess));
  }

  login() {
    window.location.href = `${environment.kratosUrl}/self-service/login/browser?return_to=${window.location.href}`;
  }

  logout() {
    window.location.href = `${environment.kratosUrl}/self-service/browser/flows/logout?return_to=${window.location.href}`;
  }
}
