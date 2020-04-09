import {Injectable} from '@angular/core';
import {Image, AnalysisResults} from '../utility/image';
import {environment} from '../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public images: Image[] = [];
  public selected: Observable<Image> = new Observable<Image>();

  constructor(private http: HttpClient) {
  }

  add(file: File) {
    const image = new Image(file);
    this.images.push(image);
    image.$analysisResults = this.analyze(image);
    image.$analysisResults.subscribe((e) => console.log(e));
  }

  reset() {
    this.images = [];
  }

  analyze(image: Image): Observable<AnalysisResults> {
    const formData = new FormData();
    formData.append('image', image.file);
    formData.append('filename', image.filename);
    return this.http.post<AnalysisResults>(environment.apiURL, formData);
  }
}
