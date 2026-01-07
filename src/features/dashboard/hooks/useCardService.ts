"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { CardsService } from "../services/mock/CardsService";
import { ICards } from "../interfaces/ICards";

export const useCardServices = () => {
	const [data, setData] = useState<ICards[]>([]);
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
	}, [fetchCards]);

	const deletedCard = async (cardId: string): Promise<string | undefined> => {
		try {
			const cardToDelete = data.find((card) => card.id === cardId);
			if (!cardToDelete) {
				return "Tarjeta no encontrada";
			}
			if (cardToDelete.status === "inProgress") {
				return "Ésta tarjeta está en un proceso y no se puede eliminar";
			}
			await cardService.remove(cardId);
			setData((prev) => prev.filter((card) => card.id !== cardId));
			return undefined;
		} catch (error) {
			console.error("Error al eliminar tarjeta:", error);
			return "Ocurrió un error al eliminar la tarjeta. Intente nuevamente.";
		}
	};

	return {
		data,
		isLoading,
		deletedCard,
		reload: fetchCards,
		cardService,
	};
};
