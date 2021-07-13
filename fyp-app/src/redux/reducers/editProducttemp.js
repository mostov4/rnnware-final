import { EDIT_PRODUCT_TEMP } from "../actions/editProductTemp"


export const initialState = {
    editProductTemp:false

}

export default function editProductTempReducer(state = initialState, { type, payload }) {
    switch (type) {
        case EDIT_PRODUCT_TEMP:
            return {
                editProductTemp: payload
            }
        default:
            return state
    }
}
