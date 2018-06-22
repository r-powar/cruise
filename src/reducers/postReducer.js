/**
 * Created by rpowar on 6/5/18.
 */
import {FETCH_POST, PIN_POST, UNPIN_POST} from '../actions/types';
import util  from '../utils/utilities';

const initialState = {
    items: [],
    pinnedPosts:util.loadPinnedPosts()
};

const pinned = (state = util.loadPinnedPosts(), action) => {
    switch(action.type){
        case PIN_POST:
            let pinned = state;
            console.log("Pinned:", pinned);
            return pinned;
        case UNPIN_POST:
            console.log("Unpinned:", state);
            return state;
        default:
            console.log("Default Pinned:", state);
            return state;
    }
};

const items = (state, action) => {
    switch(action.type){
        case FETCH_POST:
            util.removeDuplicates(state.pinned, action.payload);
            return Object.assign({}, state.items, {items: action.payload});
        default:
            console.log("Default Fetch:", state.items);
            return state.items;
    }
};

export default function(state = initialState, action){
    return{
        items: items(state, action),
        pinned: pinned(state.pinnedPosts, action)
    }
}