/**
 * Service for handling sentiment analysis API calls
 */
class SentimentService {
  constructor(baseURL = "http://localhost:8000") {
    this.baseURL = baseURL;
  }

  /**
   * Analyze text for sentiment and keywords
   * @param {string} text - Text to analyze
   * @returns {Promise<Object>} Analysis results
   */
  async analyzeText(text) {
    if (!text.trim()) {
      throw new Error("Text cannot be empty");
    }

    try {
      const response = await fetch(`${this.baseURL}/process_text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze text");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }
}

export default new SentimentService();
