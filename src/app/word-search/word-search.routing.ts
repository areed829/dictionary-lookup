import { Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';

export const wordSearchRoutes: Routes = [
  {
    path: '',
    redirectTo: 'word-search',
  },
  {
    path: 'word-search',
    component: SearchComponent,
  },
];
