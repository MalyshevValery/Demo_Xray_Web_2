import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ImageService} from '../../image.service';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material';
import {ImageExamplesComponent} from '../image-examples/image-examples.component';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.css']
})
export class InputDialogComponent implements OnInit {
  @ViewChild('upload') fileUpload: ElementRef;
  public currentURL: string;

  constructor(private imageService: ImageService,
              private dialog: MatDialog,
              private dialogRef: MatDialogRef<InputDialogComponent>) {
  }

  ngOnInit(): void {
  }

  onUpload(): void {
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {
      for (const file of fileUpload.files) {
        this.imageService.addFile(file);
      }
    };
    fileUpload.click();
    this.dialogRef.close();
  }

  onURLSubmit(): void {
    this.imageService.addURL(this.currentURL);
    this.dialogRef.close();
  }

  onSelect(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight = '90vh';
    dialogConfig.minWidth = '90vw';
    dialogConfig.maxHeight = '90vh';
    dialogConfig.maxWidth = '90vw';

    this.dialog.open(ImageExamplesComponent, dialogConfig);
    this.dialogRef.close();
  }
}
