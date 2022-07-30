import { z } from "zod";

const dataSchema = z.object({
  body: z.object({
    htmlBody: z.string({
      required_error: "Html Body is required",
    }),
    fixation: z.string({
      required_error: "Fixation is required",
    }),
    saccade: z.string({
      required_error: "Saccade is required",
    }),
    url: z
      .string({
        required_error: "URL is required",
      })
      .url({ message: "Invalid url" }),
  }),
});

export default dataSchema;
