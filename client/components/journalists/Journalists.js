import React from 'react';
import {connect} from 'react-redux';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../imports/api/profile';

class Journalists extends React.Component{
	render(){
		return(
			<div>
				Journalists page
			</div>
		);
	}
}

const M = createContainer(p => {
	Meteor.subscribe('favJournalists');
	console.log('the profile:', p.profile);
	return{
		// journalists: Profile.find({_id: {$in: p.profile.favJournalists}}),
	}
}, Journalists);

export default connect((state) => {
	console.log("updatign...")
	return{
		profile: state.profile.profile
	}
})(M);

