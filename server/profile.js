import {Meteor} from 'meteor/meteor';
import {Profile} from '../imports/api/profile';

Meteor.methods({
	'profile.makeUser': function(email, name){
		Profile.insert({
			id: this.userId,
			dateJoined: new Date(),
			verified: false,
			journalist: true,
			email,
			name,
			profilePic: null,
			stories: [],
			views: 0,
			viewsInSports: 0,
			viewsInOpinion: 0,
		})
	},
	'profile.setProfilePic': function(picture){
		Profile.update({id: this.userId}, {$set: {profilePic: picture}});
	}
});


