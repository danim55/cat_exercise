import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { Vaccination } from '../../model/vaccination.model';
import { CatService } from '../../services/cat-api.service';

@Component({
  selector: 'app-cat-upload',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterModule, MatDatepickerModule, MatMomentDateModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true }, }
  ],
  templateUrl: './cat-upload.component.html',
  styleUrls: ['./cat-upload.component.css']
})
export class CatUploadComponent {
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  public catForm: FormGroup;
  public file: File | null = null;
  public photoUrl: string | undefined;

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
      const reader = new FileReader();
      reader.onload = (e) => {
        this.photoUrl = e.target!.result as string;
      };
      reader.readAsDataURL(this.file);
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
    console.log(this.catForm.value.vaccination)
    const cat = {
      ...this.catForm.value,
      photo: this.photoUrl,
      vaccinations: this.catForm.value.vaccinations.map((vaccination: Vaccination) => ({
        type: vaccination.type,
        date: new Date(vaccination.date).toISOString().split('T')[0],
      })),
    };
    console.log(cat);
    this.catService.createCat(cat).subscribe(() => this.router.navigate(['/cats']));
  }

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
