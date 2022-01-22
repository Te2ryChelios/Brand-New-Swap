import Web3 from "web3"
import BrandNewSwap from "../../contracts/build/contracts/BrandNewSwap.json"
import BNFToken from "../../contracts/build/contracts/BNFToken.json"


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
             const accounts = await web3.eth.getAccounts(console.log)
             const networkId = await window.ethereum.request({
                 method: "net_version",
             })
             console.log('Accounts : ', accounts)
             console.log('Network ID: ', networkId)
             const BrandNewSwapNetworkData = await BrandNewSwap.networks[networkId]  
             console.log('BrandNewSwapNetworkData: ',BrandNewSwapNetworkData) 
             if(BrandNewSwapNetworkData && networkId === "4"){
                 const swap = new web3.eth.Contract(
                    BrandNewSwap.abi,
                    BrandNewSwapNetworkData.address
                 )
                 const ethBalance = await web3.eth.getBalance(accounts[0])
                 const tokenData = await BNFToken.networks[networkId];
                 if(tokenData){
                     const token = new web3.eth.Contract(
                         BNFToken.abi,
                         tokenData.address
                     )
                     let tokenBalance = await token.methods.balanceOf(accounts[0]).call()
                     dispatch(
                        connectSuccess({
                            account: accounts[0],
                            ethBalance: ethBalance,
                            tokenBalance: tokenBalance,
                            web3: web3,
                            swap: swap,
                            token: token
                        })
                    )
                    window.ethereum.on("accountsChanged", (accounts) => {
                        dispatch(updateAccount(accounts[0]))
                    })
                    window.ethereum.on("chainChanged", () => {
                       window.location.reload()
                   })
                 }else{
                    dispatch(connectFailed("Failed to load token"))
                 }
            
             } else {
                 dispatch(connectFailed("Rinkeby network required"))
             }
            } catch (err) {
                console.log(err)
                dispatch(connectFailed("Something went wrong"))
            }
        }else {
            dispatch(connectFailed("Ethereum Network required! Please install Metamask and come back"))
        }
    }
}

export const updateAccount = (account) => {
    return async (dispatch) => {
        dispatch(updateAccountRequest({account: account}))
    }
}