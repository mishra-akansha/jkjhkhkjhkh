import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { Aurora } from "./Aurora";
import { NexLinkButton } from "./primitives";
export function CTA() {
  return (
    <section id="cta" className="relative mx-auto w-full max-w-6xl px-5 py-16 sm:py-24">
      <div className="glass relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center sm:px-12 sm:py-24">
        <Aurora intensity={1.2} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <h2 className="mx-auto max-w-2xl text-3xl leading-[1.05] font-semibold sm:text-5xl">
            Ready to build the next <span className="gradient-text">unicorn?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
            Join thousands of innovators building the future with NEXVENTURE.
          </p>
          <div className="mt-8 flex justify-center">
            <NexLinkButton to="/signup" size="lg">
              Create Your Account <FiArrowUpRight />
            </NexLinkButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
