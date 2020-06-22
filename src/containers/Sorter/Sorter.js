import React, { useState, useEffect } from 'react'

const Sorter = (props) => {
   const [array, setArray] = useState([])
   const [arraySize, setArraySize] = useState(100)
   
   useEffect(() => {
      let newArray = [];
      for (let i = 0; i < arraySize; i++) {
         newArray.push(Math.floor(arraySize * Math.random()))
         
      }
      setArray(newArray)
   }, [])

   const setNewArrayHandler = () => {

   }

   return (
      <div>
         
      </div>
   )
}

export default Sorter
