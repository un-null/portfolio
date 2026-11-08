"use client";

import { useActionState } from "react";
import Link from "next/link";

import { submitContact, type ContactState } from "@/app/contact/actions";

import Icon from "./icons/icon";

const initialState: ContactState = { status: "idle" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialState,
  );

  return (
    <div className="w-full text-[#EEEEEE]">
      {state.status === "success" ? (
        <div className="text-center">
          <p>
            Your message has been received 🎉
            <br />
            <span className="text-balance block">
              We&apos;re grateful for your contact and will respond promptly!
            </span>
          </p>
          <Link
            href="/"
            className="group flex flex-col text-[#EEEEEE] transition-colors hover:text-[#7FB89F] focus-visible:text-[#7FB89F]"
          >
            <div className="mt-10 grid place-items-center">
              <span className="col-start-1 row-start-1 transition-opacity group-hover:opacity-0 group-focus-visible:opacity-0">
                <Icon type="Home" size={40} />
              </span>
              <span className="col-start-1 row-start-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Icon type="Exit" size={40} />
              </span>
            </div>
            <p className="text-xs">Exit</p>
          </Link>
        </div>
      ) : (
        <form
          action={formAction}
          className="mx-auto mt-10 flex w-full max-w-md flex-col space-y-4"
        >
          <label htmlFor="name">
            <span className="text-sm font-thin">name</span>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="your name"
              className="mt-1 w-full rounded bg-[#232323] p-2 text-sm accent-[#191919] outline-none placeholder:text-sm placeholder:text-[#9AA0A6]"
            />
            {state.errors?.name && (
              <span className="text-sm text-[#EC5D5E]">
                {state.errors.name[0]}
              </span>
            )}
          </label>

          <label htmlFor="email">
            <span className="text-sm font-thin">mail</span>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="your email"
              className="mt-1 w-full rounded bg-[#232323] p-2 text-sm accent-[#191919] outline-none placeholder:text-sm placeholder:text-[#9AA0A6]"
            />
            {state.errors?.email && (
              <span className="text-sm text-[#EC5D5E]">
                {state.errors.email[0]}
              </span>
            )}
          </label>

          <label htmlFor="message">
            <span className="text-sm font-thin">message</span>
            <textarea
              id="message"
              name="message"
              placeholder="your message"
              rows={4}
              className="max-h-[4lh] w-full resize-none rounded bg-[#232323] p-2 text-sm outline-none placeholder:text-sm placeholder:text-[#9AA0A6]"
            />
            {state.errors?.message && (
              <span className=" text-sm text-[#EC5D5E]">
                {state.errors.message[0]}
              </span>
            )}
          </label>

          {state.errors?.form && (
            <span className="text-sm text-[#EC5D5E]">
              {state.errors.form[0]}
            </span>
          )}

          <button
            type="submit"
            className="mx-auto block w-fit cursor-pointer rounded border bg-[#EDEDED] px-10 py-2 text-[#111111] disabled:cursor-not-allowed disabled:bg-[#6F6F6F]"
            disabled={isPending}
          >
            {isPending ? (
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
