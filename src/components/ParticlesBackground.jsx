import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticlesBackground() {

  const particlesInit = async (engine) => {
    await loadSlim(engine);
  };

  return (
    <Particles
      id="particles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1
        },

        background: {
          color: "#061011"
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 70
          },

          color: {
            value: ["#16e9b4", "#02ebfa", "#5baa96"]
          },

          opacity: {
            value: 0.5
          },

          size: {
            value: {
              min: 1,
              max: 3
            }
          },

          move: {
            enable: true,
            speed: 0.3
          },

          links: {
            enable: false
          }
        }
      }}
    />
  );
}