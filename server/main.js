import { Meteor } from 'meteor/meteor';
import {Profile} from '../imports/api/profile';
import {Story} from '../imports/api/story';

const faker = require('faker');

let makeRandomUser = (t) => {
	if(t === 0){
		console.log('done');
		return;
	}
	let uuid = Meteor.uuid();
	let name = faker.name.findName();
	console.log(t);
	Meteor.call('testing.profile.makeProfile', uuid, name, (err, data) => {
		if(err)console.log(err);
		let r = Math.ceil(Math.random()*20);
		console.log(r);
		test(r, uuid, name, makeRandomUser(t-1));
	})
};

let test = function(t, uuid, name, cb){
	Meteor.call('testing.story.writeStory', uuid, name, (err, data) => {
		if(err)console.log(err);
		if(t === 0){
			cb()
		}else{
			test(t-1, uuid, name, cb);
		}
	})
};

Meteor.startup(() => {
	// code to run on server at startup
	// Meteor.users.remove({});
	// Profile.remove({});
	// Story.remove({})
	
	if(!Story.find({}).fetch().length)
		makeRandomUser(20);
});

Meteor.publish('stories', function(){
	return Story.find()
});

Meteor.publish('story', function(articleId){
	return Story.find({_id: articleId});
});

Meteor.publish('profile', function(){
	return Profile.find({id: this.userId});
});

Meteor.publish('profileSingle', function(id){
	return Profile.find({id});
});

Meteor.publish('topTenJournalists', function(type){
	if(type){
		let sortQuery = "viewsIn" + type.substr(0, 1).toUpperCase() + type.substring(1);
		let json = "{\"" + sortQuery + "\":" + "-1}";
		console.log(json);
		return Profile.find({journalist: true}, {limit: 10, sort: JSON.parse(json)});
	}
	return Profile.find({journalist: true}, {limit: 10, sort: {views: -1}});
});

Meteor.publish('journalist', function(id){
	return Profile.find({id});
});

Meteor.publish('journalistStories', function(jId){
	let journalist = Profile.findOne({id: jId});
	return Story.find({_id: {$in: journalist.stories}});
});

Meteor.publish('sports', function(){
	return Story.find({type: 'Sports'});
});

Meteor.publish('opinion', function(){
	return Story.find({type: 'Opinion'});
});

Meteor.publish('national', function(){
	return Story.find({type: 'Nat\'l'})
});




