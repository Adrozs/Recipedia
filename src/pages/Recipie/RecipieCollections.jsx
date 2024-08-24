import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CollectionCard from "../../components/recipie_collections_components/CollectionCard.jsx"
import "../../styles/recipie_collection_styles/RecipieCollections.css"

// TODO: TEMP REMOVE WHEN API IS IMPLEMENTED
import TestCollection from '../../assets/recipieCollections.json';


export const RecipieCollections = () => {
    
    // Go to previous page
    const navigate = useNavigate();

    // Handles going back return button
    const handleBackClick = () => {
        navigate(`/`)
    };

    return (
        <main className="content-width">
            <div onClick={handleBackClick}>
                <img className='back-icon icons' src="https://img.icons8.com/ios-glyphs/616161/150/circled-chevron-left" alt="back arrow" />
            </div>
            <h1 className="primary-font">Your recipies</h1>
            
            <InputGroup className="search-bar">
                <Form.Control
                    placeholder="Search your recipies..."
                    aria-label="Search recipies"
                    aria-describedby="basic-addon2"
                />
                <Button id="button-addon2"> Search </Button>
            </InputGroup>

            {TestCollection.collections.map((collection, i) => (
            <a className='collection-link' key={i} href={`/collections/${collection.collection_id}`}>
            <section className="recipie-collection shadow" style={{backgroundImage: `url(${collection.image_url})`}}> 
                <div className="options-icon-container">
                    <img className='options-icon icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/ellipsis" alt="options" />
                </div>                  
                    <h2 className="primary-font"> {collection.title} </h2>
                    <p>{collection.total_recipies} recipies</p>   
            </section>
            </a>
            ))}  

            <div className="add-item shadow">
                <img className='icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/plus" alt="options" />
            </div>   
        </main>
    )
}