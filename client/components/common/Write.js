import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import ImageUpload from './ImageUpload';
import MarkdownParser from './MarkdownParser';
import history from '../../history';

class App extends React.Component{
	
	state = {text: `<center><b><i>THE DAILY SOMETHING</i></b></center>
<i>Keeping you in the know</i>

**[1]**

<justify>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis non efficitur nisi. Etiam quis quam ante. Proin accumsan porttitor sapien quis aliquet. Sed ultrices tellus velit, ut rutrum libero fermentum a. Ut eu dolor ullamcorper nisl efficitur sagittis id nec lacus. Aliquam et tristique tellus. Pellentesque sed aliquam arcu, sed feugiat orci.

In dignissim aliquet interdum. Nullam gravida magna ac sem ultricies, at ullamcorper ipsum fermentum. Quisque egestas maximus massa vel pharetra. Sed vitae felis viverra, scelerisque ipsum congue, laoreet purus. Maecenas mattis lacinia est, quis fermentum mauris auctor nec. Nulla non ex nec est elementum aliquet. Vestibulum risus est, sodales dictum est a, tempor eleifend justo.

Proin lobortis id dui vitae tincidunt. Duis ac magna nisl. Fusce a arcu nulla. Aliquam sagittis ut urna tristique rhoncus. Mauris aliquam nibh sed nisl bibendum, at mattis diam laoreet. Morbi turpis odio, luctus at accumsan eu, auctor quis dui. Ut et neque eget velit dictum maximus ut vitae purus. Nullam tempor convallis ante, et interdum est volutpat ut. Maecenas nibh nunc, laoreet et semper id, aliquam eu magna. Sed mollis suscipit sapien, a ultricies nulla tincidunt vel. Morbi a nisl a elit dictum commodo quis quis eros. Sed tristique auctor erat, quis pellentesque sapien mattis sit amet. Mauris efficitur elit non risus bibendum, eget tempus lorem tristique. Sed sed nulla sed magna porttitor luctus vel nec sem. Ut nec ante scelerisque, suscipit orci vitae, suscipit magna. Donec a justo id quam vestibulum porta.

Donec semper vehicula mollis. Sed faucibus molestie dolor nec tempor. Curabitur lacus tortor, hendrerit at enim quis, dignissim convallis purus. Etiam mauris dui, aliquam at pretium at, auctor eget odio. Sed at auctor magna, non iaculis leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sit amet bibendum nibh. In tincidunt luctus odio nec ultricies. Aenean ac ipsum luctus, laoreet justo eget, iaculis nisl.

Suspendisse dapibus elementum felis venenatis dignissim. Quisque elit leo, consequat in tempor ac, gravida sed sem. Aliquam ornare finibus lorem, vel hendrerit libero consectetur in. Donec tincidunt nisl sit amet velit dictum mollis. Phasellus eu elit finibus arcu lobortis vestibulum. Praesent elementum, metus vitae pharetra efficitur, nisl ante posuere ex, nec bibendum ipsum mauris at massa. Integer consequat nisi ipsum, vitae malesuada magna scelerisque eu. In cursus feugiat velit. Quisque consequat quam eu magna dignissim tempus. Pellentesque euismod imperdiet mattis.
</justify>
**[2]**`,
	
	imageType: '',
	images: [
		{count: 0, image: 'https://ih0.redbubble.net/image.253215359.7963/flat,800x800,070,f.jpg', thumbnail: false, _id: Meteor.uuid()},
		{count: 1, image: 'https://ih0.redbubble.net/image.331284355.3179/flat,800x800,075,f.u5.jpg', thumbnail: false, _id: Meteor.uuid()},
	]
}

	addImage(image, cb){
		this.setState({images: this.state.images.concat({count: this.state.images.length, image, thumbnail: false, _id: Meteor.uuid()})}, () => {
			cb();
		});
	}

	updateText(t){
		this.setState({text: t.target.value});
	}

	submit(e){
		e.preventDefault();
		let {type, title, subtitle, text, images} = this.state;
		if(!type || !title || !text){
			alert('Missing field(s)');
			return;
		}
		let thumbnail;
		this.state.images.map(i => {
			if(i.thumbnail){
				thumbnail = i.image;
			}
		})
		if(!thumbnail){
			alert('No thumbnail set!');
			return
		}
		Meteor.call('story.writeStory', type, title, subtitle, text, thumbnail, images, (err, data) => {
			if(err){
				console.log(err);
				return;
			}
			history.replace('/');
			window.scrollTo(0,0)
		});
	}

