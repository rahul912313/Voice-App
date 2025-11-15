import React, { useEffect, useRef } from "react";

/**
 * TranscriptDisplay Component
 * Semi-transparent panel showing live, auto-scrolling transcript
 */
const TranscriptDisplay = ({ text, interimText, isRecording }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when text updates
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [text, interimText]);

  const isEmpty = !text && !interimText;

  return (
    <div className="relative h-64 bg-black/30 backdrop-blur-md border-2 border-purple-500/30 rounded-xl overflow-hidden transition-all duration-300 hover:border-purple-500/50">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10 animate-pulseGlow"></div>
      
      {/* Scrollable transcript area */}
      <div
        ref={scrollRef}
        className="relative h-full overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent"
      >
        {isEmpty ? (
          // Empty state
          <div className="flex flex-col items-center justify-center h-full text-center animate-fadeIn">
            <svg
              className="w-12 h-12 text-purple-400/40 mb-3 animate-float"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
            <p className="text-gray-400 text-sm font-medium">
              Transcript will appear here...
            </p>
            <p className="text-gray-600 text-xs mt-1">
              Click Record to start speaking
            </p>
          </div>
        ) : (
          // Transcript content
          <div className="space-y-2">
            {/* Final transcript - word by word animation */}
            {text && (
              <p className="text-gray-200 text-base leading-relaxed font-medium">
                {text.split(' ').map((word, index) => (
                  <span
                    key={index}
                    className="inline-block mr-1 animate-fadeIn"
                    style={{
                      animationDelay: `${index * 0.05}s`,
                      animationFillMode: 'both'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </p>
            )}
            
            {/* Interim transcript with typing animation */}
            {interimText && (
              <p className="text-purple-300/80 italic text-base font-medium animate-transcriptTyping">
                {interimText}
                <span className="inline-block w-0.5 h-5 bg-purple-400 ml-1 animate-pulse"></span>
              </p>
            )}
          </div>
        )}
      </div>

      {/* Gradient overlay at bottom for smooth fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default TranscriptDisplay;
