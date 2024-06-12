import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Cat } from '../../model/cat.model';
import { CatService } from '../../services/cat-api.service';

@Component({
  selector: 'app-cat-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cat-detail.component.html',
  styleUrls: ['./cat-detail.component.css']
})
export class CatDetailComponent implements OnInit {
  cat: Cat | undefined;

  constructor(
    private route: ActivatedRoute,
    private catService: CatService
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name')!;
    this.catService.getCat(name).subscribe(cat => this.cat = cat);
  }
}
