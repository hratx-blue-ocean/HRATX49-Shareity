import React, { useState, useEffect } from 'react';
import { data } from './achievementData';
import Axios from 'axios';
import styles from '../../styles/CharityHeader.css';
import Achievement from './Achievement.jsx';

const CharityHeader = () => {

    const [currentUser, setCurrentUser] = useState('');
    const [achievements, setAchievements] = useState(data);
    const getUserAchievements = () => {

        Axios.get('./', currentUser)
            .then( res => {
                console.log(res.data)
                setAchievements(res.data);
            })
            .catch( err => {
                console.error(err);
            })
    }

    useEffect(() => {
        getUserAchievements();
    });

    return (

        <div className={styles.charityHeaderWrapper}>
            {achievements.map((achievement, i) => {
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