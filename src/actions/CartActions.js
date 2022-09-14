export const AddToCart = (domain) => {
    return {
        type: 'ADD_TO_CART',
        payload: domain
    }
}

export const RemoveFromCart = (domain) => {
    return {
        type: 'REMOVE_FROM_CART',
        payload: domain
    }
}