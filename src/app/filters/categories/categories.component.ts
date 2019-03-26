import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducer';
import * as filtersActions from '../../store/actions';
import * as hotelsActions from '../../store/actions';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public model = {
    allStars: false,
    fiveStar: false,
    fourStar: false,
    threeStar: false,
    twoStar: false,
    oneStar: false
  }
  public showPanel: boolean = true;

  constructor(private store: Store<AppState>) {
    this.store.select('filters').subscribe(filters => {
      this.model.allStars = filters.allStars;
      this.model.fiveStar = filters.fiveStar;
      this.model.fourStar = filters.fourStar;
      this.model.threeStar = filters.threeStar;
      this.model.twoStar = filters.twoStar;
      this.model.oneStar = filters.oneStar;
    })
  }

  ngOnInit() {
  }

  selectStar(option: string) {
    if (option !== 'allStars') {
      this.model.allStars = false;
      this.store.dispatch(new filtersActions.UpdateFilter({ option: 'allStars', value: false }));
    }else{
      this.model.oneStar = false;
      this.store.dispatch(new filtersActions.UpdateFilter({ option: 'oneStar', value: false }));

      this.model.twoStar = false;
      this.store.dispatch(new filtersActions.UpdateFilter({ option: 'twoStar', value: false }));

      this.model.threeStar = false;
      this.store.dispatch(new filtersActions.UpdateFilter({ option: 'threeStar', value: false }));

      this.model.fourStar = false;
      this.store.dispatch(new filtersActions.UpdateFilter({ option: 'fourStar', value: false }));

      this.model.fiveStar = false;
      this.store.dispatch(new filtersActions.UpdateFilter({ option: 'fiveStar', value: false }));
    }

    this.store.dispatch(new filtersActions.UpdateFilter({ option: option, value: this.model[option] }));

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
