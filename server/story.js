import {Meteor} from 'meteor/meteor';
import {Story} from '../imports/api/story';
import {Profile} from '../imports/api/profile';

Meteor.methods({
	'story.writeStory': function(type, title, subtitle, markdown, imageUri, images){
		// if(!this.userId){
		// 	throw new Meteor.Error('Not signed in');
		// }
		let profile = Profile.findOne({id: this.userId});
		if(!profile){
			throw new Meteor.Error('No profile for given user');
		}
		Story.insert({
			journalistId: this.userId,
			journalistName: profile.name,
			type,
			title,
			subtitle,
			markdown,
			views: 0,
			time: new Date(),
			thumbnail: imageUri,
			images
		}, (err, id) => {
			Profile.update({id: this.userId}, {$push: {stories: id}});
		});
	},
	'story.addView': function(articleId){
		Story.update(articleId, {$inc: {views: 1}});
	}
})


