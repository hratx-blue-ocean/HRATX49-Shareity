import React, { useState } from 'react';
import { data } from './achievementData';
import styles from '../../styles/CharityHeader.css';
import Achievement from './Achievement.jsx';

const CharityHeader = () => {

    return (

        <div className={styles.charityHeaderWrapper}>
            {data.map((achievement, i) => {
                return (
                    <Achievement
                        key={i}
                        data={achievement}
                    />
                )
            })}

        </div>
    )
}

export default CharityHeader;