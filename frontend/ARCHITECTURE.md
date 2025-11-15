# Sentiment Aura - Frontend Architecture

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.js        # Application header with branding
│   │   ├── TextInput.js     # Text input area with recording controls
│   │   └── ResultsPanel.js  # Sentiment and keywords display panel
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useSentimentAnalysis.js  # Hook for sentiment analysis logic
│   │   └── useSpeechRecognition.js  # Hook for speech recognition logic
│   │
│   ├── services/            # Business logic and API services
│   │   ├── sentimentService.js          # API calls for sentiment analysis
│   │   └── speechRecognitionManager.js  # Speech recognition class
│   │
│   ├── utils/               # Utility functions
│   │   └── sentimentUtils.js  # Helper functions for sentiment display
│   │
│   ├── App.js               # Main application component
│   ├── App.css              # Application styles
│   └── index.js             # Application entry point
```

## Architecture Overview

### Components (Presentation Layer)

- **Header.js**: Displays app branding and live status indicator
- **TextInput.js**: Handles text input, recording controls, and error displays
- **ResultsPanel.js**: Shows sentiment analysis results and keywords

### Custom Hooks (State Management)

- **useSentimentAnalysis.js**: Manages sentiment analysis state and API calls
- **useSpeechRecognition.js**: Handles speech recognition state and events

### Services (Business Logic)

- **SentimentService**: Class-based service for API communication
- **SpeechRecognitionManager**: Class-based manager for Web Speech API

### Utils (Helper Functions)

- **sentimentUtils.js**: Pure functions for sentiment visualization

## Design Patterns

### 1. Separation of Concerns

- UI components focus only on rendering
- Business logic isolated in services and hooks
- Utilities contain pure, reusable functions

### 2. Custom Hooks Pattern

- Encapsulate complex stateful logic
- Make logic reusable across components
- Provide clean interfaces to components

### 3. Service Layer Pattern

- Centralize API communication
- Provide consistent error handling
- Enable easy testing and mocking

### 4. Class-based Services

- **SentimentService**: Singleton class for API calls
- **SpeechRecognitionManager**: Stateful class for speech recognition lifecycle

## Key Features

### Modularity

- Each module has a single responsibility
- Easy to test individual components
- Simple to extend functionality

### Reusability

- Components can be used in different contexts
- Hooks can be shared across components
- Services can be used outside React

### Maintainability

- Clear file organization
- Consistent naming conventions
- Well-documented code

## Usage Example

```javascript
// App.js shows how components work together
import Header from "./components/Header";
import TextInput from "./components/TextInput";
import ResultsPanel from "./components/ResultsPanel";
import useSentimentAnalysis from "./hooks/useSentimentAnalysis";
import useSpeechRecognition from "./hooks/useSpeechRecognition";

function App() {
  // Custom hooks manage complex state
  const { result, analyzeText } = useSentimentAnalysis();
  const { isRecording, toggleRecording } = useSpeechRecognition(analyzeText);

  // Components receive only what they need
  return (
    <>
      <Header />
      <TextInput onToggleRecording={toggleRecording} />
      <ResultsPanel result={result} />
    </>
  );
}
```

## Benefits of This Architecture

1. **Testability**: Each module can be tested independently
2. **Scalability**: Easy to add new features without affecting existing code
3. **Readability**: Clear structure makes code easier to understand
4. **Maintainability**: Changes are localized to specific modules
5. **Reusability**: Components and hooks can be reused in different contexts
