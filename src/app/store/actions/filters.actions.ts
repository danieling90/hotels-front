import { Action } from '@ngrx/store';

export const UPDATE_FILTER = '[filter] Update filter';

export class UpdateFilter implements Action {
    readonly type = UPDATE_FILTER;

    constructor(public payload: { option: string, value: any }) { }
}

export type actions = UpdateFilter;