
import React, { useState } from 'react';
import classes from './MainPage.module.css';
import { NavLink } from "react-router-dom";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import Select from 'react-select';
import mainBanner from '../../assets/images/crowdfundingBanner6.png'

const MainPage = (props) => {
  const colourOptions = [
    { value: 'Arts', label: 'Arts', color: '#00B8D9', isFixed: true },
    { value: 'Comics', label: 'Comics or illustration', color: '#0052CC' },
    { value: 'Design', label: 'Design', color: '#5243AA' },
    { value: 'Film', label: 'Film', color: '#FF5630', isFixed: true },
    { value: 'Games', label: 'Games', color: '#FF8B00' },
    { value: 'Music', label: 'Music', color: '#FFC400' },

  ];
  const sortedOptions = [
    { value: 'Newest', label: 'Sorted by Newest', color: '#00B8D9', isFixed: true },
    { value: 'Name', label: 'Sorted by Name', color: '#0052CC' },

  ];
  return (
    <div className={classes.mainWrapper}>
      <img alt='321'src={mainBanner}/>
      <div className={classes.content}>
      <div className={classes.category}>
        <Select
          isMulti
          name="colors"
          options={colourOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder='Choose the category'
        />
      </div>
      <div className={classes.selectors}>
      <div className={classes.searchForm}>
        <input type='text' placeholder='Search by company name' maxLength='40' autoFocus />
      </div>
      <div className={classes.sortedForm}>
      <Select
          name="sort"
          options={sortedOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder='Sort by'
          isClearable='true'
        />
      </div>
      </div>
          <div className={classes.companies}>

          </div>
      </div>
    </div>
    
  );
};
export default MainPage;