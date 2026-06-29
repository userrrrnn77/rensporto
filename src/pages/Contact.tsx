import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CommentSection } from "@/components/layout/CommentSection";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        setStatus("success");
        event.currentTarget.reset();
      } else {
        setStatus("error");
        setErrorMessage(data.message ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Try again in a bit.");
    }
  }

  return (
    <section className="mx-auto max-w-300 px-6 py-20 sm:py-28">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.4, ease: [0.175, 0.885, 0.32, 1.1] }}
        className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-700" />
        <span className="font-sans text-xs font-medium uppercase tracking-wide text-gray-900">
          Contact
        </span>
      </motion.div>

      <div className="mt-4 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-160">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.05,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            className="text-3xl font-semibold tracking-[-1.28px] text-gray-1000 sm:text-4xl sm:tracking-[-2.4px]">
            Let's talk.
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.08,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            className="mt-3 text-base text-gray-900">
            Got a project in mind, or just want to say hi? Send a message and
            it'll land straight in my inbox.
          </motion.p>

          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0.175, 0.885, 0.32, 1.1],
            }}
            onSubmit={handleSubmit}
            className="mt-8 space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="w-full rounded-sm border border-gray-alpha-400 bg-background-100 px-3 py-2.5 font-sans text-sm text-gray-1000 outline-none focus-visible:border-blue-700"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="w-full rounded-sm border border-gray-alpha-400 bg-background-100 px-3 py-2.5 font-sans text-sm text-gray-1000 outline-none focus-visible:border-blue-700"
            />
            <textarea
              name="message"
              placeholder="What's on your mind?"
              required
              rows={5}
              className="w-full rounded-sm border border-gray-alpha-400 bg-background-100 px-3 py-2.5 font-sans text-sm text-gray-1000 outline-none focus-visible:border-blue-700 resize-none"
            />

            <div className="flex items-center justify-between">
              <div className="min-h-5">
                {status === "success" && (
                  <p className="text-sm text-green-700">
                    Message sent — thanks for reaching out.
                  </p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-700">{errorMessage}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="ml-4 flex h-10 shrink-0 items-center rounded-sm bg-gray-1000 px-4 font-sans text-sm font-medium text-background-100 transition-opacity hover:opacity-85 disabled:opacity-60 cursor-pointer">
                {status === "sending" ? "Sending..." : "Send message"}
              </button>
            </div>
          </motion.form>
        </div>

        <CommentSection />
      </div>
    </section>
  );
}
