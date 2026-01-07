"use client";

import { ICards } from "../../interfaces/ICards";

export class CardsService {
	private static MOCK_CARDS: ICards[] = [
		{
			mensaje: "",
			id: "2",
			beneficiario: false,
			cardLastNumbers: "4321",
			cardNumber: "**** **** **** 4321",
			cardHolderName: "Maria Lopez",
			expiryDate: "11/24",
			status: "inProgress",
			cardType: "mastercard",
			isDefault: false,
		},
		{
			mensaje: "",
			id: "1",
			beneficiario: false,
			cardLastNumbers: "0723",
			cardNumber: "**** **** **** 0723",
			cardHolderName: "Juan Perez",
			expiryDate: "12/25",
			status: "accepted",
			cardType: "visa",
			isDefault: true,
		},
	];

	async getAll(): Promise<ICards[]> {
		await this.simulateDelay();
		return CardsService.MOCK_CARDS;
	}

	async add(card: ICards): Promise<ICards> {
		await this.simulateDelay();
		CardsService.MOCK_CARDS.push(card);
		return card;
	}

	async remove(cardId: string): Promise<boolean> {
		await this.simulateDelay();
		CardsService.MOCK_CARDS = CardsService.MOCK_CARDS.filter(
			(c) => c.id !== cardId,
		);
		return true;
	}

	static async clear(): Promise<void> {
		CardsService.MOCK_CARDS = [];
		Promise.resolve();
	}

	private async simulateDelay(ms = 300): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}
