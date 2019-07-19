import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utilities/axiosWithAuth';
import Food from './Food';

const FoodList = () => {
  const [foodList, setFoodList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosWithAuth().get('http://localhost:5000/api/restricted/data')
      .then(response => {
        console.log('fetching data success: ', response)
        setFoodList(response.data)
        setIsLoading(false);
      })
      .catch(error => {
        console.log('fetching data error: ', error)
        setIsLoading(false);
      })
  }, [])

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {foodList.map(item => <Food key={item.name} food={item} />)}
    </div>
  )
}

export default FoodList;