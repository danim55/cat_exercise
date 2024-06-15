import { Routes } from '@angular/router';
import { CatDetailComponent } from './components/cat-detail/cat-detail.component';
import { CatEditComponent } from './components/cat-edit/cat-edit.component';
import { CatListComponent } from './components/cat-list/cat-list.component';
import { CatUploadComponent } from './components/cat-upload/cat-upload.component';

export const routes: Routes = [
    { path: '', redirectTo: '/cats', pathMatch: 'full' },
    { path: 'cats', component: CatListComponent },
    { path: 'cats/upload', component: CatUploadComponent },
    { path: 'cats/:name', component: CatDetailComponent },
    { path: 'cats/edit/:name', component: CatEditComponent }
];
