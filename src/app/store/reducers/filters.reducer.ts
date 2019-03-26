import { Action } from '@ngrx/store';
import * as fromFilters from '../actions';

export interface FiltersState {
    name: string;
    allStars: boolean;
    fiveStar: boolean;
    fourStar: boolean;
    threeStar: boolean;
    twoStar: boolean;
    oneStar: boolean;
    stars: string;
}

const initialState: FiltersState = {
    name: '',
    allStars: true,
    fiveStar: false,
    fourStar: false,
    threeStar: false,
    twoStar: false,
    oneStar: false,
    stars: '',
}

function buildStarFilter(filters) {
    var filterStars = '';

    if (filters.allStars === true) {
        filterStars = '1,2,3,4,5';
    } else {        
        if (filters.fiveStar === true) {
            filterStars += '5,'
        }
        if (filters.fourStar === true) {
            filterStars += '4,'
        }
        if (filters.threeStar === true) {
            filterStars += '3,'
        }
        if (filters.twoStar === true) {
            filterStars += '2,'
        }
        if (filters.oneStar === true) {
            filterStars += '1,'
        }

        if (filterStars !== '') {
            filterStars = filterStars.substring(0, filterStars.length - 1);
        }
    }

    return filterStars;
}

export function filtersReducer(state = initialState, action: fromFilters.actions): FiltersState {
    switch (action.type) {
        case fromFilters.UPDATE_FILTER:            
            state[action.payload.option] = action.payload.value;
            if(action.payload.option !== 'name'){
                state['stars'] = buildStarFilter(state);
            }            
            return state;

        default:
            return state;
    }
}