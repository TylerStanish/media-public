import React from 'react';
import {Route, Link} from 'react-router-dom';
import {createContainer} from 'meteor/react-meteor-data';
import {connect} from 'react-redux';
import {Profile} from '../../imports/api/profile';
import _ from 'lodash';

import * as actions from '../actions';

import ModalTemplate from './common/modals/ModalTemplate';
import LoginModal from './common/modals/LoginModal';

import Landing from './landing/Landing';
import Write from './common/Write';
import Article from './articles/Article';
import Journalists from './journalists/Journalists';
import Journalist from './journalists/Journalist';
import MyProfile from './profile/MyProfile';
import Opinion from './articles/Opinion';

//commented text

class Index extends React.Component{
	
	componentWillReceiveProps(nextProps){
		// console.log('theoretical current profile', this.props.profile);
		// console.log('theoretical next profile', nextProps.meteorProfile);

		// this is definitely not idea, it's being compared lots of times
		// and this component is re-rendering a lot
		// this is especially bad because this is the parent component
		// which makes all of its children re-render
		if(!_.isEqual(this.props.profile, nextProps.meteorProfile)){
			this.props.setProfile(nextProps.meteorProfile);
		}
	}

	state = {
		open: false,
	}

	render(){
		return(
			<div> {/*style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}*/}

				<ModalTemplate close={() => this.setState({open: false})} open={this.state.open}>
					<LoginModal close={() => this.setState({open: false})}/>
				</ModalTemplate>

				<nav className='my-nav'>
					<Link to='/' className='nav-button'>Logo</Link>
					<div className='nav-options'>
						<Link to='/' className='nav-button'>Nat'l</Link>
						<Link to='/local' className='nav-button'>Local</Link>
						<Link to='/sports' className='nav-button'>Sports</Link>
						<Link to='/opinion' className='nav-button'>Opinion</Link>
						<Link to='/journalists' className='nav-button'>Journalists</Link>
						<Link to='/write' className='nav-button'>Write</Link>
						{Meteor.userId() ? <Link to='/myprofile' className='nav-button'>My Profile</Link> : <div onClick={() => this.setState({open: true})} className='nav-button'>Login</div>}
					</div>
				</nav>

				<Route exact path='/' component={Landing}/>
				<Route exact path='/articles' component={Landing}/>
				<Route exact path='/articles/:articleId' component={Article}/>
				<Route exact path='/write' component={Write}/>
				<Route exact path='/journalists' component={Journalists}/>
				<Route exact path='/journalists/:journalistId' component={Journalist}/>
				<Route exact path='/myprofile' component={MyProfile}/>
				<Route exact path='/opinion' component={Opinion}/>

				<div className='footer-container'>
					<div className='footer'>
						<div className='footer-column'>
							<h3>The title</h3>
							<a>The text</a>
							<a>The text</a>
							<a>The text</a>
						</div>
						<div className='footer-column'>
							<h3>The title</h3>
							<a>The text</a>
							<a>The text</a>
							<a>The text</a>
						</div>
						<div className='footer-column'>
							<h3>The title</h3>
							<a>The text</a>
							<a>The text</a>
							<a>The text</a>
						</div>
					</div>
					<b>Copyright bla bla bla ancapism intellectual property is theft bla bla bla</b>
				</div>
			</div>
		);
	}
}

const M = createContainer(p => {
	Meteor.subscribe('profile');
	return{
		meteorProfile: Profile.findOne({id: Meteor.userId()})
	}
}, Index);

export default connect((state) => {
	return{
		profile: state.profile.profile
	}
}, {setProfile: actions.setProfile})(M);


