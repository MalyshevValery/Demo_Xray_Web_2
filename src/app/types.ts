import {Subject} from 'rxjs';

export interface AnalysisResults {
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
  error: string;
  norm: string;
  proc: string;
}

export interface Image {
  file: File;
  imageURL: string;
  filename: string;
  $analysisResults: Subject<AnalysisResults>;
}
