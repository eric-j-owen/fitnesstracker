import { Router } from "express";
import * as Controller from "./users.controller.js";

const router = Router();

router.get("/", Controller.getUsers);
router.post("/");

router.get("/:id", Controller.getUser);
router.patch("/:id", Controller.updateUser);
router.delete("/:id", Controller.deleteUser);

// router.post("/register", Controller.createUser);
// router.post("/login", Controller.login);
// router.post("/logout", Controller.logout);

export default router;
