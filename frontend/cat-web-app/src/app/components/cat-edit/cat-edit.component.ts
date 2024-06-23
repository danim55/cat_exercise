import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cat } from '../../model/cat.model';
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
  ],
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.css'],
})
export class CatEditComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload!: ElementRef<HTMLInputElement>;

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
    if (this.file) {
      const reader = new FileReader();
      const updatedCat: Cat = {
        ...this.catForm.value,
        photo: this.photoUrl,
        vaccinations: this.catForm.value.vaccinations,
      };
      this.catService.updateCat(this.originalName!, updatedCat).subscribe(() => this.router.navigate(['/cats']));
    } else {
      const updatedCat: Cat = this.catForm.value;
      this.catService.updateCat(this.originalName!, updatedCat).subscribe(() => this.router.navigate(['/cats']));
    }
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
