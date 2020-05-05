import React, {useState} from 'react';
import classes from './MainPage.module.css';
import {NavLink} from "react-router-dom";
import {DropdownButton, Dropdown} from 'react-bootstrap';
import Select from 'react-select';
import mainBanner from '../../assets/images/crowdfundingBanner6.png'
import projectImg from '../../assets/images/unnamed.png'
import grayBack from "../../assets/images/GrayBackground.jpg";
import ProjectBlock from "./ProjectBlock/ProjectBlock";

const MainPage = (props) => {

    const [searchCompanyValue, setSearchCompanyValue] = useState('');
    const [sortValue, setSortValue] = useState(null);
    let changeSearchCompanyValue = (text) => {
        setSearchCompanyValue(text.target.value);
    };
    const categoryOptions = [
        {value: 'Arts', label: 'Arts'},
        {value: 'Comics or illustration', label: 'Comics or illustration'},
        {value: 'Design', label: 'Design'},
        {value: 'Film', label: 'Film'},
        {value: 'Games', label: 'Games'},
        {value: 'Music', label: 'Music'},

    ];
    const sortedOptions = [
        {value: 'Sorted by Collected money', label: 'Sorted by Collected money'},
        {value: 'Sorted by Name', label: 'Sorted by Name'},
        {value: 'Sorted by Creation date', label: 'Sorted by Creation date'},

    ];
    const onChangeCategory = (values) => {
        if (values) {
            console.log(values);
            props.getByCategory(values.map((category) => {
                return category.value
            }));
        } else if (values === null) {
            console.log(values);
            props.getProjectsThunkCreator();
        }
    };
    const onChangeSort = (value) => {
        if (value !== null) {
            setSortValue(value.value);
        } else {
            console.log(value);
            setSortValue(value)
        }
    };
    let projects = props.projects;
    if (sortValue === 'Sorted by Name') {
        projects = projects.sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
    } else if (sortValue === 'Sorted by Collected money') {
        projects = projects.sort(function (a, b) {
            return b.currentSum - a.currentSum;
        });
    } else if (sortValue === 'Sorted by Creation date') {
        projects = projects.sort(function (a, b) {
            return b.beginningDate - a.beginningDate;
        });
    } else {
        props.getProjectsThunkCreator();
    }
    let project = projects.map((value) => {
        if (searchCompanyValue !== '' && value.name.startsWith(searchCompanyValue) === false) {
            return false
        }
        return <ProjectBlock projectID={value.projectID} images={value.images[0]} companyID={value.companyID}
                             name={value.name} description={value.description} userName={value.userName}
                             category={value.category} location={value.location} currentSum={value.currentSum}
                             donateGoal={value.donateGoal} duration={value.duration} beginningDate={value.beginningDate}/>

    });
    return (
        <div className={classes.mainWrapper}>
            <img alt='321' src={mainBanner}/>
            <div className={classes.content}>
                <div className={classes.category}>
                    <Select
                        isMulti
                        name="categories"
                        options={categoryOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        placeholder='Choose the category'
                        onChange={onChangeCategory}
                    />
                </div>
                <div className={classes.selectors}>
                    <div className={classes.searchForm}>
                        <input type='text' placeholder='Search by company name' maxLength='40' autoFocus
                               value={searchCompanyValue} onChange={changeSearchCompanyValue}/>
                    </div>
                    <div className={classes.sortedForm}>
                        <Select
                            name="sort"
                            options={sortedOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder='Sort by'
                            isClearable='true'
                            onChange={onChangeSort}
                        />
                    </div>
                </div>
                <div className={classes.companies}>
                    {project.every((element) => {
                        return element !== false
                    }) ? project : <img alt={'qwe'} src={projectImg}/>}
                </div>
            </div>
        </div>

    );
};
export default MainPage;