import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capitalizeWord } from '../../utils/utils.js';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import shoppinglist from '../../assets/shoppinglist.json';




export const ShoppinglistEdit = () => {
    const { shoppinglistId } = useParams();
    const navigate = useNavigate();
    const [shoppinglistData, setShoppinglistData] = useState([]);

    const shoplist = shoppinglist.shoppinglist.find(sl => sl.shoppinglist_id === (parseInt(shoppinglistId)));


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
    }, []);


    // Functions
    const deleteItem = (index) => {
        const updatedArray = shoppinglistData.filter((_, i) => i !== index);
        setShoppinglistData(updatedArray)
    };

    const addItem = () => {
        const newEntry = { amount: null, unit: '', name: '' };
        const updatedArray = [...shoppinglistData, newEntry];
        setShoppinglistData(updatedArray);
    };

    const handleItemChange = (index, field, value) => {
        const updatedItems = shoppinglistData.map((item, i) => {
            if (i === index) {
                return { ...item, [field]: value };
            }
            return item;
        });
        setShoppinglistData(updatedItems);
    }

    // Handles going back/return button
    const handleBackClick = () => {
        navigate(`/shoppinglists/${shoppinglistId}`)
    };

    const handleSaveClick = () => {
        // Add code to save to db here

        navigate(`/shoppinglists/${shoppinglistId}`);
    }

    // const autoResize = (element) => {
    //     element.style.height = 'auto';
    //     element.style.height = element.scrollHeight + 'px';
    // };


    return (
        <main className='content-width'>
            <img onClick={handleBackClick} className='back-icon icons' src="https://img.icons8.com/ios-glyphs/616161/150/circled-chevron-left" alt="back arrow" />

            <h2 className='primary-font'>Shoppinglist</h2>
            <ul className='ingredients-container'>
                {shoppinglistData.map((item, i) => (
                    <li className="ingredient mg-3vh shadow" key={`${item.name}-${i}`}>
                        <InputGroup>
                            <Form.Label className='bold-text-sm' htmlFor="ingredientName">Item</Form.Label>
                            <Form.Control
                                className="ingredients-textarea input-field"
                                defaultValue={capitalizeWord(item.name)}
                                onChange={(e) => handleItemChange(i, 'name', e.target.value)}
                                placeholder='Ground beef (minced)'
                            />
                            <Form.Label className='bold-text-sm' htmlFor="ingredientAmount">Amount</Form.Label>
                            <Form.Control
                                className="ingredientAmount ingredients-textarea input-field"
                                defaultValue={item.amount}
                                onChange={(e) => handleItemChange(i, 'amount', e.target.value)}
                                placeholder='500'
                            />

                            <Form.Label htmlFor="ingredientUnit"> <span className='bold-text-sm'>Unit</span> (e.g: dl, g, tbs) </Form.Label>
                            <Form.Control
                                className="ingredientUnit ingredients-textarea input-field"
                                defaultValue={item.unit}
                                onChange={(e) => handleItemChange(i, 'unit', e.target.value)}
                                placeholder='grams'
                            />
                        </InputGroup>

                        <img className="trash-icon icons clickable"
                            src="https://img.icons8.com/ios-glyphs/FF6347/100/trash"
                            alt="remove button"
                            onClick={() => deleteItem(i)}
                        />
                    </li>
                ))}
                <div className="add-item-alt shadow" onClick={() => addItem()}>
                    <img className='icons' src="https://img.icons8.com/ios-glyphs/ff9800/150/plus" alt="options" />
                </div>
                <div className="save-button shadow" onClick={() => handleSaveClick()}>
                    <p>Save changes</p>
                </div>
            </ul>
        </main>
    )
}