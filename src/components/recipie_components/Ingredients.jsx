import React, { useState } from 'react';
import { capitalizeWord } from '../../utils/utils.js';
import "../../styles/recipie_styles/Ingredients.css";

const checkboxLink = "https://img.icons8.com/ios-filled/616161/100/";
const unchecked = "unchecked-checkbox";
const checked = "checked-checkbox"

export const Ingredients = ({ ingredients , ingredientAmounts}) => {
    
    // Create an array with as many bools as ingredients and make all false as default
    const [checkedState, setCheckedState] = useState(new Array(ingredients.length).fill(false));

    // Toggle checkbox state on click
    const handleCheckboxClick = (index) => {
        const updatedCheckedState = checkedState.map((item, i) => 
            i === index ? !item : item
        );
        setCheckedState(updatedCheckedState)
    };

    return (
        <section className='content-width'>
            <ul className='ingredients-container'>
                {ingredients.map((ingredient, i) => (
                    <li className={`ingredient shadow ${checkedState[i] ? 'crossed-off' : ''}`} key={i} onClick={() => handleCheckboxClick(i)}>
                        <img className="checkbox-icons" 
                        src={`${checkboxLink}${checkedState[i] ? checked : unchecked}`}
                        alt="checkbox" 
                        />

                        <span className='bold-text'>{ingredientAmounts[i]}{ingredient.unit}&nbsp;</span>{capitalizeWord(ingredient.name)}
                    </li>
                ))}
            </ul>
        </section>
    );
};
