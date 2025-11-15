import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import TranscriptDisplay from "./components/TranscriptDisplay";
import KeywordsDisplay from "./components/KeywordsDisplay";
import Controls from "./components/Controls";
import ResultsPanel from "./components/ResultsPanel";
import SentimentAura from "./components/SentimentAura";
import useSentimentAnalysis from "./hooks/useSentimentAnalysis";
import useSpeechRecognition from "./hooks/useSpeechRecognition";

function App() {
  const [text, setText] = useState("");

  // Custom hooks for separation of concerns
  const { result, loading, error, analyzeText, clearResults } =
    useSentimentAnalysis();
  const {
    isRecording,
    recordingError,
    interimText,
    toggleRecording,
    resetTranscript,
    getFullTranscript,
  } = useSpeechRecognition(analyzeText);

  // Update text box in real-time while recording
  useEffect(() => {
    if (isRecording) {
      const fullTranscript = getFullTranscript();
      setText(fullTranscript);
    }
  }, [isRecording, getFullTranscript, interimText]);

  // Handle text changes
  const handleTextChange = (newText) => {
    setText(newText);
  };

  // Handle recording toggle
  const handleToggleRecording = () => {
    if (isRecording) {
      // Stopping recording - clear the text box, results, and keywords
      setText("");
      resetTranscript();
      clearResults();
      toggleRecording();
    } else {
      // Starting recording
      toggleRecording(text);
    }
  };

  // Clear all text and results
  const handleClear = () => {
    setText("");
    resetTranscript();
    clearResults();
  };

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-purple-950 to-black relative">
      {/* Perlin Noise Background - Behind Everything */}
      <SentimentAura 
        sentimentScore={result?.sentiment_score || 0} 
        isAnalyzing={loading} 
      />
      
      {/* Main Content - Above Background */}
      <div className="relative z-10">
        <Header />

        <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Transcript & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transcript Display - Semi-transparent with auto-scroll */}
            <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-2xl shadow-2xl border border-purple-500/20 p-6 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-purple-300 flex items-center gap-2 mb-4">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" />
                </svg>
                Live Transcript
              </h2>
              
              <TranscriptDisplay
                text={text}
                interimText={interimText}
                isRecording={isRecording}
              />

              {/* Error Messages */}
              {recordingError && (
                <div className="mt-3 p-3 bg-yellow-950/30 border border-yellow-500/30 rounded-lg backdrop-blur-sm animate-fadeIn">
                  <p className="text-sm text-yellow-400 font-medium">
                    ⚠️ {recordingError}
                  </p>
                  <p className="text-xs text-yellow-500/80 mt-1">
                    Tip: Enable microphone access in browser settings
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-3 p-3 bg-red-950/30 border border-red-500/50 rounded-lg backdrop-blur-sm animate-fadeIn">
                  <p className="text-red-400 font-medium text-sm">⚠️ {error}</p>
                  <p className="text-red-400/80 text-xs mt-1">
                    Backend server required on http://localhost:8000
                  </p>
                </div>
              )}
            </div>

            {/* Controls - Start/Stop Button */}
            <div className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 rounded-2xl shadow-2xl border border-purple-500/20 p-8 backdrop-blur-sm">
              <Controls
                isRecording={isRecording}
                onToggle={handleToggleRecording}
                disabled={false}
              />
            </div>

            {/* Keywords Display - Graceful fade-in */}
            <KeywordsDisplay keywords={result?.keywords || []} />
          </div>

          {/* Right Column - Sentiment Results */}
          <ResultsPanel result={result} isLoading={loading} />
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
