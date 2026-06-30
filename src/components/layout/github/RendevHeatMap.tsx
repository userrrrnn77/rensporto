import { RENDEV_PATTERN } from "./rendev-pattern";

const INTENSITY_CLASS: Record<number, string> = {
  0: "bg-gray-alpha-200 border-gray-alpha-300",
  1: "bg-green-300 border-green-400",
  2: "bg-green-500 border-green-600",
  3: "bg-green-700 border-green-800",
  4: "bg-green-900 border-green-1000",
};

const LEGEND_CLASSES = [
  "bg-gray-alpha-200",
  "bg-green-300",
  "bg-green-500",
  "bg-green-700",
  "bg-green-900",
];

export function RendevHeatmap() {
  return (
    <section className="border-t border-gray-alpha-200">
      <div className="mx-auto max-w-300 px-6 py-20">
        <h2 className="text-center text-2xl font-semibold tracking-[-0.96px] text-gray-1000">
          Built by RENDEV.
        </h2>
        <p className="mx-auto mt-3 max-w-120 text-center text-sm text-gray-900">
          Every square, every commit, every shipped feature — same discipline,
          every single day.
        </p>

        <div className="mx-auto mt-12 max-w-fit rounded-md border border-gray-alpha-400 bg-background-200 p-5 shadow-raised">
          <div className="flex gap-0.5">
            {RENDEV_PATTERN.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-0.5">
                {week.map((intensity, di) => (
                  <div
                    key={di}
                    className={`h-3 w-3 rounded-xs border ${INTENSITY_CLASS[intensity]}`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-end gap-1.5">
            <span className="font-sans text-[10px] text-gray-600">Less</span>
            {LEGEND_CLASSES.map((cls, i) => (
              <div key={i} className={`h-3 w-3 rounded-xs ${cls}`} />
            ))}
            <span className="font-sans text-[10px] text-gray-600">More</span>
          </div>
        </div>
      </div>
    </section>
  );
}
