import React from 'react';
import Main from "./containers/main";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    );
}

export default App;
