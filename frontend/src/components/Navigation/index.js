import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalMenuItem from './OpenModalMenuItem';
import SearchSpotModal from '../SearchSpotModal/SearchSpotModal';
import './Navigation.css';
import logo from './resources/havefunbnb.png'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  
    return (
      <ul className='nav-ul'>
        <li>
          <NavLink exact to="/" id='logo-link'>
            {/* <i className="fa-brands fa-fly fa-xl"></i> */}
            {/* <i className="fa-solid fa-house-chimney-window"></i> */}
            <img src={logo} alt="havefunbnb" />
            <h6>HaveFunBnb</h6>
          </NavLink>
        </li>

        <div id='spot-search'>
          <OpenModalMenuItem
                  itemText="Search Spots"
                  // onItemClick={closeMenu}
                  modalComponent={<SearchSpotModal />}
                />
        </div>
        <div id='login-user'>
          {/* <div id='creat-new-spot-div'> */}
          {(()=> {
            if(sessionUser) {
                return <NavLink to='/spots/new' id='creat-new-spot-link'>Create a New Spot</NavLink>
            }
          })()}
          {/* </div> */}
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </ul>
      );
  }

  

export default Navigation;