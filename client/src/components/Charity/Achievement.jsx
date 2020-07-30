import React, { useState } from 'react';
import styles from '../../styles/CharityHeader.css';

const Achievement = (props) => {

    return (

        <div className={styles.achievementWrapper}>
            <div className={styles.achievement}>
                <span className={styles.achievementImageWrapper}>
                    <img className={styles.achievementImage} 
                        src={props.data.url}></img>
                </span>
                <div className={styles.achievementInfoWrapper}>
                    <h3 className={styles.achievementName}>{props.data.name}</h3>
                    <p className={styles.achievementDescription}>{props.data.description}</p>
                </div>
                <div className={styles.achievementValueContainer}>
                    <div className={styles.achievementValue}>{props.data.value}</div>
                </div>
            </div>
        </div>
    ) 
}


export default Achievement;