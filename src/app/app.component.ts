import {Component} from '@angular/core';
import {ImageService} from './image.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DemoXRayWeb2';

  constructor(public imageService: ImageService) {
  }
}
