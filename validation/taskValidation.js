const Joi = require("joi");

const taskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  completed: Joi.boolean(),
});

module.exports = taskSchema;