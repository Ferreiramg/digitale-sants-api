import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

import corsOptions from "./config/cors";
import { LoginController } from "./controllers/login";
import { AccountController } from "./controllers/account";
import authMiddleware from "./middlewares/authMiddleware";
import checkTokenMiddleware from "./middlewares/checkTokenMiddleware";
import { OrganizationController } from "./controllers/organization";
import { CardController } from "./controllers/card";
import adminMiddleware from "./middlewares/adminMiddleware";

dotenv.config();

declare module "express" {
  export interface Request {
    user?: any;
  }
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(authMiddleware);
//app.use(checkTokenMiddleware);

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy!" });
});

//ADMIN ROUTES
//app.post("/login", LoginController.login);
app.post("/digital-easy/refresh-token", LoginController.refreshToken).use(adminMiddleware);
app.post('/card/:cardId/account/:accountId/block', CardController.blockCard).use(adminMiddleware);
app.post('/card/:cardId/account/:accountId/unblock', CardController.unblockCard).use(adminMiddleware);


app.get('/organization', OrganizationController.get);
app.get('/accounts', OrganizationController.getAccounts);
app.post('/account', AccountController.create);
app.get('/account', AccountController.getById);
app.post('/account/address', AccountController.address);
app.post('/account/phone', AccountController.phone);
app.post('/account/full', AccountController.createFullAccount);
app.post('/account/set/webhook', AccountController.setWebhook);

app.get('/card/:cardId/account/:accountId', CardController.getCardDetails);


app.post('/card', CardController.createCard);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




