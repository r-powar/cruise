/**
 * Created by rpowar on 6/5/18.
 */
import {FETCH_POST, PIN_POST} from './types';

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

export function pinPost(id, val) {
    return function (dispatch) {
        dispatch({
            type: PIN_POST,
            id,
            val
        });
    }
}