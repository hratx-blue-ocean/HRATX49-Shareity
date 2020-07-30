import React, { useState, useEffect } from 'react';
import NavBar from './LandingSubComponents/navBar.jsx';
import Cards from './LandingSubComponents/cards.jsx';
import Axios from 'axios';
import Paginater from './LandingSubComponents/paginate.jsx';
import ShowDetails from './LandingSubComponents/showDetails.jsx';
import Login from './Login.jsx';
var _ = require('lodash');
import AllItems from './data'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

let currentUser;
if (localStorage.user){
  currentUser = JSON.parse(localStorage.user).type;
} 

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10)
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loginClicked, setLoginClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [typeOfUser, setTypeOfUser] = useState(currentUser);
  const [toSortBy, setToSortBy] = useState('date');

  /*
  Functions to build
  Click handler for the 4 sorting functions ---> Sort
  */

  useEffect(() => {
    const retrieveItems = async () => {
      setLoading(true);
      const res = await Axios.get('/items');
      // filter function
      let unclaimedItems = res.data.filter(item => {
        return item.claimedBy === null;
       }
      );
      // console.log('Done',unclaimedItems)
      // console.log(res.data)
      // setItems(res.data)
      setItems(unclaimedItems)
      setLoading(false)
    };
    retrieveItems();
  }, []);

  const displayCard = (event, item) => {
    //This is the Click Handler for displaying an item on click
    //To be continued
    // console.log("item", item.name)
    setSelectedCard(item);
    setShowDetails(true);
  }

  const closeCard = () => {
    //reset & close
    setSelectedCard(null);
    setShowDetails(false);
  };

  const handlingLogin = (event) => {
    // This is the click handler for the login in modal
    
    //check if user has valid token
    // Handling Log Out
    if(localStorage.getItem('token')){
      //remove their token
      // localStorage.setItem('token', '');
      localStorage.clear();
      setTypeOfUser(null)
      //set state to not logged in
      setIsLoggedIn(false);
      console.log("user is no longer logged in");
      //Handling Log In
    } else {
      //show pop up
      setLoginClicked(true);
      //sets state to logged in
      setIsLoggedIn(false);
      // console.log("You are now logged in");
    }
  }

  const closeLogin = () => {
    setLoginClicked(false);
  }

  const handleGoingToUserProfile = (event, name) => {
    //This is the Click Handler for going to the User Profile
    console.log(event)
    console.log(name)
  }

  const handleClaimingItem = (event,card)=>{ // function to handle claiming unclaimed stuff
    event.preventDefault();
    console.log('Here was the card that was claimed',card)
    //get the user thats logged in
    // if user type is charity
    if (!isLoggedIn){
      alert('Please log in as a Charity to claim this item');
      return;
    } else {
      let charityInfo = JSON.parse(localStorage.user);
      let charityEmail = charityInfo.email;
      if (typeOfUser === 'charity'){
        //logic
        Axios.put('/items/',{
          user: charityEmail,
          usertype: 'charity',
          _id: card._id,
          item: { 
            claimedBy: charityInfo.name,
            charityEmail: charityEmail,
          },
        })
      } else {
        alert('Sorry, Only Charities can claim Items')
      }
    }
  }

  //Click handler for sort
  const handleSort = (event, name) =>{
    event.preventDefault();
    setToSortBy(name)
    sortArray(toSortBy)
  }

  //Function to sort
  const sortArray = type =>{
    const types = {
      name: 'name',
      date: 'dateCreated',
      category: 'category',
      location: 'Location'
    }
    const sortProperty = types[type];
    const sorted = _.orderBy(items, [sortProperty, 'asc'])
    setItems(sorted);
  }

  //Get Current Items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  //Change Page
  const paginate = (event, pageNumber) => { event.preventDefault(), setCurrentPage(pageNumber) };

  return (
    <div>
      <p>Landing Page</p>
      <div>
        < NavBar login={handlingLogin} user={handleGoingToUserProfile} />
      </div>
      <div>
        {loginClicked && <Login closeLogin={closeLogin} setTypeOfUser={setTypeOfUser} isLoggedIn={setIsLoggedIn}/>}
        {showDetails && <ShowDetails card={selectedCard} closeCard={closeCard} claimItem={handleClaimingItem} />}
        <Cards items={currentItems} displayCard={displayCard} loading={loading} sortBy={handleSort} />
        <Paginater
          paginate={paginate}
          itemsPerPage={itemsPerPage}
          totalItems={items.length}
        />
      </div>
    </div>
  );
};

export default LandingPage;