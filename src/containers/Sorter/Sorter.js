import React, { useState, useEffect } from "react";
import BarGraph from "../../components/BarGraph/BarGraph";

const Sorter = props => {
	const [array, setArray] = useState([]);
	const [arraySize, setArraySize] = useState(100);

	useEffect(() => {
		setNewArrayHandler();
	}, []);

	const setNewArrayHandler = () => {
		let newArray = [];
		for (let i = 0; i < arraySize; i++) {
			newArray.push(Math.floor(Math.random() * (arraySize - 4)) + 5);
		}
		setArray(newArray);
	};

	const bubbleSortHandler = () => {
		let newArray = [...array];
		for (let i = 0; i < newArray.length; i++) {
			for (let j = 0; j < newArray.length; j++) {
				if (newArray[j] > newArray[j + 1]) {
					swap(newArray, j, j + 1)
				}
			}
      }
      setArray(newArray)
   };

   const swap = (arr, i, j) => {
      let temp = arr[i]
      arr[i] = arr[j]
      arr[j] = temp
   }
   

	return (
		<div>
			<button onClick={setNewArrayHandler}>new array</button>
         <button onClick={bubbleSortHandler}>bubble sort</button>
			<div style={{ height: "400px" }}>
				<BarGraph values={array} color="blue" />
			</div>
		</div>
	);
};

export default Sorter;
