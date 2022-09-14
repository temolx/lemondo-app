export const addCategory = (categoryID) => {
    return {
        type: 'ADD_CATEGORY',
        payload: categoryID
    }
}

export const removeCategory = (categoryID) => {
    return {
        type: 'REMOVE_CATEGORY',
        payload: categoryID
    }
}