import { useState, useEffect, useRef } from "react";
import SpeechRecognitionManager from "../services/speechRecognitionManager";

/**
 * Custom hook for managing speech recognition
 */
const useSpeechRecognition = (onAnalyze) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingError, setRecordingError] = useState(null);
  const [interimText, setInterimText] = useState("");

  const recognitionManagerRef = useRef(null);
  const finalTranscriptRef = useRef("");
  const analysisTimeoutRef = useRef(null);

  useEffect(() => {
    // Initialize speech recognition manager
    recognitionManagerRef.current = new SpeechRecognitionManager();

    if (recognitionManagerRef.current.isSupported) {
      recognitionManagerRef.current.initialize();

      // Set up callbacks
      recognitionManagerRef.current.onResult(
        ({ interimTranscript, finalTranscript }) => {
          if (interimTranscript) {
            setInterimText(interimTranscript);
          }

          if (finalTranscript) {
            finalTranscriptRef.current += finalTranscript;
            setInterimText("");

            // Trigger live analysis with debounce
            if (analysisTimeoutRef.current) {
              clearTimeout(analysisTimeoutRef.current);
            }
            analysisTimeoutRef.current = setTimeout(() => {
              onAnalyze(finalTranscriptRef.current);
            }, 300);
          }
        }
      );

      recognitionManagerRef.current.onError((errorMessage) => {
        setRecordingError(errorMessage);
        setIsRecording(false);
      });

      recognitionManagerRef.current.onEnd(() => {
        setIsRecording(false);
        setInterimText("");
      });
    }

    // Cleanup
    return () => {
      if (recognitionManagerRef.current) {
        recognitionManagerRef.current.destroy();
      }
      if (analysisTimeoutRef.current) {
        clearTimeout(analysisTimeoutRef.current);
      }
    };
  }, [onAnalyze]);

  const startRecording = (currentText = "") => {
    if (!recognitionManagerRef.current?.isSupported) {
      setRecordingError(
        "Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari."
      );
      return;
    }

    setRecordingError(null);
    finalTranscriptRef.current = currentText;

    try {
      recognitionManagerRef.current.start();
      setIsRecording(true);
    } catch (error) {
      setRecordingError(error.message);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (recognitionManagerRef.current) {
      recognitionManagerRef.current.stop();
    }
    setIsRecording(false);
    setInterimText("");
  };

  const toggleRecording = (currentText = "") => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording(currentText);
    }
  };

  const resetTranscript = () => {
    finalTranscriptRef.current = "";
  };

  const getFullTranscript = () => {
    return finalTranscriptRef.current;
  };

  return {
    isRecording,
    recordingError,
    interimText,
    toggleRecording,
    resetTranscript,
    getFullTranscript,
  };
};

export default useSpeechRecognition;
