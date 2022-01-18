import { SET_LOADING_STATUS, Article_Information } from "../../action/actionType";

const initState={
    loading: false,
    articleInfo: [],
};

const articleReducer = (state = initState, action) =>{
    switch(action.type)
    {
        case Article_Information:
                return{
                ...state,
                articleInfo: action.articleInfo,
                }
        case SET_LOADING_STATUS:
                return{
                ...state,
                loading: action.status,
                }
        default: 
            return state;    
    }
}

export default articleReducer;