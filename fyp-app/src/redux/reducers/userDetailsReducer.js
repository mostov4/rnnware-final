import { USER_DETAILS } from "../actions/userDetails"


export const initialState = {
    userDetails: {
        id:'',
        email:''
    },

}

export default function userDetailsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case USER_DETAILS:
            return {    
                userDetails:{
                    id:payload?.uid,
                    email:payload?.email
                }
            }
        default:
            return state
    }
}
