// src/utils/validators.js
const Joi = require('joi');

// Validation inscription utilisateur
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('student','university','admin').required(),
  profile: Joi.object({
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    phone: Joi.string().optional(),
    city: Joi.string().optional(),
    preferredDomain: Joi.string().optional()
  }).optional()
});

// Validation login
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

// Validation université
const universitySchema = Joi.object({
  name: Joi.string().required(),
  city: Joi.string().required(),
  description: Joi.string().optional(),
  website: Joi.string().uri().optional(),
  contacts: Joi.object({
    email: Joi.string().email().optional(),
    phone: Joi.string().optional()
  }).optional(),
  logoUrl: Joi.string().uri().optional(),
  isVerified: Joi.boolean().optional()
});

// Validation formation
const formationSchema = Joi.object({
  universityId: Joi.string().required(),
  title: Joi.string().required(),
  domain: Joi.string().required(),
  level: Joi.string().optional(),
  duration: Joi.string().optional(),
  fees: Joi.number().optional(),
  mode: Joi.string().valid('onsite','online','hybrid').required(),
  prerequisites: Joi.array().items(Joi.string()).optional(),
  sessions: Joi.array().items(Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
  })).optional(),
  published: Joi.boolean().optional()
});

module.exports = {
  registerSchema,
  loginSchema,
  universitySchema,
  formationSchema
};
