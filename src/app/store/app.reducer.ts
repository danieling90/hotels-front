
import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';



export interface AppState {
    filters: reducers.FiltersState;
    hotels: reducers.HotelsState
}

export const appReducers: ActionReducerMap<AppState> = {
    filters: reducers.filtersReducer,
    hotels: reducers.hotelsReducer
};
