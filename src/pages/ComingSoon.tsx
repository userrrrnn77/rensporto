type ComingSoonProps = {
  eyebrow: string;
  heading: string;
  description: string;
};

export function ComingSoon({ eyebrow, heading, description }: ComingSoonProps) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-160 flex-col items-center justify-center px-6 py-20 text-center">
      <span className="font-sans text-xs font-medium uppercase tracking-wide text-gray-900">
        {eyebrow}
      </span>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-1.28px] text-gray-1000">
        {heading}
      </h1>
      <p className="mt-3 text-base text-gray-900">{description}</p>
    </section>
  );
}
