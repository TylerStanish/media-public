import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Profile} from '../../../imports/api/profile';
import {connect} from 'react-redux';

import ImageUpload from '../common/ImageUpload';

class MyProfile extends React.Component{
	
	constructor(p){
		super(p);
		this.state = {
			
		}
	}

	// uploadImage(e){
	// 	e.preventDefault();
	// 	let file = e.target.files[0];
	// 	let reader = new FileReader();
	// 	reader.onload = () => {
	// 		this._image = reader.result;
	// 		this.forceUpdate()
	// 	}
	// 	let result = reader.readAsDataURL(file);
		
	// }

	save(image, cb){
		Meteor.call('profile.setProfilePic', image, (err, data) => {
			if(err){
				console.log(err)
				return;
			}
			cb();
		});
	}

	render(){
		if(!this.props.profile){
			// fix this, you're going to have to open the modal for the user navigating to
			// this page not signed in
			return <div>Loading...</div>
		}

		return(
			<div>
				
				<img src={this.props.profile.profilePic} height='200px' width='200px'/>
				{/*<input onChange={this.uploadImage.bind(this)} type="file" name="pic" accept="image/*"/>
				
				<button onClick={() => {this._image = this.props.profile.profilePic; this.forceUpdate()}} className='btn btn-primary'>Crop</button>
				<button onClick={() => this.save()} className='btn btn-success'>Save cropped image as profile picture</button>*/}
			
				<ImageUpload aspect={1} image={this.props.profile.profilePic} addImage={(image, cb) => this.save(image, cb)}/>

			</div>
		);
	}
}

export default connect((state) => {
	return{
		profile: state.profile.profile
	}
})(MyProfile);

