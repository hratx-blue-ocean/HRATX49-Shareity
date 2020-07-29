import React, { useState } from 'react';
import { data } from './achievementData';
import styles from '../../styles/CharityHeader.css';

const Achievement = () => {

    return (

        <div className={styles.achievementWrapper}>
            <div className={styles.achievement}>
                <span className={styles.achievementImageWrapper}>
                    <img className={styles.achievementImage} 
                        src={data[0].url}></img>
                </span>
                <div className={styles.achievementInfoWrapper}>
                    <h3 className={styles.achievementName}>{data[0].name}</h3>
                    <p className={styles.achievementDescription}>{data[0].description}</p>
                    <h3 className={styles.achievementValue}>{data[0].value}</h3>
                </div>
            </div>
        </div>
    ) 
}


export default Achievement;