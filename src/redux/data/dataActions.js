
const fetchDataRequest = () => {
    return {
        type: "CHECK_DATA_REQUEST"
    }
}

const fetchDataSuccess = (payload) => {
    return{
        type: "CHECK_DATA_SUCCESS",
        payload: payload,
    }
}

const fetchDataFailed = (payload) => {
    return{
        type: "CHECK_DATA_FAILED",
        payload: payload,
    }
}

export const fetchData = (account) => {
    return async (dispatch) => {
        dispatch(fetchDataRequest());
        try{
            // let allHooligans = await store
            //     .getState()
            //     .blockchain.hooliganToken.methods.getHooligans()
            //     .call()
            // let allOwnerHooligans = await store
            //     .getState()
            //     .blockchain.hooliganToken.methods.getOwnerHooligans(account)
            //     .call();

            dispatch(
                fetchDataSuccess({
                    // allHooligans,
                    // allOwnerHooligans,
                })
            )
        } catch (err) {
            console.log(err)
            dispatch(fetchDataFailed("Could not load data from contract"))
        }
    }
}