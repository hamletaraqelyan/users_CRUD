import React, {memo} from 'react';

import {
    Cuisine,
    Delete,
    Email,
    Homepage,
    Learn,
    Notification,
    Photo,
    Post,
    Restaurants,
    Search,
    Shop,
    SortIcon,
    Users,
    Spinner,
    RightArrow,
    LeftArrow
} from '../assets/media/icons';

const SVG_LIST = {
    users: <Users/>,
    homepage: <Homepage/>,
    restaurants: <Restaurants/>,
    learn: <Learn/>,
    cuisine: <Cuisine/>,
    shop: <Shop/>,
    post: <Post/>,
    search: <Search/>,
    notification: <Notification/>,
    email: <Email/>,
    delete: <Delete/>,
    sort_icon: <SortIcon/>,
    photo: <Photo/>,
    spinner: <Spinner/>,
    rightArrow: <RightArrow/>,
    leftArrow: <LeftArrow/>
};

const SVG = ({src}) => {
    return SVG_LIST[src];
};

export default memo(SVG);
