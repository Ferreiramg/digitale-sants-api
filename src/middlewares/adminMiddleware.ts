import { Request, Response, NextFunction } from 'express';

const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
     if (!req.user.isAdmin) {
          res.status(403).json({ message: 'Access denied. Admins only.' });
          return;
     }
     next();
};

export default adminMiddleware;