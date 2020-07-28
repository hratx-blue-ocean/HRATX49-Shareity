import React, { useState, useEffect } from 'react';
import NavBar from './LandingSubComponents/navBar.jsx';
import Cards from './LandingSubComponents/cards.jsx';
import Axios from 'axios';
import Paginater from './LandingSubComponents/paginate.jsx';
import ShowDetails from './LandingSubComponents/showDetails.jsx'

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(40)
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  
/*
Functions to build
Click handlers for indiv cards ---> Pops up item details modal
Click handler for login ---> Pops up Sign in Modal
Click handler for user ---> Sends to user Page
Click handler for the 4 sorting functions ---> Sort
*/


  
  useEffect(() => {
    const retrieveItems = async () => {
      setLoading(true);
      const res = await Axios.get('/items');
      setItems(res.data)
      setLoading(false)
    };
    retrieveItems();
  },[]);


  const displayCard = (event,item) =>{
    //This is the Click Handler for displaying an item on click
    //To be continued
    console.log("item",item.name)
    setSelectedCard(item);
    setShowDetails(true);
  }

  const closeCard = () => {
    //reset & close
    setSelectedCard(null);
    setShowDetails(false);
  };

  const handlingLogin = (event,name) =>{
    // This is the click handler for the login in modal
    console.log(event)
    console.log(name)
  }

  const handleGoingToUserProfile = (event,name) =>{
    //This is the Click Handler for going to the User Profile
    console.log(event)
    console.log(name)
  }
  
  
  // console.log("items currentLength", items.length);

  //Get Current Items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem,indexOfLastItem);

  //Change Page
  const paginate = (event,pageNumber) => {event.preventDefault(), setCurrentPage(pageNumber)};
  // console.log(paginate);
 let component;
   if (showDetails){
     component = <ShowDetails card={selectedCard} closeCard={closeCard}/>
   }
    return (
      <div>
        <p>Landing Page</p>
        <div>
          < NavBar login={handlingLogin} user={handleGoingToUserProfile}/>
        </div>
        <div>
          {component}
          <Cards items={currentItems} displayCard={displayCard} loading={loading} />
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