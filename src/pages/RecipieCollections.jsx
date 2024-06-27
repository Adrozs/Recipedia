import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link } from 'react-router-dom'
import CollectionCard from "../components/recipie_collections_components/CollectionCard.jsx"
import "../styles/recipie_collection_styles/RecipieCollections.css"

// TODO: TEMP REMOVE WHEN API IS IMPLEMENTED
import TestCollection from '../assets/recipieCollections.json';


export const RecipieCollections = () => {



    return (
        <main className="content-width">
            <h1 className="primary-font bold-text">Your recipies</h1>
            
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

            {TestCollection.collections.map((collection, i) => (
            <section key={i} className="recipie-collection shadow">
                <div className="options-icon-container">
                    <img className='options-icon icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/ellipsis" alt="options" />
                </div>                  
                    <h2 className="primary-font"> {collection.title} </h2>
                    <p>17 recipies</p>   
                    <Link to={`/collections/${collection.collection_id}`}>GOTO</Link>                                        
            </section>
            ))}  

            <section className="add-collection shadow">
                <img className='icons' src="https://img.icons8.com/ios-glyphs/FFFFFF/150/plus" alt="options" />
            </section>   
        </main>
    )
}