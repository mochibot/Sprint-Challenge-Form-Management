import React from 'react';

const Food = (props) => {
  return (
    <div>
      <div>Name: {props.food.name}</div>
      <div>Course: {props.food.course}</div>
      <div>Technique: {props.food.technique}</div>
      {props.food.ingredients.map(item => <div key={item}>{item}</div>)}
    </div>
  )
}

export default Food;