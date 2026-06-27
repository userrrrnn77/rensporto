import { useInView } from "framer-motion";
import { useRef } from "react";
import { useCountUp } from "@/hooks/useCountUp";

type Props = {
  value: number;
  suffix?: string;
  loading: boolean;
  error: boolean;
  formatter?: (n: number) => string;
};

export function AnimatedStat({
  value,
  suffix = "",
  loading,
  error,
  formatter,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true });

  const counted = useCountUp({
    target: value,
    duration: 1400,
    enabled: !loading && !error && isInView,
  });

  const display = formatter ? formatter(counted) : `${counted}${suffix}`;

  return (
    <dd
      ref={ref}
      className={`font-mono text-2xl font-semibold text-gray-1000 sm:text-3xl transition-opacity duration-300 ${
        loading ? "opacity-40" : "opacity-100"
      }`}>
      {loading ? "…" : error ? "—" : display}
    </dd>
  );
}
