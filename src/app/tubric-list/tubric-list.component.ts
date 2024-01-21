import { Component, ViewChild } from '@angular/core';
import { TubricService } from '../tubric.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
export interface Dessert {
  chirpiness: number;
  friends: number;
  influence: number;
  total: number;
}

@Component({
  selector: 'app-tubric-list',
  templateUrl: './tubric-list.component.html',
  styleUrls: ['./tubric-list.component.css']
})
export class TubricListComponent  {
 

  tubricData: any[]=[]
  twubricData:Dessert[] = []
  constructor(private service: TubricService){}


  data: any[] = [];
  tableColumns: string[] = ['name', 'author', 'year'];
  resultsLength = 0;
  pagesize = 10;

  @ViewChild(MatSort, { static: false })
  sort!: MatSort;
  @ViewChild(MatPaginator,{ static: false })
  paginator!: MatPaginator;
  

 
  refresh(options: any) {
    this.service.findBooks(options).subscribe((result: any) => {
      this.resultsLength = result.total;
      this.data = this.twubricData;
    });
  }

  ngOnInit() {
     this.getApiData()
   

  }

 


joinDate:any[] = []
joinEndDate:any[] = []
getApiData(){
  this.service.getTubricData().subscribe((data:any) => {
    console.log(data)
    this.tubricData = data
    // for(var i = 0;this.tubricData.length > i ; i++ ) {
    //   this.twubricData.push(this.tubricData[i].twubric); 
    // }
    this.tubricData.forEach(item => {
      this.twubricData.push(item.twubric)
      const date = new Date(item.join_date);
      this.joinDate.push({join_date: item.join_date, end_date: "N/A"})
      this.joinEndDate.push({join_date: item.join_date, end_date: "N/A"})
    })
    console.log(this.joinDate)
  })
}
sortData(sort: Sort) {
  const data = this.twubricData.slice();
  if (!sort.active || sort.direction === '') {
    this.twubricData = data;
    return;
  }

  this.twubricData = data.sort((a, b) => {
    const isAsc = sort.direction === 'asc';
    switch (sort.active) {
      case 'chirpiness':
        return this.compare(a.chirpiness, b.chirpiness, isAsc);
      case 'friends':
        return this.compare(a.friends, b.friends, isAsc);
      case 'influence':
        return this.compare(a.influence, b.influence, isAsc);
      case 'total':
        return this.compare(a.total, b.total, isAsc);
        
      default:
        return 0;
    }
  });
}
shortDate(sort: Sort){
console.log(sort);
// this.joinEndDate.sort((a,b) => a-b)
// console.log(this.joinEndDate);

const data = this.joinDate.slice();
if (!sort.active || sort.direction === '') {
  this.joinDate = data;
  return;
}

this.joinDate = data.sort((a, b) => {
  const isAsc = sort.direction === 'asc';
  switch (sort.active) {
    case 'join_date':
      return this.compare(a.join_date, b.join_date, isAsc);
    case 'end_date':
      return this.compare(a.end_date, b.end_date, isAsc);
      
    default:
      return 0;
  }
});

}


 compare(a: number | string, b: number | string, isAsc: boolean) {
return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
}


