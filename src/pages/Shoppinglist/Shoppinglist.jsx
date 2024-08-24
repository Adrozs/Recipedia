import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capitalizeWord } from '../../utils/utils.js';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import shoppinglist from '../../assets/shoppinglist.json';
import { Ingredients } from '../../components/recipie_components/Ingredients.jsx';

import '../../styles/shoppinglist_styles/shoppinglist.css'




export const Shoppinglist = () => {
    const { shoppinglistId } = useParams();
    const navigate = useNavigate();
    const [shoppinglistData, setShoppinglistData] = useState([]);
    const [optionsVisible, setOptionsVisible] = useState(false);
    const [itemAmounts, setItemAmounts] = useState([]);
    const [checkedState, setCheckedState] = useState([]);

    const shoplist = shoppinglist.shoppinglist.find(sl => sl.shoppinglist_id === (parseInt(shoppinglistId)));
    const checkboxLink = "https://img.icons8.com/ios-filled/616161/100/";
    const unchecked = "unchecked-checkbox";
    const checked = "checked-checkbox"


    useEffect(() => {
        // Fetch recipie data from db
        const fetchShoppinglistData = async () => {
            // TODO: REPLACE WITH API IN THE FUTURE
            // const response = await fetch(`/api/shoppinglists`);
            // const data = await response.json();
            // setShoppinglistData(shoppinglist);
        };

        // TODO: Set recipiedata to the json fetched from the api
        setShoppinglistData(shoplist.items);
    }, [shoplist]);

    useEffect(() => {
        if (shoppinglistData) {
            setItemAmounts(shoppinglistData.map(item => item.amount));
            setCheckedState(new Array(shoppinglistData.length).fill(false))
        }

    }, [shoppinglistData])


    // Functions

    // Toggle checkbox state on click
    const handleCheckboxClick = (index) => {
        const updatedCheckedState = checkedState.map((item, i) =>
            i === index ? !item : item
        );
        setCheckedState(updatedCheckedState)
    };

    // Change options visibility to opposite
    const toggleOptions = () => {
        setOptionsVisible(!optionsVisible)
    };

    // Handles going back/return button
    const handleBackClick = () => {
        navigate(`/shoppinglists`);
    };

    // Goes to edit page for this recipie
    const handleEditClick = () => {
        navigate(`/shoppinglists/${shoppinglistId}/edit`)
    }


    return (
        <>
        {optionsVisible && (
            <>
                <menu className='options-menu'>
                    <img onClick={toggleOptions} className='close-icon icons' src="https://img.icons8.com/ios-glyphs/333333/150/multiply" alt="close menu button" />
                    <button className='myBtns-primary'>Share recipie</button>
                    <button onClick={handleEditClick} className='myBtns-secondary'>Edit recipie</button>
                    <button className='myBtns-cancel'>Delete recipie</button>
                </menu>
            </>
        )}

        <main className='content-width'>
            
            {/* Buttons */}
            <div className='shoppinglist-icon-container'>
                <img onClick={handleBackClick} className='back-icon icons' src="https://img.icons8.com/ios-glyphs/616161/150/circled-chevron-left" alt="back arrow" />
                <img onClick={toggleOptions} className='options-icon icons' src="https://img.icons8.com/ios-glyphs/616161/150/ellipsis" alt="options" />
            </div>

            <h1 className='primary-font'>{shoplist.name}</h1>


            {/* Ingredients / products in shoppinglist (reusing the same function as for the recipe view) */}
            <ul className='ingredients-container'>
                    {shoppinglistData.map((item, i) => (
                    <li className={`ingredient shadow ${checkedState[i] ? 'crossed-off' : ''}`} key={i} onClick={() => handleCheckboxClick(i)}>
                        <img className="checkbox-icons"
                            src={`${checkboxLink}${checkedState[i] ? checked : unchecked}`}
                            alt="checkbox"
                        />

                            <span className='bold-text'>{itemAmounts[i]}{item.unit}&nbsp;</span>{capitalizeWord(item.name)}
                    </li>
                ))}
            </ul>


            <div className="add-item shadow" onClick={() => handleEditClick()}>
                <img className='icons' src="https://img.icons8.com/ios-glyphs/ffffff/150/plus" alt="options" />
            </div>
        </main>
        </>
    )
}