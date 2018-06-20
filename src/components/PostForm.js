/**
 * Created by rpowar on 6/5/18.
 */
import React, { Component } from 'react';

class PostForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            title:'',
            body:''
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const post = {
            title: this.state.title,
            body: this.state.body
        };

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: "POST",
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(post)
        })
            .then(res => res.json())
            .then(data => console.log(data));
    }

    render(){

        return(
            <div>
                <h1>Add Post</h1>
                <form action="" onSubmit={this.onSubmit}>
                    <div>
                        <label>
                            Title:
                        </label>
                        <br/>
                        <input onChange={this.onChange} type="text" name="title" value={this.state.title}/>
                    </div>
                    <div>
                        <label>
                            Body:
                        </label>
                        <br/>
                        <textarea onChange={this.onChange} name="body" value={this.state.body}></textarea>
                    </div>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
}

export default PostForm;
