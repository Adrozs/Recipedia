import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import recipiesData from '../assets/recipieList.json';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "../styles/recipie_collection_styles/RecipieList.css"

const useFitText = (ref, minFontSize) => {
    useEffect(() => {
        const resizeText = () => {
            const element = ref.current;
            if (!element) return;

            let fontSize = 24; // Start with a default font size
            element.style.fontSize = `${fontSize}px`;

            while (element.scrollWidth > element.offsetWidth && fontSize > minFontSize) {
                fontSize -= 1;
                element.style.fontSize = `${fontSize}px`;
            }

            if (fontSize <= minFontSize) {
                element.style.whiteSpace = 'normal'; // Allow wrapping
            } else {
                element.style.whiteSpace = 'nowrap'; // No wrapping
            }
        };

        resizeText();
        window.addEventListener('resize', resizeText);
        return () => {
            window.removeEventListener('resize', resizeText);
        };
    }, [ref, minFontSize]);
};

export const RecipiesList = () => {
    const { collectionId } = useParams();
    const recipies = recipiesData.recipie.filter(r => r.collection_ids.includes(parseInt(collectionId)));

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


    // Go to previous page
    const navigate = useNavigate();

    // Handles going back return button
    const handleBackClick = () => {
        navigate(-1);
    };
    

    return (
        <main className='content-width'>
            <div onClick={handleBackClick}>
                <img className='back-icon icons' src="https://img.icons8.com/ios-glyphs/616161/150/circled-chevron-left" alt="back arrow" />
            </div>
            <h1>Recipes in Collection {collectionId}</h1>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search your recipies..."
                    aria-label="Search recipies"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Search
                </Button>
            </InputGroup>

            {recipies.map((recipie, i) => {
                const trueAllergens = Object.keys(recipie.allergens).filter(allergen => recipie.allergens[allergen]);
                const totalStars = 5;
                const filledStars = Math.floor(recipie.rating);
                const hasHalfStar = recipie.rating % 1 === 0.5;
                const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

                const h2Ref = useRef(null);
                useFitText(h2Ref, 16);

                return (
                    <a key={i} href={`/recipie/${recipie.recipie_id}`}>
                    <section className='recipie-container2 shadow-big'>
                        <div className="top-container">
                            <img className="food-image2" src={recipie.image_url} alt="Image of the food" />
                            <div className='gradient-overlay2'></div>
                            <div className='info-container'>
                                <h2 ref={h2Ref} className='primary-font bold-text'>{recipie.name}</h2>
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
                        </div>
                    </section>
                    </a>
                );
            })}

            <section className="add-item shadow">
                <img className='icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/plus" alt="options" />
            </section> 
        </main>
    );
};
