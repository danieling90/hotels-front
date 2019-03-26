import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';

import * as hotelsActions from '../store/actions';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {

  hotels: any[];
  loading: boolean = false;
  error: any;
  allRows: number;
  paging = {
    Start: 1,
    End: 20
  }

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('hotels')
      .subscribe(hotels => {
        this.hotels = hotels.hotels;
        this.loading = hotels.loading;
        this.error = hotels.error;
        this.allRows = hotels.total
      });

    let data = {
      skip: 0,
      limit: 20
    }
    this.store.dispatch(new hotelsActions.LoadHotels(data));
  }

  changePager(action: string) {
    if (action === 'previous') {
      this.paging.Start = this.paging.Start - 20;
      this.paging.End = this.paging.End - 20;
    } else if (action === 'next') {
      this.paging.Start = this.paging.Start + 20;
      this.paging.End = this.paging.Start + 19;
    }

    this.store.select('filters').subscribe(filters => {
      let data = {
        skip: (this.paging.Start - 1),
        limit: 20,
        name: filters.name,
        stars: filters.stars
      };

      const action = new hotelsActions.LoadHotels(data);
      this.store.dispatch(action);
    })    
  }

}
