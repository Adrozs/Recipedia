import React from 'react';
import { useParams, Link } from 'react-router-dom';
import recipiesData from '../assets/recipieList.json';

export const RecipiesList = () => {
    const { collectionId } = useParams();
    const collectionIdInt = parseInt(collectionId);

    console.log(collectionId);

    // if (!filteredRecipies || filteredRecipies.length === 0) {
    //     return <p>No recipes found for this collection.</p>;
    // }

    return (
        <main>
            <h1>Recipes in Collection {collectionIdInt}</h1>
            <ul>
                {/* {filteredRecipies.map((recipe, index) => (
                    <li key={index}>
                        <Link to={`/recipies/${recipe.recipie_id}`}>{recipe.name}</Link>
                    </li>
                ))} */}
            </ul>
        </main>
    );
};
