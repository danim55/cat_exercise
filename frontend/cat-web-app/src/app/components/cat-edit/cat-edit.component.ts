import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Cat } from '../../model/cat.model';
import { CatService } from '../../services/cat-api.service';

@Component({
  selector: 'app-cat-edit',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.css']
})
export class CatEditComponent implements OnInit {
  cat: Cat = { name: '', age: 0, breed: '', vaccinations: [], photo: '' };

  constructor(
    private route: ActivatedRoute,
    private catService: CatService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.catService.getCat(name).subscribe(cat => this.cat = cat);
  }

  saveCat(): void {
    this.catService.updateCat(this.cat.name, this.cat).subscribe(() => this.router.navigate(['/cats']));
  }
}
