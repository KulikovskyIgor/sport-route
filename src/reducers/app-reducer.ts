const defState = {
    googleAppKey: 'AIzaSyA2bEAEuu9sqN79e0-TVWhRfhOH-PAYWXw'
};

export default (state = defState, action:any = {}) => {
    console.log('state', state);
    console.log(action.type, action);
    return state
};
