import React, { useEffect } from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import { getUserAuth } from './action';
import { connect} from "react-redux"

function App(props) {

  useEffect(() =>{
    props.getUserAuth();
  },[]);

  return (
    <BrowserRouter>
    <div className="App"> 
       <Routes>
          <Route path="/" element={ <Login />} />
          <Route path="/home" element={ <Home />} />
       </Routes>
    </div>
    </BrowserRouter>
  );
}

const mapStateProps = (state) =>
{
    return{
        
    };
}

const mapDispatchToProps = (dispatch) => ({
    getUserAuth : () => dispatch(getUserAuth()),
})

export default connect(mapStateProps, mapDispatchToProps)(App)

