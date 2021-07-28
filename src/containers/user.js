import React, {useEffect, useRef, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from "axios";
import {BASE_PREFIX} from "../constants";
import SVG from "../components/SVG";
import Loader from "../components/loader";

const User = () => {
    const history = useHistory();
    const {slug} = useParams();
    const requiredFields = ['name', 'email', 'location'];

    const photoRef = useRef(null);
    const mailRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [loadingPhoto, setLoadingPhoto] = useState(false);
    const [userData, setUserData] = useState({});
    const [savedState, setSavedState] = useState(false);

    const getUserData = () => {
        setLoading(true);
        axios.get(`${BASE_PREFIX}/users/${slug}`)
            .then(response => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch(error => {
                error && history.push('/user');
                setLoading(false);
            })
    }

    useEffect(() => {
        slug && getUserData();
    }, []);

    const handleCollectData = (e) => {
        const {name, value} = e.target;
        setUserData({...userData, [name]: value});
    }

    const uploadPhoto = (e) => {
        const {name, files} = e.target;
        setLoadingPhoto(true);
        const FD = new FormData();
        const file = files[0];
        FD.append('file', file);
        axios.post(`${BASE_PREFIX}/images`,
            FD,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        ).then(res => {
            if (res.data.url) {
                setUserData({...userData, [name]: res.data.url});
                e.target.value = '';
                setLoadingPhoto(false);
            }
        })
    }

    const validateEmail = (email) => {
        return /.+@.+\.[A-Za-z]+$/.test(email);
    }

    const validateData = (requiredFields, data) => {
        if (data) {
            let result = {
                valid: true,
            };

            for (const el of requiredFields) {
                if (el === 'email' && !validateEmail(data[el])) {
                    result = {
                        valid: false,
                        fieldName: el
                    };
                    mailRef.current.classList.add('error');
                    break;
                }
                if (!data[el]) {
                    result = {
                        valid: false,
                        fieldName: el
                    }
                    break;
                }
                mailRef.current.classList.remove('error');
            }
            return result;
        }
    };

    const sendData = () => {
        const resultData = {
            id: new Date().getTime(),
            registeredDate: new Date().toISOString(),
            lastActiveDate: new Date().toISOString(),
            disabled: false,
            ...userData
        };

        if (validateData(requiredFields, resultData).valid) {
            slug ? axios.put(`${BASE_PREFIX}/users/${resultData.id}`, resultData)
                    .then(res => {
                        if (res.statusText === 'OK') {
                            setSavedState(true);
                            setTimeout(() => {
                                setSavedState(false);
                            }, 4000);
                        }
                    })
                :
                axios.post(`${BASE_PREFIX}/users`, resultData)
                    .then(res => {
                        if (res.statusText === 'Created') {
                            history.push(`/user/${res.data.id}`)
                        }
                    })
        }

        // console.log(resultData);
        // console.log(photoRef.current)
    }

    return (
        <div className='createUser mainContainer'>
            <div className='tableWrapper'>
                {loading ?
                    <Loader/>
                    :
                    <>
                        <div className='tableWrapper_newUser'>
                            <p>{slug ? 'Edit' : 'New'} user</p>
                            <div className='horizontalLine'/>
                        </div>
                        <div className='tableWrapperData'>
                            <div className='tableWrapperDataInputWrap'>
                                <input value={userData?.name} onChange={handleCollectData} type="text"
                                       placeholder='User name' name='name'/>
                            </div>
                            <div className='tableWrapperDataInputWrap'>
                                <input onChange={uploadPhoto} hidden id='photo'
                                       type="file" name='photo'/>
                                <label htmlFor="photo" className='photoLabel'>
                                    <SVG src='photo'/>
                                    Photo
                                </label>
                                <div className='photoPreview' ref={photoRef}>
                                    {loadingPhoto ?
                                        <Loader/> :
                                        userData.photo ?
                                            <div className='image'
                                                 style={{backgroundImage: `url(${userData.photo})`}}/>
                                            : ''
                                    }
                                </div>
                            </div>

                            <div className='tableWrapperDataInputWrap'>
                                <input ref={mailRef} value={userData?.email} onChange={handleCollectData} type="email"
                                       placeholder='Email' name='email'/>
                            </div>
                            <div className='tableWrapperDataInputWrap'>
                                <input value={userData?.location} onChange={handleCollectData} type="text"
                                       placeholder='Location' name='location'/>
                            </div>
                            <div className='tableWrapperDataSubmit'>
                                <div onClick={sendData} className="buttonBlue">{slug ? 'Save' : 'Create'}</div>
                                {savedState &&
                                <p>Saved!</p>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default User;