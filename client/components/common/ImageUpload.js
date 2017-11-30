import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

/*
	props:
		addImage(the image, the callback),
		image: an initial image,
		aspect: the aspect ratio as a number
*/
class ImageUpload extends React.Component{
	
	constructor(p){
		super(p);
		this.state = {
			cropping: false
		}
		this._image = p.image;
	}

	uploadImage(e){
		e.preventDefault();
		let file = e.target.files[0];
		let reader = new FileReader();
		reader.onload = () => {
			this._image = reader.result;
			this.setState({cropping: true});
		}
		let result = reader.readAsDataURL(file);
		
	}

	_crop(){
		this._image = this.refs.cropper.getCroppedCanvas().toDataURL();
	}

	removeImage(){
		this.setState({cropping: false});
		this.refs.upload.value = null;
	}

	render(){

		let option1;
		let option2;
		if(this.state.cropping){
			option1 = <button className='btn btn-primary' onClick={() => this.setState({cropping: false})}>Cancel</button>
			option2 = <button className='btn btn-primary' onClick={() => this.props.addImage(this._image, () => this.removeImage())}>Save</button>;
		}

		return(
			<div>
				{option1}
				{option2}
				<input ref='upload' onChange={this.uploadImage.bind(this)} type="file" name="pic" accept="image/*"/>
				{this.state.cropping ? <Cropper
					ref='cropper'
					src={this._image}
					style={{height: 400, width: '100%'}}
					// Cropper.js options
					aspectRatio={this.props.aspect}
					guides={false}
					crop={this._crop.bind(this)}
				/> : <div/>}
			</div>
		);
	}
}

export default ImageUpload;

