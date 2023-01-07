import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface IPerson {
  name: string;
  email: string;
}

const bodyValidation: yup.SchemaOf<IPerson> = yup.object().shape({
  name: yup.string().min(4).required(),
  email: yup.string().email().required(),
});

export const create = async (req: Request<{}, {}, IPerson>, res: Response) => {
  const body = req.body;

  try {
    const validatedData = await bodyValidation.validate(req.body, {
      abortEarly: false,
    });
  } catch (err) {
    const yupError = err as yup.ValidationError;

    const validationErrors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (error.path === undefined) {
        return;
      }

      validationErrors[error.path] = error.message;

      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: validationErrors,
      });
    });
  }

  return res.send({ message: "Person created!" });
};
