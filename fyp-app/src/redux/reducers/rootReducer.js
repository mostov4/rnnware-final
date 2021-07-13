import currencyReducer from "./currencyReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import { combineReducers } from "redux";
import { createMultilanguageReducer } from "redux-multilanguage";
import productCountry from "./CountryReducer";
import userDetailsReducer from "./userDetailsReducer";
import editProductReducer from "./editProduct";
import editProductTempReducer from "./editProducttemp";

const rootReducer = combineReducers({
  multilanguage: createMultilanguageReducer({ currentLanguageCode: "en" }),
  currencyData: currencyReducer,
  productData: productReducer,
  cartData: cartReducer,
  wishlistData: wishlistReducer,
  productCountry:productCountry,
  userDetailsReducer:userDetailsReducer,
  editProductReducer:editProductReducer,
  editProductTempReducer:editProductTempReducer,
});

export default rootReducer;