	setThumbnail(obj){
		let newArr = []
		this.state.images.map(i => {
			i.thumbnail = false;
			newArr.push(i);
		});
		newArr.map(i => {
			if(i._id === obj._id){
				i.thumbnail = true;
			}
		});
		this.setState({images: newArr});
	}

	renderImages(){
		return this.state.images.map(obj => {
			return(
				<div key={obj._id} className='card select-image-wrapper'>
					<img className='select-image' src={obj.image}/>
					{obj.thumbnail ? <div className='card-block'>The thumbnail</div> : <button onClick={() => this.setThumbnail(obj)} className='card-block btn btn-primary'>Set thumbnail</button>}
				</div>
			)
		});

	}

	renderImageUploads(){
		// let arr = []
		// for(i = 0; i < this.state.images.length+1; i++){
		// 	arr.push(<ImageUpload image={null} addImage={(image, cb) => this.addImage(image, cb)}/>);
		// }
		// return arr;
	}

	render(){

		return(
			<div className='my-container'>
				<form onSubmit={(e) => this.submit(e)} style={{display: 'block', margin: '5px'}}>
					<div style={{width: '100%'}}>
						<div className='writing-info'>
							<p className='writing-info-text'>{'<b>'}<b>For bolded text</b>{'</b>'}</p>
							<p className='writing-info-text'>{'<i>'}<i>For italiticed text</i>{'</i>'}</p>
							<p className='writing-info-text'>**[Image Number]** for a picture</p>
							<p className='writing-info-text'>{'<center>'}For centered text{'</center>'}</p>
							<p className='writing-info-text'>To delete placeholder on Mac: CMD+A delete</p>
							<p className='writing-info-text'>To delete placeholder on Windows: CTRL+A delete</p>
						</div>
						<ImageUpload aspect={16/9} image={null} addImage={(image, cb) => this.addImage(image, cb)}/>
						<div className='image-container'>
							{this.renderImages()}
						</div>
						<div>
							<div className="form-check form-check-inline">
								<label className="form-check-label">
									<input onChange={(e) => this.setState({type: e.target.value})} type="radio" name="inlineRadioOptions" value="Opinion"/>
									Opinion
								</label>
							</div>
							<div className="form-check form-check-inline">
								<label className="form-check-label">
									<input onChange={(e) => this.setState({type: e.target.value})} type="radio" name="inlineRadioOptions" value="Sports"/>
									Sports
								</label>
							</div>
							<div className="form-check form-check-inline">
								<label className="form-check-label">
									<input onChange={(e) => this.setState({type: e.target.value})} type="radio" name="inlineRadioOptions" value="Intl"/>
									Int'l
								</label>
							</div>
							<div className="form-check form-check-inline">
								<label className="form-check-label">
									<input onChange={(e) => this.setState({type: e.target.value})} type="radio" name="inlineRadioOptions" value="Natl"/>
									Nat'l
								</label>
							</div>
							<div className="form-check form-check-inline">
								<label className="form-check-label">
									<input onChange={(e) => this.setState({type: e.target.value})} type="radio" name="inlineRadioOptions" value="Local"/>
									Local
								</label>
							</div>
						</div>
						{/*<input onChange={(title) => this.setState({title})}/>*/}
						<div className='writing-input-wrapper'>
							<p>Article title</p>
							<input onChange={(text) => this.setState({title: text.target.value})} className='writing-input'/>
						</div>
						<div className='writing-input-wrapper'>
							<p>Article subtitle</p>
							<input onChange={(text) => this.setState({subtitle: text.target.value})} className='writing-input'/>
						</div>
					</div>
					<div style={{display: 'flex'}}>
						<textarea value={this.state.text} onChange={this.updateText.bind(this)} className='textarea'/>
						<MarkdownParser images={this.state.images} editing markdown={this.state.text}/>

					</div>
					<button onClick={this.submit.bind(this)} className='btn btn-primary btn-block'>Publish</button>
				</form>
				
			</div>
		);
	}
}

export default App;


