/**
 * Created by rpowar on 6/5/18.
 */
import {FETCH_POST, PIN_POST, UNPIN_POST} from '../actions/types';
import util  from '../utils/utilities';

const initialState = {
    items: [],
    pinnedPosts:util.loadPinnedPosts()
};

//Reducer to handle Pinned Posts
const pinned = (state = util.loadPinnedPosts(), action) => {
    switch(action.type){
        case PIN_POST:
            let pinned = state;
            return pinned;
        case UNPIN_POST:
            return state;
        default:
            return state;
    }
};

//Reducer to handle Posts
const items = (state, action) => {
    switch(action.type){
        case FETCH_POST:
            util.removeDuplicates(state.pinned, action.payload);
            return Object.assign({}, state.items, {items: action.payload});
        default:
            return state.items;
    }
};

export default function(state = initialState, action){
    return{
        items: items(state, action),
        pinned: pinned(state.pinnedPosts, action)
    }
}