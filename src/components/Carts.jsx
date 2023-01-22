import React, { createContext, useReducer, useEffect } from 'react';
import './Cart.css';
import { products } from './Products';
import ContextCart from './ContextCart';
import { reducer } from './Reducer';

export const CartContext = createContext();

const initialState = {
	item: products,
	totalAmount: 0,
	totalItem: 0,
};

const Carts = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const removeItem = (id) => {
		return dispatch({
			type: 'REMOVE_ITEM',
			payload: id,
		});
	};

	const clearCart = () => {
		return dispatch({
			type: 'CLEAR_CART',
		});
	};

	const increment = (id) => {
		return dispatch({
			type: 'INCREMENT',
			payload: id,
		});
	};

	const decrement = (id) => {
		return dispatch({
			type: 'DECREMENT',
			payload: id,
		});
	};

	// we will use the useEffect to update the data
	useEffect(() => {
		dispatch({ type: 'GET_TOTAL' });
		console.log('All Right');
	}, [state.item]);

	// useEffect(() => {
	// 	dispatch({ type: 'GET_TOTAL_AMOUNT' });
	// 	console.log('All Right');
	// }, [state.item]);

	return (
		<CartContext.Provider
			value={{ ...state, removeItem, clearCart, increment, decrement }}
		>
			<ContextCart />
		</CartContext.Provider>
	);
};

export default Carts;
