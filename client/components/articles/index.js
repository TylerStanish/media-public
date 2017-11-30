import React from 'react';
import {Route} from 'react-router-dom';

import Article from './Article';

class Index extends React.Component{
	render(){
		return(
			<Route exact path='/:articleId' component={Article}/>
		);
	}
}

export default Index;

