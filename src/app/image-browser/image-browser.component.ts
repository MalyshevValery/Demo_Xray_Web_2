import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ImageService} from '../image.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {InputDialogComponent} from './input-dialog/input-dialog.component';

@Component({
  selector: 'app-image-browser',
  templateUrl: './image-browser.component.html',
  styleUrls: ['./image-browser.component.scss']
})


export class ImageBrowserComponent implements OnInit {
  readonly iconSize = 40;

  constructor(public imageService: ImageService,
              public sanitizer: DomSanitizer,
              private dialog: MatDialog) {
  }

  ngOnInit() {
  }

  onAddClick() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    this.dialog.open(InputDialogComponent, dialogConfig);
  }
}
