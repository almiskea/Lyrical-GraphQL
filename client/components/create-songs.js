import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';

class SongCreate extends Component {
  constructor(props){
    super(props);
    this.state = { title: ''};
  }
  onSubmit(event){
    event.preventDefault();
    this.props.mutate({
      variables:{
        title: this.state.title
      },
      refetchQueries:[{query}]
    }).then( () => {
      hashHistory.push('/');
    })

  }
  render() {
    const self = this;
    return (
      <div>
      <div>
        <Link className="" to="/" >
        Back
        </Link>
      </div>
        <h3>Create a New Song</h3>
        <form onSubmit={self.onSubmit.bind(this)}>
          <label>Song Title:</label>
          <input value={self.state.title} onChange={event => self.setState({title: event.target.value})}/>
        </form>

      </div>
    );
  }
}

const mutation = gql`
mutation AddSong($title: String){
  addSong(title: $title) {
    title
  }
}
`

export default graphql(mutation)(SongCreate);
