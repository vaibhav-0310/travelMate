const Joi= require("joi");

module.exports.ListingSchema=Joi.object({
   l: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
}).required()
});

module.exports.ReviewSchema=Joi.object({
    review:Joi.object({
      rating:Joi.number().required().min(1).max(5),
      comment:Joi.string().required(),
    }).required()
});