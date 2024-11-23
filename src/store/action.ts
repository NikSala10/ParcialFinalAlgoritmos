import { Actions, Screens } from '../types/store';
import { getEvents } from '../utils/firebase';
// import { getProducts } from '../utils/firebase';

export const navigate = (screen: Screens) => {
	return {
		action: Actions.NAVIGATE,
		payload: screen,
	};
};

export const getEventsAction = async () => {
	const products = await getEvents(); //Firestore
	return {
		action: Actions.GETPRODUCTS,
		payload: products,
	};
};