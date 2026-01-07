"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { ICardsAdd, ICardsResponse } from "../interfaces/ICards";
import { CardsService } from "../services/CardsService";

export const useCardServices = () => {
	const [data, setData] = useState<ICardsResponse[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const cardService = useMemo(() => new CardsService(), []);

	const fetchCards = useCallback(async () => {
		setIsLoading(true);
		try {
			const cards = await cardService.getAll();
			setData(cards);
		} catch (error) {
			console.error("Error al obtener tarjetas:", error);
			setData([]);
		} finally {
			setIsLoading(false);
		}
	}, [cardService]);

	useEffect(() => {
		fetchCards();

		const handleCardAdded = () => {
			fetchCards();
		};

		window.addEventListener("cardAdded", handleCardAdded);

		return () => {
			window.removeEventListener("cardAdded", handleCardAdded);
		};
	}, [fetchCards]);

	const createCard = async (card: ICardsAdd) => {
		try {
			await cardService.create(card);

			window.dispatchEvent(new Event("cardAdded"));

			await fetchCards();

		} catch (error) {
			console.error("Error al agregar tarjeta:", error);
		}
	}

	return {
		data,
		isLoading,
		reload: fetchCards,
		createCard,
	};
};
