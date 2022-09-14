const CartReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TO_CART':
            return [...state, action.payload];
        case 'REMOVE_FROM_CART':
            return state.filter((el) => {
                return el.domainName !== action.payload.domainName;
            })
        default:
            return state;
    }
}

export default CartReducer