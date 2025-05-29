import { Request, Response, NextFunction } from 'express';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {

     console.log(req.user);
     if (!req.user.isAdmin) {
          res.status(403).json({ message: 'Access denied. Admins only.' });
          return;
     }
     next();
};

export default adminMiddleware;