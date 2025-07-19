import { motion } from "framer-motion";

const skills = [
  { name: "Python", level: 80, icon: "🐍" },
  { name: "Node.js", level: 80, icon: "🟢" },
  { name: "Luau", level: 60, icon: "💻" },
  { name: "Roblox Studio", level: 60, icon: "🎮" },
];

const specialties = [
  {
    title: "Discord Bot Development",
    description: "Creating sophisticated bots for moderation, entertainment, and community management",
    icon: "🤖"
  },
  {
    title: "Game Development",
    description: "Building interactive experiences and games with creative mechanics",
    icon: "🎮"
  },
  {
    title: "Backend Development",
    description: "Developing robust server-side applications and APIs",
    icon: "⚙️"
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg">
            Passionate developer with a focus on creating engaging digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-primary">Skills & Technologies</h3>
            
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium flex items-center">
                      <span className="mr-2">{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground">
                      {skill.level >= 75 ? 'Advanced' : 'Intermediate'}
                    </span>
                  </div>
                  <div className="bg-border rounded-full h-2">
                    <motion.div 
                      className="bg-primary h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-primary">What I Do</h3>
            <div className="space-y-4">
              {specialties.map((specialty) => (
                <div key={specialty.title} className="flex items-start space-x-3">
                  <span className="text-primary mt-1">{specialty.icon}</span>
                  <div>
                    <h4 className="font-semibold mb-1">{specialty.title}</h4>
                    <p className="text-muted-foreground">{specialty.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <a 
                href="https://www.roblox.com/users/648417667/profile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>View Roblox Profile</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
