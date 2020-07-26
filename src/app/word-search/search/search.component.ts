import { Component, OnInit } from '@angular/core';

import { Subject } from 'rxjs';
import { map, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';

import { SearchService } from '../search.service';

const groupWords = map<string[], any>((words) =>
  words.reduce((accumulator, currentValue) => {
    const startingCharacter = currentValue[0];
    accumulator[startingCharacter] = [
      ...(accumulator[startingCharacter] || []),
      currentValue,
    ];
    return accumulator;
  }, {})
);

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchCharacters$ = new Subject<string>();
  words$ = this.searchCharacters$.pipe(
    distinctUntilChanged(),
    switchMap((searchCharacters) =>
      this.searchService
        .getDictionary()
        .pipe(map((words) => this.filterWords(searchCharacters, words)))
    ),
    groupWords,
    tap(console.log)
  );

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    console.log('orecvt');
    this.words$.subscribe();
  }

  search(searchValue: string) {
    this.searchCharacters$.next(searchValue);
  }

  filterWords(possibleCharacters: string, words: string[]) {
    return words
      .filter(
        (word) => word.length >= 3 && word.length <= possibleCharacters.length
      )
      .filter((word) => {
        let valid = true;
        const characters = word.split('');
        let searchCharacters = [...possibleCharacters];
        characters.forEach((character) => {
          const index = searchCharacters.indexOf(character);
          if (index >= 0) {
            searchCharacters = searchCharacters.filter(
              (possibleCharacter, indx) => index !== indx
            );
          } else {
            valid = false;
          }
        });
        return valid;
      });
  }
}
