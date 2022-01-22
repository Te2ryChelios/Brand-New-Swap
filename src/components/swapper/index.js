import React, {useState} from 'react';
import {MdSwapVert} from 'react-icons/md'

const Swapper = ({alert, setAlert}) => {
    const [swap, setSwap] = useState(false)
    const [loading, setLoading] = useState(false)
    const [inputBNF, setInputBNF] = useState(0)
    const [inputETH, setInputETH] = useState(0)

    const handleSwap = (e) => {
        e.preventDefault()
        setSwap(!swap)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="box">
                    <form onSubmit={handleSubmit}>
                        <h2 className="form-title">Swap</h2>
                        {swap ? 
                            <>
                            <div className="form-item">
                                <input name="inputBNF" id="inputBNF" value={inputBNF} onChange={(e) => {setInputBNF(e.target.value)}} type="number" step="0.1" className="form-input" />
                                <div className="form-select-container">
                                    <select className="form-select">
                                        <option value="bnf">BNF</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-swap">
                                <button type="submit" disabled={loading} onClick={handleSwap} className="button button-swap"><MdSwapVert /></button>
                            </div>
                            <div className="form-item">
                                <input name="inputETH" id="inputETH" value={inputETH} onChange={(e) => {setInputETH(e.target.value)}} type="number" step="0.1" className="form-input" />
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
                            <div className="form-item">
                                <input name="inputETH" id="inputETH" value={inputETH} onChange={(e) => {setInputETH(e.target.value)}}  type="number" step="0.1" className="form-input" />
                                <div className="form-select-container">
                                    <select className="form-select">
                                        <option value="eth">ETH</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-swap">
                                <button disabled={loading} onClick={handleSwap} className="button button-swap"><MdSwapVert /></button>
                            </div>
                            <div className="form-item">
                                <input name="inputBNF" id="inputBNF" value={inputBNF} onChange={(e) => {setInputBNF(e.target.value)}} type="number" step="0.1" className="form-input" />
                                <div className="form-select-container">
                                    <select className="form-select">
                                        <option value="bnf">BNF</option>
                                    </select>
                                </div>
                            </div>
                            </>
                        )}
                        <div className="form-item">
                            <button className="button button-form">Swap</button>
                        </div>
                    </form>
        </div>
    );
};

export default Swapper;
