import type { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
}

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Token não fornecido.",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token inválido.",
      });
    }

    const secret = process.env.SECRET_JWT;

    if (!secret) {
      throw new Error("JWT Secret não definida.");
    }

    const decoded = jwt.verify(token, secret) as unknown as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido.",
    });
  }
}
