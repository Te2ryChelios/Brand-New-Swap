const initialState = {
    loading: false,
    web3: null,
    account: null,
    swap: null,
    token: null,
    ethBalance: 0,
    tokenBalance: 0,
    errorMsg: "",
}

const blockchainReducer = (state = initialState, action) => {
    switch(action.type){
        case "CONNECTION_REQUEST":
            return{
                ...initialState,
                loading: true,
            }
        case "CONNECTION_SUCCESS":
            return{
                ...state,
                loading: false,
                web3: action.payload.web3,
                account: action.payload.account,
                swap: action.payload.swap,
                token: action.payload.token,
                tokenBalance: action.payload.tokenBalance,
                ethBalance: action.payload.ethBalance,
            }
        case "CONNECTION_FAILED":
            return {
                ...initialState,
                loading: false,
                errorMsg: action.payload,

            }
        case "UPDATE_ACCOUNT":
            return {
                ...state,
                account: action.payload.account,
            }
        default:
            return state
    }
}

export default blockchainReducer;