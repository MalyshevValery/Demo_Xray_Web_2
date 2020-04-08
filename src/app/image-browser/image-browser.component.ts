import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageService} from '../image.service';

@Component({
  selector: 'app-image-browser',
  templateUrl: './image-browser.component.html',
  styleUrls: ['./image-browser.component.css']
})


export class ImageBrowserComponent implements OnInit {

  @ViewChild('upload') fileUpload: ElementRef;

  constructor(public imageService: ImageService, public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  onAddClick() {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (const file of fileUpload.files) {
        this.imageService.add(file);
      }
    };
    fileUpload.click();
  }
}
