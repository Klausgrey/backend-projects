import express from "express";
const router = express.Router();

router.post("/", createEmployee);

export default router;
