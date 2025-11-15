import { useState, useCallback } from "react";
import sentimentService from "../services/sentimentService";

/**
 * Custom hook for managing sentiment analysis
 */
const useSentimentAnalysis = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeText = useCallback(async (text) => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await sentimentService.analyzeText(text);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearResults = useCallback(() => {
    setResult(null);
    setError(null);
  }, []);

  return {
    result,
    loading,
    error,
    analyzeText,
    clearResults,
  };
};

export default useSentimentAnalysis;
