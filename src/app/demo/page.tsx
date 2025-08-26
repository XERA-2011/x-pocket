"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import GlowCard from "@/components/ui/GlowCard";

export default function QoderDemo() {
  const [isTyping, setIsTyping] = useState(false);
  const [codeInput, setCodeInput] = useState("");
  const [agentStatus, setAgentStatus] = useState("idle");
  const [currentDemo, setCurrentDemo] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const downloadWrapperRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      title: "Agentic Intelligence",
      description: "AI agents that think, plan, and execute complex coding tasks autonomously",
      icon: "🤖",
      status: "active"
    },
    {
      title: "Context Engineering",
      description: "Enhanced context understanding for smarter code generation and debugging",
      icon: "🧠",
      status: "processing"
    },
    {
      title: "Real Development",
      description: "Built for production-grade software development, not just prototypes",
      icon: "⚡",
      status: "ready"
    },
    {
      title: "Intelligent Workflows",
      description: "Seamlessly integrate AI into your development environment and processes",
      icon: "🔄",
      status: "optimizing"
    }
  ];

  const demoScenarios = [
    {
      title: "Code Generation",
      prompt: "Create a React component with TypeScript",
      response: "// Generating optimized component structure...\n// Adding TypeScript interfaces...\n// Implementing best practices..."
    },
    {
      title: "Bug Detection",
      prompt: "Analyze this function for potential issues",
      response: "// Scanning for memory leaks...\n// Checking type safety...\n// Validating edge cases..."
    },
    {
      title: "Code Refactoring",
      prompt: "Optimize this legacy codebase",
      response: "// Analyzing code patterns...\n// Suggesting architectural improvements...\n// Applying modern standards..."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDemo((prev) => (prev + 1) % demoScenarios.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [demoScenarios.length]);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
      );
    }
  }, []);

  // Canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles for neural network effect
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      size: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width / window.devicePixelRatio,
        y: Math.random() * canvas.height / window.devicePixelRatio,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        size: Math.random() * 2 + 1
      });
    }

    let animationId: number;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width / window.devicePixelRatio;
        if (particle.x > canvas.width / window.devicePixelRatio) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height / window.devicePixelRatio;
        if (particle.y > canvas.height / window.devicePixelRatio) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
        ctx.fill();
        
        // Draw connections to nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(true);
    setAgentStatus("thinking");
    
    setTimeout(() => {
      setAgentStatus("coding");
    }, 1500);
    
    setTimeout(() => {
      setAgentStatus("completed");
      setIsTyping(false);
    }, 4000);

    setTimeout(() => {
      setAgentStatus("idle");
    }, 6000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "thinking": return "text-yellow-400";
      case "coding": return "text-blue-400";
      case "completed": return "text-green-400";
      default: return "text-white/60";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Hero Section - Qoder Inspired */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-30" />
        
        <div className="max-w-6xl mx-auto text-center z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-white/60 bg-clip-text text-transparent">
              Qoder
            </h1>
            <div className="text-xl md:text-2xl text-white/40 font-mono mb-4">
              The Agentic Coding Platform
            </div>
          </motion.div>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            AI agents that think, plan, code, and execute to help you build{" "}
            <span className="text-white font-semibold">real software</span> and applications.
          </motion.p>

          {/* Agent Status Indicator */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center justify-center space-x-4 mb-16"
          >
            <div className="flex items-center space-x-2 bg-white/5 rounded-full px-6 py-3 border border-white/10">
              <div className={`w-3 h-3 rounded-full ${
                agentStatus === "idle" ? "bg-white/40" :
                agentStatus === "thinking" ? "bg-yellow-400 animate-pulse" :
                agentStatus === "coding" ? "bg-blue-400 animate-pulse" :
                "bg-green-400"
              }`} />
              <span className={`text-sm font-medium ${getStatusColor(agentStatus)}`}>
                Agent {agentStatus === "idle" ? "Ready" : 
                       agentStatus === "thinking" ? "Thinking..." :
                       agentStatus === "coding" ? "Coding..." : "Completed"}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1 mb-2"
          >
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </motion.div>
          <span className="text-sm text-white/60 uppercase tracking-wider">Explore</span>
        </motion.div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Core Capabilities</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Enhanced context engineering with intelligent agents for real software development
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <GlowCard
                  className="rounded-xl transition duration-300 group cursor-pointer"
                  onClick={() => {}}
                >
                  <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-300">
                      {feature.description}
                    </p>
                    <div className="flex items-center text-sm">
                      <div className={`w-2 h-2 rounded-full mr-2 transition-all duration-300 ${
                        feature.status === "active" ? "bg-green-400" :
                        feature.status === "processing" ? "bg-yellow-400 animate-pulse" :
                        feature.status === "ready" ? "bg-blue-400" :
                        "bg-white/40 animate-pulse"
                      }`} />
                      <span className="text-white/50 capitalize group-hover:text-white/70 transition-colors duration-300">{feature.status}</span>
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="py-32 px-8 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Live Demonstration</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Experience the power of agentic coding in real-time
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Interactive Terminal */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GlowCard
                className="rounded-xl transition duration-300"
              >
                <div className="bg-black/50 rounded-xl overflow-hidden hover:border-white/40 transition-all duration-300">
                  <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="ml-4 text-sm text-white/60 font-mono">qoder-agent.terminal</span>
                  </div>
                  <div className="p-6 h-96 overflow-y-auto font-mono text-sm">
                    <div className="text-green-400 mb-2">$ qoder init --project=demo</div>
                    <div className="text-white/60 mb-4">Initializing Qoder agent...</div>
                    
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentDemo}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-blue-400 mb-2">$ {demoScenarios[currentDemo].prompt}</div>
                        <div className="text-white/80 whitespace-pre-line">
                          {demoScenarios[currentDemo].response}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                    
                    <div className="flex items-center mt-4">
                      <span className="text-green-400">$</span>
                      <motion.div
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2 h-5 bg-white/80 ml-1"
                      />
                    </div>
                  </div>
                </div>
              </GlowCard>
            </motion.div>

            {/* Code Input Form */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <GlowCard
                className="rounded-xl transition duration-300"
              >
                <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm hover:border-white/20 transition-all duration-300 h-full">
                  <h3 className="text-2xl font-bold mb-6">Try Qoder Agent</h3>
                  <form onSubmit={handleCodeSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3 text-white/80">
                        Describe what you want to build
                      </label>
                      <textarea
                        value={codeInput}
                        onChange={(e) => setCodeInput(e.target.value)}
                        className="w-full h-32 bg-black/50 border border-white/20 rounded-lg px-4 py-3 focus:border-white/40 focus:outline-none transition-all duration-200 resize-none hover:border-white/30"
                        placeholder="e.g., Create a responsive navigation component with smooth animations..."
                      />
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        type="submit"
                        disabled={isTyping || !codeInput.trim()}
                        className="flex-1 bg-white text-black font-medium py-3 px-6 rounded-lg hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-105 transform"
                      >
                        {isTyping ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-black/20 border-t-black mr-2"></div>
                            Agent Working...
                          </>
                        ) : (
                          <>🚀 Run Agent</>
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setCodeInput("")}
                        className="px-4 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-200 hover:border-white/40"
                      >
                        Clear
                      </button>
                    </div>
                  </form>
                
                  {/* Agent Thinking Process */}
                  <AnimatePresence>
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 p-4 bg-black/30 rounded-lg border border-white/10"
                      >
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                          <span className="text-sm text-blue-400 font-medium">Agent Process</span>
                        </div>
                        <div className="space-y-2 text-sm text-white/60">
                          <div className="flex items-center space-x-2">
                            <span className="text-green-400">✓</span>
                            <span>Analyzing requirements</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-yellow-400">⟳</span>
                            <span>Planning architecture</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-white/40">○</span>
                            <span>Generating code</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlowCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Wrapper - Canvas Section */}
      <section ref={downloadWrapperRef} className="relative py-32 px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Neural Intelligence Network</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Visualizing the interconnected AI agents working together in real-time
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Canvas Container */}
            <GlowCard
              spread={120}
              className="rounded-2xl transition duration-300"
            >
              <div className="bg-white/5 rounded-2xl backdrop-blur-sm overflow-hidden hover:border-white/20 transition-all duration-300 relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 block"
                  style={{ background: 'transparent' }}
                />
                
                {/* Overlay UI Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Corner Labels */}
                  <div className="absolute top-4 left-4 text-sm text-white/60 font-mono group-hover:text-white/80 transition-colors duration-300">
                    Neural Network Active
                  </div>
                  <div className="absolute top-4 right-4 text-sm text-white/60 font-mono group-hover:text-white/80 transition-colors duration-300">
                    50 Nodes Connected
                  </div>
                  <div className="absolute bottom-4 left-4 text-sm text-white/60 font-mono group-hover:text-white/80 transition-colors duration-300">
                    Processing: Real-time
                  </div>
                  <div className="absolute bottom-4 right-4 text-sm text-white/60 font-mono group-hover:text-white/80 transition-colors duration-300">
                    Latency: <span className="text-green-400">12ms</span>
                  </div>
                  
                  {/* Center Status */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20 group-hover:border-white/40 group-hover:bg-black/70 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse group-hover:shadow-lg group-hover:shadow-green-400/50 transition-all duration-300"></div>
                        <span className="text-sm font-medium text-white">AI Network Online</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
            
            {/* Action Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button className="bg-white text-black font-medium py-3 px-8 rounded-lg hover:bg-white/90 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105 transform">
                <span>📥</span>
                <span>Download Qoder</span>
              </button>
              
              <button className="border border-white/20 text-white font-medium py-3 px-8 rounded-lg hover:bg-white/5 hover:border-white/40 transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105 transform">
                <span>📖</span>
                <span>View Documentation</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-50" />
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { label: "Code Quality", value: "99.8%", subtitle: "Pass Rate" },
              { label: "Response Time", value: "<2s", subtitle: "Average" },
              { label: "Context Size", value: "100K+", subtitle: "Tokens" },
              { label: "Developers", value: "50K+", subtitle: "Active Users" }
            ].map((metric, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <GlowCard
                  spread={80}
                  className="rounded-xl transition duration-300 group cursor-pointer"
                >
                  <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300 h-full">
                    <div className="text-4xl font-bold mb-2 text-white group-hover:scale-110 transition-transform duration-300">{metric.value}</div>
                    <div className="text-white/60 text-sm mb-1 group-hover:text-white/80 transition-colors duration-300">{metric.label}</div>
                    <div className="text-white/40 text-xs group-hover:text-white/60 transition-colors duration-300">{metric.subtitle}</div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}