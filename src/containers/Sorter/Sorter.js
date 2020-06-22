import React, { useState, useEffect } from 'react'

const Sorter = (props) => {
   const [array, setArray] = useState([])
   const [arraySize, setArraySize] = useState(100)
   
   useEffect(() => {
      let newArray = [];
      for (let i = 0; i < arraySize; i++) {
         newArray.push(Math.floor(Math.random() * (arraySize - 4)) + 5)
         
      }
      setArray(newArray)
   }, [])

   const setNewArrayHandler = () => {

   return (
      <div>
         
      </div>
   )
}

export default Sorter
