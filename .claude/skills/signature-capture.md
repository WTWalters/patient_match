# Skill: Signature Capture

## Overview
The application requires capturing patient signatures for consent forms. This must work reliably on iPad touch screens and produce legally acceptable signature images.

## Requirements

### Functional
- Touch-based drawing on canvas
- Support for finger and Apple Pencil
- Clear/reset functionality
- Undo last stroke (nice to have)
- Visual feedback during drawing

### Technical
- Minimum canvas resolution: 600x200px
- Output format: PNG with transparency or white background
- Stroke width: 2-3px (scales with pressure if available)
- Smooth line rendering (bezier interpolation)

## Implementation Pattern

```tsx
import React, { useRef, useState, useEffect } from 'react';

interface SignatureCanvasProps {
  width?: number;
  height?: number;
  onSignatureChange?: (hasSignature: boolean) => void;
  onSave?: (dataUrl: string) => void;
}

export const SignatureCanvas: React.FC<SignatureCanvasProps> = ({
  width = 600,
  height = 200,
  onSignatureChange,
  onSave,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set up canvas for high-DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);
    
    // Drawing style
    ctx.strokeStyle = '#1A202C';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [width, height]);

  const getPoint = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const rect = canvas.getBoundingClientRect();
    
    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    }
    
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  };

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    const point = getPoint(e);
    if (!point) return;
    
    setIsDrawing(true);
    lastPoint.current = point;
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const point = getPoint(e);
    
    if (!ctx || !point || !lastPoint.current) return;
    
    // Draw smooth line
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    
    lastPoint.current = point;
    
    if (!hasContent) {
      setHasContent(true);
      onSignatureChange?.(true);
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    lastPoint.current = null;
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
    onSignatureChange?.(false);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasContent) return;
    
    const dataUrl = canvas.toDataURL('image/png');
    onSave?.(dataUrl);
  };

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div className={styles.actions}>
        <button onClick={clear} disabled={!hasContent}>
          Clear
        </button>
      </div>
    </div>
  );
};
```

## Styling

```css
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.canvas {
  border: 2px solid var(--color-gray-300);
  border-radius: 8px;
  background: white;
  touch-action: none; /* Prevent scrolling while drawing */
  cursor: crosshair;
}

.canvas:focus {
  border-color: var(--color-primary);
  outline: none;
}

.signatureLine {
  position: absolute;
  bottom: 40px;
  left: 20px;
  right: 20px;
  height: 1px;
  background: var(--color-gray-300);
  pointer-events: none;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
```

## Validation

```typescript
const isValidSignature = (canvas: HTMLCanvasElement): boolean => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return false;
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  
  let nonWhitePixels = 0;
  for (let i = 0; i < pixels.length; i += 4) {
    // Check if pixel is not white/transparent
    if (pixels[i + 3] > 0 && (pixels[i] < 250 || pixels[i + 1] < 250 || pixels[i + 2] < 250)) {
      nonWhitePixels++;
    }
  }
  
  // Require minimum ink coverage (prevents just a dot)
  const totalPixels = canvas.width * canvas.height;
  const coverage = nonWhitePixels / totalPixels;
  
  return coverage > 0.001; // At least 0.1% coverage
};
```

## Storage Considerations

For MVP (demo only):
- Store as base64 in localStorage
- Clear on session end

For production:
- Upload to encrypted Cloud Storage
- Store reference URL in database
- Apply retention policy per HIPAA requirements

## Accessibility

- Provide alternative: "Type your name to sign" option
- Keyboard accessible clear button
- Screen reader announcements for state changes
