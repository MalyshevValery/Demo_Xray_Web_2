import {Component, OnInit} from '@angular/core';
import {ImageService} from '../image.service';
import {Observable} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';
import {Image, names} from '../types';

@Component({
  selector: 'app-image-analyse',
  templateUrl: './image-analyse.component.html',
  styleUrls: ['./image-analyse.component.scss']
})
export class ImageAnalyseComponent implements OnInit {
  public $image: Observable<Image>;

  constructor(private imageService: ImageService,
              public sanitizer: DomSanitizer) {
    this.$image = imageService.$selected;
  }

  ngOnInit() {
  }

  names() {
    return Object.keys(names);
  }

}
