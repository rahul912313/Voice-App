import React from "react";

/**
 * Controls Component
 * Simple Start/Stop button with recording visualization
 */
const Controls = ({ isRecording, onToggle, disabled = false }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main Record/Stop Button */}
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`
          relative group
          w-24 h-24 rounded-full
          transition-all duration-500 ease-out
          transform hover:scale-110 active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isRecording
            ? 'bg-gradient-to-br from-red-600 to-red-700 shadow-2xl shadow-red-500/60 animate-pulseGlow'
            : 'bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/80'
          }
        `}
        aria-label={isRecording ? "Stop Recording" : "Start Recording"}
      >
        {/* Outer ring animation when recording */}
        {isRecording && (
          <>
            <span className="absolute -inset-2 rounded-full border-4 border-red-400/50 animate-ping"></span>
            <span className="absolute -inset-1 rounded-full border-2 border-red-300/70 animate-pulse"></span>
          </>
        )}

        {/* Button Icon */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          {isRecording ? (
            // Stop icon
            <div className="w-8 h-8 bg-white rounded-lg transition-all duration-300 group-hover:scale-110"></div>
          ) : (
            // Microphone icon
            <svg
              className="w-12 h-12 text-white transition-all duration-300 group-hover:scale-110"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </svg>
          )}
        </div>

        {/* Ripple effect on click */}
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <span className="absolute inset-0 rounded-full bg-white/20 transform scale-0 group-active:scale-100 transition-transform duration-500"></span>
        </span>
      </button>

      {/* Status Text */}
      <div className="text-center min-h-[60px] flex flex-col items-center justify-center">
        {isRecording ? (
          <div className="space-y-2 animate-fadeIn">
            <p className="text-red-400 font-bold text-lg flex items-center gap-2">
              <span className="flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              Recording
            </p>
            <p className="text-gray-400 text-xs">Click to stop</p>
            
            {/* Audio wave visualization */}
            <div className="flex items-center justify-center gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-red-400 rounded-full animate-audioWave"
                  style={{
                    height: '20px',
                    animationDelay: `${i * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-1 animate-fadeIn">
            <p className="text-purple-300 font-semibold text-lg">
              Ready to Record
            </p>
            <p className="text-gray-500 text-xs">Click to start speaking</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Controls;
