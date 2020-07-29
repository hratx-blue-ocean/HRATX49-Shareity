import React, { useState } from 'react';
import { data } from './achievementData';
import styles from '../../styles/CharityHeader.css';

const Achievement = () => {

    return (

        <div className={styles.achievementWrapper}>
            <span className={styles.dummyAchievement}>{data[0].name}</span>
        </div>
    ) 
}


export default Achievement;