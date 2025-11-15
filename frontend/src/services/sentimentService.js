/**
 * Service for handling sentiment analysis API calls
 */
class SentimentService {
  constructor(baseURL = "http://localhost:8000") {
    this.baseURL = baseURL;
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1 second
  }

  /**
   * Sleep for specified milliseconds
   */
  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Analyze text for sentiment and keywords with retry logic
   * @param {string} text - Text to analyze
   * @param {number} retryCount - Current retry attempt
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeText(text, retryCount = 0) {
    if (!text.trim()) {
      throw new Error("Text cannot be empty");
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

      const response = await fetch(`${this.baseURL}/process_text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 500 && retryCount < this.maxRetries) {
          // Retry on server error
          console.warn(`Server error, retrying... (${retryCount + 1}/${this.maxRetries})`);
          await this.sleep(this.retryDelay * (retryCount + 1));
          return this.analyzeText(text, retryCount + 1);
        }
        throw new Error(`Server returned ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error.name === 'AbortError') {
        if (retryCount < this.maxRetries) {
          console.warn(`Request timeout, retrying... (${retryCount + 1}/${this.maxRetries})`);
          await this.sleep(this.retryDelay);
          return this.analyzeText(text, retryCount + 1);
        }
        throw new Error("Analysis is taking longer than expected. The AI models may be loading. Please try again.");
      }

      if (error.message.includes('Failed to fetch')) {
        throw new Error("Cannot connect to backend server. Please ensure the backend is running on http://localhost:8000");
      }

      throw new Error(`Analysis failed: ${error.message}`);
    }
  }

  /**
   * Check if backend is available
   */
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseURL}/`, {
        method: "GET",
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export default new SentimentService();
