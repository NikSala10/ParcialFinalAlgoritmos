export type Observer = { render: () => void } & HTMLElement;

export type AppState = {
	screen: string;
	products: any[];
};

export enum Screens {
	'ADMI' = 'ADMI',
	'USUARIO' = 'USUARIO',
	'ADD' = 'ADD',
}

export enum Actions {
	'NAVIGATE' = 'NAVIGATE',
	'GETPRODUCTS' = 'GETPRODUCTS',
}