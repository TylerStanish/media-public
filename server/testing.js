import {Profile} from '../imports/api/profile';
import {Story} from '../imports/api/story';

import faker from 'faker';

Meteor.methods({
	'testing.story.writeStory': function(journalistId, journalistName){
		// if(!this.userId){
		// 	throw new Meteor.Error('Not signed in');
		// }
		let images = [
			{count: 0, image: 'https://ih0.redbubble.net/image.253215359.7963/flat,800x800,070,f.jpg', thumbnail: false, _id: Meteor.uuid()},
			{count: 1, image: 'https://i.ytimg.com/vi/iU4lSN8S9nM/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLD50CDCbMbdAc9pdXffM2sBeYcbfQ', thumbnail: false, _id: Meteor.uuid()},
		]
		let arr = ['Sports', 'Int\'l', 'Nat\'l', 'Opinion'];
		let type = arr[Math.floor((Math.random()*4))]

		let profile = Profile.findOne({id: journalistId});
		if(!profile){
			throw new Meteor.Error('No profile for given user');
		}
		Story.insert({
			journalistId,
			journalistName,
			type,
			title: faker.company.catchPhrase() + ' ' + faker.company.catchPhrase() + ' ' + faker.company.catchPhrase(),
			subtitle: faker.company.catchPhrase(),
			markdown: `
				<center><b>${faker.lorem.sentence()}</b></center>
				${faker.lorem.paragraphs()}
				**[0]**
				${faker.lorem.paragraphs()}
			`,
			views: faker.random.number()*Math.random().toFixed(0),
			time: new Date(),
			thumbnail: faker.image.image(),
			images
		}, (err, id) => {
			Profile.update({id: journalistId}, {$push: {stories: id}});
		});
	},
	'testing.profile.makeProfile': function(uuid, name){
		Profile.insert({
			id: uuid,
			dateJoined: new Date(),
			verified: false,
			journalist: true,
			email: faker.internet.email(),
			name,
			profilePic: faker.image.avatar(),
			stories: [],
			views: faker.random.number(),
			viewsInSports: faker.random.number(),
			viewsInOpinion: faker.random.number(),
		}, (err, id) => console.log('id', id))
	}
})


