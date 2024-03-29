import 'zone.js';

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {
  MatButtonModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatGridListModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';

import {ImageBrowserComponent} from './image-browser/image-browser.component';
import {ImageAnalyseComponent} from './image-analyse/image-analyse.component';
import {HttpClientModule} from '@angular/common/http';
import {ScoreComponent} from './image-analyse/score/score.component';
import {InputDialogComponent} from './image-browser/input-dialog/input-dialog.component';
import {FormsModule} from '@angular/forms';
import {DicomViewerModule} from 'ng-dicomviewer';
import { ImageExamplesComponent } from './image-browser/image-examples/image-examples.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageBrowserComponent,
    ImageAnalyseComponent,
    ScoreComponent,
    InputDialogComponent,
    ImageExamplesComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatToolbarModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    DicomViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InputDialogComponent]
})
export class AppModule { }
