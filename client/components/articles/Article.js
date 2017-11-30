import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Story} from '../../../imports/api/story';
import MarkdownParser from '../common/MarkdownParser';

class Article extends React.Component{
	
	componentWillMount(){
		window.scrollTo(0, 0);
	}

	componentDidMount(){
		Meteor.call('story.addView', this.props.match.params.articleId, (err, data) => {
			if(err) console.log(err);
		})
	}

	render(){
		console.log(this.props.story)
		return(
			<div style={{margin: '20px'}}>
				<MarkdownParser images={this.props.story.images} markdown={this.props.story.markdown}/>
			</div>
		);
	}
}

export default createContainer(p => {
	let {articleId} = p.match.params;
	Meteor.subscribe('story', articleId);
	return{
		story: Story.findOne({_id: articleId})
	}
}, Article);

