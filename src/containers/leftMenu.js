import React from 'react';
import {Link} from "react-router-dom";
import SVG from "../components/SVG";

const LeftMenu = () => {
    return (
        <div className='leftMenu'>
            <Link className='leftMenuLink' to={'/'}><SVG src='homepage'/>Homepage</Link>
            <Link className='leftMenuLink active' to={'/'}><SVG src='users'/>Users</Link>
            <Link className='leftMenuLink' to={'/'}><SVG src='users'/>Premium users</Link>
            <Link className='leftMenuLink' to={'/'}><SVG src='restaurants'/>Restaurants</Link>
            <Link className='leftMenuLink' to={'/'}><SVG src='learn'/>Learn</Link>
            <Link className='leftMenuLink' to={'/'}><SVG src='cuisine'/>Cuisine</Link>
            <Link className='leftMenuLink' to={'/'}><SVG src='shop'/>Shop</Link>
            <Link className='leftMenuLink' to={'/'}><SVG src='post'/>Post</Link>
        </div>
    )
}

export default LeftMenu;