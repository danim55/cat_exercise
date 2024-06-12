import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Cat } from '../../model/cat.model';
import { CatService } from '../../services/cat-api.service';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.css',
})
export class CatListComponent implements OnInit {
  cats: Cat[] = [];

  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.loadCats();
  }

  loadCats(): void {
    this.catService.getCats().subscribe(cats => this.cats = cats);
  }

  deleteCat(name: string): void {
    this.catService.deleteCat(name).subscribe(() => this.loadCats());
  }
}
