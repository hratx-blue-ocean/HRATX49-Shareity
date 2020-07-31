// function to call when we want to add an event to earn an achievement
import Axios from 'axios';
import data from '../Charity/achievementData';


const addAchievement = (userEmail, achievement) => {

    let newAchievement = data.name === data.name.achievement;
    
    Axios.post('./newAchievement',{ 
        email: userEmail,
        achievement: newAchievement  
    })
        .then( res => {
            console.log(res.data);
        })
        .catch( err => {
            console.error(err);
        })
}