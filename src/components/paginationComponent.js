import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import SVG from "./SVG";
import Select from 'react-select';

const PaginationComponent = ({rowsPerPage, rowCount, onChangePage, onChangeRowsPerPage, currentPage}) => {
    const options = [
        { value: 10, label: '10 / page' },
        { value: 15, label: '15 / page' },
        { value: 20, label: '20 / page' },
        { value: 25, label: '25 / page' },
        { value: 30, label: '30 / page' },
    ];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const calculatePagesCount = () => {
        const count = Math.ceil(rowCount / rowsPerPage);
        return Array.from({length: count}, (_, i) => i + 1);
    }

    const handleChangeRowPerPage = selectedOption => {
        setSelectedOption(selectedOption);
        onChangeRowsPerPage(selectedOption.value);
    };

    useEffect(() => {
        const currentOption = options.find(opt => opt.value === rowsPerPage);
        console.log(currentOption);
        setSelectedOption(currentOption);
    }, [rowsPerPage])

    return (
        <div className='paginationComponent'>
            <div className='paginationComponentPages'>
                <p>Changer</p>
                <div className='paginationComponentPagesList'>
                    <button disabled={currentPage === 1} onClick={() => onChangePage(currentPage - 1)}>
                        <SVG src='leftArrow'/>
                    </button>
                    {calculatePagesCount().map(page =>
                        <button className={`${page === currentPage ? 'active' : ''}`} key={page}
                                onClick={() => onChangePage(page)}>
                            {page}
                        </button>
                    )}
                    <button disabled={currentPage === calculatePagesCount().length} onClick={() => onChangePage(currentPage + 1)}>
                        <SVG src='rightArrow'/>
                    </button>
                    <Select value={selectedOption}
                            options={options}
                            onChange={handleChangeRowPerPage}
                            classNamePrefix = {'paginationComponentPagesListSelect'}
                    />
                </div>
            </div>
            <div className='paginationComponentTotal'>
                Total number of users <span>{rowCount}</span>
            </div>
        </div>
    )
}

PaginationComponent.propTypes = {
    rowsPerPage: PropTypes.number.isRequired,
    rowCount: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default PaginationComponent;