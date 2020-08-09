import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.scss'],
})
export class WordListComponent implements OnInit {
  columns: string[];
  dataSource: any;
  @Input() set words(words: object) {
    if (!!!words) {
      return;
    }
    this.columns = Object.keys(words);
    this.dataSource = this.translateData(
      words,
      this.getLongestListNumber(words)
    );
  }

  constructor() {}

  ngOnInit() {}

  getLongestListNumber(words) {
    const keys = Object.keys(words);
    const lengths = keys.map((key) => words[key].length);
    return Math.max(...lengths);
  }

  translateData(words, maxLength) {
    const keys = Object.keys(words);
    let dataSet = [];
    for (let i = 0; i < maxLength; i++) {
      const row = {};
      keys.forEach((key) => (row[key] = words[key][i]));
      dataSet = [...dataSet, row];
    }
    return dataSet;
  }
}
