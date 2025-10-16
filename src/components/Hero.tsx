import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-medical.jpg";
import { Activity, Brain, Heart, Shield } from "lucide-react";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(135deg, hsl(217 91% 60% / 0.95) 0%, hsl(174 72% 56% / 0.9) 100%), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Healthcare Assistant</span>
          </div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Early Disease Detection
            <br />
            <span className="bg-gradient-to-r from-white to-accent-foreground bg-clip-text text-transparent">
              Powered by AI
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Get instant health insights based on symptoms and medical data. 
            Our AI analyzes patterns to predict disease risks and provide personalized recommendations.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              variant="default"
              className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl hover:scale-105"
              onClick={() => scrollToSection('predictions')}
            >
              <Activity className="w-5 h-5" />
              Start Health Check
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:text-white"
              onClick={() => scrollToSection('assistant')}
            >
              <Brain className="w-5 h-5" />
              Talk to AI Assistant
            </Button>
          </div>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Heart, title: "Multi-Disease Detection", desc: "Heart, Kidney, Diabetes & more" },
              { icon: Brain, title: "AI Health Assistant", desc: "24/7 medical consultation" },
              { icon: Activity, title: "Real-time Analysis", desc: "Instant predictions & insights" }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all duration-300"
              >
                <feature.icon className="w-8 h-8 mb-3 mx-auto text-accent" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-white/80">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
