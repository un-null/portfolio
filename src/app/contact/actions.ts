"use server";

import { z } from "zod";

import { notion } from "@/utils/notion";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
  message: z.string().trim().min(1, "Please enter your message"),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
    form?: string[];
  };
};

export async function submitContact(
  _previousState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = schema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { status: "error", errors: parsed.error.flatten().fieldErrors };
  }

  const { name, email, message } = parsed.data;

  try {
    await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_DATABASE_ID_FORM,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        Date: {
          date: {
            start: new Date().toISOString(),
          },
        },
        Text: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
      },
    });
  } catch {
    return {
      status: "error",
      errors: { form: ["Something went wrong. Please try again."] },
    };
  }

  return { status: "success" };
}
