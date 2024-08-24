import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/recipie_collection_styles/RecipieCollections.css"

// TODO: TEMP REMOVE WHEN API IS IMPLEMENTED
import TestAllShoppingLists from '../../assets/allShoppinglists.json';


export const AllShoppinglists = () => {

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
            <h1 className="primary-font bold-text">Your shoppinglists</h1>

            {/* Search bar */}
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

            {TestAllShoppingLists.shoppinglists.map((list, i) => (
                <a className='collection-link' key={i} href={`/shoppinglists/${list.shoppinglist_id}`}>
                    <section className='recipie-collection shadow'>
                        <div className='options-icon-container'>
                            <img className='options-icon icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/ellipsis" alt="options" />
                        </div>
                        <h2 className='primary-font'>{list.title}</h2>
                    </section>
                </a>
            ))}

            <div className="add-item shadow">
                <img className='icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/plus" alt="options" />
            </div>
        </main>
    )
}