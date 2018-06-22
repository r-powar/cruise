/**
 * Created by rpowar on 6/20/18.
 */
// Get saved posts from Local Storage
export function loadPinnedPosts (){
    try{
        const serialized = localStorage.getItem('pinnedPosts');

        if(!serialized){
            return [];
        }

        let localState = JSON.parse(serialized);
        return localState;

    }catch(err){
        return undefined;
    }
}

// Utility to avoid repeating posts
export function removeDuplicates (pinnedArr, fetchedArr) {
    pinnedArr.forEach(pinObj => {
        for(let i = 0; i < fetchedArr.length; i++){
            if(pinObj.data.id === fetchedArr[i].data.id){
                fetchedArr.splice(i, 1);
                break;
            }
        }
    });
}

// Update Local Storage on unpinning
export function updateLocalState (id){
    try{
        let items = JSON.parse(localStorage.getItem('pinnedPosts'));

        if(items){
            for(let i = 0; i < items.length; i++){
                let post = items[i];
                if(post.data.id === id){
                    items.splice(i, 1);
                }
            }
        }

        localStorage.setItem('pinnedPosts', JSON.stringify(items));

    }catch(err){
        return undefined;
    }
}
export default {loadPinnedPosts, removeDuplicates, updateLocalState}