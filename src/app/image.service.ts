import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {AnalysisResults, emptyImage, Image} from './types';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public images: Image[] = [];
  public $selected: Subject<Image> = new Subject<Image>();

  constructor(private http: HttpClient) {
  }

  add(file: File) {
    const image: Image = {
      file,
      imageURL: URL.createObjectURL(file),
      filename: file.name,
      loaded: false,
      $analysisResults: new ReplaySubject<AnalysisResults>()
    };
    this.analyze(image).pipe(
      tap(() => image.loaded = true)
    ).subscribe(image.$analysisResults);
    this.images.push(image);
  }

  reset() {
    this.images = [];
    this.$selected.next(emptyImage);
  }

  select(image: Image) {
    this.$selected.next(image);
  }

  analyze(image: Image): Observable<AnalysisResults> {
    const formData = new FormData();
    formData.append('image', image.file);
    formData.append('filename', image.filename);
    return this.http.post<AnalysisResults>(environment.apiURL, formData).pipe(
      map(results => ({
        data: results.data,
        error: results.error,
        norm: 'data:image/png;base64,' + results.norm,
        proc: 'data:image/png;base64,' + results.proc
      })),
    );
  }
}
