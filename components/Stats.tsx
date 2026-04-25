"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { label: "Total Value Locked", value: "$12.4M" },
  { label: "24h Trading Volume", value: "$890.5K" },
  { label: "Total Transactions", value: "14,230" },
  { label: "Average Pool APY", value: "4.2%" },
];

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="py-14 border-y border-violet-900/20 bg-[#0a0a14]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
