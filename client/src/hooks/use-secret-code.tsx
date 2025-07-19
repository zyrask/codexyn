import { useEffect, useRef } from "react";

export function useSecretCode(secretCode: string, onCodeEntered: () => void) {
  const inputBufferRef = useRef<string>('');
  const hasTriggeredRef = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only capture numeric keys
      if (event.key >= '0' && event.key <= '9') {
        inputBufferRef.current += event.key;
        
        // Keep buffer to reasonable length
        if (inputBufferRef.current.length > secretCode.length) {
          inputBufferRef.current = inputBufferRef.current.slice(-secretCode.length);
        }
        
        // Check if secret code matches and hasn't been triggered yet
        if (inputBufferRef.current === secretCode && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          onCodeEntered();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [secretCode, onCodeEntered]);
}
