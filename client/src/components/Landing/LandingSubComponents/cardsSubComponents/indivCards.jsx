import React, { useState } from 'react';
import { Card } from 'antd';
// import 'antd/dist/antd.css';
import Styles from '../../LandingSubComponents/Cards.css'

const { Meta } = Card;

function IndivCards ({ item }){

  let arrofImages = item.pictures.split(',');
  // console.log(arrofImages);

  /*
  We just items from db.
  Need to set up images
  need to move things in the right areas
  Just installed ant, get cards running, pagination, 
  */

  return(
    <li>
    <Card
    hoverable
    style={{width:240}}
    cover={<img src="./Alabama.jpg" atl={item.name}/>}
    >
    <div>
    <Meta title={item.name} description={item.Location,'',item.dateCreated}/>
    <span>{item.name}</span>
    <span>{item.Location}</span>
    <span>{item.dateCreated}</span>
    </div>
    </Card>
    </li>
  )
}

export default IndivCards;