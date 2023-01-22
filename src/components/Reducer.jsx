export const reducer = (state, action) => {
	if (action.type === 'REMOVE_ITEM') {
		return {
			...state,
			item: state.item.filter((curElem) => {
				return curElem.id !== action.payload;
			}),
		};
	}

	if (action.type === 'CLEAR_CART') {
		return {
			...state,
			item: [],
		};
	}

	if (action.type === 'INCREMENT') {
		let upadateCart = state.item.map((curElem) => {
			if (curElem.id === action.payload) {
				return { ...curElem, quantity: curElem.quantity + 1 };
			}
			return curElem;
		});
		return { ...state, item: upadateCart };
	}

	if (action.type === 'DECREMENT') {
		let updateDreCart = state.item
			.map((curElem) => {
				if (curElem.id === action.payload) {
					return { ...curElem, quantity: curElem.quantity - 1 };
				}
				return curElem;
			})
			.filter((curElem) => curElem.quantity !== 0); // when item got 0 it gets deleted
		return { ...state, item: updateDreCart };
	}

	if (action.type === 'GET_TOTAL') {
		let { totalItem, totalAmount } = state.item.reduce(
			(accum, curVal) => {
				let { quantity, price } = curVal;
				let updatedTotalAmount = price * quantity;
				accum.totalAmount += updatedTotalAmount;
				accum.totalItem += quantity;
				return accum;
			},
			{
				totalItem: 0,
				totalAmount: 0,
			}
		);
		return { ...state, totalItem, totalAmount };
	}
	return state;
};
