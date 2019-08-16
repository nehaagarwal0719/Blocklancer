import React , {Component} from 'react';

import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";


//import  { Redirect } from 'react-router-dom';
import Bid from './bid.js';


class Main extends Component{


 

	render()
	{
		return(
      
			<div id="content">
				    <h1>Freelancer</h1>
            <form onSubmit={(event) => {
          			event.preventDefault()
         			  const name = this.workName.value
          			this.props.createWork(name)
             }}>
                  <div className="form-group mr-sm-2">
                     <input
                        id="workName"
                        type="text"
                        ref={(input) => { this.workName = input }}
                        className="form-control"
                        placeholder="Work Name"
                        required />
                  </div>
          
                  <button type="submit" className="btn btn-primary">Add Work</button>
            </form>
            <p>&nbsp;</p>
            <h2>Work List</h2>
            <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Owner</th>
                    <th scope="col"></th>
                   </tr>
                </thead>
                <tbody id="workList">
                  {this.props.works.map((work,key)=>{
                    return(
                      <tr key={key}>
                        <th scope="row">{work.id.toString()}</th>
                        <td>{work.name}</td>
                        <td>{work.owner}</td>
                        <td><Router><Link to='/bid' >Click to login</Link><Route path="/bid" component={Bid} /></Router></td>
                      </tr>
                     );
                   })}
               </tbody>
               
          </table>
          <Router>
        <Switch>
        <Route exact path="/bid" component={Bid} />
        </Switch>
        </Router>
			</div>
		);
	}
}

export default Main;