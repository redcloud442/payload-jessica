"use server";

import { GetInTouch } from "@/lib/email";
import { resend } from "@/lib/resend";
import { ContactFormValues } from "@/lib/schema";
import { render } from "@react-email/render";

export const createGetInTouch = async (formData: ContactFormValues) => {
  const { name, email, message } = formData;

  try {
    console.log("Sending email");
    const result = await resend.emails.send({
      from: "Contact Form <info@jesicalleonablog.com>",
      to: ["markivor.glorioso@gmail.com"],
      subject: "New Contact Form Submission",
      replyTo: email,
      html: await render(
        GetInTouch({
          FullName: name,
          Email: email,
          Message: message,
        })
      ),
    });

    if (result.error) {
      throw new Error(result.error.message);
    }
  } catch (error) {
    throw new Error("Failed to send email");
  }
};
