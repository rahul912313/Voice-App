/**
 * Speech Recognition Manager
 * Handles all speech recognition functionality
 */
class SpeechRecognitionManager {
  constructor() {
    this.recognition = null;
    this.isSupported = this.checkSupport();
    this.onResultCallback = null;
    this.onErrorCallback = null;
    this.onEndCallback = null;
  }

  /**
   * Check if speech recognition is supported
   * @returns {boolean}
   */
  checkSupport() {
    return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
  }

  /**
   * Initialize speech recognition
   */
  initialize() {
    if (!this.isSupported) {
      throw new Error("Speech recognition is not supported in this browser");
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = "en-US";

    this.recognition.onresult = this.handleResult.bind(this);
    this.recognition.onerror = this.handleError.bind(this);
    this.recognition.onend = this.handleEnd.bind(this);
  }

  /**
   * Handle recognition results
   * @param {SpeechRecognitionEvent} event
   */
  handleResult(event) {
    let interimTranscript = "";
    let finalTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript + " ";
      } else {
        interimTranscript += transcript;
      }
    }

    if (this.onResultCallback) {
      this.onResultCallback({ interimTranscript, finalTranscript });
    }
  }

  /**
   * Handle recognition errors
   * @param {SpeechRecognitionError} event
   */
  handleError(event) {
    const errorMessage = this.getErrorMessage(event.error);

    if (this.onErrorCallback) {
      this.onErrorCallback(errorMessage);
    }
  }

  /**
   * Handle recognition end
   */
  handleEnd() {
    if (this.onEndCallback) {
      this.onEndCallback();
    }
  }

  /**
   * Get user-friendly error message
   * @param {string} error
   * @returns {string}
   */
  getErrorMessage(error) {
    switch (error) {
      case "network":
        return "Network error. Speech recognition requires an internet connection.";
      case "not-allowed":
      case "permission-denied":
        return "Microphone access denied. Please allow microphone permissions in your browser.";
      case "no-speech":
        return "No speech detected. Please try again.";
      case "audio-capture":
        return "No microphone found. Please connect a microphone.";
      case "aborted":
        return "Recording was stopped.";
      default:
        return `Recording error: ${error}`;
    }
  }

  /**
   * Start recognition
   */
  start() {
    if (!this.recognition) {
      this.initialize();
    }

    try {
      this.recognition.start();
    } catch (error) {
      throw new Error(
        "Failed to start recording. Please check your microphone permissions or internet connection."
      );
    }
  }

  /**
   * Stop recognition
   */
  stop() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  /**
   * Set callback for results
   * @param {Function} callback
   */
  onResult(callback) {
    this.onResultCallback = callback;
  }

  /**
   * Set callback for errors
   * @param {Function} callback
   */
  onError(callback) {
    this.onErrorCallback = callback;
  }

  /**
   * Set callback for end
   * @param {Function} callback
   */
  onEnd(callback) {
    this.onEndCallback = callback;
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.recognition) {
      this.recognition.stop();
      this.recognition = null;
    }
  }
}

export default SpeechRecognitionManager;
