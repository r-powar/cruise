/**
 * Created by rpowar on 6/5/18.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost, pinPost} from '../actions/postActions';
import {PropTypes} from 'prop-types';

class Post extends Component {
    componentWillMount() {
        this.props.fetchPost();
    }

    pinPost(id, val) {
        this.props.pinPost(id, val)
    }

    render() {
        let pinedPosts = [];
        let postItems = [];


        this.props.posts.forEach(post => {
            if (post.data.pinned) {
                pinedPosts.push(
                    <div key={post.data.id} className="listBox">
                        <div className="listContent">
                            <i className='fa fa-thumb-tack pin' style={{color: "green"}}
                               onClick={this.pinPost.bind(this, post.data.id, false)}></i>
                            <a href={'https://reddit.com' + post.data.permalink} target="_blank">{post.data.title}</a>
                        </div>
                    </div>
                );
            } else {
                postItems.push(
                    <div key={post.data.id} className="listBox">
                        <div className="listContent">
                            <i className="fa fa-thumb-tack pin"
                               onClick={this.pinPost.bind(this, post.data.id, true)}></i>
                            <a href={'https://reddit.com' + post.data.permalink} target="_blank">{post.data.title}</a>
                        </div>
                    </div>
                );
            }
        });


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
    posts: PropTypes.array.isRequired,
    pinPost: PropTypes.func.isRequired
};

const mapStatetoProps = state => ({
    posts: state.post.items
});

const mapDispatchToProps = dispatch => ({
    fetchPost: () => {
        dispatch(fetchPost());
    },
    pinPost: (id, val) => {
        dispatch(pinPost(id, val));
    }
});

export default connect(mapStatetoProps, mapDispatchToProps)(Post);
