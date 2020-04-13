import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImageService} from '../../image.service';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {
  @ViewChild('upload') fileUpload: ElementRef;

  constructor(private imageService: ImageService,
              private dialogRef: MatDialogRef<InputDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onUpload(): void {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (const file of fileUpload.files) {
        this.imageService.add(file);
      }
    };
    fileUpload.click();
    this.dialogRef.close();
  }

  onURLSubmit(): void {

  }
}
