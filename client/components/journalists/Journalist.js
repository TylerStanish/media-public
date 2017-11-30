import React from 'react';
import {Profile} from '../../../imports/api/profile';
import {Story} from '../../../imports/api/story';
import {createContainer} from 'meteor/react-meteor-data';

import StoryCardMedium from '../cards/StoryCardMedium';

class Journalist extends React.Component{

	renderLatest(){
		console.log(this.props.latest);
		console.log(this.props.journalist)
		return this.props.latest.map(s => {
			return <StoryCardMedium story={s} key={s._id}/>
		})
	}	

	render(){
		if(!this.props.journalist){
			return <div>Loading...</div>
		}
		let {journalist} = this.props;
		return(
			<div className='jj-container'>
				<img className='jj-image' src={this.props.journalist.profilePic}/>
				<div style={{width: '100%'}}>
					<h1 style={{textAlign: 'center'}}>Latest stories by {this.props.journalist.name}</h1>
					<div className='jj-stories'>	
						{this.renderLatest()}
					</div>
				</div>
			</div>
		);
	}
}

export default createContainer(p => {
	let {journalistId} = p.match.params;
	Meteor.subscribe('journalist', journalistId);
	Meteor.subscribe('journalistStories', journalistId);
	let journalist = Profile.findOne({id: journalistId});
	let latest = journalist ? Story.find({_id: {$in: journalist.stories}}).fetch() : '';
	return{
		journalist,
		latest
	}
}, Journalist);



