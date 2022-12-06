// path: ./src/api/restaurant/controllers/restaurant.js
const emailServices = require("./emailServices");
const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::booking-info.booking-info",
  ({ strapi }) => ({
    // Method 1: Creating an entirely custom action
    async exampleAction(ctx) {
      try {
        ctx.body = "ok";
      } catch (err) {
        ctx.body = err;
      }
    },

    // Method 2: Wrapping a core action (leaves core logic in place)
    async find(ctx) {
      // some custom logic here
      ctx.query = { ...ctx.query, local: "en" };

      // Calling the default core action
      const { data, meta } = await super.find(ctx);

      // some more custom logic
      meta.date = Date.now();

      return { data, meta };
    },
    async create(ctx) {
      // some logic here
      const response = await super.create(ctx);
      // some more logic
      if (response.data.id) {
        await emailServices.sendSimpleEmail(response.data.attributes);
      }
      return response;
    },

    async update(entityId, params) {
      // some logic here
      const result = await super.update(entityId, params);
      // some more logic
      console.log("dasd", result);
      if (result.data.attributes.verify === "Accpected") {
        await emailServices.sendAccpetEmail1(result.data.attributes);
      } else if (result.data.attributes.verify === "Denied") {
        await emailServices.sendDeniedEmail1(result.data.attributes);
      }
      return result;
    },
  })
);
