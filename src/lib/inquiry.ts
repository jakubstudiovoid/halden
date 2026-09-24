import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { topics } from "@/content/site";

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Napište jméno.").max(80, "Jméno je příliš dlouhé."),
  email: z
    .string()
    .trim()
    .email("Zadejte platný e-mail.")
    .max(160, "E-mail je příliš dlouhý."),
  topic: z.enum(topics, { message: "Vyberte, čeho se věc týká." }),
  message: z
    .string()
    .trim()
    .min(20, "Napište aspoň pár vět, ať víme, o čem mluvit.")
    .max(4000, "Zpráva je příliš dlouhá."),
  consent: z.literal(true, { message: "Bez souhlasu zprávu nepřijmeme." }),
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
