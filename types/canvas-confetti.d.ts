declare module 'canvas-confetti' {
    type Options = {
      particleCount?: number;
      spread?: number;
      origin?: { x?: number; y?: number };
      angle?: number;
      startVelocity?: number;
      gravity?: number;
      scalar?: number;
      drift?: number;
      colors?: string[];
    };
  
    function confetti(options?: Options): void;
  
    export default confetti;
  }
  