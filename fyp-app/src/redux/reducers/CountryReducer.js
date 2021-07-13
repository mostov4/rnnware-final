import { PRODUCT_COUNTRY } from "../actions/productCountryAction"


export const initialState = {
    countryDetails:{}
}

export default function productCountry(state = initialState, { type, payload }) {
    switch (type) {
        case PRODUCT_COUNTRY:
            return {
                ...state,
                countryDetails: payload
            }
        default:
            return state
    }
}
