import { Request, Response } from "express";
import CardService from "../services/digitalEasy/card";
import { CardPayloadCreate } from "../services/digitalEasy/types";

export class CardController {
    static async getCardDetails(req: Request, res: Response) {
        try {
            const { cardId, accountId } = req.params;
            const service = new CardService();
            const data = await service.getCardDetails(cardId, accountId);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async blockCard(req: Request, res: Response) {
        try {
            const { cardId, accountId } = req.params;
            const { password } = req.body;
            const service = new CardService();
            const data = await service.blockCard(cardId, accountId, password);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async unblockCard(req: Request, res: Response) {
        try {
            const { cardId, accountId } = req.params;
            const { password } = req.body;
            const service = new CardService();
            const data = await service.unblockCard(cardId, accountId, password);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createCard(req: Request, res: Response) {
        try {
            const payload: CardPayloadCreate = req.body;
            const service = new CardService();
            const data = await service.createCard(payload);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    
}
