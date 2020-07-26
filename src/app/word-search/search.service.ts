import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) {}

  getDictionary(): Observable<string[]> {
    return this.http
      .get('../../assets/words_dictionary.json')
      .pipe(map((result) => Object.keys(result)));
  }
}
