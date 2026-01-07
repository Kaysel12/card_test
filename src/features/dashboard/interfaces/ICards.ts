export interface ICards {
	mensaje: string;
	id: string;
	beneficiario: boolean;
	cardLastNumbers: string;
	cardNumber: string;
	cardHolderName: string;
	expiryDate: string;
	status: "inProgress" | "accepted" | "rejected";
	cardType: "visa" | "mastercard" | "amex";
	isDefault: boolean;
}

export interface ICardsAdd{
	cardNumber: string;
	cardHolderName: string;
	expiryDate: string;
	cvv: string;
}
