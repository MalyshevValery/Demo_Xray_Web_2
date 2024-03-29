import {BehaviorSubject, Subject} from 'rxjs';

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

export const names = {
  bronchitis: 'Bronchitis',
  class_number: 'Abnormal lungs',
  // emphysema: 'Emphysema',
  focal_shadows: 'Focal shadows',
  pneumonia: 'Pneumonia',
  // pneumosclerosis: 'Pneumosclerosis',
  tuberculosis: 'Tuberculosis'
};

export interface Image {
  file: File;
  imageURL: string;
  filename: string;
  loaded: boolean;
  $analysisResults: Subject<AnalysisResults>;
  error?: string;
}

export interface ResponseImage {
  base64: string;
  name: string;
}

export const emptyImage: Image = {
  file: null,
  imageURL: null,
  filename: null,
  loaded: true,
  $analysisResults: new BehaviorSubject<AnalysisResults>(null)
};
