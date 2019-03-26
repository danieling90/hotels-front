import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as hotelsActions from '../actions';
import { of, Observable } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { HotelService } from '../../services/hotel.service';

@Injectable()
export class HotelsEffects {

    constructor(
        private actions$: Actions,
        public hotelService: HotelService
    ) { }

    parseFilters(filters) {
        let filter = {
            skip: filters.skip,
            limit: filters.limit
        };

        if (filters.name !== undefined && filters.name.trim() !== '') {
            filter['name'] = filters.name.trim();
        }

        if (filters.stars !== undefined && filters.stars.length > 0) {
            filter['stars'] = filters.stars;
        }

        return filter;
    }

    @Effect()
    loadHotels$: Observable<Action> = this.actions$
        .pipe(
            ofType(hotelsActions.LOAD_HOTELS),
            switchMap(action => {
                let data = this.parseFilters(action['data']);
                return this.hotelService.getHotels(data)
                    .pipe(
                        map(hotels => new hotelsActions.LoadHotelsSuccess(hotels)),
                        catchError(error => of(new hotelsActions.LoadHotelsFail(error)))
                    );
            })
        );

}
