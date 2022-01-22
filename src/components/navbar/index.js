import React from 'react';
import Identicon from 'identicon.js'

const Navbar = ({blockchain}) => {
  return (
    <header>
        <h1>Brand New Swap</h1>
        <span className="responsive-title">BNS</span>
        {blockchain.account ? 
        <p className="navbar-item">
          <img height="30" width="30" src={`https://avatars.dicebear.com/api/miniavs/${blockchain.account}.svg`} alt="avatar" /> 
          {blockchain.account.substring(0, 6)}
        </p> 
        : 
        <button className="button button-navbar">Sign In</button>
        }
    </header>
  );
};

export default Navbar;
