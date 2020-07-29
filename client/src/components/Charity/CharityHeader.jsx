import React, { useState } from 'react';
import styles from '../../styles/CharityHeader.css';
import { data } from './achievementData';

const CharityHeader = () => {

    return (

        <div className={styles.achievementsWrapper}>
            <span className={styles.dummyAchievement}>{data[0].name}</span>
            <span className={styles.dummyAchievement}></span>
            <span className={styles.dummyAchievement}></span>
            <span className={styles.dummyAchievement}></span>
 

        </div>
    )
}

export default CharityHeader;