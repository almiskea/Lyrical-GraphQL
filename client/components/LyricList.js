import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link, hashHistory } from 'react-router';
//import query from '../queries/fetchLyrics';

class LyricList extends Component{
  constructor(props){
    super(props);
    //this.state = {likes : 0}
  }
  onLike(id,likes){
    this.props.mutate({
        variables:{ id },
        optimisticResponse: {
          __typename: 'Mutation',
          likeLyric: {
            id: id,
            __typename: 'LyricType',
            likes: likes+1
          }
        }
    })
  }
  renderLyrics(){
    return this.props.lyrics.map( ({ content, id,likes })  => {
      return(
        <li key={id} className="collection-item">
          <span>{content}</span>
          <div className="vote-box">
          <i
            className="material-icons"
            onClick={() => this.onLike(id, likes)}
          >
          thumb_up
          </i>

            {likes}
          </div>
        </li>
      )
    })
  }
  render(){
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

const mutation = gql`
mutation LikeLyric($id: ID!){
	likeLyric(id:$id){
    id
    content
    likes
  }
}`;
export default graphql(mutation)(LyricList);
