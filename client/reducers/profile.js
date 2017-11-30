const initialState = {
	profile: {noob: true}
}

export default (state = initialState, action) => {
	switch(action.type){
		case 'setProfile':
			return{
				...state,
				profile: action.payload,
			}
		default: return state;
	}
}

