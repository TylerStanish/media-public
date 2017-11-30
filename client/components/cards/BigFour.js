import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

class BigFour extends React.Component{
	render(){
		if(!this.props.story){
			return <div>Loading...</div>
		}
		return(
			<Link to={`/articles/${this.props.story._id}`} className='big-card' style={{backgroundImage: `url(${this.props.story.thumbnail})`}}>
				<div className='article-card-callout'>
					{this.props.story.type}
				</div>
				<div className='card-filler'></div>
				<div className='article-card-info'>
					<div style={{color: 'white'}} className='article-card-text'>{this.props.story.title}</div>
					<Link style={{color: 'white'}} to={`/journalists/${this.props.story.journalistId}`} className='article-card-author'>By {this.props.story.journalistName}</Link>
					<div className='article-card-options'>
						<div className='article-card-button'>	
							<i className="button mdi mdi-clock"></i>
							{moment(this.props.story.time).fromNow()}
						</div>
						{/*<div className='article-card-button'>	
							<i className="button mdi mdi-tooltip"></i>
						</div>*/}
						<div className='article-card-button'>
							{/*<i className="button mdi mdi-eye"></i>*/}
							<i className='button mdi mdi-eye'></i>
							{this.props.story.views} views
						</div>
					</div>
				</div>
			</Link>
		);
	}
}

export default BigFour;


