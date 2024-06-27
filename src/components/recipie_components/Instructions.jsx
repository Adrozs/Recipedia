import React, { useState } from 'react';
import "../../styles/recipie_styles/Instructions.css";

const checkboxLink = "https://img.icons8.com/ios-filled/616161/100/";
const unchecked = "unchecked-checkbox";
const checked = "checked-checkbox"

export const Instructions = ({ instructions }) => {
    // Create an array with as many bools as ingredients and make all false as default
    const [checkedState, setCheckedState] = useState(new Array(instructions.length).fill(false));

    // Toggle checkbox state on click
    const handleCheckboxClick = (index) => {
        const updatedCheckedState = checkedState.map((item, i) =>
            i === index ? !item : item
        );
        setCheckedState(updatedCheckedState)
    };

    return (
        <section className='content-width'>
            <h2>Instructions</h2>
            <ol className='instructions-container'>
                {instructions.map((instruction, i) => (
                    <li className="instruction shadow" key={i} onClick={() => handleCheckboxClick(i)}>
                        <img className="checkbox-icons" 
                        src={`${checkboxLink}${checkedState[i] ? checked : unchecked}`}
                        alt="checkbox" 
                        />

                        <span>{instruction}</span>
                    </li>
                ))}
            </ol>
        </section>
    );
};