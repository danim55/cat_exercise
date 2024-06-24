import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Cat } from '../../model/cat.model';
import { CatService } from '../../services/cat-api.service';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-cat-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent implements OnInit {
  public cat: Cat | undefined;
  public favoriteCount = 0;

  constructor(
    private route: ActivatedRoute,
    private catService: CatService,
    private favoriteService: FavoriteService
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.catService.getCat(name)
      .subscribe(cat => {
        this.cat = cat;
      }
      );
  }

  toggleFavorite(catName: string): void {
    if (this.favoriteService.isFavorite(catName)) {
      this.favoriteService.removeFromFavorites(catName);
    } else {
      this.favoriteService.addToFavorites(catName);
    }
    this.favoriteCount = this.favoriteService.getFavorites().length;
  }

  isFavorite(catName: string): boolean {
    return this.favoriteService.isFavorite(catName);
  }
}
