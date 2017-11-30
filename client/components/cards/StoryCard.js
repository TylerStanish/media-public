import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

class StoryCard extends React.Component{
	render(){
		return(
			<Link to={`/articles/${this.props.story._id}`} className='story-card'>
				<img className='story-card-image' src={this.props.story.thumbnail}/>
				<div className='story-card-body'>
					<div className='link' style={{fontSize: '15px',}}>{this.props.story.title}</div>
					<Link style={{fontSize: '13px', color: 'black'}} to={`/journalists/${this.props.story.journalistId}`}>By {this.props.story.journalistName}</Link>
					<i className='mdi mdi-clock'>{moment(this.props.story.time).fromNow()}</i>
				</div>
			</Link>
		);
	}
}

export default StoryCard;

