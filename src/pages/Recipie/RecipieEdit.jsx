import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { capitalizeWord, recipiePlaceholderImage } from '../../utils/utils.js';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import '../../styles/recipie_styles/RecipieEdit.css'

// TODO: TEMP REMOVE WHEN API IS IMPLEMENTED
import TestRecipie from '../../assets/recipieTest.json';

const checkboxLink = "https://img.icons8.com/ios-filled/ff9800/100/";
const unchecked = "unchecked-checkbox";
const checked = "checked-checkbox"

export const RecipieEdit = () => {
    const { recipieId } = useParams();
    const navigate = useNavigate();
    const [recipieData, setRecipieData] = useState(null);
    const [allergenCheckedState, setAllergenCheckedState] = useState(new Array(12).fill(false)); // Create a new array of equal length to all allergens (12)
    const [starRating, setStarRating] = useState(null)
    const [imageUrl, setImageUrl] = useState(recipiePlaceholderImage);
    const [selectedTime, setSelectedTime] = useState('');
    const textAreaRefs = useRef([]);

    const recipie = TestRecipie.recipie.find(r => r.recipie_id === (parseInt(recipieId)));


    useEffect(() => {
        // Fetch recipie data from db
        const fetchRecipieData = async (id) => {
            // TODO: REPLACE WITH API IN THE FUTURE
            // const response = await fetch(`/api/recipie/${id}`);
            // const data = await response.json();
            // setRecipieData(TestRecipie);
        };

        // fetchRecipieData(recipieId);

        // TODO: Set recipiedata to the json fetched from the api
        setRecipieData(recipie);

        // Set the initial value of the star rating
        setStarRating(recipie.rating);
    }, [recipieId]);

    useEffect(() => {
        if (recipieData) {
            // Initialize the allergen checked state based on the recipie data
            const initialCheckedState = Object.keys(recipieData.allergens).map(allergen => recipieData.allergens[allergen])
            setAllergenCheckedState(initialCheckedState);

            // Resizes the textarea (for instructions section)
            textAreaRefs.current.forEach(textarea => {
                if (textarea) {
                    autoResize(textarea);
                }
            });

            // Load image from localStorage
            const storedImage = localStorage.getItem(`recipie-image-${recipieId}`)
            if (storedImage) {
                setImageUrl(storedImage);
            }
            // Default image
            else setImageUrl(recipiePlaceholderImage)      
            
            setSelectedTime(recipie.time);
        }
    }, [recipieData]);

    // TODO: Put loading animation in this later
    if (!recipieData) {
        return <div>Loading...</div>;
    }


    // Allergens

    // Extract all the allergens that are true for this recipie
    // const trueAllergens = Object.keys(recipieData.allergens).filter(allergen => recipieData.allergens[allergen])

    const allergenIconColor = "ff9800"
    const allergenIcons = {
        beef: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/cow-breed`,
        chicken: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/chicken`,
        pork: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/pig`,
        fish: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/whole-fish`,
        shellfish: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/shellfish`,
        vegan: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/natural-food`,
        milk: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/milk-bottle`,
        gluten: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/gluten`,
        nuts: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/nut`,
        soy: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/soy`,
        eggs: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/egg`,
        sesame: `https://img.icons8.com/ios-glyphs/${allergenIconColor}/100/sesame`
    }

    // Nutrition
    const nutritionPlaceholders = [
        678, 36, 4, 53, 34
    ]

    // Stars / rating
    // const totalStars = 5;
    // const filledStars = Math.floor(starRating);
    // const hasHalfStar = starRating % 1 === 0.5; // Check if half star exists
    // const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

    // Handles going back/return button
    const handleBackClick = () => {
        navigate(-1);
    };

    // Toggle checkbox state on click
    const handleCheckboxClick = (index) => {
        const updatedCheckedState = allergenCheckedState.map((item, i) => i === index ? !item : item);
        setAllergenCheckedState(updatedCheckedState);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result;
            setImageUrl(base64String);
            localStorage.setItem(`recipie-image-${recipieId}`, base64String);
        };
        reader.readAsDataURL(file);
    }

    const handleTimeChange = (event) => {
        // updates selected time state when a input is selected
        setSelectedTime(event.target.value);
    };

    const handleStarClick = (index, event) => {
        // Get cursor position when clicked the star  
        const {left, width} = event.target.getBoundingClientRect();
        const clickPosition = event.clientX - left;

        // Check if click position is less than the width of star (i.e on the left side) if so set index to half of current star, otherwise to the stars index (+1 as array is 0-indexed)
        const newRating = clickPosition < width / 2 ? index + 0.5 : index + 1;

        setStarRating(newRating);
    }

    const deleteIngredient = (index) => {
        const updatedArray = recipieData.ingredients.filter((_, i) => i !== index);
        setRecipieData({ ...recipieData, ingredients: updatedArray })
    };

    const addIngredient = () => {
        const newEntry = { amount: null, unit: '', name: '' };
        const updatedArray = recipieData.ingredients;
        updatedArray.push(newEntry);

        setRecipieData({ ...recipieData, ingredients: updatedArray });
    };

    const deleteInstruction = (index) => {
        const updatedArray = recipieData.instructions.filter((_, i) => i !== index);
        setRecipieData({ ...recipieData, instructions: updatedArray })
    };

    const addInstruction = () => {
        const updatedArray = recipieData.instructions;
        updatedArray.push("")
        setRecipieData({ ...recipieData, instructions: updatedArray })
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = recipieData.ingredients.map((ingredient, i) => {
            if (i === index) {
                return { ...ingredient, [field]: value };
            }
            return ingredient;
        });
        setRecipieData({ ...recipieData, ingredients: updatedIngredients});
    }

    const autoResize = (element) => {
        element.style.height = 'auto';
        element.style.height = element.scrollHeight + 'px';
    };

    return (
        <main className="edit-recipie-container">
            <img onClick={handleBackClick} className='back-icon-alt icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/circled-chevron-left" alt="back arrow" />

            {/* Image and gradient */}
            <div className='img-container'>
                <label htmlFor="file-input">
                    <img className="edit-img-icon icons clickable" src="https://img.icons8.com/ios-glyphs/FFFFFF/150/edit-image" alt="edit image button" />
                </label>
                <img className="food-image" src={imageUrl} alt='Image of the food'></img>
                <div className='gradient-overlay'></div>

                <input id="file-input" type="file" accept='image/*' onChange={handleImageUpload}/>
            </div>
            <section className='content-width'>

            {/* Recipie name */}
            <section>
            <h2 className='primary-font'>Recipie name</h2>
                <div className='recipieName-container'>
                <InputGroup className="recipieName">
                    <Form.Control 
                        className="recipieName-textarea input-field" 
                        id="recipieName" 
                        defaultValue={recipieData.name} 
                        placeholder='Swedish meatballs'    
                    />
                </InputGroup>    
                </div>
            </section>
            <div className="content-divider"></div>

            
            {/* Rating */}
            <section>
                <h2 className='primary-font'>Rating</h2>
                <div className='stars-edit-container'> 
                    {Array(5).fill().map((_, i) => (
                        <img
                            key={i}
                            className='star-icon icons'
                            src={
                                i < Math.floor(starRating)
                                    ? "https://img.icons8.com/ios-filled/ffd27d/100/star"
                                    : i < starRating
                                    ? "https://img.icons8.com/ios-filled/ffd27d/100/star-half-empty"
                                    : "https://img.icons8.com/ios/ffd27d/100/star"
                            }
                            alt="star"
                            onClick={(event) => handleStarClick(i, event)}
                        />
                    ))}
                    <p>({starRating})</p>  
                </div> 
            </section>
            <div className="content-divider"></div>
            
            {/* Allergens */}
            <section>
                <h2 className='primary-font'>Allergens</h2>
                <div className='allergens-container'>
                    {Object.keys(allergenIcons).map((allergen, index) => (
                        <div key={index} className='allergen-item shadow clickable' onClick={() => handleCheckboxClick(index)}>
                            <img className="allergen-icon icons" src={allergenIcons[allergen]} alt={allergen} />
                            <span className='bold-text-sm'>{capitalizeWord(allergen)}</span>
                            <img className="checkbox-icons"
                                src={`${checkboxLink}${allergenCheckedState[index] ? checked : unchecked}`}
                                alt="checkbox"
                            />
                        </div> 
                    ))}
                </div>
            </section>
            <div className="content-divider"></div>


            {/* Time to cook */}
            <section>
                <h2 className='primary-font'>Time</h2>
                <div className="time-container">
                    <label className={`time-radio ${selectedTime === "< 30 min" ? "time-radio-selected" : ""}`}>
                        <img className='stats-icons icons' src="https://img.icons8.com/ios-glyphs/ff9800/100/empty-hourglass" alt="Empty hourglass" />
                        <p> &lt; 30 min</p>
                        <input type="radio"
                            name='time'
                            value="< 30 min"
                            checked={selectedTime === "< 30 min"}
                            onChange={handleTimeChange}
                        />
                    </label>
                    <label className={`time-radio ${selectedTime === "30-60 min" ? "time-radio-selected" : ""}`}>
                        <img className='stats-icons icons' src="https://img.icons8.com/ios-glyphs/ff9800/100/hourglass" alt="Half filled hourglass" />
                        <p>30 - 60 min</p>
                        <input type="radio"
                            name='time'
                            value="30-60 min"
                            checked={selectedTime === "30-60 min"}
                            onChange={handleTimeChange} />
                    </label>
                    <label className={`time-radio ${selectedTime === "60+ min" ? "time-radio-selected" : ""}`}>
                        <img className='stats-icons icons' src="https://img.icons8.com/ios-glyphs/ff9800/100/hourglass-sand-top" alt="Hourglass full top" />
                        <p>60+ min</p>
                        <input type="radio"
                            name='time' value="60+ min"
                            checked={selectedTime === "60+ min"}
                            onChange={handleTimeChange} />
                    </label>
                </div>
            </section>
            <div className="content-divider"></div>


            {/* Ingredients */}
            <section>
                <h2 className='primary-font'>Ingredients</h2>
                <ul className='ingredients-container'>
                    {recipieData.ingredients.map((ingredient, i) => (
                        <li className="ingredient mg-3vh shadow" key={`${ingredient.name}-${i}`}>                        
                            <InputGroup>
                                <Form.Label className='bold-text-sm' htmlFor="ingredientName">Ingredient</Form.Label>
                                <Form.Control 
                                    className="ingredients-textarea input-field"
                                    defaultValue={capitalizeWord(ingredient.name)}
                                    onChange={(e) => handleIngredientChange(i, 'name', e.target.value)}
                                    placeholder='Ground beef (minced)'
                                />
                                <Form.Label className='bold-text-sm' htmlFor="ingredientAmount">Amount</Form.Label>
                                <Form.Control 
                                    className="ingredientAmount ingredients-textarea input-field"
                                    defaultValue={ingredient.amount}
                                    onChange={(e) => handleIngredientChange(i, 'amount', e.target.value)}                                    
                                    placeholder='500'
                                />    
                        
                                <Form.Label htmlFor="ingredientUnit"> <span className='bold-text-sm'>Unit</span> (e.g: dl, g, tbs) </Form.Label>
                                <Form.Control 
                                    className="ingredientUnit ingredients-textarea input-field" 
                                    defaultValue={ingredient.unit} 
                                    onChange={(e) => handleIngredientChange(i, 'unit', e.target.value)}                                    
                                    placeholder='grams'
                                />                                                                            
                            </InputGroup>

                            <img className="trash-icon icons clickable"
                                src="https://img.icons8.com/ios-glyphs/FF6347/100/trash"
                                alt="remove button"
                                onClick={() => deleteIngredient(i)}
                            />
                        </li>
                    ))}
                        <div className="add-item-alt shadow" onClick={() => addIngredient()}>
                            <img className='icons' src="https://img.icons8.com/ios-glyphs/ff9800/150/plus" alt="options" />
                    </div> 
                </ul>
            </section>
            <div className="content-divider"></div>


            {/* Instructions */}
            <section>
                <h2 className='primary-font'>Instructions</h2>
                <ol className='instructions-container'>
                    {recipieData.instructions.map((instruction, i) => (
                        <li className="instruction mg-3vh shadow" key={`${instruction}-${i}`}>
                            <InputGroup className={`instruction${i}`}>
                                {/* <Form.Label htmlFor="instruction-item">Instruction</Form.Label> */}
                                <Form.Control className="instructions-textarea input-field" as="textarea"
                                    defaultValue={instruction}
                                    onChange={(e) => {
                                        handleIngredientChange(i, 'amount', e.target.value)
                                        autoResize(e.target);
                                    }}
                                    ref={el => textAreaRefs.current[i] = el}
                                    placeholder='In a medium sized bowl combine ground beef, panko, parsley, egg and all spices. Mix until combined.'
                                />
                            </InputGroup>

                            <img className="trash-icon icons clickable"
                                src="https://img.icons8.com/ios-glyphs/FF6347/100/trash"
                                alt="remove button"
                                onClick={() => deleteInstruction(i)}
                            />
                        </li>
                    ))}
                        <div className="add-item-alt shadow" onClick={() => addInstruction()}>
                        <img className='icons' src="https://img.icons8.com/ios-glyphs/ff9800/150/plus" alt="options" />
                    </div> 
                    
                </ol>
            </section>
            <div className="content-divider"></div>


            {/* Nutrition */}
            <section>
                <h2 className='primary-font'>Nutrition</h2>
                <ul className='nutrition-container'>
                    {Object.entries(recipieData.nutrition).map(([key, value], i) => (
                        <li className="nutrition mg-3vh shadow" key={i}>
                            <InputGroup>
                                <Form.Label htmlFor="nutrient"><span className='bold-text-sm'>{capitalizeWord(key)}</span>&nbsp;({key === 'energy' ? ' kCal' : 'g'})</Form.Label>
                                <Form.Control className="nutrition-textarea input-field" id={`nutrient${i}`}
                                    defaultValue={value}
                                    onChange={(e) => handleIngredientChange(i, 'name', e.target.value)}
                                    placeholder={`${nutritionPlaceholders[i]}`}
                                />
                            </InputGroup>
                        </li>
                    ))}
                </ul>
            </section>


            {/* Save button */}
            <div className='center-child'>
                <button className='myBtns-primary mg-3vh wdth-100'>Save changes</button>
            </div>

            </section>
        </main>
    )
}