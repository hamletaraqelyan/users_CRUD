import React from 'react';
import TableWrapper from "./tableWrapper";
import LeftMenu from "./leftMenu";
import Header from "../components/header";
import {Switch, Route} from "react-router-dom";
import User from "./user";

const Main = () => {
    return (
        <div className='main'>
            <LeftMenu />
            <Header/>
            <Switch>
                <Route exact path="/">
                    <TableWrapper />
                </Route>
                <Route exact path={["/user", "/user/:slug"]}>
                    <User/>
                </Route>
            </Switch>
        </div>
    )
};

export default Main;