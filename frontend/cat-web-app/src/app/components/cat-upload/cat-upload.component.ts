import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Cat } from '../../model/cat.model';
import { CatService } from '../../services/cat-api.service';

@Component({
  selector: 'app-cat-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './cat-upload.component.html',
  styleUrls: ['./cat-upload.component.css']
})
export class CatUploadComponent {
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  public catForm: FormGroup;
  public file: File | null = null;

  constructor(
    private fb: FormBuilder,
    private catService: CatService,
    private router: Router
  ) {
    this.catForm = this.fb.group({
      name: ['', Validators.required],
      photo: ['', Validators.required],
      age: [, [Validators.required, Validators.min(1)]],
      breed: ['', Validators.required],
      vaccinations: this.fb.array([])
    });
  }

  get vaccinations(): FormArray {
    return this.catForm.get('vaccinations') as FormArray;
  }

  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      this.catForm.patchValue({ photo: this.file.name });
    }
  }

  addVaccination(): void {
    const vaccinationGroup = this.fb.group({
      type: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.vaccinations.push(vaccinationGroup);
  }

  removeVaccination(index: number): void {
    this.vaccinations?.removeAt(index);
  }

  uploadCat(): void {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const cat: Cat = {
          ...this.catForm.value,
          photo: e.target!.result as string,
          vaccinations: this.catForm.value.vaccinations
        };
        this.catService.createCat(cat).subscribe(() => this.router.navigate(['/cats']));
      };
      reader.readAsDataURL(this.file);
    } else {
      const cat: Cat = this.catForm.value;
      this.catService.createCat(cat).subscribe(() => this.router.navigate(['/cats']));
    }
  }

  /**
 * Method to remove the file at the specified index
 * @param index Index of the file to be removed from the list of Files to be uploaded
 */
  public removeFile(): void {
    this.file = null;
    // Reset file input value
    this.resetFileInput();
  }

  private resetFileInput(): void {
    if (this.fileUpload && this.fileUpload.nativeElement) {
      this.fileUpload.nativeElement.value = '';
    }
  }
}
