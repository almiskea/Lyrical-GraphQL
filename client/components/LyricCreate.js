import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';

class LyricCreate extends Component{

  constructor(props){
    super(props);

    this.state = {content: ''};
  }
  onSubmit(event){
    const self = this;
    event.preventDefault();
    this.props.mutate({
      variables:{
        content: self.state.content,
        songId: self.props.id
      }
    })
      self.setState({
        content: ''
      });

  }
  render() {

    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <label>Add a Lyric</label>
        <input
          value={this.state.content}
          onChange={event => this.setState({ content : event.target.value})}
        />
      </form>
    )
  }
}
const mutation = gql`
mutation AddLyricToSong($content: String,$songId: ID){
  addLyricToSong(content:$content,songId: $songId){
		title
    id
    lyrics{
      id
      content
      likes
    }
  }
}
`;
export default graphql(mutation)(LyricCreate);
