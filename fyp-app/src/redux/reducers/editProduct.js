import { DELETE_ALL_PRODUCTS, EDIT_DELETE, EMPTY_PRODUCTS } from "../actions/editDelete"
import { EDIT_PRODUCT } from "../actions/editProduct"


export const initialState = {
    editProduct: []

}

export default function editProductReducer(state = initialState, { type, payload }) {
    switch (type) {
        case EDIT_PRODUCT:
            let temp = [...state.editProduct, payload]
            return {
                editProduct: temp
            }
        case EDIT_DELETE:
            return {
                editProduct: state?.editProduct?.filter(item => item?.id !== payload)
            }
        case EMPTY_PRODUCTS:
            return {
                editProduct: []
            }
        case DELETE_ALL_PRODUCTS:
            return {
                editProduct: payload
            }
        default:
            return state
    }
}
