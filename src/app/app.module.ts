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
  MatToolbarModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppComponent} from './app.component';

import {ImageBrowserComponent} from './image-browser/image-browser.component';
import {ImageAnalyseComponent} from './image-analyse/image-analyse.component';
import {HttpClientModule} from '@angular/common/http';
import {ScoreComponent} from './image-analyse/score/score.component';
import {InputDialogComponent} from './image-browser/input-dialog/input-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    ImageBrowserComponent,
    ImageAnalyseComponent,
    ScoreComponent,
    InputDialogComponent,
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
    MatProgressBarModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [InputDialogComponent]
})
export class AppModule { }
