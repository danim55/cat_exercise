import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatUploadComponent } from './cat-upload.component';

describe('CatUploadComponent', () => {
  let component: CatUploadComponent;
  let fixture: ComponentFixture<CatUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
