import { type } from "arktype";

export const priority = type("'none' | 'low' | 'medium' | 'high'");

export type Priority = typeof priority.infer;
