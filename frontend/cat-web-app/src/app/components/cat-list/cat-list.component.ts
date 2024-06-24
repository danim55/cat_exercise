import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Cat } from '../../model/cat.model';
import { CatService } from '../../services/cat-api.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.css',
})
export class CatListComponent implements OnInit {
  cats: Cat[] = [];

  constructor(
    private catService: CatService,
    private favoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.loadCats();
  }

  loadCats(): void {
    this.catService.getCats().subscribe(cats => this.cats = cats);
  }

  isFavorite(catName: string): boolean {
    return this.favoriteService.isFavorite(catName);
  }

  deleteCat(name: string): void {
    this.catService.deleteCat(name).subscribe(() => this.loadCats());
  }
}
