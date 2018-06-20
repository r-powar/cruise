/**
 * Created by rpowar on 6/5/18.
 */
import {combineReducers} from 'redux';
import postReducer from './postReducer';

export default combineReducers({
    post: postReducer

});