import {useState, useEffect} from 'react';
import './App.css';
import 'animate.css'
import Navbar from './components/navbar';
import Swapper from './components/swapper';
import Alert from './components/alert';
import Web3 from 'web3'
import { useDispatch, useSelector } from 'react-redux'
import {connect} from './redux/blockchain/blockchainActions'
import {fetchData} from './redux/data/dataActions'
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [alert, setAlert] = useState({
    isActive: false,
    type: '',
    message: ''
  })
  const [loading, setLoading] = useState(true)

  
  const dispatch = useDispatch()
  const blockchain = useSelector((state) => state.blockchain)
  const data = useSelector((state) => state.data)

  useEffect(() => {
    if(blockchain.errorMsg){
      resetAlert()
      setAlert({
        isActive: true,
        type: 'error',
        message: blockchain.errorMsg
      })
    }
  }, [blockchain.errorMsg])


  useEffect(() => {
    setLoading(true)
    const logged = async () => {
      await dispatch(connect())
    }
    logged()
    setLoading(false)
  }, [])

  useEffect(() => {
    if(blockchain.account !== ""){
      dispatch(fetchData(blockchain.account))
    }
  }, [blockchain.account])


  const resetAlert = () => {
    setAlert({isActive: false, type: '', message: ''})
  }

  return (
    <div className="Section">
      {loading && <div className='full-loader'><ClipLoader color={"#673AB7"} loading={loading}  size={150} /></div>}
      {alert.isActive && <Alert alert={alert} resetAlert={resetAlert} />}
      <Navbar blockchain={blockchain} />
      <div className="flex-center">
        <Swapper alert={alert} setAlert={setAlert} resetAlert={resetAlert} blockchain={blockchain} dispatch={dispatch} />
      </div>
      <footer>
      Copyright © 2021 Chelios.
      </footer>
    </div>
  );
}

export default App;
