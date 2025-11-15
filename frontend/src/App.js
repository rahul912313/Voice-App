import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import ResultsPanel from "./components/ResultsPanel";
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

  // Handle text changes
  const handleTextChange = (newText) => {
    setText(newText);
  };

  // Handle recording toggle
  const handleToggleRecording = () => {
    const currentTranscript = getFullTranscript();
    setText(currentTranscript || text);
    toggleRecording(text);
  };

  // Clear all text and results
  const handleClear = () => {
    setText("");
    resetTranscript();
    clearResults();
  };

  return (
    <div className="min-h-screen bg-black bg-gradient-to-br from-black via-purple-950 to-black">
      <Header />

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TextInput
            text={text}
            interimText={interimText}
            isRecording={isRecording}
            recordingError={recordingError}
            error={error}
            onTextChange={handleTextChange}
            onClear={handleClear}
            onToggleRecording={handleToggleRecording}
          />
          <ResultsPanel result={result} />
        </div>
      </div>
    </div>
  );
}

export default App;
