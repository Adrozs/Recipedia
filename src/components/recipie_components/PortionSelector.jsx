import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export function PortionSelector() {
    const [portionSize, setPortionSize] = useState(4);


    const portionIncrease = () => {
        const increasedPortionSize = portionSize +2;
        setPortionSize(increasedPortionSize);
    }

    const portionDeacrease = () => {

        if(portionSize > 2) {
            const decreasedPortionSize = portionSize - 2;
            setPortionSize(decreasedPortionSize);
        }
    }


    return (
        <section className='ingredient-buttons'>
            <ButtonGroup aria-label="Portion selector">
                <Button className='shadow' onClick={() => portionDeacrease()}>-</Button>
                <p>Portions: <span className='bold-text'>{portionSize}</span></p>
                <Button className='shadow' onClick={() => portionIncrease()}>+</Button>
            </ButtonGroup>
        </section>
    );
}