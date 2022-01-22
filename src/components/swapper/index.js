import React, {useState, useEffect} from 'react';
import {MdSwapVert} from 'react-icons/md'
import {connect, updateAccount} from '../../redux/blockchain/blockchainActions'

const Swapper = ({alert, setAlert, resetAlert, blockchain, dispatch}) => {
    const [swap, setSwap] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputBNF, setInputBNF] = useState(0)
    const [inputETH, setInputETH] = useState(0)
    

    const handleSwap = (e) => {
        e.preventDefault()
        setSwap(!swap)
    }

    const buyTokens = async () => {
        blockchain.swap.methods.buyTokens()
        .send({value: blockchain.web3.utils.toWei(inputETH, "Ether"), from: blockchain.account.address})
        .on('transactionHash', (hash) => {
            setLoading(false)
            setAlert({
                isActive: true,
                type: '',
                message: `+ ${inputBNF} BNF !`
            })
            setInputETH(0)
            dispatch(connect())
        }).catch((err) => {
            setLoading(false)
            setAlert({
                isActive: true,
                type: 'error',
                message: err.message
            })
        })
    }

    const sellTokens = async () => {
        console.log(inputETH)
        let tokenAmount = blockchain.web3.utils.toWei(inputBNF.toString(), "Ether")
        await blockchain.token.methods
            .approve(blockchain.swap._address, tokenAmount)
            .send({from: blockchain.account.address})
        
        await blockchain.swap.methods.sellTokens(tokenAmount)
        .send({from: blockchain.account.address})

        setLoading(false)
        setAlert({
            isActive: true,
            type: '',
            message: `+ ${inputETH} ETH !`
        })
        setInputBNF(0)
        dispatch(connect())
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        resetAlert()
        if(inputBNF === 0 || inputETH === 0){
            setAlert({
                isActive: true,
                type: 'error',
                message: 'Invalid amount'
            })
            setLoading(false)
            return
        }
        if(!swap){
            buyTokens()
        }else{
            sellTokens()
        }
    }

    useEffect(() => {
       if(!swap){
            setInputBNF(inputETH * 100)
       }else{
           setInputETH(inputBNF / 100)
       }
    }, [inputETH, inputBNF, swap])

    useEffect(() => {
        dispatch(updateAccount(blockchain.account))
    }, [blockchain.account])

    return (
        <div className="box">
                    <form onSubmit={handleSubmit}>
                        {/* <h2 className="form-title">Swap</h2> */}
                        {swap ? 
                            <>
                            {blockchain.web3 && <p className="form-item-text right">Balance : {blockchain.web3.utils.fromWei(blockchain.tokenBalance, "Ether")}</p>}
                            <div className="form-item">
                                <input disabled={blockchain.account ? false : true} name="inputBNF" id="inputBNF" value={inputBNF} onChange={(e) => {setInputBNF(e.target.value)}} type="number" step="0.1" className="form-input" />
                                <div className="form-select-container">
                                    <select className="form-select">
                                        <option value="bnf">BNF</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-swap">
                                <button disabled={loading} onClick={handleSwap} className="button-swap"><MdSwapVert /></button>
                            </div>
                            {blockchain.web3 && <p className="form-item-text right">Balance : {blockchain.web3.utils.fromWei(blockchain.ethBalance, "Ether")}</p>}
                            <div className="form-item">
                                
                                <input disabled name="inputETH" id="inputETH" value={inputETH} onChange={(e) => {setInputETH(e.target.value)}}  type="number" step="0.1" className="form-input" />
                                <div className="form-select-container">
                                    <select className="form-select">
                                        <option value="eth">ETH</option>
                                    </select>
                                </div>
                            </div>
                            </>
                        :
                        (
                            <>
                            
                            {blockchain.web3 && <p className="form-item-text right">Balance : {blockchain.web3.utils.fromWei(blockchain.ethBalance, "Ether")}</p>}
                            <div className="form-item">
                                
                                <input disabled={blockchain.account ? false : true} name="inputETH" id="inputETH" value={inputETH} onChange={(e) => {setInputETH(e.target.value)}}  type="number" step="0.1" className="form-input" />
                                <div className="form-select-container">
                                    <select className="form-select">
                                        <option value="eth">ETH</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-swap">
                                <button disabled={loading} onClick={handleSwap} className="button-swap"><MdSwapVert /></button>
                            </div>
                            {blockchain.web3 && <p className="form-item-text right">Balance : {blockchain.web3.utils.fromWei(blockchain.tokenBalance, "Ether")}</p>}
                            <div className="form-item">
                                <input disabled name="inputBNF" id="inputBNF" value={inputBNF} onChange={(e) => {setInputBNF(e.target.value)}} type="number" step="0.1" className="form-input" />
                                <div className="form-select-container">
                                    <select className="form-select">
                                        <option value="bnf">BNF</option>
                                    </select>
                                </div>
                            </div>
                            </>
                        )}
                        <div className="form-item">
                            <p className="form-item-text">Exchange Rate</p>
                            <p className="form-item-text right">1 ETH = 100 BNF</p>
                        </div>
                        <div className="form-item">
                            {blockchain.account ? <button disabled={loading} className="button button-form">Swap</button> : <button disabled className="button button-form">CONNECT TO SWAP</button>}
                        </div>
                    </form>
        </div>
    );
};

export default Swapper;
