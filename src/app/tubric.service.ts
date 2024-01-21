import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TubricService {

  constructor(private http : HttpClient) { }
  getTubricData() : Observable<any>{
return this.http.get<any>(`https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e
313922a5ccce7f38e17f790ac/twubric.json`)
  }
  fakeDataLength = 5000;

  findBooks(options: any): Observable<any> {

    console.log('findBooks', options);
    let data = this.mockBooks(this.fakeDataLength);

    data = data.sort((a, b) => {
      const sortOrder = options.sortDirection === 'asc' ? -1 : 1;
      const valueA = a[options.sortField];
      const valueB = b[options.sortField];

      var result = (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
      return result * sortOrder;
    });

    const start = options.page * options.pageSize;
    const end = start + options.pageSize;
    data = data.slice(start, end);

    return of({
      items: data,
      total: this.fakeDataLength
    });
  }

  mockBooks(amount: number): any[] {
    let books = [];
    for (let i = 0; i < amount; i++) {
      books.push(this.generateBook(i + 1, this.randomYear()));
    }
    return books;
  }

  randomYear() {
    return Math.floor(Math.random() * 20) + 1990;
  }

  generateBook(position: number, year: number) {
    return <any>{
      name: "Book " + position,
      author: "Author " + position,
      year: year
    };
  }
}
