import { Action } from '@ngrx/store';

export const LOAD_HOTELS = '[Hotels] load hotels';
export const LOAD_HOTELS_FAIL = '[Hotels] load hotels fail';
export const LOAD_HOTELS_SUCCESS = '[Hotels] load hotels success';

export class LoadHotels implements Action {
    readonly type = LOAD_HOTELS;

    constructor(public data: any) { }
}

export class LoadHotelsFail implements Action {
    readonly type = LOAD_HOTELS_FAIL;

    constructor(public payload: any) { }
}

export class LoadHotelsSuccess implements Action {
    readonly type = LOAD_HOTELS_SUCCESS;

    constructor(public hotels) { }
}


export type hotelsActions = LoadHotels |
    LoadHotelsFail |
    LoadHotelsSuccess;