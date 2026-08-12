import { motion } from "motion/react";
import { AccentWord } from "./ui/AccentWord";

const strugglePoints = [
  "Stubborn fat that won't budge despite diet & exercise",
  "Cellulite making you self-conscious",
  "Loss of muscle tone and definition",
  "Clothes not fitting the way they used to",
  "Feeling uncomfortable in swimwear or fitted clothing",
  "Wanting a more sculpted, contoured body shape",
];

export function WhoThisIsForBody() {
  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gradient-to-b from-white via-blue-50/30 to-white" dir="ltr">
      <div className="container mx-auto px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-serif font-normal text-gray-900 leading-tight">
            Who This Is For
          </h2>
          <p className="text-gray-500 text-base md:text-lg lg:text-xl mt-4 font-light">
            If you've ever looked in the mirror and thought... "I used to feel so confident"
          </p>
          <p className="text-blue-500 text-base md:text-lg lg:text-xl mt-3 font-light">
            Your body is ready for a change.
          </p>
        </motion.div>

        {/* Two columns */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Left card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-[0_20px_50px_-25px_rgba(59,130,246,0.35)] px-6 py-8 lg:px-10 lg:py-10"
          >
            <div className="absolute left-0 top-0 h-full w-[4px] bg-gradient-to-b from-blue-500 to-blue-300" />
            <p className="text-xs lg:text-sm uppercase tracking-[0.22em] text-blue-500 font-bold mb-6">
              If You Are Suffering From
            </p>
            <ul className="space-y-4 lg:space-y-5">
              {strugglePoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <span className="text-gray-700 text-base lg:text-lg font-light leading-relaxed">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <p className="text-xs lg:text-sm uppercase tracking-[0.22em] text-blue-500 font-bold mb-5">
              This Solution Is For You
            </p>
            <h3 className="font-serif font-normal text-gray-900 text-3xl lg:text-4xl xl:text-5xl leading-tight">
              Feel confident in your body again{" "}
              <AccentWord>sculpted, toned, and naturally contoured</AccentWord>
            </h3>
            <p className="text-gray-600 text-base lg:text-lg xl:text-xl font-light leading-relaxed mt-6">
              Designed to reduce stubborn fat, tone muscles, and smooth cellulite, giving you visible results{" "}
              <span className="font-semibold text-gray-900">without surgery or downtime.</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
