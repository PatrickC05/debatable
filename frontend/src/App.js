import './App.css';
import React, {useState} from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Index from './components/Index';
import Create from './components/Create';
import Login from './components/Login';
import Register from './components/Register';
import Post from './components/Post';
import { UserContext } from "./components/UserContext";

function App() {
    const [user, setUser] = useState(null);
    return (
        <div>
            <header>
                <Link style={{ textDecoration: 'none', align: 'right'}} className="navlink" to="/">Home</Link>
                <Link style={{ textDecoration: 'none', align: 'right'}} className="navlink" to="/login">Login</Link>
                <Link style={{ textDecoration: 'none', align: 'right'}} className="navlink" to="/create">Create</Link>
            </header>
            <main>
                <Switch>
                    <UserContext.Provider value={{user, setUser}}>
                        <Route exact path="/" component={Index} />
                        <Route exact path="/create" component={Create} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/post/:id" component={Post} />
                    </UserContext.Provider>
                </Switch>
            </main>
        </div>
    )
}

export default App;
