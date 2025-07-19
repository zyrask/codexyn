import { motion } from "framer-motion";

const projects = [
  {
    name: "Broadcast Error",
    description: "A collaborative game development project that I'm building with a close friend. An exciting venture into interactive entertainment.",
    tags: ["Game Dev", "Collaborative"],
    icon: "🎮",
    link: "https://discord.gg/c9MfbBAkfH"
  },
  {
    name: "Light Yagami",
    description: "A comprehensive Discord moderation bot coded solo as a skills demonstration, featuring both fun elements and game mechanics.",
    tags: ["Discord Bot", "Moderation"],
    icon: "🤖",
  },
  {
    name: "Luckigi",
    description: "A Discord bot focused on fake gambling mechanics, providing entertainment similar to popular bots like Dank Memer.",
    tags: ["Discord Bot", "Gaming"],
    icon: "🎲",
  },
  {
    name: "Sentinel",
    description: "A specialized Discord bot designed for ticketing systems and welcoming new users with a seamless onboarding experience.",
    tags: ["Discord Bot", "Support"],
    icon: "🛡️",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Current Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are the projects I'm actively working on, each pushing the boundaries of what's possible.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold text-primary">{project.name}</h3>
                <span className="text-2xl group-hover:animate-pulse">{project.icon}</span>
              </div>
              
              <p className="text-muted-foreground mb-4">
                {project.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0190 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                    </svg>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
