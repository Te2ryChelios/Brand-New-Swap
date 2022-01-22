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

function App() {
  const [alert, setAlert] = useState({
    isActive: false,
    type: '',
    message: ''
  })

  
  const dispatch = useDispatch()
  const blockchain = useSelector((state) => state.blockchain)
  const data = useSelector((state) => state.data)

  useEffect(() => {
    if(blockchain.errorMsg){
      setAlert({
        isActive: true,
        type: 'error',
        message: blockchain.errorMsg.toString()
      })
    }
  }, [blockchain.errorMsg])


  useEffect(() => {
    dispatch(connect())
    console.log(blockchain)
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
      {alert.isActive && <Alert alert={alert} resetAlert={resetAlert} />}
      <Navbar account={blockchain.account} />
      <div className="flex-center">
        <Swapper alert={alert} setAlert={setAlert} resetAlert={resetAlert} />
      </div>
    </div>
  );
}

export default App;
