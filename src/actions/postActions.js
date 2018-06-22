/**
 * Created by rpowar on 6/5/18.
 */
import {FETCH_POST, PIN_POST, UNPIN_POST} from './types';
import util  from '../utils/utilities';

// Fetch Data from reddit endpoint
export function fetchPost() {
    console.log('fetch..');
    return function (dispatch) {
        fetch('https://www.reddit.com/r/cats/top/.json?count=20')
            .then(res => res.json())
            .then(posts =>
                dispatch({
                    type: FETCH_POST,
                    payload: posts.data.children
                })
            )
        ;
    }
}

// take action when pining a post
export function pinPost(id) {
    return function (dispatch, getState) {

        let currentState = getState();
        let currentItem = currentState.post.items.items.filter(function(obj){
            return obj.data.id === id
        })[0];

        const pinned = currentState.post.pinned;
        pinned.push(currentItem);

        getState().post.items.items.splice(getState().post.items.items.findIndex(item => item.data.id === id), 1);

        localStorage.setItem('pinnedPosts', JSON.stringify(pinned));

        dispatch({
            type: PIN_POST,
            id
        });
    }
}

//take action when unpining post
export function unpinPost(id){
    return function (dispatch, getState) {
        util.updateLocalState(id);

        let currentState = getState();

        let currentItem = currentState.post.pinned.filter(function(obj){
           return obj.data.id === id;
        })[0];


        currentState.post.items.items.push(currentItem);
        console.log("State:", getState());
        currentState.post.pinned.splice(currentState.post.pinned.findIndex(item => item.data.id === id), 1);

        dispatch({
            type:UNPIN_POST,
            id
        });
    }
}