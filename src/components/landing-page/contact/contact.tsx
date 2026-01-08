"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Send,
  Calendar,
  Mail,
  MessageSquare,
  Linkedin,
  Phone,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createGetInTouch } from "@/app/action/email-send";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import CalendlyEmbed from "@/components/ui/calendlyEmbed";
import { toast } from "sonner";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const [openCalendly, setOpenCalendly] = useState(false);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await createGetInTouch(data);
      form.reset();

      toast.success("Email sent successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="relative w-full py-24 px-6 md:px-20 bg-[#0a0a0a] overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
            WANT TO GET <span className="text-amber-500 italic">IN TOUCH?</span>
          </h2>
          <p className="text-4xl md:text-6xl text-amber-400 -mt-4">
            Drop me a line
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black tracking-widest text-amber-500 uppercase ml-4">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter your name"
                            className="bg-white/5 border-white/10 rounded-2xl px-6 py-6 text-white placeholder:text-white/20 focus:border-amber-500/50"
                          />
                        </FormControl>
                        <FormMessage className="ml-4 text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-black tracking-widest text-amber-500 uppercase ml-4">
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="Enter your email"
                            className="bg-white/5 border-white/10 rounded-2xl px-6 py-6 text-white placeholder:text-white/20 focus:border-amber-500/50"
                          />
                        </FormControl>
                        <FormMessage className="ml-4 text-red-400 text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-black tracking-widest text-amber-500 uppercase ml-4">
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          rows={5}
                          {...field}
                          placeholder="Enter your message"
                          className="bg-white/5 border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 focus:border-amber-500/50 resize-none"
                        />
                      </FormControl>
                      <FormMessage className="ml-4 text-red-400 text-xs" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="w-full md:w-auto px-10 py-7 bg-amber-500 hover:bg-amber-600 text-black font-black uppercase tracking-widest rounded-2xl transition-all hover:scale-105 active:scale-95 flex gap-3"
                >
                  <Send className="w-5 h-5" />
                  {form.formState.isSubmitting ? "Sending..." : "Submit"}
                </Button>
              </form>
            </Form>
          </div>

          <div className="space-y-8 h-full flex flex-col justify-center">
            <div className="p-8 bg-amber-500/5 border border-amber-500/20 rounded-[2.5rem] group hover:bg-amber-500/10 transition-all duration-500">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-amber-500 rounded-2xl text-black shadow-lg shadow-amber-500/20">
                  <Calendar className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">
                    Book a Call
                  </h3>
                  <p className="text-white/60 mb-6 leading-relaxed">
                    Prefer to talk in person? Schedule a 15-minute intro call
                    via Calendly to discuss your project.
                  </p>
                  <Button
                    onClick={() => setOpenCalendly(true)}
                    className="bg-amber-500 text-black font-black uppercase tracking-widest rounded-xl px-6 py-4 hover:bg-amber-600"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <Mail className="text-amber-500 w-5 h-5" />
                <a
                  href="mailto:jesica.lleona21@gmail.com"
                  className="text-sm font-medium text-white hover:text-amber-400 transition-colors"
                >
                  jesica.lleona21@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <Phone className="text-amber-500 w-5 h-5" />
                <a
                  href="tel:09951623657"
                  className="text-sm font-medium text-white hover:text-amber-400 transition-colors"
                >
                  0995&nbsp;162&nbsp;3657
                </a>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <X className="text-amber-500 w-5 h-5" />
                <a
                  href="https://x.com/jesica_lleona"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white hover:text-amber-400 transition-colors"
                >
                  @jesica_lleona
                </a>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
                <Linkedin className="text-amber-500 w-5 h-5" />
                <a
                  href="https://www.linkedin.com/in/jesica-lleona-859395232"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white hover:text-amber-400 transition-colors"
                >
                  Jesica Lleona
                </a>
              </div>

              <div className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl md:col-span-2">
                <MessageSquare className="text-amber-500 w-5 h-5" />
                <a
                  href="https://www.reddit.com/u/jesicalleona/s/T3Nu59Rh6h"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-white hover:text-amber-400 transition-colors"
                >
                  reddit.com/u/jesicalleona
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openCalendly} onOpenChange={setOpenCalendly}>
        <DialogOverlay className="bg-black/90 backdrop-blur-sm" />
        <DialogContent className=" w-full p-0 bg-transparent border-none shadow-none">
          <CalendlyEmbed url={process.env.NEXT_PUBLIC_CALENDLY_URL!} />
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Contact;
