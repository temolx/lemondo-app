const CategoryReducer = (state = [], action) => {
    switch(action.type) {
        case 'ADD_CATEGORY':
            return [...state, action.payload];
        case 'REMOVE_CATEGORY':
            return state.filter((id) => {
                return id !== action.payload;
            })
        default:
            return state;
    }
}

export default CategoryReducer;