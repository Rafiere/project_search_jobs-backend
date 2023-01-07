import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { PersonController } from "../controllers/person";

const router = Router();

router.get("/", (req, res) => {
  res.status(StatusCodes.OK);
});

router.post(
  "/persons",
  PersonController.createPersonValidator,
  PersonController.create
);

export { router };
