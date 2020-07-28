import React, { useState } from 'react';

const Paginater = ({itemsPerPage, totalItems, paginate}) => {

    const pageNumber = [];

    // console.log('Total items is ', totalItems)
    // console.log('Items per page is', itemsPerPage)
    // console.log('paginate',paginate)
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumber.push(i)
    }
    // console.log('Page Number', pageNumber);
    return (
      <nav>
        <ul className="pagination">
          {pageNumber.map(number => (
            <li key={number} className='page-item'>
              <a onClick={(event) => paginate(event,number)} href="" className="page-link">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    )
  }


export default Paginater;