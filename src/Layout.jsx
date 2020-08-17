import React, { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import ProblemList from "./components/ProblemList";

// Por el momento se llama asi, pero sera dif
const Layout = () => {
    const [basicos, setBasicos]= useState([]);

    useEffect(() => {
        fetch(`http://localhost:3004/basicos`)
            .then(res => res.json())
            .then(basicos => setBasicos(basicos));
    }, []);

    return (
        <Router>
            <Fragment>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/basicos">Basicos</Link></li>
            </ul>
            <Route path="/" exact>
                Home!
            </Route>
            <Route path="/basicos">
                <h2>Hurones Basicos</h2>
                <ProblemList problems={basicos} />
            </Route>
            </Fragment>
        </Router>
    )

}

export default Layout;