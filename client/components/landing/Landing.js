import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Story} from '../../../imports/api/story';
import {Profile} from '../../../imports/api/profile';

import LandingTemplate from '../common/LandingTemplate'

class Landing extends React.Component{
	
	render(){
		return <LandingTemplate {...this.props}/>
	}

}

export default createContainer(p => {
	Meteor.subscribe('stories');
	Meteor.subscribe('topTenJournalists');
	return{
		topFourStories: Story.find({}, {limit: 4, skip: 0}).fetch(),
		midStories: Story.find({}, {limit: 6, skip: 4}).fetch(),
		pictureLess: Story.find({}, {limit: 8, skip: 10}).fetch(),
		sideStories: Story.find({}, {limit: 5, skip: 18}).fetch(),

		topTenJournalists: Profile.find({journalist: true}, {limit: 10, sort: {views: -1}}).fetch(),
	}
}, Landing);




