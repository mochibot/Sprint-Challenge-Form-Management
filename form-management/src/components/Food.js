import React from 'react';

const Food = (props) => {
  return (
    <div className='food-card'>
      <h3>{props.food.name}</h3>
      <div className='food-category'>
        <div>{props.food.course}</div>
        <div>{props.food.technique}</div>
      </div>
      <div>Ingredients:
        <ul>
        {props.food.ingredients.map(item => <li key={item}>{item}</li>)}
        </ul>
      </div>
   </div>
  )
}

export default Food;