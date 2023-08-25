import './App.css'
import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import News from './Components/News'
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

export default class App extends Component {

  state={
    progress:30
  }
  setprogress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        
       <Router>
       <Navbar/>
       <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
       <Switch>
          <Route exact path="/"><News setprogress={this.setprogress}  pageSize={15} country="us" category="general"/> </Route>
          <Route exact path="/home"><News setprogress={this.setprogress}    key="general" pageSize={15} country="us" category="general"/> </Route>
          <Route exact path="/health"><News setprogress={this.setprogress}   key="health" pageSize={15} country="us" category="health"/> </Route>
          <Route exact path="/business"><News setprogress={this.setprogress}  key="business" pageSize={15} country="us" category="business"/> </Route>
          <Route exact path="/entertainment"><News setprogress={this.setprogress}     key="entertainment" pageSize={15} country="us" category="entertainment"/> </Route>
          <Route exact path="/science"><News setprogress={this.setprogress}    key="science" pageSize={15} country="us" category="science"/> </Route>
          <Route exact path="/sports"><News setprogress={this.setprogress}    key="sports" pageSize={15} country="us" category="sports"/> </Route>
          <Route exact path="/technology"><News  setprogress={this.setprogress}   key="technology" pageSize={15} country="us" category="technology"/> </Route>
          
        </Switch>
       </Router>
      </div>
    )
  }
}