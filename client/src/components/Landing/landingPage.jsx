import React, { useState, useEffect } from 'react';
import NavBar from './LandingSubComponents/navBar.jsx';
import Cards from './LandingSubComponents/cards.jsx';
import Axios from 'axios';
import Paginater from './LandingSubComponents/paginate.jsx';

const LandingPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20)
  
  
  useEffect(() => {
    retrieveItems();
  },[]);

  const retrieveItems = async () => {
    setLoading(true);
    const res = await Axios.get('/items');
    setItems(res.data)
    setLoading(false)
  };
  
  console.log("items currentLength", items.length);

  //Get Current Items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem,indexOfLastItem);

  //Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  console.log(paginate);
    return (
      <div>
        <p>Landing Page</p>
        <div>
          < NavBar />
        </div>
        <div>
          <Cards items={currentItems} loading={loading} />
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