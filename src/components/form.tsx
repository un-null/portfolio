"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Balancer from "react-wrap-balancer";
import z from "zod";

import Icon from "./icons/icon";

const schema = z.object({
  name: z.string().min(1, "Please enter your name").trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Please enter your email")
    .trim(),
  message: z.string().min(1, "Please enter your message").trim(),
});

export type Form = z.infer<typeof schema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty, isValid },
  } = useForm<Form>({ resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      schema.parse(data);
      await fetch("api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      }).then((res) => console.log(res));
    } catch {
      throw new Error("");
    }
  };

  return (
    <div className="w-full text-[#EEEEEE]">
      {isSubmitSuccessful ? (
        <div className="text-center">
          <p>
            Your message has been received 🎉
            <br />
            <Balancer>
              We&apos;re grateful for your contact and will respond promptly!
            </Balancer>
          </p>
          <Link
            href="/"
            className="flex flex-col hover:text-[#EEEEEE]"
          >
            <div className="mt-10 grid place-items-center">
              <Icon type="Home" size={40} />
            </div>
            <p className="text-xs">Go Home</p>
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-10 flex w-full max-w-md flex-col space-y-4"
        >
          <label htmlFor="name">
            <span className="text-sm font-thin">name</span>
            <input
              type="text"
              id="name"
              placeholder="your name"
              {...register("name")}
              className="bg-[#232323] mt-1 w-full rounded p-2 text-sm accent-[#191919] outline-none placeholder:text-sm"
            />
            {errors.name && (
              <span className="text-sm text-[#EC5D5E]">{errors.name.message}</span>
            )}
          </label>

          <label htmlFor="email">
            <span className="text-sm font-thin">mail</span>
            <input
              type="email"
              id="email"
              placeholder="your email"
              {...register("email")}
              className="bg-[#232323] mt-1 w-full rounded p-2 text-sm accent-[#191919] outline-none placeholder:text-sm"
            />
            {errors.email && (
              <span className="text-sm text-[#EC5D5E]">
                {errors.email.message}
              </span>
            )}
          </label>

          <label htmlFor="message">
            <span className="text-sm font-thin">message</span>
            <textarea
              id="message"
              placeholder="your message"
              rows={4}
              {...register("message")}
              className="bg-[#232323] max-h-[4lh] w-full resize-none rounded p-2 text-sm outline-none placeholder:text-sm"
            />
            {errors.message && (
              <span className=" text-sm text-[#EC5D5E]">
                {errors.message.message}
              </span>
            )}
          </label>

          <button
            type="submit"
            className="mx-auto block w-fit rounded border bg-[#EDEDED] px-10 py-2 text-[#111111] disabled:bg-[#6F6F6F] disabled:cursor-not-allowed cursor-pointer"
            disabled={!isDirty || !isValid || isSubmitting}
          >
            {isSubmitting ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent"></div>
            ) : (
              "Send"
            )}
          </button>
        </form>
      )}
    </div>
  );
}
