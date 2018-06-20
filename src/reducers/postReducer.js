/**
 * Created by rpowar on 6/5/18.
 */
import {FETCH_POST, PIN_POST} from '../actions/types';

const initialState = {
    items: [],
    item: {}
};

export default function(state = initialState, action){
    switch (action.type){
        case FETCH_POST:
            return Object.assign({}, state, {items: action.payload});
        case PIN_POST:
            const item = state.items.map(value => value.data.id === action.id ?
                {data: Object.assign({}, value.data, {pinned: action.val})} : value
            );
            return Object.assign({}, state, {items: item });
        default:
            return state;
    }

}