import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { topicIds } from "@/content/site";

const inquirySchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  topic: z.enum(topicIds),
  message: z.string().trim().min(20).max(4000),
  consent: z.literal(true),
  website: z.string().max(200).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const submitInquiry = createServerFn({ method: "POST" })
  .validator(inquirySchema)
  .handler(async ({ data }) => {
    if (data.website && data.website.trim().length > 0) {
      return { ok: true as const };
    }
    // Prezentační web: údaj neukládáme, neodesíláme a nelogujeme.
    return { ok: true as const };
  });

export { inquirySchema };
