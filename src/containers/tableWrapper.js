import React, {useLayoutEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {Link, useHistory} from "react-router-dom";
import axios from 'axios';
import {BASE_PREFIX} from "../constants";
import SVG from "../components/SVG";
import Loader from "../components/loader";
import SwitchComponent from "../components/switchComponent";
import PaginationComponent from "../components/paginationComponent";

const TableWrapper = () => {
    const history = useHistory();
    const [usersData, setUsersData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [activePage, setActivePage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [activeSort, setActiveSort] = useState({
        key: null,
        order: null
    });

    const columns = [
        {
            name: 'Photo',
            cell: row => <div className='tablePhoto' style={{backgroundImage: `url(${row.photo})`}}/>,
            width: '70px',
        },
        {
            name: 'Name',
            sortable: true,
            selector: () => 'name',
            cell: row => row.name,
            // grow: 2,
        },
        {
            name: 'Location',
            selector: () => 'location',
            cell: row => row.location,
            sortable: true,
        },
        {
            name: 'Registered date',
            sortable: true,
            selector: () => 'registeredDate',
            cell: row => formattedDate(row.registeredDate),
        },
        {
            name: 'Last active date',
            sortable: true,
            selector: () => 'lastActiveDate',
            cell: row => formattedDate(row.lastActiveDate),
        },
        {
            name: 'Email',
            cell: row => <a href={`mailto:${row.email}`} target='_blank' rel='noreferrer noopener'><SVG
                src='email'/></a>,
            right: true,
            width: '100px'
        },
        {
            name: 'Actions',
            right: true,
            cell: record => {
                return (
                    <>
                        <SwitchComponent user={record} callback={handleDisableUser}/>
                        <div
                            className="deleteIcon"
                            onClick={() => deleteUser(record.id)}>
                            <SVG src={'delete'}/>
                        </div>
                    </>
                );
            }
        },
    ];

    const handleDisableUser = (id, state) => {
        axios.patch(`${BASE_PREFIX}/users/${id}`, {disabled: state})
            .then(res => {
                console.log(res);
            })
    }

    const deleteUser = (id) => {
        axios.delete(`${BASE_PREFIX}/users/${id}`)
            .then(res => {
                res.statusText === "OK" && getUsers();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getUsers = (page = 1, limit = 10, sortBy, orderBy) => {
        setLoading(true);
        axios.get(`${BASE_PREFIX}/users?_page=${page}&_limit=${limit}${sortBy ? `&_sort=${sortBy}` : ''}${orderBy ? `&_order=${orderBy}` : ''}`)
            .then(response => {
                if (response.statusText === "OK") {
                    const count = response.headers['x-total-count'];
                    if (response.data.length !== 0) {
                        setTotalCount(+count);
                        setUsersData(response.data);
                        setLoading(false);
                    } else {
                        const neededPage = Math.ceil(count / perPage);
                        setActivePage(neededPage);
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    function formattedDate(d = new Date()) {
        const date = new Date(d);
        return [date.getDate(), date.getMonth() + 1, date.getFullYear()]
            .map(n => n < 10 ? `0${n}` : `${n}`).join('.');
    }

    useLayoutEffect(() => {
        getUsers(activePage, perPage, activeSort.key, activeSort.order);
    }, [activePage, perPage, activeSort]);

    const handleSort = (column, sortDirection) => {
        const sortConfig = {
            key: column.selector(),
            order: sortDirection,
        }
        setActiveSort({...sortConfig});
    }

    const handleGetCurrentUser = (userData) => {
        history.push(`user/${userData.id}`);
    }

    const changePage = (page) => {
        setActivePage(page);
    }

    const changePerPage = (currentRowsPerPage) => {
        setPerPage(currentRowsPerPage);
    }

    const customStyles = {
        rows: {
            style: {
                minHeight: '40px',
                fontSize: '0.7vw',
                color: '#788195',
            }
        },
        headRow: {
            style: {
                backgroundColor: '#F1F3F5',
                minHeight: '40px',
                color: '#788195',
                borderRadius: '4px',
                borderBottom: 'none'
            }
        },
    };

    return (
        <div className='tableWrapper mainContainer'>
            <div className='tableWrapper_newUser'>
                <p>All users</p>
                <div className='horizontalLine'/>
                <Link to={'/user'} className="buttonBlue">New user</Link>
            </div>
            <DataTable
                columns={columns}
                data={usersData}
                pagination
                paginationServer
                paginationPerPage={perPage}
                paginationTotalRows={totalCount}
                paginationComponent={() => <PaginationComponent rowCount={+totalCount} currentPage={activePage}
                                                                onChangePage={changePage}
                                                                onChangeRowsPerPage={changePerPage}
                                                                rowsPerPage={perPage}/>}
                paginationComponentOptions={{
                    rowsPerPageText: 'Rows per page:',
                    rangeSeparatorText: 'of',
                    noRowsPerPage: false,
                    selectAllRowsItem: false,
                    selectAllRowsItemText: 'All'
                }}
                // onChangePage={changePage}
                onChangeRowsPerPage={changePerPage}
                selectableRows
                onSort={handleSort}
                sortIcon={<div className='sortIcon'><SVG src='sort_icon'/></div>}
                sortServer
                pointerOnHover
                highlightOnHover
                progressPending={loading}
                progressComponent={<Loader/>}
                onRowClicked={handleGetCurrentUser}
                customStyles={customStyles}
            />
        </div>
    );
};

export default TableWrapper;