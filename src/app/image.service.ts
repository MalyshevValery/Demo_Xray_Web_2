import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject, Subject} from 'rxjs';
import {AnalysisResults, Image} from './types';
import {map, tap} from 'rxjs/operators';
import * as JSZip from 'jszip';
import * as uuid from 'uuid';

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

  addFile(file: File) {
    if (file.name.endsWith('dcm') || file.name.endsWith('dicom') || file.name.endsWith('bin')) {
      this.add(file, 'https://via.placeholder.com/256x256?text=DICOM', file.name);
    } else if (file.name.endsWith('eli')) {
      this.add(file, 'https://via.placeholder.com/256x256?text=ELI', file.name);
    } else {
      this.add(file, URL.createObjectURL(file), file.name);
    }
  }

  addURL(url: string) {
    this.add(null, url, uuid.v4() + '.png');
  }

  analyze(image: Image): Observable<AnalysisResults> {
    const formData = new FormData();
    if (image.file) {
      formData.append('image', image.file);
    } else {
      formData.append('image', image.imageURL);
    }
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

  reset() {
    this.images = [];
    this.$selected.next(null);
    this.zip = new JSZip();
    this.nReady = 0;
  }

  select(image: Image) {
    this.$selected.next(image);
  }

  private add(file: File, imageURL: string, filename: string) {
    const image: Image = {
      file,
      imageURL,
      filename,
      loaded: false,
      $analysisResults: new ReplaySubject<AnalysisResults>()
    };
    this.analyze(image).pipe(
      tap(result => {
        image.loaded = true;
        if (result.error) {
          image.error = result.error;
          console.log(result.error);
        }
        this.nReady += 1;
      }),
    ).subscribe(image.$analysisResults);
    this.images.push(image);
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
