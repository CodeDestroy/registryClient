import logo from './logo.svg';
import './App.css';
import { observer } from 'mobx-react-lite';
import { React, useContext, useEffect } from 'react';
import MainPage from './MainPage';
import Login from './Login';
import { Context } from './';

function App() {
  
  const { store } = useContext(Context);


  useEffect ( () => {
    
    if (localStorage.getItem('token')) {
      store.checkAuth();
    }
  }, [store])
  
  return (
    <>
      { !store.isAuth ?
        <Login/>
        :
        <MainPage/>
      } 
    </>
  );
}

export default observer(App);
