import React from 'react';
import {Link} from 'react-router-dom';

class TrendingStoryCard extends React.Component{
	render(){
		return(
			<div className='trending-story-card'>
				<Link to={`/articles/${this.props.story._id}`} className='trending-story-card-title'>{this.props.story.title}</Link>
				<Link to={`/journalists/${this.props.story.journalistId}`} className='trending-story-card-journalist'>By {this.props.story.journalistName}</Link>
			</div>
		);
	}
}

export default TrendingStoryCard;


