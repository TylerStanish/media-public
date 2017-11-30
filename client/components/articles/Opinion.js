import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Story} from '../../../imports/api/story';
import {Profile} from '../../../imports/api/profile';

import LandingTemplate from '../common/LandingTemplate';

class Opinion extends React.Component{
	render(){
		console.log(this.props.topTenJournalists);
		return <LandingTemplate {...this.props}/>
	}
}

export default createContainer(p => {
	Meteor.subscribe('opinion');
	Meteor.subscribe('topTenJournalists', 'Opinion');
	return{
		topFourStories: Story.find({}, {limit: 4, skip: 0}).fetch(),
		midStories: Story.find({}, {limit: 6, skip: 4}).fetch(),
		pictureLess: Story.find({}, {limit: 8, skip: 10}).fetch(),
		sideStories: Story.find({}, {limit: 5, skip: 18}).fetch(),
		type: 'Opinion',
		topTenJournalists: Profile.find({journalist: true}, {limit: 10, sort: {viewsInOpinion: -1}}).fetch(),
	}
}, LandingTemplate);

/*
	props:
		topFourStories,
		topTenJournalists,
		midStories,
		pictureLess,
		sideStories
*/