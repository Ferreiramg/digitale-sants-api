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

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy!" });
});

app.use(authMiddleware);
//app.use(checkTokenMiddleware);

//ADMIN ROUTES
//app.post("/login", LoginController.login);
app.post("/digital-easy/refresh-token", adminMiddleware, LoginController.refreshToken);

app.post('/card/:cardId/account/:accountId/block', CardController.blockCard);
app.post('/card/:cardId/account/:accountId/unblock', CardController.unblockCard);

app.post('/account/set/webhook', OrganizationController.setWebhook);
app.get('/organization', OrganizationController.get);

app.get('/accounts', OrganizationController.getAccounts);
app.post('/account', AccountController.create);
app.get('/account', AccountController.getById);
app.post('/account/address', AccountController.address);
app.post('/account/phone', AccountController.phone);
app.post('/account/full', AccountController.createFullAccount);

app.get('/card/:cardId', CardController.getCardDetails);


app.post('/card', CardController.createCard);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




