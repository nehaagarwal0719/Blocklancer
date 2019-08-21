import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import freelancer from '../abis/freelancer.json';
import { BrowserRouter as Router,Switch, Route} from "react-router-dom";
import {Link} from "react-router-dom";
import Main from './main.js';
import Bid from './bid.js';
import Home from "./Home.js";



class App extends Component {

  render() {
    return (
    <Router>
    <div>
    <Route path="/" exact component ={Home} />    
    <Route path="/bid" exact component ={Bid}/>    
    </div>
    </Router>
    );
  }
}

export default App;
