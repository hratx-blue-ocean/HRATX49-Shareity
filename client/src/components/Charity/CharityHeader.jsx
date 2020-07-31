import React, { useState, useEffect } from 'react';
import { data } from './achievementData';
import Axios from 'axios';
import styles from '../../styles/CharityHeader.css';
import Achievement from './Achievement.jsx';


const CharityHeader = () => {

    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [achievements, setAchievements] = useState(data);
    const getUserAchievements = () => {
        Axios.get('./achievements', currentUser)
            .then( res => {
                console.log(res.data)
                setAchievements(res.data);
            })
            .catch( err => {
                console.error(err);
            })
    }
    
    // comment this back in when we are ready to make requests to the db
    // useEffect(() => {
    //     getUserAchievements();
    // }, []);

    return (

        <div className={styles.charityHeaderWrapper}>
            {achievements.map((achievements, i) => {
                return (
                    <Achievement
                        key={i}
                        data={achievements}
                    />
                )
            })}

        </div>
    )
}

export default CharityHeader;