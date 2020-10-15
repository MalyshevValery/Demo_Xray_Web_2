import {Component, OnDestroy, OnInit} from '@angular/core';
import {ImageService} from '../../image.service';
import {MatDialogRef} from '@angular/material';
import {ConnectableObservable, from, Observable, Subject} from 'rxjs';
import {ResponseImage} from '../../types';
import {HttpClient} from '@angular/common/http';
import {concatMap, map, mergeMap, multicast} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-image-examples',
  templateUrl: './image-examples.component.html',
  styleUrls: ['./image-examples.component.css']
})
export class ImageExamplesComponent implements OnInit, OnDestroy {

  public images: ResponseImage[] = [];
  private closed = false;

  constructor(public imageService: ImageService,
              private http: HttpClient,
              public dialogRef: MatDialogRef<ImageExamplesComponent>) {
  }

  ngOnInit(): void {
    this._getPreviewsForFolder().subscribe(
      children => this._dirAddChildren(children)
    );
  }

  ngOnDestroy(): void {
    this.closed = true;
  }

  select(image: ResponseImage) {
    this.imageService.addURL(image.base64, image.name);
  }

  _dirAddChildren(newImage: ResponseImage) {
    this.images.push(newImage);
  }

  _getPreviewsForFolder(): Observable<ResponseImage> {
    const items = this.http.get<string[]>(`${environment.apiURL}/examples`).pipe(
      mergeMap(its => from(its)),
      multicast(() => new Subject<string>()),
    ) as ConnectableObservable<string>;
    items.connect();

    return items.pipe(
      concatMap(img => this._getPreview(img)),
    );
  }

  _getPreview(file: string): Observable<ResponseImage> {
    if (this.closed) {
      return null;
    }
    return this.http.get<ResponseImage>(`${environment.apiURL}/examples/${file}`).pipe(
      map(resp => ({
        name: resp.name,
        base64: 'data:image/png;base64,' + resp.base64
      })),
    );
  }
}
