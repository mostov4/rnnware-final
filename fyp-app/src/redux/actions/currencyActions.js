import axios from "axios";
export const SET_CURRENCY = "SET_CURRENCY";

export const setCurrency = currencyName => {

  return dispatch => {
    axios
      .get(`http://api.exchangeratesapi.io/v1/latest?access_key=365e7dd9cb3687121f3ae501983f1df9`)
      .then(response => {
        const rates = response.data.rates;

        console.log(rates)

        let currencyRate = 0;
        for (const rate in rates) {
          if (rate === currencyName) {
            currencyRate = rates[rate];
          }
        }
        dispatch({
          type: SET_CURRENCY,
          payload: { currencyName, currencyRate }
        });
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  };
};
