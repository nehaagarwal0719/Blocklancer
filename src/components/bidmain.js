import React , {Component} from 'react';

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


//import  { Redirect } from 'react-router-dom';
import Bid from './bid.js';


class BidMain extends Component{


 

	render()
	{
		return(
      
		  <div id="content">
            <form onSubmit={(event) => {
                event.preventDefault()
                const name = this.bidderName.value
                const des  = this.bidderDes.value
                const time = this.bidderTime.value
                const price = this.bidderPrice.value
                  this.props.createBid(name,des,time,price)
             }}>
                  <div className="form-group mr-sm-2">
                     <input
                        id="bidderName"
                        type="text"
                        ref={(input) => { this.bidderName = input }}
                        className="form-control"
                        placeholder="Bidder Name"
                        required />
                        <input
                        id="bidderDes"
                        type="text"
                        ref={(input) => { this.bidderDes = input }}
                        className="form-control"
                        placeholder="Bidder Description"
                        required />
                        <input
                        id="bidderTime"
                        type="text"
                        ref={(input) => { this.bidderTime = input }}
                        className="form-control"
                        placeholder="Bidder Time"
                        required />
                        <input
                        id="bidderPrice"
                        type="text"
                        ref={(input) => { this.bidderPrice = input }}
                        className="form-control"
                        placeholder="Bidder Price"
                        required />
                  </div>          
                  <button type="submit" className="btn btn-primary">Bid</button>
            </form>
            <p>&nbsp;</p>
            <h2>Bid List</h2>
            <table className="table">
                <thead>
                  <tr>    
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Time</th>
                    <th scope="col">Price</th>
                    <th scope="col">Owner</th>
                   </tr>
                </thead>
                <tbody id="workList">
                  {this.props.bids.map((bid,key)=>{
                    return(
                      <tr key={key}>
                        <td>{bid.name}</td>
                        <td>{bid.message}</td>
                        <td>{bid.time}</td>
                        <td>{bid.price}</td>
                        <td>{bid.owner}</td>
                      </tr>
                     );
                   })}
               </tbody>

          </table>
         
         </div>
		);
	}
}

export default BidMain;
