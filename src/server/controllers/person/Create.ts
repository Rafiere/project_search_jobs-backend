import { Request, Response } from "express";

interface IPerson {
  name: string;
  email: string;
}

export const create = (req: Request<{}, {}, IPerson>, res: Response) => {
  const body = req.body;

  return res.send({ message: "Person created!" });
};
