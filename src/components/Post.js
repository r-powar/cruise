/**
 * Created by rpowar on 6/5/18.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, pinPost, unpinPost} from '../actions/postActions';
import {PropTypes} from 'prop-types';

class Post extends Component {
    componentWillMount() {
        this.props.fetchPost();
    }

    pinPost(id) {
        this.props.pinPost(id)
    }

    unpinPost(id){
        this.props.unpinPost(id);
    }

    render() {
        let pinedPosts = [];
        let postItems = [];

        let pinned = this.props.pinnedItems;
        if(pinned){
            pinned.forEach(post => {
                pinedPosts.push(
                    <div key={post.data.id} className="listBox">
                        <div className="listContent">
                            <i className="fa fa-thumb-tack pin" style={{color: "green"}}
                               onClick={this.unpinPost.bind(this, post.data.id)}></i>
                            <a href={'https://reddit.com' + post.data.permalink} target="_blank">{post.data.title}</a>
                        </div>
                    </div>
                )
            });

        }

        let post = this.props.posts.items;
        for(let i in post){
            postItems.push(
                <div key={post[i].data.id} className="listBox">
                    <div className="listContent">
                        <i className="fa fa-thumb-tack pin"
                           onClick={this.pinPost.bind(this, post[i].data.id)}></i>
                        <a href={'https://reddit.com' + post[i].data.permalink} target="_blank">{post[i].data.title}</a>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <h1>Pinned</h1>
                {pinedPosts}
                <hr/>
                <h1>Posts</h1>
                {postItems}
            </div>
        );
    }
}

Post.propTypes = {
    fetchPost: PropTypes.func.isRequired,
    posts: PropTypes.object.isRequired,
    pinPost: PropTypes.func.isRequired,
    unpinPost: PropTypes.func.isRequired
};

const mapStatetoProps = state => (
    {
        posts: state.post.items,
        pinnedItems: state.post.pinned
    });

const mapDispatchToProps = dispatch => ({
    fetchPost: () => {
        dispatch(fetchPost());
    },
    pinPost: (id) => {
        dispatch(pinPost(id));
    },
    unpinPost: (id) => {
        dispatch(unpinPost(id));
    }
});

export default connect(mapStatetoProps, mapDispatchToProps)(Post);
