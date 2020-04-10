import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {AnalysisResults, Image} from './types';
import {map, tap} from 'rxjs/operators';
import * as JSZip from 'jszip';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public images: Image[] = [];
  public $selected: Subject<Image> = new Subject<Image>();
  public zip: JSZip = new JSZip();
  public nReady = 0;

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
      tap(() => {
        image.loaded = true;
        this.nReady += 1;
      }),
    ).subscribe(image.$analysisResults);
    this.images.push(image);
  }

  reset() {
    this.images = [];
    this.$selected.next(null);
    this.zip = new JSZip();
    this.nReady = 0;
  }

  select(image: Image) {
    this.$selected.next(image);
  }

  analyze(image: Image): Observable<AnalysisResults> {
    const formData = new FormData();
    formData.append('image', image.file);
    formData.append('filename', image.filename);
    return this.http.post<AnalysisResults>(environment.apiURL, formData).pipe(
      tap(result => {
        this.zip.file(image.filename + '-norm.png',
          result.norm, {base64: true});
        this.zip.file(image.filename + '-proc.png',
          result.proc, {base64: true});
        this.zip.file(image.filename + '-data.json',
          JSON.stringify(result.data, null, 2));
      }),
      map(result => ({
        data: result.data,
        error: result.error,
        norm: 'data:image/png;base64,' + result.norm,
        proc: 'data:image/png;base64,' + result.proc
      })),
    );
  }

  getZip() {
    this.zip.generateAsync({type: 'blob'}).then(
      blob => open(URL.createObjectURL(blob))
    );
  }

  isReady(): boolean {
    return this.nReady > 0 && this.nReady === this.images.length;
  }
}
