import React, { useState } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import Styles from '../../LandingSubComponents/Cards.css'
import moment from 'moment';
const { Meta } = Card;

<<<<<<< HEAD
function IndivCards({ item, displayCard }) {
  let image
  if (item.pictures === null) {
    image = ["https://picsum.photos/200/300"];
    // } else if (item.pictures.length === 1){
    //   let arrofImages = item.pictures
    // } else {
    //   console.log("items.pictures", item.pictures)
    //   let arrofImages = item.pictures.split(',');
  } else {
    image = item.pictures
  }
  // console.log(arrofImages);

  /*
  We just items from db.
  Need to set up images
  need to move things in the right areas
  Just installed ant, get cards running, pagination,
  */

<<<<<<< HEAD
  return (
    <div onClick={(event) => displayCard(event, item)}>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<img src={image} alt="https://picsum.photos/200/300" />}
      >
        <div>
          <Meta title={item.name} description={item.Location} />
          <span>{moment().fromNow(item.dateCreated)}</span>
        </div>
      </Card>
=======
=======
function IndivCards ({ item, displayCard }){
  if (item.pictures === null){
    var arrofImages = ["https://picsum.photos/200/300"];
  } else if (item.pictures.length === 1){
    var arrofImages = item.pictures;
  } else {
    var arrofImages = item.pictures.split(',');
  }
>>>>>>> V.2.0.5
  return(
    <div onClick={(event)=>displayCard(event,item)}>
    <Card
    hoverable={true}
    style={{width:240}}
    cover={<img src={arrofImages[0]} alt={item.name}/>}
    >
    <div>
    <Meta title={item.name} description={item.Location}/>
    <span>{moment().startOf('day').from(item.dateCreated)}</span>
    </div>
    </Card>
>>>>>>> V2.0.5
    </div>
  )
}

export default IndivCards;