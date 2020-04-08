export class Image {
  file: File;
  imageURL: string;

  constructor(file: File) {
    this.file = file;
    this.imageURL = URL.createObjectURL(this.file);
  }
}
