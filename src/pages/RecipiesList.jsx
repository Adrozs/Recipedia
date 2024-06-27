import React from 'react';
import { useParams, Link } from 'react-router-dom';
import recipiesData from '../assets/recipieList.json';
import "../styles/recipie_collection_styles/RecipieList.css"

export const RecipiesList = () => {
    const { collectionId } = useParams();

    const recipies = recipiesData.recipie.filter(r => r.collection_ids.includes(parseInt(collectionId)));


    // if (!filteredRecipies || filteredRecipies.length === 0) {
    //     return <p>No recipes found for this collection.</p>;
    // }

    // Extract all the allergens that are true for this recipie
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
        <main>
            <h1>Recipes in Collection {collectionId}</h1>
           
            {recipies.map((recipie, i) => {
                const trueAllergens = Object.keys(recipie.allergens).filter(allergen => recipie.allergens[allergen]);

                // Stars / rating
                const totalStars = 5;
                const filledStars = Math.floor(recipie.rating);
                const hasHalfStar = recipie.rating % 1 === 0.5; // Check if half star exists
                const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

                return (
                    <section key={i} className='recipie-container'>
                        {/* top */}
                        <div className="top-container">
                            <img src={recipie.image_url} alt="" />
                        </div>
                        {/* bottom */}
                        <div className='info-container'>
                            {/* left */}
                            <div className='title-rating-container'>
                                <h2>{recipie.name}</h2>

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
                                </div>                            </div>
                            {/* right */}
                            <div className='allergens-container'>
                                {trueAllergens.map((allergen, index) => (
                                    <img
                                        key={index}
                                        className="allergen-icon icons"
                                        src={allergenIcons[allergen]}
                                        alt={`${allergen} icon`}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}
        </main>
    );
};
