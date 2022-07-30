import prisma from "../prisma";
import { Request, Response, NextFunction } from "express";

const parseDb = async (req: Request, res: Response, next: NextFunction) => {
  const url = await prisma.url.findUnique({
    where: {
      url: req.body.url,
    },
  });
  if (url) {
    return res.send(url.bioBody);
  }
  return next();
};

export default parseDb;
