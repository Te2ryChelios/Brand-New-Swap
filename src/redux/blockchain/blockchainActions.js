import Web3 from "web3"
import BrandNewSwap from "../../contracts/build/contracts/BrandNewSwap.json"


const connectRequest = () => {
    return {
        type: "CONNECTION_REQUEST",
    }
}

const connectSuccess = (payload) => {
    return {
        type: "CONNECTION_SUCCESS",
        payload: payload,
    }
}

const connectFailed = (payload) => {
    return {
        type: "CONNECTION_FAILED",
        payload: payload,
    }
}

const updateAccountRequest = (payload) => {
    return {
        type: "UPDATE_ACCOUNT",
        payload: payload,
    }
}

export const connect = () => {
    return async (dispatch) => {
        dispatch(connectRequest());
        if(window.ethereum){
            let web3 = new Web3(window.ethereum)
            try{
             const accounts = await window.ethereum.request({
                 method: "eth_accounts",
             })
             const networkId = await window.ethereum.request({
                 method: "net_version",
             })
             const BrandNewSwapNetworkData = await BrandNewSwap.networks[networkId]   
             if(BrandNewSwapNetworkData){
                 const swap = new web3.eth.Contract(
                    BrandNewSwap.abi,
                    BrandNewSwapNetworkData.address
                 )
                 dispatch(
                     connectSuccess({
                         account: accounts[0],
                         web3: web3,
                     })
                 )
                 window.ethereum.on("accountsChanged", (accounts) => {
                     dispatch(updateAccount(accounts[0]))
                 })
                 window.ethereum.on("chainChanged", () => {
                    window.location.reload()
                })
             } else {
                 dispatch(connectFailed("Change network to Polygon"))
             }
            } catch (err) {
                dispatch(connectFailed("Something went wrong"))
            }
        }else {
            dispatch(connectFailed("Metamask required"))
        }
    }
}

export const updateAccount = (account) => {
    return async (dispatch) => {
        dispatch(updateAccountRequest({account: account}))
    }
}