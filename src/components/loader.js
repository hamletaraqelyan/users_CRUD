import React from 'react';
import SVG from "./SVG";

const Loader = () => {
    return (
        <div className='loader'>
            <SVG src={'spinner'}/>
        </div>
    )
}

export default Loader;