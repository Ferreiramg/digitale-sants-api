import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";

import corsOptions from "./config/cors";
import { LoginController } from "./controllers/login";
import { AccountController } from "./controllers/account";
import authMiddleware from "./middlewares/authMiddleware";
import checkTokenMiddleware from "./middlewares/checkTokenMiddleware";
import { OrganizationController } from "./controllers/organization";

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
app.use(checkTokenMiddleware);


app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is healthy!" });
});

//app.post("/login", LoginController.login);

app.get('/organization', OrganizationController.get);

app.post('/account', AccountController.create);

app.post('/account/set/webhook', AccountController.setWebhook);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




