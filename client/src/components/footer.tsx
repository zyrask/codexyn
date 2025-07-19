import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-8 bg-background border-t border-border">
      <motion.div 
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-muted-foreground">
          Obviously made with love by the man, <span className="text-primary font-semibold">codexyn</span>.
        </p>
      </motion.div>
    </footer>
  );
}
