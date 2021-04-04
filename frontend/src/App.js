import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';

function App() {
    return (
        <main>
            <Switch>
                <Route path="/" component={Home} exact />
                <Route path="/create" component={Create} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/post/:id" component={Post} />
            </Switch>
        </main>
    )
}

export default App;
