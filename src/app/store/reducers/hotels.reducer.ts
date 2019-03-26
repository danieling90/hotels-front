import * as fromHotels from '../actions';

export interface HotelsState {
    hotels: any[];
    loaded: boolean;
    loading: boolean;
    error: any,
    total: number
}

const initialState: HotelsState = {
    hotels: [],
    loaded: false,
    loading: false,
    error: null,
    total: 0
};


export function hotelsReducer( state = initialState, action: fromHotels.hotelsActions ): HotelsState {
    
    switch ( action.type ) {
        
        case fromHotels.LOAD_HOTELS:
            return {
                ...state,
                loading: true,
                error: null
            };

        case fromHotels.LOAD_HOTELS_SUCCESS:
            
            return {
                ...state,
                loading: false,
                loaded: true,
                hotels: [...action.hotels.hotels],
                total: action.hotels.total
            };

        case fromHotels.LOAD_HOTELS_FAIL:
            return {
                ...state,
                loaded: false,
                loading: false,
                error: {
                    status: action.payload.status,
                    message: action.payload.message,
                    url: action.payload.url
                }
            };


        default:
            return state;

    }


}