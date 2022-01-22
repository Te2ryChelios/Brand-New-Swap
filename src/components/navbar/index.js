import React from 'react';

const Navbar = ({account}) => {
  return (
    <header>
        <h1>Brand New Swap</h1>
        <span className="responsive-title">BNS</span>
        {account ? 
        <button className="button button-navbar">{account.substring(0, 6)}</button> 
        : 
        <button className="button button-navbar">Sign In</button>
        }
    </header>
  );
};

export default Navbar;
