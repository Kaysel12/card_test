import { ICardsResponse, ICardsAdd } from "../interfaces/ICards";
import { ICardsService } from "../interfaces/ICardsService";
import axios, { AxiosResponse } from "axios";

const API_URL = process.env.NEXT_PUBLIC_URL_API + "/api/Cards";

export class CardsService implements ICardsService {

    async create(payload: ICardsAdd) {
        const response = await fetch(`${API_URL}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        console.log("Response:", response);

        if (!response.ok) {
            throw new Error("Error en la API");
        }

        const data = await response.json();

        return data;
    }

    async getAll(): Promise<ICardsResponse[]> {
        const response: AxiosResponse<ICardsResponse[]> = await axios.get(API_URL);

        console.log("Fetched cards:", response);
        return response.data;
    }

}