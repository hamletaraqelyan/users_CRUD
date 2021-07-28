import React, {useState} from 'react';
import Switch from "react-switch/index";

const SwitchComponent = ({user, callback}) => {
    const [checked, setChecked] = useState(!user.disabled ?? false);

    const handleClick = (c) => {
        setChecked(c);
        callback(user.id, !c);
    }

    return (
        <Switch onChange={c => handleClick(c)}
                checked={checked}
                offColor={'#F54745'}
                onColor={'#72B59B'}
                activeBoxShadow={null}
                handleDiameter={6}
                width={20}
                height={10}
                checkedIcon={null}
                uncheckedIcon={null}
        />
    )
}

export default SwitchComponent;