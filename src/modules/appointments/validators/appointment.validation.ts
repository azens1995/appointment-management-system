import Joi from 'joi';
import { Request } from 'express';

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

const appointmentUpdateSchema = Joi.object({
  title: Joi.string().optional(),
  date: Joi.date().optional(),
  appointmentFor: Joi.string().optional(),
  isConfirmed: Joi.boolean().optional(),
  purpose: Joi.string().optional(),
  symptoms: Joi.string().optional(),
  isCancelled: Joi.string().optional()
});

export const appointmentCreateValidator = (req: Request) => {
  return validator(appointmentCreateSchema, req.body);
};

export const appointmentUpdateValidator = (req: Request) => {
  return validator(appointmentUpdateSchema, req.body);
};
