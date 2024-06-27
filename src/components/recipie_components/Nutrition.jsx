import React from 'react';
import { capitalizeWord } from '../../utils/utils.js'; 
import "../../styles/recipie_styles/Nutrition.css";


// playing around code for switching out metric to imperial
// let isMetric = true;
// let isKcal = true;

// let unit = 'g'; 
// let energyUnit = ' kCal'; // Important leave the space before the text so there's separation betwen the number and kCal! (looks weird otherwise)


// if (isMetric){
//     unit = 'g';
// }
// else {
//     unit = 'ounce';
// }

// if (isKcal) {
//     energyUnit = 'kCal';
// }
// else {
//     energyUnit = 'kj'
// }


export const Nutrition = ({ nutrition }) => {
    return (
        <section className='content-width'>
            <h2>Nutrition</h2>
            <ul className='nutrition-container'>
                {Object.entries(nutrition).map(([key, value], i) => (
                    <li className='nutrient' key={i}>
                        <span className='bold-text'> {capitalizeWord(key)}</span>: {value}{key === 'energy' ? ' kCal' : 'g'}
                    </li>
                ))}
            </ul>
        </section>
    );
};