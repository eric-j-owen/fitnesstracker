import { query, type RequestHandler } from "express";

export const getMacros: RequestHandler = async (req, res, next) => {
    try {
        const { rows } = await query("select * from macros");
    }
};
export const logMacros: RequestHandler = (req, res, next) => {};
