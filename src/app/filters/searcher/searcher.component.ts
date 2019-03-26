import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as hotelsActions from '../../store/actions';
import * as filtersActions from '../../store/actions';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {
  public name: string = "";
  public showPanel: boolean = true;

  constructor(private store: Store<AppState>) {
    this.store.select('filters').subscribe(filters => {
      this.name = filters.name;
    })
  }

  ngOnInit() {

  }

  filter() {
    const action = new filtersActions.UpdateFilter({ option: 'name', value: this.name });
    this.store.dispatch(action);

    this.store.select('filters').subscribe(filters => {
      let data = {
        skip: 0,
        limit: 20,
        name: filters.name,
        stars: filters.stars
      };
      const action = new hotelsActions.LoadHotels(data);
      this.store.dispatch(action);
    })
  }

}
