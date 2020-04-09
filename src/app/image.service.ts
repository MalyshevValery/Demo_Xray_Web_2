import {Injectable} from '@angular/core';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject, Subject} from 'rxjs';
import {AnalysisResults, Image} from './types';
import {last, share} from 'rxjs/operators';

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
      $analysisResults: new ReplaySubject<AnalysisResults>()
    };
    this.analyze(image).subscribe(image.$analysisResults);
    this.images.push(image);
  }

  reset() {
    this.images = [];
    this.$selected.next({
      file: null,
      imageURL: null,
      filename: null,
      $analysisResults: new BehaviorSubject<AnalysisResults>(null)
    });
  }

  select(image: Image) {
    this.$selected.next(image);
  }

  analyze(image: Image): Observable<AnalysisResults> {
    const formData = new FormData();
    formData.append('image', image.file);
    formData.append('filename', image.filename);
    return this.http.post<AnalysisResults>(environment.apiURL, formData).pipe(
      share(),
      last(),
    );
  }
}
