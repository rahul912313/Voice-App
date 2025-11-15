# Quick Reference Guide

## Component API Reference

### Header Component

```javascript
import Header from "./components/Header";

<Header />;
```

**Props**: None - Fully self-contained

---

### TextInput Component

```javascript
import TextInput from "./components/TextInput";

<TextInput
  text={string}                      // Current text value
  interimText={string}               // Real-time speech text (not finalized)
  isRecording={boolean}              // Recording state
  recordingError={string | null}     // Recording error message
  error={string | null}              // API error message
  onTextChange={(text) => void}      // Text change handler
  onClear={() => void}               // Clear button handler
  onToggleRecording={() => void}     // Recording toggle handler
/>
```

---

### ResultsPanel Component

```javascript
import ResultsPanel from "./components/ResultsPanel";

<ResultsPanel
  result={{                          // Analysis result object
    sentiment_score: number,         // -1 to 1
    keywords: string[]               // Array of keywords
  } | null}
/>
```

---

## Custom Hooks API Reference

### useSentimentAnalysis Hook

```javascript
import useSentimentAnalysis from "./hooks/useSentimentAnalysis";

const {
  result, // Analysis result object or null
  loading, // Boolean loading state
  error, // Error message or null
  analyzeText, // Function: (text: string) => Promise<void>
  clearResults, // Function: () => void
} = useSentimentAnalysis();
```

---

### useSpeechRecognition Hook

```javascript
import useSpeechRecognition from "./hooks/useSpeechRecognition";

const {
  isRecording, // Boolean recording state
  recordingError, // Error message or null
  interimText, // Real-time speech (not finalized)
  toggleRecording, // Function: (currentText: string) => void
  resetTranscript, // Function: () => void
  getFullTranscript, // Function: () => string
} = useSpeechRecognition(onAnalyze);

// onAnalyze: (text: string) => void - Callback for live analysis
```

---

## Service API Reference

### SentimentService

```javascript
import sentimentService from "./services/sentimentService";

// Analyze text
const result = await sentimentService.analyzeText(text);
// Returns: { sentiment_score: number, keywords: string[] }
```

---

### SpeechRecognitionManager

```javascript
import SpeechRecognitionManager from "./services/speechRecognitionManager";

const manager = new SpeechRecognitionManager();

// Check support
const isSupported = manager.isSupported;

// Initialize
manager.initialize();

// Set callbacks
manager.onResult(({ interimTranscript, finalTranscript }) => {
  // Handle results
});

manager.onError((errorMessage) => {
  // Handle errors
});

manager.onEnd(() => {
  // Handle end
});

// Control recording
manager.start();
manager.stop();

// Cleanup
manager.destroy();
```

---

## Utility Functions Reference

### sentimentUtils

```javascript
import {
  getSentimentColor,
  getSentimentBg,
  getSentimentGradient,
  getSentimentLabel,
  getSentimentEmoji,
  getSentimentTextColor,
  getSentimentProgressGradient,
} from "./utils/sentimentUtils";

// All functions take score: number and return string
const color = getSentimentColor(0.5);
const bg = getSentimentBg(0.5);
const gradient = getSentimentGradient(0.5);
const label = getSentimentLabel(0.5); // "Positive" | "Negative" | "Neutral"
const emoji = getSentimentEmoji(0.5); // "😊" | "😞" | "😐"
const textColor = getSentimentTextColor(0.5);
const progressGradient = getSentimentProgressGradient(0.5);
```

---

## Usage Example

```javascript
import { useState } from "react";
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import ResultsPanel from "./components/ResultsPanel";
import useSentimentAnalysis from "./hooks/useSentimentAnalysis";
import useSpeechRecognition from "./hooks/useSpeechRecognition";

function App() {
  const [text, setText] = useState("");

  // Use custom hooks
  const { result, error, analyzeText, clearResults } = useSentimentAnalysis();
  const {
    isRecording,
    recordingError,
    interimText,
    toggleRecording,
    resetTranscript,
    getFullTranscript,
  } = useSpeechRecognition(analyzeText);

  // Event handlers
  const handleTextChange = (newText) => setText(newText);

  const handleToggleRecording = () => {
    const currentTranscript = getFullTranscript();
    setText(currentTranscript || text);
    toggleRecording(text);
  };

  const handleClear = () => {
    setText("");
    resetTranscript();
    clearResults();
  };

  // Render
  return (
    <div>
      <Header />
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
  );
}
```
