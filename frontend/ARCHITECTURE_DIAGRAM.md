# Sentiment Aura - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                            App.js (Main)                            │
│                    (Composition & Orchestration)                    │
│                                                                     │
│  ┌──────────────────────┐     ┌──────────────────────────────┐    │
│  │ useSentimentAnalysis │     │  useSpeechRecognition        │    │
│  │ Hook                 │     │  Hook                        │    │
│  └──────────┬───────────┘     └────────────┬─────────────────┘    │
└─────────────┼──────────────────────────────┼──────────────────────┘
              │                              │
              │                              │
    ┌─────────▼────────┐          ┌─────────▼──────────────┐
    │ SentimentService │          │ SpeechRecognition      │
    │ (Class)          │          │ Manager (Class)        │
    │                  │          │                        │
    │ - analyzeText()  │          │ - initialize()         │
    └─────────┬────────┘          │ - start()              │
              │                   │ - stop()               │
              │                   │ - onResult()           │
              │                   │ - onError()            │
              │                   └────────────────────────┘
              │
              │ HTTP POST
              │
    ┌─────────▼────────┐
    │  Backend API     │
    │  (FastAPI)       │
    │  localhost:8000  │
    └──────────────────┘


┌─────────────────────────────────────────────────────────────────────┐
│                         UI Components Layer                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │
│  │     Header     │  │    TextInput     │  │  ResultsPanel    │   │
│  │   Component    │  │    Component     │  │    Component     │   │
│  │                │  │                  │  │                  │   │
│  │ - Logo         │  │ - Text Area      │  │ - Sentiment Card │   │
│  │ - Live Status  │  │ - Record Button  │  │ - Keywords List  │   │
│  │                │  │ - Clear Button   │  │ - Empty State    │   │
│  └────────────────┘  └──────────────────┘  └──────────────────┘   │
│                             │                       │              │
│                             └───────┬───────────────┘              │
│                                     │                              │
│                           ┌─────────▼──────────┐                   │
│                           │  sentimentUtils    │                   │
│                           │  (Pure Functions)  │                   │
│                           │                    │                   │
│                           │ - getColor()       │                   │
│                           │ - getLabel()       │                   │
│                           │ - getEmoji()       │                   │
│                           └────────────────────┘                   │
└─────────────────────────────────────────────────────────────────────┘


Data Flow:
═══════════

1. User Input Flow:
   User Types → TextInput → handleTextChange → App.setState(text)

2. Speech Recognition Flow:
   User Clicks Record → handleToggleRecording → useSpeechRecognition Hook
   → SpeechRecognitionManager.start() → Browser Speech API
   → onResult callback → analyzeText → useSentimentAnalysis Hook
   → SentimentService.analyzeText() → Backend API → Update result state
   → ResultsPanel renders new result

3. Manual Analysis Flow:
   User Types → Text Updated → (Manual trigger would go here)
   → useSentimentAnalysis Hook → SentimentService → Backend API
   → ResultsPanel

4. Clear Flow:
   User Clicks Clear → handleClear → resetTranscript + clearResults
   → All state reset → UI updates


Dependency Graph:
═════════════════

App.js
├── components/Header.js
├── components/TextInput.js
├── components/ResultsPanel.js
│   └── utils/sentimentUtils.js
├── hooks/useSentimentAnalysis.js
│   └── services/sentimentService.js
└── hooks/useSpeechRecognition.js
    └── services/speechRecognitionManager.js


Module Responsibilities:
════════════════════════

┌──────────────────────┬─────────────────────────────────────────────┐
│ Module               │ Responsibility                              │
├──────────────────────┼─────────────────────────────────────────────┤
│ App.js               │ Compose components, manage text state       │
│ Header               │ Display branding and status                 │
│ TextInput            │ Render input area, controls, errors         │
│ ResultsPanel         │ Display sentiment and keywords              │
│ useSentimentAnalysis │ Manage analysis state, call API             │
│ useSpeechRecognition │ Manage recording state, speech events       │
│ SentimentService     │ HTTP communication with backend             │
│ SpeechRecognition    │ Speech API lifecycle and event handling     │
│ Manager              │                                             │
│ sentimentUtils       │ Calculate display values (colors, labels)   │
└──────────────────────┴─────────────────────────────────────────────┘


Benefits of This Architecture:
═══════════════════════════════

✓ Single Responsibility: Each module does one thing well
✓ Loose Coupling: Components don't depend on each other
✓ High Cohesion: Related code is grouped together
✓ Easy Testing: Each module can be tested independently
✓ Reusability: Hooks and components can be reused
✓ Maintainability: Clear where to make changes
✓ Scalability: Easy to add new features
✓ Type Safety: Clear interfaces between modules
```
