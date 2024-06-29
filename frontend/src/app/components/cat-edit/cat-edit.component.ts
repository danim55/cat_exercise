import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Vaccination } from '../../model/vaccination.model';
import { CatService } from '../../services/cat-api.service';

@Component({
  selector: 'app-cat-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }
  ],
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.css'],
})
export class CatEditComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

  private UTC_OFFSET: number = 18000000;

  public catForm: FormGroup;
  public file: File | null = null;
  private originalName: string | undefined;
  public photoUrl: string | undefined

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private catService: CatService,
    private router: Router
  ) {
    this.catForm = this.fb.group({
      name: ['', Validators.required],
      photo: ['', Validators.required],
      age: [, [Validators.required, Validators.min(1)]],
      breed: ['', Validators.required],
      vaccinations: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.catService.getCat(name).subscribe((cat) => {
      this.originalName = cat.name;
      this.catForm.patchValue(cat);
      cat.vaccinations.forEach((vaccination) => this.addVaccination(vaccination));
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

  addVaccination(vaccination?: Vaccination): void {
    const vaccinationGroup = this.fb.group({
      type: [vaccination ? vaccination.type : '', Validators.required],
      date: [vaccination ? vaccination.date : '', Validators.required],
    });
    this.vaccinations.push(vaccinationGroup);
  }

  removeVaccination(index: number): void {
    this.vaccinations?.removeAt(index);
  }

  saveCat(): void {
    const updatedCat = {
      ...this.catForm.value,
      photo: this.photoUrl ? this.photoUrl : this.catForm.get('photo')?.value,
      vaccinations: this.catForm.value.vaccinations.map((vaccination: Vaccination) => ({
        type: vaccination.type,
        date: vaccination.date.getTime() + this.UTC_OFFSET,
      })),
    };

    this.catService.updateCat(this.originalName!, updatedCat).subscribe(() => this.router.navigate(['/cats']));
  }

  public removeFile(): void {
    this.file = null;
    this.resetFileInput();
  }

  private resetFileInput(): void {
    if (this.fileUpload && this.fileUpload.nativeElement) {
      this.fileUpload.nativeElement.value = '';
    }
  }
}
