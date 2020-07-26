import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import { wordSearchRoutes } from './word-search.routing';
import { SearchComponent } from './search/search.component';
import { SearchService } from './search.service';
import { WordListComponent } from './word-list/word-list.component';

@NgModule({
  declarations: [SearchComponent, WordListComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(wordSearchRoutes),
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
  ],
  providers: [SearchService],
})
export class WordSearchModule {}
