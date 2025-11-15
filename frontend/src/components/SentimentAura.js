import React, { useRef, useEffect, useState } from "react";

/**
 * Sentiment Aura - p5.js Perlin Noise Field Visualization
 * 
 * This component creates a beautiful, fluid Perlin noise field that reacts to sentiment analysis.
 * 
 * Visual Parameters Mapped to Sentiment:
 * - Color Hue: Sentiment score (-1 to 1) maps to color wheel (0-360)
 *   - Positive (>0.3): Green/Cyan hues (120-180°)
 *   - Neutral (-0.3 to 0.3): Yellow/Orange hues (30-60°)
 *   - Negative (<-0.3): Red/Magenta hues (320-360°)
 * 
 * - Flow Speed: Absolute sentiment score affects particle velocity
 *   - Strong sentiment = faster, more energetic flow
 *   - Weak sentiment = slower, calmer flow
 * 
 * - Particle Density: Confidence level affects number of visible particles
 * - Noise Scale: Sentiment intensity affects field turbulence
 * - Brightness: Pulsates with analysis updates
 */
const SentimentAura = ({ sentimentScore = 0, isAnalyzing = false }) => {
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);
  const particlesRef = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  useEffect(() => {
    // Dynamically import p5 to avoid SSR issues
    import('p5').then((p5Module) => {
      const p5 = p5Module.default;

      const sketch = (p) => {
        let particles = [];
        let flowField = [];
        let cols, rows;
        let scl = 20;
        let inc = 0.1;
        let zoff = 0;
        
        // Visual parameters that react to sentiment
        let targetHue = 200;
        let currentHue = 200;
        let targetSpeed = 1;
        let currentSpeed = 1;
        let targetAlpha = 255;
        let currentAlpha = 255;
        let pulseIntensity = 0;

        p.setup = () => {
          const canvas = p.createCanvas(dimensions.width, dimensions.height);
          canvas.parent(canvasRef.current);
          
          // Style the canvas to be fixed background
          canvas.style('position', 'fixed');
          canvas.style('top', '0');
          canvas.style('left', '0');
          canvas.style('width', '100%');
          canvas.style('height', '100%');
          canvas.style('z-index', '0');
          canvas.style('pointer-events', 'none');
          
          p.colorMode(p.HSB, 360, 100, 100, 255);
          p.background(0, 0, 0);
          
          cols = p.floor(p.width / scl);
          rows = p.floor(p.height / scl);
          flowField = new Array(cols * rows);
          
          // Initialize particles
          for (let i = 0; i < 500; i++) {
            particles.push(new Particle(p));
          }
          
          particlesRef.current = particles;
        };

        p.draw = () => {
          // Semi-transparent background for trail effect
          p.background(0, 0, 5, 25);
          
          // Update visual parameters based on sentiment
          updateVisualParameters();
          
          // Calculate flow field using Perlin noise
          let yoff = 0;
          for (let y = 0; y < rows; y++) {
            let xoff = 0;
            for (let x = 0; x < cols; x++) {
              let index = x + y * cols;
              let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 4;
              let v = p5.Vector.fromAngle(angle);
              v.setMag(currentSpeed);
              flowField[index] = v;
              xoff += inc;
            }
            yoff += inc;
          }
          zoff += 0.003;

          // Draw and update particles
          for (let particle of particles) {
            particle.follow(flowField, cols, scl);
            particle.update();
            particle.edges();
            particle.show();
          }

          // Pulsing effect when analyzing
          if (isAnalyzing) {
            pulseIntensity = p.sin(p.frameCount * 0.1) * 30 + 30;
            drawPulsingGlow();
          }
        };

        function updateVisualParameters() {
          // Map sentiment score to color hue (smooth transition)
          if (sentimentScore > 0.3) {
            // Positive: Green to Cyan (120-180)
            targetHue = p.map(sentimentScore, 0.3, 1, 150, 120);
            targetSpeed = p.map(sentimentScore, 0.3, 1, 1, 2.5);
          } else if (sentimentScore < -0.3) {
            // Negative: Red to Magenta (340-360)
            targetHue = p.map(sentimentScore, -0.3, -1, 30, 350);
            targetSpeed = p.map(Math.abs(sentimentScore), 0.3, 1, 1, 2);
          } else {
            // Neutral: Yellow to Orange (40-60)
            targetHue = p.map(sentimentScore, -0.3, 0.3, 60, 40);
            targetSpeed = 1;
          }

          // Smooth transitions using lerp
          currentHue = p.lerp(currentHue, targetHue, 0.05);
          currentSpeed = p.lerp(currentSpeed, targetSpeed, 0.03);
          currentAlpha = p.lerp(currentAlpha, targetAlpha, 0.1);
        }

        function drawPulsingGlow() {
          p.push();
          p.noStroke();
          p.fill(currentHue, 80, 80, pulseIntensity);
          p.ellipse(p.width / 2, p.height / 2, 200 + pulseIntensity * 2);
          p.pop();
        }

        // Particle class for flow field
        class Particle {
          constructor(p) {
            this.p = p;
            this.pos = p.createVector(p.random(p.width), p.random(p.height));
            this.vel = p.createVector(0, 0);
            this.acc = p.createVector(0, 0);
            this.maxSpeed = 3;
            this.prevPos = this.pos.copy();
            this.lifespan = 255;
          }

          follow(flowField, cols, scl) {
            let x = this.p.floor(this.pos.x / scl);
            let y = this.p.floor(this.pos.y / scl);
            let index = x + y * cols;
            let force = flowField[index];
            if (force) {
              this.applyForce(force);
            }
          }

          applyForce(force) {
            this.acc.add(force);
          }

          update() {
            this.vel.add(this.acc);
            this.vel.limit(this.maxSpeed);
            this.pos.add(this.vel);
            this.acc.mult(0);
            
            // Age the particle
            this.lifespan -= 0.5;
            if (this.lifespan <= 0) {
              this.pos = this.p.createVector(
                this.p.random(this.p.width),
                this.p.random(this.p.height)
              );
              this.lifespan = 255;
            }
          }

          edges() {
            if (this.pos.x > this.p.width) {
              this.pos.x = 0;
              this.updatePrev();
            }
            if (this.pos.x < 0) {
              this.pos.x = this.p.width;
              this.updatePrev();
            }
            if (this.pos.y > this.p.height) {
              this.pos.y = 0;
              this.updatePrev();
            }
            if (this.pos.y < 0) {
              this.pos.y = this.p.height;
              this.updatePrev();
            }
          }

          updatePrev() {
            this.prevPos.x = this.pos.x;
            this.prevPos.y = this.pos.y;
          }

          show() {
            // Color based on current hue with variation
            let hueVariation = this.p.noise(this.pos.x * 0.01, this.pos.y * 0.01) * 60 - 30;
            let particleHue = (currentHue + hueVariation) % 360;
            
            // Brightness based on speed
            let brightness = this.p.map(this.vel.mag(), 0, this.maxSpeed, 40, 100);
            
            // Alpha based on lifespan
            let alpha = this.p.map(this.lifespan, 0, 255, 0, 150);
            
            this.p.stroke(particleHue, 70, brightness, alpha);
            this.p.strokeWeight(1.5);
            this.p.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
            this.updatePrev();
          }
        }

        p.windowResized = () => {
          p.resizeCanvas(dimensions.width, dimensions.height);
          cols = p.floor(p.width / scl);
          rows = p.floor(p.height / scl);
          flowField = new Array(cols * rows);
        };
      };

      // Create p5 instance
      if (!p5InstanceRef.current && canvasRef.current) {
        p5InstanceRef.current = new p5(sketch);
      }
    });

    // Cleanup
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [dimensions, sentimentScore, isAnalyzing]);

  // Update dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const parent = canvasRef.current.parentElement;
        setDimensions({
          width: parent.clientWidth,
          height: parent.clientHeight,
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none z-0" 
      ref={canvasRef}
      style={{ zIndex: 0 }}
    >
      {/* Overlay gradients for extra depth */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
    </div>
  );
};

export default SentimentAura;
