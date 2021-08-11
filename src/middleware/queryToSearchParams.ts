import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to be used on routes that require `req.query` to be be made
 * available as an instance of `URLSearchParams` via `req.search`.
 *
 * Adds an instance of `URLSearchParams` based on `req.query` to `req.search`.
 */
const queryToSearchParams = (req: Request, res: Response, next: NextFunction): void => {
  // this is allowed because we modified the express types to include
  // search in the request object (see @types/express/index.d.ts)
  req.search = new URLSearchParams(req.query as never);
  next();
};

export { queryToSearchParams };
