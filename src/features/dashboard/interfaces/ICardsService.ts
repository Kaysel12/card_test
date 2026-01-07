import { ICardsAdd, ICardsResponse } from "./ICards";

export interface ICardsService {
    getAll(): Promise<ICardsResponse[]>;
    create(card: ICardsAdd): Promise<ICardsAdd>;
}