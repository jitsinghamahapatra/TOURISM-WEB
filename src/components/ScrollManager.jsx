import React from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';

export default function ScrollManager({ children }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.08, 
      duration: 1.2, 
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false 
    }}>
      {children}
    </ReactLenis>
  );
}
