import React from 'react';
import {Link} from 'react-router-dom';
import history from '../../history';

class JournalistCard extends React.Component{
	render(){
		let {name, profilePic, stories, id, views} = this.props.journalist;
		if(this.props.type == 'Opinion'){
			views = this.props.journalist.viewsInOpinion
		}
		return(
			<div className='journalist-card'>
				<img className='hover-pointer journalist-card-image' onClick={() => history.replace(`/journalists/${id}`)} src={profilePic}/>
				<div className='journalist-card-body'>
					<Link to={`/journalists/${id}`} style={{color: 'black'}}>	
						<h4 className='journalist-name'>{name}</h4>
					</Link>
					<div className='journalist-card-info'>
						<i className="button mdi mdi-pencil">{stories.length}</i>
						<i className='button'>{views} views</i>
						
					</div>
				</div>
			</div>
		);
	}
}

export default JournalistCard;

