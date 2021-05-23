import { categoryConstant } from "../actions/constants";

const initState = {
    categories: [],
    loading: false,
    error: null
}
const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if (parentId === undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: []
            }
        ];
    }

    for (let cat of categories) {

        const newCategory = {
            _id: category._id,
            name: category.name,
            slug: category.slug,
            type: category.type,
            children: []
        }
        if (cat._id === parentId) {

            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children] : [newCategory]
            })
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            });
        }


    }


    return myCategories;
}
const categoryReducer = (state = initState, action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case categoryConstant.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;
        case categoryConstant.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstant.ADD_NEW_CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updatedCategories = buildNewCategories(category.parentId, state.categories, category);
            console.log('updated categoires', updatedCategories);
            state = {
                ...state,
                categories: updatedCategories,
                loading: false,
            }
            break;
        case categoryConstant.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initState,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstant.EDIT_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstant.EDIT_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstant.EDIT_CATEGORIES_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;
        case categoryConstant.DELETE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case categoryConstant.DELETE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case categoryConstant.DELETE_CATEGORIES_FAILURE:
            state = {
                ...state,
                loading: false,
                error:action.payload.error
            }
            break;
    }

    return state
}
export default categoryReducer
