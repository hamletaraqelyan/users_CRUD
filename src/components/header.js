import React from 'react';
import SVG from "./SVG";

const Header = () => {
    return (
        <header>
            <div className='headerWrapper'>
                <div className='searchIcon'>
                    <SVG src={'search'}/>
                </div>
                <div className='notificationIcon'>
                    <SVG src={'notification'}/>
                    <div className='notificationIconCount'>4</div>
                </div>
                <div className='userAvatar active'>
                    <div className='userAvatarImage'/>
                </div>
            </div>
        </header>
    )
}

export default Header;