import React from 'react';
import Transition from 'react-addons-css-transition-group';

class LoginModal extends React.Component{
	
	state = {
		creatingAccount: false,
		email: '',
		password: ''
	}

	createAccount(e){
		e.preventDefault();
		if(!this.state.creatingAccount){	
			this.setState({creatingAccount: true});
			return;
		}
		let {email, name, password, confirmPassword} = this.state;
		if(!email || !name || !password || !confirmPassword){
			alert('Missing field(s)!');
			return;
		}
		Accounts.createUser({email, password}, (err, data) => {
			if(err){
				console.log(err);
				alert(err.reason);
				return;
			}
			Meteor.call('profile.makeUser', email, name, (error, data) => {
				if(!err){
					this.props.close();
				}else{
					console.log(err);
					alert(error.reason)
				}
			});
		});
	}

	login(e){
		e.preventDefault();

		if(this.state.creatingAccount){
			this.setState({creatingAccount: false});
			return;
		}

		let {email, password} = this.state;
		if(!email || !password){
			console.log(email, password)
			alert('Missing field(ss)');
			return;
		}
		Meteor.loginWithPassword(email, password, (err) => {
			if(err){
				console.log(err);
				alert(err.reason);
				return;
			}
			this.props.close();
		})
	}

	render(){
		let name;
		let confirmPassword;
		if(this.state.creatingAccount){
			name = (
				<div>
					<label key={1} >Name</label>
					<input 
						key={2}
						type='text'
						id='name'
						className='form-control' 
						onChange={(e) => this.setState({name: e.target.value})}
					/>
				</div>
			);
			confirmPassword = (
				<div>
					<label key={1} >Password</label>
					<input 
						key={2}
						type='password'
						id='confirmPassword'
						className='form-control' 
						onChange={(e) => this.setState({confirmPassword: e.target.value})}
					/>
				</div>
			);
		}

		return(
			<form style={{width: '50vw'}} onSubmit={this.state.creatingAccount ? this.createAccount.bind(this) : this.login.bind(this)}>	
				<div className='form-group'>
					<label >Email Address</label>
					<input 
						type='text'
						id='email'
						className='form-control' 
						onChange={(e) => this.setState({email: e.target.value})}
					/>
				</div>
				<div className='form-group'>
					<Transition 
						transitionName='form'
						transitionAppear
						transitionLeave
						transitionEnter
						transitionAppearTimeout={400}
						transitionLeaveTimeout={400}
						transitionEnterTimeout={400}
					>
						{name}
					</Transition>
				</div>
				<div className='form-group'>
					<label >Password</label>
					<input 
						type='password'
						id='password'
						className='form-control' 
						onChange={(e) => this.setState({password: e.target.value})}
					/>
				</div>
				<div className='form-group'>
					<Transition 
						transitionName='form'
						transitionAppear
						transitionLeave
						transitionEnter
						transitionAppearTimeout={400}
						transitionLeaveTimeout={400}
						transitionEnterTimeout={400}
					>
						{confirmPassword}
					</Transition>
				</div>
				<div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>	
					<button onClick={this.login.bind(this)} className='btn btn-primary'>Log In</button>
					<button onClick={this.createAccount.bind(this)} className='btn btn-primary'>Create Account</button>
				</div>
			</form>
		);
	}
}

export default LoginModal;

