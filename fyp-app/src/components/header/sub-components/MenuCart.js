import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../../helpers/product";
import firebase from "firebase"
import { useHistory } from "react-router-dom";


const MenuCart = ({ cartData, currency, deleteFromCart }) => {
  let cartTotalPrice = 0;
  const { addToast } = useToasts();
  let history = useHistory()
  const checkoutCheckFunc = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
       return history.push("/checkout")
      } else return history.push("/login-register")
    });

  }

  return (
    <div className="shopping-cart-content">
      {cartData && cartData.length > 0 ? (
        <Fragment>
          <ul>
            {cartData?.map((single, key) => {
              const discountedPrice = getDiscountPrice(
                single?.price,
                single?.discount
              );
              const finalProductPrice = (
                single?.price * currency?.currencyRate
              ).toFixed(2);
              const finalDiscountedPrice = (
                discountedPrice * currency?.currencyRate
              ).toFixed(2);

              discountedPrice != null
                ? (cartTotalPrice += finalDiscountedPrice * single?.quantity)
                : (cartTotalPrice += finalProductPrice * single?.quantity);

              return (
                <li className="single-shopping-cart" key={key}>
                  <div className="shopping-cart-img">
                    <Link to={"/product/" + single.id}>
                      <img
                        alt=""
                        src={single.image[0]}
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4>
                      <Link
                        to={"/product/" + single.id}
                      >
                        {" "}
                        {single?.name}{" "}
                      </Link>
                    </h4>
                    <h6>Qty: {single?.quantity}</h6>
                    <span>
                      {discountedPrice !== null
                        ? currency?.currencySymbol + finalDiscountedPrice
                        : currency?.currencySymbol + finalProductPrice}
                    </span>
                    {single?.selectedProductColor &&
                      single?.selectedProductSize ? (
                      <div className="cart-item-variation">
                        <span>Color: {single?.selectedProductColor}</span>
                        <span>Size: {single?.selectedProductSize}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="shopping-cart-delete">
                    <button onClick={() => deleteFromCart(single, addToast)}>
                      <i className="fa fa-times-circle" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="shopping-cart-total">
            <h4>
              Total :{" "}
              <span className="shop-total">
                {currency?.currencySymbol + cartTotalPrice?.toFixed(2)}
              </span>
            </h4>
          </div>
          <div className="shopping-cart-btn btn-hover text-center">
            <Link className="default-btn" to={"/cart"}>
              view cart
            </Link>
            {/* <Link
              className="default-btn"
              to={ "/checkout"}
            >
              checkout
            </Link> */}


            <Link className="default-btn Link" onClick={checkoutCheckFunc}>
              Checkout
            </Link>

          </div>
        </Fragment>
      ) : (
        <p className="text-center">No items added to cart</p>
      )}
    </div>
  );
};

MenuCart.propTypes = {
  cartData: PropTypes.array,
  currency: PropTypes.object,
  deleteFromCart: PropTypes.func
};

export default MenuCart;
