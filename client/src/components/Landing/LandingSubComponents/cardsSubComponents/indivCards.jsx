import React from 'react';
import Styles from '../../LandingSubComponents/Cards.css'
import moment from 'moment';

function IndivCards({ item, displayCard }) {
  let image;
  if (item.pictures === null) {
    image = "https://picsum.photos/200/300";
  } else {
    image = item.pictures;
  }
  return (
    <div
      onClick={(event) => displayCard(event, item)}
      className={Styles.cardStyle}
    >
      <div className={Styles.imageBox}>
          <img className={Styles.cardImage} src={image} />
      </div>
      <p className={Styles.cardName}>{item.name}</p>
      <p>{moment().from(item.dateCreated)}</p>
    </div>
  )
}

export default IndivCards;