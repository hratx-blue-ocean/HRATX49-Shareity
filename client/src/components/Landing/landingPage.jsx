import React, { useState, useEffect } from 'react';
import NavBar from './LandingSubComponents/navBar.jsx';
import Login from './Login.jsx';
import Cards from './LandingSubComponents/cards.jsx';
import ShowDetails from './LandingSubComponents/showDetails.jsx';
import Paginater from './LandingSubComponents/paginate.jsx';
import Footer from './LandingSubComponents/footer.jsx';
import styles from './landingPage.css';
import Axios from 'axios';
var _ = require('lodash');
require("regenerator-runtime/runtime");

let currentUser;
let logged;



if (localStorage.token) {
  currentUser = JSON.parse(localStorage.user).type;
  logged = true;
} else {
  logged = false;
  currentUser = null;
}

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(18)
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [loginClicked, setLoginClicked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(logged);
  const [typeOfUser, setTypeOfUser] = useState(currentUser);
  const [toSortBy, setToSortBy] = useState('date');
  const [isWelcomeMessageShowing, setIsWelcomeMessageShowing] = useState(false);

  // Axios Request to get all items and filter out claimed
  const retrieveItems = async () => {
    setLoading(true);
    const res = await Axios.get('/items');
    let unclaimedItems = res.data.filter(item => {
      return item.claimedBy === null;
    }
    );
    setItems(unclaimedItems)
    setLoading(false)
  };

  useEffect(() => {
    retrieveItems();
  }, []);

  // Click Handler to show card based on card
  const displayCard = (event, item) => {
    setSelectedCard(item);
    setShowDetails(true);
  }

  //Click Handler to Close Card
  const closeCard = () => {
    setSelectedCard(null);
    setShowDetails(false);
  };

  // Click Handler for login functionality
  const handlingLogin = (event) => {
    //If Logging Out
    if (localStorage.getItem('token')) {
      // Clear Local Storage
      localStorage.clear();
      // Clear type of user
      setTypeOfUser(null)
      // and set logout state
      setIsLoggedIn(false);
    } else { // If logging in
      setLoginClicked(true);
      // Clear log in if true
      setIsLoggedIn(false);
    }
  }

  //Click Handler for logging in
  const closeLogin = () => {
    setLoginClicked(false);
    if (isLoggedIn) {
      ///show wlcome message
      setIsWelcomeMessageShowing(true);
    }
  }

  const handleClaimingItem = (event, card) => { // function to handle claiming unclaimed stuff
    event.preventDefault();
    if (!isLoggedIn) {
      alert('Please log in as a Charity to claim this item');
      return;
    } else {
      let charityInfo = JSON.parse(localStorage.user);
      let charityEmail = charityInfo.email;
      if (typeOfUser === 'charity') {
        Axios.put('/items/', {
          user: charityEmail,
          usertype: 'charity',
          _id: card._id,
          item: {
            claimedBy: charityInfo.name,
            charityEmail: charityEmail,
          },
        }), closeCard(), retrieveItems()
      } else {
        alert('Sorry, Only Charities can claim Items')
      }
    }
  }

  //Click handler for sort
  const handleSort = (event, name) => {
    event.preventDefault();
    setToSortBy(name)
    sortArray(toSortBy)
  }

  //Function to sort
  const sortArray = type => {
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
  const paginate = (event, pageNumber) => { 
    event.preventDefault(); 
    setCurrentPage(pageNumber); 
  };

  return (
    <div className={styles.pageContainer}>
      {isWelcomeMessageShowing &&
        <div className="alert alert-success" role="alert">
          Welcome to Sharity by BatCo
       </div>
      }
      <div className={styles.navBarContainer}>
        < NavBar setSearchItems={setItems} login={handlingLogin} isLoggedIn={isLoggedIn} />
      </div>
      <div className={styles.bodyContainer}>
        {loginClicked && <Login closeLogin={closeLogin} setTypeOfUser={setTypeOfUser} isLoggedIn={setIsLoggedIn} />}
        {showDetails && <ShowDetails card={selectedCard} closeCard={closeCard} claimItem={handleClaimingItem} />}
        <Cards items={currentItems} displayCard={displayCard} loading={loading} sortBy={handleSort} />
        </div>
        <div className={styles.paginaterContainer}>
        <Paginater
          paginate={paginate}
          itemsPerPage={itemsPerPage}
          totalItems={items.length}
        />
      </div>
        <div className={styles.footerContainer}>
        <Footer typeOfUser={typeOfUser}/>
        </div>
    </div>
  );
};

export default LandingPage;