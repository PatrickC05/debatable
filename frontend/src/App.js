import './App.css';
import React, {useState} from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import Home from './components/Home';
import Create from './components/Create';
import Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';
import { UserContext } from "./components/UserContext";

function App() {
    const [user, setUser] = useState(null);
    return (
        <main>
            <Switch>
                <UserContext.Provider value={{user, setUser}}>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/post/:id" component={Post} />
                </UserContext.Provider>
            </Switch>
        </main>
    )
}

export default App;
