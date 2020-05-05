import React, {useState} from 'react';
import classes from './Header.module.css';
import {NavLink} from "react-router-dom";
import navLogo from '../../assets/images/chuits.png'
import userIcon from '../../assets/images/userIcon.png'
import {DropdownButton, Dropdown} from 'react-bootstrap';

const Header = (props) => {
    return (
        <header className={classes.header + " " + classes.banner}>

            <span className={classes.navWrapper}>
                <img alt='123' src={navLogo}/>
                <span className={classes.links}>
                    <NavLink to={'/projects'}>
                        <span className={classes.link}>PROJECTS</span>
                    </NavLink>
                    <NavLink to={'/createProject'}>
                        <span className={classes.link}>CREATE PROJECT</span>
                    </NavLink>
                </span>
                <span className={classes.loginBlock}>

                    {props.isAuth ?
                        <DropdownButton alignRight className={classes.dropdown} id="dropdown-menu-align-right"
                                        title={<span>{props.userName}<img className={classes.userIcon}
                                                                          src={userIcon}
                                                                          alt="user pic"
                                        /></span>}>
                            <NavLink to={'/userProfile'}><Dropdown.Item as="button">My profile</Dropdown.Item></NavLink>
                            <Dropdown.Divider/>
                            <Dropdown.Item as="button" onClick={() => {
                                props.logOut()
                            }}>Log out</Dropdown.Item>
                        </DropdownButton> : <span>
                            <NavLink to={'/login'}>
                                <span className={classes.loginBtn}>LOG IN</span>
                            </NavLink>
                            <NavLink to={'/signup'}>
                                <button className={classes.signupBtn} type='button'>SIGN UP</button>
                            </NavLink></span>}
                </span>
            </span>

        </header>
    );
};
export default Header;