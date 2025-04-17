import { useEffect, useState, RefObject } from 'react';

// Type for Vanta effect options
interface VantaOptions {
  el: HTMLElement;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  color1?: string;
  color2?: string;
  size?: number;
  speed?: number;
  [key: string]: any;
}

// Load a script by adding it to the document head
const loadScript = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
};

/**
 * Custom hook to handle Vanta.js background effects
 * @param effectName The name of the Vanta effect (e.g., 'CELLS', 'WAVES', 'BIRDS', etc.)
 * @param options Options to customize the Vanta effect
 * @param ref Reference to the container element
 * @returns Object with loading state and any error that occurred
 */
const useVanta = (
  effectName: string,
  options: Omit<VantaOptions, 'el'>,
  ref: RefObject<HTMLElement>
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [effect, setEffect] = useState<any>(null);

  useEffect(() => {
    const initVanta = async () => {
      try {
        setLoading(true);
        
        // Make sure THREE.js is loaded first
        if (!(window as any).THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        }
        
        // Then load Vanta.js if needed
        if (!(window as any).VANTA) {
          await loadScript(`https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.${effectName.toLowerCase()}.min.js`);
        }
        
        // Create Vanta effect once scripts are loaded
        if (!effect && ref.current && (window as any).VANTA && (window as any).VANTA[effectName]) {
          const vantaEffect = (window as any).VANTA[effectName]({
            el: ref.current,
            ...options
          });
          
          setEffect(vantaEffect);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Failed to initialize Vanta effect:", err);
        setError(err instanceof Error ? err : new Error('Unknown error initializing Vanta'));
        setLoading(false);
      }
    };
    
    initVanta();
    
    // Cleanup function
    return () => {
      if (effect) {
        effect.destroy();
      }
    };
  }, [effectName, ref, options]);

  return { loading, error };
};

export default useVanta; 