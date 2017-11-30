import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

class StoryCardMedium extends React.Component{
	
	getMaxChars(str, i){
		return str;
		if(i <= str.length){
			return str.substr(0, i-3) + '...';
		}
		return str;
	}

	getTimeAgo(time){

	}

	render(){
		return(
			<Link to={`/articles/${this.props.story._id}`} className='story-card-medium'>
				<img className='image' src={this.props.story.thumbnail}/>
				<p className='link'>{this.getMaxChars(this.props.story.title, 50)}</p>
				<Link className='story-card-medium-journalist' to={`/journalists/${this.props.story.journalistId}`}>By {this.props.story.journalistName}</Link>
				<div className='story-card-medium-info'><span className='link'>{this.props.story.views} views</span><span style={{width: '1px', height: '100%', background: 'black'}}/><span className='link'><span className='mdi mdi-clock'/>{moment(this.props.story.time).fromNow()}</span></div>
			</Link>
		);
	}
}

export default StoryCardMedium;

