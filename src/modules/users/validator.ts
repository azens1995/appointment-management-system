import Joi from 'joi';

const validator = (schema: Joi.ObjectSchema) => (payload: object) =>
  schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.number()
    .integer()
    .min(10 ** 9)
    .max(10 ** 10 - 1)
    .required()
    .messages({
      'number.min': 'Phone number should be 10 digit.',
      'number.max': 'Phone number should be 10 digit'
    }),
  password: Joi.string().min(5).required(),
  address: Joi.string().required(),
  isActive: Joi.boolean().required(),
  isVerified: Joi.boolean().required(),
  requestedAppointments: Joi.array(),
  invitedAppointments: Joi.array()
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required()
});

export const validateSignup = validator(signupSchema);
export const validateSignin = validator(signinSchema);
