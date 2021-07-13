export const EDIT_DELETE = "EDIT_DELETE";
export const EMPTY_PRODUCTS = "EMPTY_ALL";
export const DELETE_ALL_PRODUCTS = "DELETE_ALL_PRODUCTS";



export const editProductDeleteAction = (payload) => ({
  type: EDIT_DELETE,
  payload:payload
});

export const deleteAllAction = (payload) => ({
  type: DELETE_ALL_PRODUCTS,
  payload:payload
});