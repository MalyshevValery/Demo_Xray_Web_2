import {Observable, Subject} from 'rxjs';

export class AnalysisResults {
  data:
    {
      bronchitis: number,
      class_number: number,
      emphysema: number,
      focal_shadows: number,
      pneumonia: number,
      pneumosclerosis: number,
      tuberculosis: number
    };
  error: string = null;
  norm: string;
  proc: string;
}

export class Image {
  file: File;
  imageURL: string;
  filename: string;

  $analysisResults: Observable<AnalysisResults>;

  constructor(file: File) {
    this.file = file;
    this.imageURL = URL.createObjectURL(this.file);
    this.filename = file.name;
    this.$analysisResults = new Subject<AnalysisResults>();
  }
}
