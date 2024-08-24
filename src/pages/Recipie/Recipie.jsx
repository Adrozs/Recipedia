import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ingredients } from "../../components/recipie_components/Ingredients.jsx";
import { PortionSelector } from '../../components/recipie_components/PortionSelector.jsx'
import { Instructions } from "../../components/recipie_components/Instructions.jsx";
import { Nutrition } from "../../components/recipie_components/Nutrition.jsx";
import { ResizeText } from '../../components/ResizeText.jsx';
import '../../styles/recipie_styles/Recipie.css'

// TODO: TEMP REMOVE WHEN API IS IMPLEMENTED
import TestRecipie from '../../assets/recipieTest.json';


export const Recipie = () => {
    const navigate = useNavigate();
    const { recipieId } = useParams();
    const [recipieData, setRecipieData] = useState(null);
    const [ingredientAmounts, setIngredientAmounts] = useState([]);
    const [portionSize, setPortionSize] = useState(4);  
    const [isHearted, setIsHearted] = useState(false);
    const [heartColor, setHeartColor] = useState("FFFFFF");
    const [heartIcon, setHeartIcon] = useState("like");
    const [optionsVisible, setOptionsVisible] = useState(false);

    const recipie = TestRecipie.recipie.find(r => r.recipie_id === (parseInt(recipieId)));

    // Fetch recipie data 
    useEffect(() => {        
        const fetchRecipieData = async (id) => {
            // TODO: REPLACE WITH API IN THE FUTURE
            // const response = await fetch(`/api/recipie/${id}`);
            // const data = await response.json();
            // setRecipieData(TestRecipie);
        };

        // fetchRecipieData(recipieId);

        // TODO: Set recipiedata to the json fetched from the api
        setRecipieData(recipie);

    }, [recipieId]);

    // Set heart color and state if recipie is favorited
    useEffect(() => {
        if (recipieData && recipieData.is_Favorite) {
            setIsHearted(true)
            setHeartColor("FF6347")
        }

        if (recipieData) {
            setIngredientAmounts(recipieData.ingredients.map(ingredient => ingredient.amount));
        }

    }, [recipieData])

    // TODO: Put loading animation in this later
    if (!recipieData) {
        return <div>Loading...</div>;
    }
 

    // Stars / rating
    const totalStars = 5;
    const filledStars = Math.floor(recipieData.rating);
    const hasHalfStar = recipieData.rating % 1 === 0.5; // Check if half star exists
    const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

    // Allergens

    // Extract all the allergens that are true for this recipie
    const trueAllergens = Object.keys(recipieData.allergens).filter(allergen => recipieData.allergens[allergen])

    const allergenIcons = {
        beef: "https://img.icons8.com/ios-glyphs/FFFFFF/100/cow-breed",
        chicken: "https://img.icons8.com/ios-glyphs/FFFFFF/100/chicken",
        pork: "https://img.icons8.com/ios-glyphs/FFFFFF/100/pig",
        fish: "https://img.icons8.com/ios-glyphs/FFFFFF/100/whole-fish",
        shellfish: "https://img.icons8.com/ios-glyphs/FFFFFF/100/shellfish",
        vegan: "https://img.icons8.com/ios-glyphs/FFFFFF/100/natural-food",
        milk: "https://img.icons8.com/ios-glyphs/FFFFFF/100/milk-bottle",
        gluten: "https://img.icons8.com/ios-glyphs/FFFFFF/100/gluten",
        nuts: "https://img.icons8.com/ios-glyphs/FFFFFF/100/nut",
        soy: "https://img.icons8.com/ios-glyphs/FFFFFF/100/soy",
        eggs: "https://img.icons8.com/ios-glyphs/FFFFFF/100/egg",
        sesame: "https://img.icons8.com/ios-glyphs/FFFFFF/100/sesame"
    }


    // Toggle checkbox state on click
    // const handleCheckboxClick = (index) => {
    //     const updatedCheckedState = checkedState.map((item, i) =>
    //         i === index ? !item : item
    //     );
    //     setCheckedState(updatedCheckedState)
    // };

    // Handle portion increase and decrease
   
    const portionIncrease = () => {
        const newPortionSize = portionSize + 2;
        setPortionSize(newPortionSize);
        scaleIngredientsAmount(newPortionSize);
    };

    const portionDecrease = () => {
        if (portionSize > 2) {
            const newPortionSize = portionSize - 2;
            setPortionSize(newPortionSize);
            scaleIngredientsAmount(newPortionSize);
        }
    };

    const scaleIngredientsAmount = (newPortionSize) => {
        const scaleFactor = newPortionSize / 4;
        const newAmounts = recipieData.ingredients.map(ingredient => ingredient.amount * scaleFactor);
        setIngredientAmounts(newAmounts)
    }

    // Handles going back/return button
    const handleBackClick = () => {
        navigate(-1);
    };

    // Goes to edit page for this recipie
    const handleEditClick = () => {
        navigate(`/recipie/${recipieId}/edit`)
    }

    // Change heart state to opposite and switch the color
    const toggleHeart = () => {        
        setIsHearted(!isHearted)
        setHeartColor(isHearted ? "FFFFFF" : "FF6347")
        setHeartIcon(heartIcon ? "filled-like" : "filled-like")
    }

    // Change options visibility to opposite
    const toggleOptions = () => {
        setOptionsVisible(!optionsVisible)
    };

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
        
        <main className="recipie-container">
            <img onClick={handleBackClick} className='back-icon-alt icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/circled-chevron-left" alt="back arrow" />
        
            {/* Image and gradient */}
            <img className="food-image" src={recipieData.image_url} alt='Image of the food'></img>
            <div className='gradient-overlay'></div>

            {/* Top section with name, rating, allergens and heart & options buttons */}
            <section className="recipie-info-container content-width">

                {/* Buttons options & saved */}
                <div className='recipe-icon-container'>
                    <img onClick={toggleHeart} className='heart-icon icons' src={`https://img.icons8.com/ios-glyphs/${heartColor}/150/${heartIcon}`} alt="heart" />
                    <img onClick={toggleOptions} className='options-icon icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/ellipsis" alt="options" />
                </div>

                

                {/* Title, rating & allergens */}
                <div className='info-text-container'>

                    {/* Recipie title */}
                    <ResizeText text={recipieData.name} className="primary-font" />

                    {/* Stars rating */}
                    <div className='stars-container'>
                        {Array(filledStars).fill().map((_, i) => (
                            <img key={i} className='star-icon icons' src="https://img.icons8.com/ios-filled/ffd27d/100/star" alt="star" />
                        ))}
                        {hasHalfStar && (
                            <img className='star-icon icons' src="https://img.icons8.com/ios-filled/ffd27d/100/star-half-empty" alt="star" />
                        )}
                        {Array(emptyStars).fill().map((_, i) => (
                            <img key={i} className='star-icon icons' src="https://img.icons8.com/ios/ffd27d/100/star" alt="star" />
                        ))}
                    </div>

                    <div className="content-divider-light"></div>

                    {/* Icons for the protein & allergens  */}
                    <div className='allergens-container'>
                        {trueAllergens.map((allergen, i) => (
                            <img key={i} className='ingredient-icons icons' src={allergenIcons[allergen]} alt={allergen} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Recipie time and num of ingredients */}
            <section className='recipie-stats'>
                {/* time */}
                <div className='cooking-time'>
                    <img className='stats-icons icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/100/hourglass" alt="Time" />
                    <p>{recipieData.time}</p>
                </div>

                {/* numb of ingridients */}
                <div className='total-ingredients'>
                    <img className='stats-icons icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/100/ingredients" alt="Ingredients" />
                    <p>{recipieData.ingredients.length} ingredients</p>
                </div>
            </section>

            {/* Ingredients list */}
            <section className='ingredients-section'>
                <div className='ingredient-header content-width'>
                    <h2>Ingredients</h2>
                    <PortionSelector
                        portionSize={portionSize}
                        portionIncrease={portionIncrease}
                        portionDeacrease={portionDecrease}
                    />
                </div>

                <div className='content-width'>
                    <Ingredients ingredients={recipieData.ingredients} ingredientAmounts={ingredientAmounts}/>
                </div>

                {/* ADD SO THIS CREATES A NEW SHOPPINGLIST */}
                <button className='myBtns-primary'>Add to shoppinglist</button>
            </section>

            <div className="content-divider"></div>

            {/* Instructions */}
            <section>
                    <Instructions instructions={recipieData.instructions} />
            </section>

            <div className="content-divider"></div>

            {/* Nutrition facts [optional] display nothing if nothing is sent in */}
            <section>
                    <Nutrition nutrition={recipieData.nutrition} />
            </section>
        </main>
        </>
    )
};
