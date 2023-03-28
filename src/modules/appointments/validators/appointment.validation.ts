import { Request } from 'express';
import Joi from 'joi';

const validator = (schema: Joi.ObjectSchema, payload: any) =>
  schema.validate(payload, { abortEarly: false });

const appointmentCreateSchema = Joi.object({
  title: Joi.string().required(),
  date: Joi.date().required(),
  appointmentFor: Joi.string().required(),
  isConfirmed: Joi.boolean().required(),
  purpose: Joi.string().optional(),
  symptoms: Joi.string().optional(),
  isCancelled: Joi.string().optional()
});

export const appointmentCreateValidator = (req: Request) => {
  return validator(appointmentCreateSchema, req.body);
};
