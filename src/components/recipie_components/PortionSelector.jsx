import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export function PortionSelector({ portionSize, portionIncrease, portionDeacrease}) {
    
    return (
        <section className='ingredient-buttons'>
            <ButtonGroup aria-label="Portion selector">
                <Button onClick={portionDeacrease}>{<img className='portion-icons icons' src="https://img.icons8.com/ios-glyphs/ff9800/100/minus" alt="Ingredients" />}</Button>
                <p>Portions: <span className='bold-text'>{portionSize}</span></p>
                <Button onClick={portionIncrease}>{<img className='portion-icons icons' src="https://img.icons8.com/ios-glyphs/ff9800/100/plus" alt="Ingredients" />}</Button>
            </ButtonGroup>
        </section>
    );
}