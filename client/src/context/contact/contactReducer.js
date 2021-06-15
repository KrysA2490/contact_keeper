import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER
}  from '../types';

export default (state, action) => {
    switch(action.type) {
        case ADD_CONTACT:
            console.log('adding contact', action.payload)
            return {
                ...state,
                //return original state and add contact 
                contacts: [...state.contacts, action.payload]
            }
        case UPDATE_CONTACT:
            console.log('updating contact')
            return{
                ...state,
                contacts: state.contacts.map(contact => contact.id === action.payload.id? action.payload: contact)     
            }
        case DELETE_CONTACT:
            console.log('deleting contact')
            return{
                ...state,
                contacts: state.contacts.filter(contact => contact.id !== action.payload)
            }
        case SET_CURRENT:
            return{
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return{
                ...state,
                current: null
            }
        case FILTER_CONTACT:
            console.log('filtering contact')
            return {
                ...state,
                filtered: state.contacts.filter(contact => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return contact.name.match(regex) || contact.email.match(regex)
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        default:
            return state;
    }
}