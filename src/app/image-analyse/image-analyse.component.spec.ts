import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAnalyseComponent } from './image-analyse.component';

describe('ImageAnalyseComponent', () => {
  let component: ImageAnalyseComponent;
  let fixture: ComponentFixture<ImageAnalyseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageAnalyseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAnalyseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
