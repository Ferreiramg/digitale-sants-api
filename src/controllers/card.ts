import { Request, Response } from "express";
import CardService from "../services/digitalEasy/card";
import { CardPayloadCreate } from "../services/digitalEasy/types";

export class CardController {

    static async getCardDetails(req: Request, res: Response) {
        try {

            const { cardId } = req.params;
            const { accountId } = req.user;//Conta recuperada do usuario autenticado

            const data = await CardService.getInstance().getCardDetails(cardId, accountId);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCardPin(req: Request, res: Response) {
        try {
            const { cardId } = req.params;
            const { accountId } = req.user;

            const data = await CardService.getInstance().getCardDetails(cardId, accountId);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async blockCard(req: Request, res: Response) {
        try {
            const { cardId, accountId } = req.params;
            const { password } = req.body;
         
            const data = await CardService.getInstance().blockCard(cardId, accountId, password);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async unblockCard(req: Request, res: Response) {
        try {
            const { cardId, accountId } = req.params;
            const { password } = req.body;
          
            const data = await CardService.getInstance().unblockCard(cardId, accountId, password);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createCard(req: Request, res: Response) {
        try {
            const payload: CardPayloadCreate = req.body;
          
            const data = await CardService.getInstance().createCard(payload);
            res.json(data);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

}
