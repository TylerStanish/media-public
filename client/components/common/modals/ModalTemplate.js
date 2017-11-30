import React from 'react';
import Modal from 'react-modal';

class ModalTemplate extends React.Component{
	render(){
		return(
			<Modal style={{content: {
				top: '50%',
				left: '50%',
				right: 'auto',
				bottom: 'auto',
				marginRight: '-50%',
				transform: 'translate(-50%, -50%)',
				display: 'flex',
				flexDirection: 'column',
			}}} isOpen={this.props.open} contentLabel='Modal'>
				<div style={{width: '100%'}}>
					<i onClick={() => this.props.close()} className='button modal-close mdi mdi-close'></i>
				</div>
				<div style={{width: '100%'}}>	
					{this.props.children}
				</div>
			</Modal>
		);
	}
}

export default ModalTemplate;

