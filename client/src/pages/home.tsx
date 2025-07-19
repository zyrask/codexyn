import { useState } from "react";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ProjectsSection from "@/components/projects-section";
import AboutSection from "@/components/about-section";
import BroadcastErrorSection from "@/components/broadcast-error-section";
import ContactSection from "@/components/contact-section";
import ProgressTracker from "@/components/progress-tracker";
import Footer from "@/components/footer";
import { useSecretCode } from "@/hooks/use-secret-code";

export default function Home() {
  const [editModeUnlocked, setEditModeUnlocked] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleSecretCodeEntered = () => {
    setEditModeUnlocked(true);
    setShowNotification(true);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    setTimeout(() => {
      const progressSection = document.getElementById('progress-tracker');
      if (progressSection) {
        progressSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000);
  };

  useSecretCode('9017598429', handleSecretCodeEntered);

  return (
    <div className="dark min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Secret Code Notification */}
      <div 
        className={`fixed top-20 right-4 z-50 bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow-lg transition-all duration-500 ${
          showNotification ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0'
        }`}
      >
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z" clipRule="evenodd" />
          </svg>
          <span className="font-medium">Edit Mode Activated!</span>
        </div>
      </div>

      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <BroadcastErrorSection />
      <ProgressTracker editMode={editModeUnlocked} />
      <ContactSection />
      <Footer />
    </div>
  );
}
