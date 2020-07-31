import React, { useState } from 'react';
import { Card } from 'antd';
import 'antd/dist/antd.css';
import Styles from '../../LandingSubComponents/Cards.css'
import moment from 'moment';
// const { Meta } = Card;

function IndivCards ({ item, displayCard }){
  let image;
  if (item.pictures === null){
    image = "https://picsum.photos/200/300";
  } else {
    image = item.pictures;
  }
  return(
    <div 
      onClick={(event)=>displayCard(event,item)}
      className={Styles.cardStyle}
    >
    {/* <Card
    hoverable={true}
    style={{width:240}}
    cover={<img src={arrofImages[0]} alt={item.name}/>}
    >
    <div>
    <Meta title={item.name} description={item.Location}/>
    <span>{moment().startOf('day').from(item.dateCreated)}</span>
    </div>
    </Card>
    </Card> */}
      <img className={Styles.cardImage} src={image}/>
      <p>{item.name}</p>
    </div>
  )
}

export default IndivCards;