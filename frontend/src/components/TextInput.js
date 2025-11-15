import React from "react";

const TextInput = ({
  text,
  interimText,
  isRecording,
  recordingError,
  error,
  onTextChange,
  onClear,
  onToggleRecording,
}) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-2xl shadow-2xl border border-purple-500/20 p-6 backdrop-blur-sm h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-purple-300 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
            </svg>
            Text Input
          </h2>
          <div className="flex gap-2">
            {text && (
              <button
                type="button"
                onClick={onClear}
                className="p-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 border border-purple-500/30"
                title="Clear text"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
            <button
              type="button"
              onClick={onToggleRecording}
              className={`px-4 py-2 rounded-lg transition-all duration-200 border-2 flex items-center gap-2 ${
                isRecording
                  ? "bg-gradient-to-r from-red-600 to-red-700 border-red-400 animate-pulse shadow-lg shadow-red-500/50"
                  : "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-400 shadow-lg shadow-purple-500/50 hover:from-purple-500 hover:to-pink-500"
              } text-white transform hover:scale-105 font-medium`}
              title={isRecording ? "Stop recording" : "Start recording"}
            >
              {isRecording ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                  Stop
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                  Record
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative">
          <textarea
            id="text-input"
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full h-64 px-4 py-3 bg-black/50 border-2 border-purple-500/30 text-gray-200 placeholder-gray-500 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none backdrop-blur-sm"
            placeholder="Type or speak your text here..."
          />
          {interimText && (
            <div className="absolute left-4 bottom-4 text-purple-400/60 italic pointer-events-none">
              {interimText}
            </div>
          )}
        </div>

        {isRecording && (
          <div className="mt-3 flex items-center gap-3 p-3 bg-red-950/30 border border-red-500/30 rounded-lg">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <p className="text-sm text-red-400 font-medium">
              🎙️ Listening... • Live AI analysis enabled
            </p>
          </div>
        )}

        {recordingError && (
          <div className="mt-3 p-3 bg-yellow-950/30 border border-yellow-500/30 rounded-lg backdrop-blur-sm">
            <p className="text-sm text-yellow-400 font-medium">
              ⚠️ {recordingError}
            </p>
            <p className="text-xs text-yellow-500/80 mt-1">
              Tip: Enable microphone access in browser settings
            </p>
          </div>
        )}

        {error && (
          <div className="mt-3 p-3 bg-red-950/30 border border-red-500/50 rounded-lg backdrop-blur-sm">
            <p className="text-red-400 font-medium text-sm">⚠️ {error}</p>
            <p className="text-red-400/80 text-xs mt-1">
              Backend server required on http://localhost:8000
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
