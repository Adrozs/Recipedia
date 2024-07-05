import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ingredients } from "../components/recipie_components/Ingredients.jsx";
import { Instructions } from "../components/recipie_components/Instructions.jsx";
import { Nutrition } from "../components/recipie_components/Nutrition.jsx";
import { ResizeText } from '../components/ResizeText.jsx';
import '../styles/recipie_styles/Recipie.css'

// TODO: TEMP REMOVE WHEN API IS IMPLEMENTED
import TestRecipie from '../assets/recipieTest.json';


export const Recipie = () => {
    const { recipieId } = useParams();
    const [recipieData, setRecipieData] = useState(null);

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
        setRecipieData(TestRecipie.recipie[0]);

    }, [recipieId]);

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

    return (
        <>
        <main className="recipie-container">
            
            {/* Image and gradient */}
            <img className="food-image" src={recipieData.image_url} alt='Image of the food'></img>
            <div className='gradient-overlay'></div>

            {/* Top section with name, rating, allergens and heart & options buttons */}
            <section className="recipie-info-container content-width">

                {/* Buttons options & saved */}
                <div className='icon-container'>
                    <img className='heart-icon icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/filled-like" alt="heart" />
                    <img className='options-icon icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/ellipsis" alt="options" />
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
                    <img className='stats-icons icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/100/clock" alt="Time" />
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
                <Ingredients ingredients={recipieData.ingredients}/>
                <button className='myBtns'>Add to shoppinglist</button>
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
