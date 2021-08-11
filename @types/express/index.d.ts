// this file add to the types for express, which are found at node_modules/@types/express

declare global {
  namespace Express {
    interface Request {
      // add type for search so that middleware can add this key and value to
      // the request object
      search: URLSearchParams;
    }
  }
}

export {};
