import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Cat } from '../../model/cat.model';
import { CatService } from '../../services/cat-api.service';

@Component({
  selector: 'app-cat-upload',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cat-upload.component.html',
  styleUrls: ['./cat-upload.component.css']
})
export class CatUploadComponent {
  cat: Cat = { name: '', age: 0, breed: '', vaccinations: [], photo: '' };
  file: File | null = null;

  constructor(
    private catService: CatService,
    private router: Router
  ) { }

  handleFileInput(files: FileList | null): void {
    if (files) {
      this.file = files.item(0);
    }
  }

  uploadCat(): void {
    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.cat.photo = e.target!.result as string;
        this.catService.createCat(this.cat).subscribe(() => this.router.navigate(['/cats']));
      };
      reader.readAsDataURL(this.file);
    } else {
      this.catService.createCat(this.cat).subscribe(() => this.router.navigate(['/cats']));
    }
  }
}
