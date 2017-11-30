import React from 'react';

class MarkdownParser extends React.Component{
	
	getMarkdown(){
		let push = function(obj){
			if(obj){
				arr.push(obj)
				str = ''
				return;
			}
			arr.push({str, bold, italic, justify, center});
			str = '';
		}
		let text = this.props.markdown;
		let arr = [];
		let str = ''
		
		let justify = false;
		let center = false;
		let bold = false;
		let italic = false;
		let image = false;

		for(i = 0; i < text.length; i++){
			if(text.substr(i, 9) === '<justify>'){
				push()
				justify = true;
				i += 9;
			}
			if(text.substr(i, 10) === '</justify>'){
				push()
				justify = false
				i += 9;
				continue;
			}
			if(text.substr(i, 8) === '<center>'){
				push()
				center = true;
				i += 8;
			}
			if(text.substr(i, 9) === '</center>'){
				push()
				center = false
				i += 8;
				continue;
			}
			if(text.substr(i, 3) === '<b>'){
				push();
				bold = true;
				i += 2;
				continue
			}
			if(text.substr(i, 4) === '</b>'){
				push();
				bold = false;
				i += 3;
				continue
			}
			if(text.substr(i, 3) === '<i>'){
				push();
				italic = true;
				i += 2;
				continue
			}
			if(text.substr(i, 4) === '</i>'){
				push();
				italic = false;
				i += 3;
				continue
			}
			if(text.substr(i, 3) === '**['){
				push()
				image = true;
				i += 3;
			}
			if(text.substr(i, 3) === ']**'){
				push({image, str});
				image = false;
				i += 2;
				continue;
			}
			// caution
			if(text.substr(i, 2) === '\n'){
				console.log('detected line break');
				push();
				push({br: true})
			}
			str += text.substr(i, 1);

			// caution
			if(i === text.length-1){
				push()
			}
		}

		return arr.map(a => {
			let classes = '';
			if(a.br){
				return <br key={Math.random()}/>
			}
			if(a.image){
				if(!this.props.images)return;
				if(!this.props.images[a.str-1])return;
				return <div className='center'><img key={Math.random()} src={this.props.images[a.str-1].image} className={ 'image-editing'}/></div>
			}
			if(a.justify){
				classes += 'justify '
			}
			if(a.center){
				classes += 'center '
			}
			if(a.italic){
				classes += 'italic '
			}
			if(a.bold){
				classes += 'bold '
			}
			return <span key={Math.random()} className={classes}>{a.str}</span>
		})
	}

	render(){
		return(
			<div className={this.props.editing ? 'output textarea' : ''}>
				{this.getMarkdown()}
			</div>
		);
	}
}

export default MarkdownParser;

