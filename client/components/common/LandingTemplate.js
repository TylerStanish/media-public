import React from 'react';
import BigFour from '../cards/BigFour';
import JournalistCard from '../cards/JournalistCard';
import StoryCardMedium from '../cards/StoryCardMedium';
import StoryCard from '../cards/StoryCard';
import TrendingStoryCard from '../cards/TrendingStoryCard';


/*
	props:
		topFourStories,
		topTenJournalists,
		midStories,
		pictureLess,
		sideStories
*/
class LandingTemplate extends React.Component{
	renderTopFourStories(){
		return this.props.topFourStories.map(s => {
			return <BigFour key={s._id} story={s}/>
		})
	}

	renderJournalists(){
		return this.props.topTenJournalists.map(j => {
			return <JournalistCard type={this.props.type} journalist={j} key={j._id}/>
		})
	}

	renderMidStories(){
		return this.props.midStories.map(s => {
			return <StoryCard key={s._id} story={s}/>
		})
	}

	renderPictureless(){
		return this.props.pictureLess.map(s => {
			return <StoryCardMedium key={s._id} story={s}/>
		})
	}

	renderSideStories(){
		return this.props.sideStories.map(s => {
			return <TrendingStoryCard key={s._id} story={s}/>
		})
	}

	render(){
		console.log(this.props.topTenJournalists)
		return(
			<div className='inner-container'>
				<div className='col1'>
					<div className='top-stories'>	
						{this.renderTopFourStories()}
					</div>
					<div style={{marginTop: '30px', marginBottom: '30px', marginLeft: '5px', borderTop: '1px solid #aaa'}}>
						<h3 className='landing-title'>Top Stories</h3>
					</div>
					<div className='mid-stories'>
						{this.renderMidStories()}
					</div>
					<div style={{marginTop: '30px', marginBottom: '30px', marginLeft: '5px', borderTop: '1px solid #aaa'}}>
						<h3 className='landing-title'>National News</h3>
					</div>
					<div className='stories'>
						{this.renderPictureless()}
					</div>
				</div>
				<div className='col2'>
					<div className='top-journalists'>
						<h3 className='landing-title'>Top Journalists {this.props.type ? ' in ' + this.props.type : ''}</h3>
						{this.renderJournalists()}
					</div>
					<div className='trending'>
						<h3 className='landing-title'>Trending Stories</h3>
						{this.renderSideStories()}
					</div>
				</div>
			</div>
		);
	}
}

export default LandingTemplate;

