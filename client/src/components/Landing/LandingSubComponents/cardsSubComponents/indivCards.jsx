import React, { useState } from 'react';
import { Card } from 'antd';
// import 'antd/dist/antd.css';
import Styles from '../../LandingSubComponents/Cards.css'
import moment from 'moment';

const { Meta } = Card;

function IndivCards ({ item, displayCard }){
  if (item.pictures === null){
    let arrofImages = ["https://picsum.photos/200/300"];
  } else if (item.pictures.length === 1){
    let arrofImages = item.pictures
  } else {
    let arrofImages = item.pictures.split(',');
  }
  // console.log(arrofImages);

  /*
  We just items from db.
  Need to set up images
  need to move things in the right areas
  Just installed ant, get cards running, pagination, 
  */

  return(
    <div onClick={(event)=>displayCard(event,item)}>
    <Card
    hoverable
    style={{width:240}}
    cover={<img src="https://picsum.photos/200/300" atl={item.name}/>}
    >
    <div>
    <Meta title={item.name} description={item.Location}/>
    <span>{moment().fromNow(item.dateCreated)}</span>
    </div>
    </Card>
    </div>
  )
}

export default IndivCards;