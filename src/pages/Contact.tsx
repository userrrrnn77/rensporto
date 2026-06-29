import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle, Send } from "lucide-react";
import { CommentSection } from "@/components/layout/CommentSection";

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

const BASE_URL = import.meta.env.VITE_URL_CORE;

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.96, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 8 }}
      transition={{ duration: 0.35, ease: [0.175, 0.885, 0.32, 1.1] }}
      className="flex flex-col items-start justify-center gap-5 py-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-full border border-green-300 bg-green-100">
        <CheckCircle className="h-5 w-5 text-green-700" strokeWidth={2} />
      </div>

      <div>
        <h2 className="font-sans text-base font-semibold text-gray-1000">
          Message sent!
        </h2>
        <p className="mt-1 text-sm text-gray-700">
          Thanks for reaching out—I'll get back to you as soon as possible.
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="font-sans text-xs text-gray-600 underline underline-offset-2 transition-colors hover:text-gray-1000">
        Send another message
      </button>
    </motion.div>
  );
}

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch(`${BASE_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        success: boolean;
        message: string;
      };

      if (data.success) {
        setStatus("success");
      } else {
        setStatus("idle");
        toast.error(data.message ?? "Something went wrong.", {
          description: "Coba lagi ya.",
        });
      }
    } catch {
      setStatus("idle");
      toast.error("Tidak bisa menghubungi server.", {
        description: "Cek koneksi kamu dan coba lagi.",
      });
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

          {/* Form ↔ Success swap */}
          <div className="mt-8 min-h-72">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <SuccessState key="success" onReset={() => setStatus("idle")} />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{
                    duration: 0.25,
                    ease: [0.175, 0.885, 0.32, 1.1],
                  }}
                  onSubmit={handleSubmit}
                  className="space-y-3">
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
                    className="w-full resize-none rounded-sm border border-gray-alpha-400 bg-background-100 px-3 py-2.5 font-sans text-sm text-gray-1000 outline-none focus-visible:border-blue-700"
                  />

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="flex h-10 shrink-0 cursor-pointer items-center gap-2 rounded-sm bg-gray-1000 px-4 font-sans text-sm font-medium text-background-100 transition-opacity hover:opacity-85 disabled:opacity-60">
                      <Send className="h-3.5 w-3.5" strokeWidth={2} />
                      {status === "sending" ? "Sending..." : "Send message"}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        <CommentSection />
      </div>
    </section>
  );
}
