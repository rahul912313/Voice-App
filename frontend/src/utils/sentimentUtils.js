/**
 * Utility functions for sentiment analysis
 */

/**
 * Get color class based on sentiment score
 * @param {number} score - Sentiment score
 * @returns {string} Tailwind color class
 */
export const getSentimentColor = (score) => {
  if (score > 0.3) return "text-green-600";
  if (score < -0.3) return "text-red-600";
  return "text-yellow-600";
};

/**
 * Get background color class based on sentiment score
 * @param {number} score - Sentiment score
 * @returns {string} Tailwind background class
 */
export const getSentimentBg = (score) => {
  if (score > 0.3) return "bg-green-100 border-green-300";
  if (score < -0.3) return "bg-red-100 border-red-300";
  return "bg-yellow-100 border-yellow-300";
};

/**
 * Get gradient background for result card
 * @param {number} score - Sentiment score
 * @returns {string} Tailwind gradient classes
 */
export const getSentimentGradient = (score) => {
  if (score > 0.3)
    return "bg-gradient-to-br from-green-950/40 to-green-900/20 border-green-500/50";
  if (score < -0.3)
    return "bg-gradient-to-br from-red-950/40 to-red-900/20 border-red-500/50";
  return "bg-gradient-to-br from-yellow-950/40 to-yellow-900/20 border-yellow-500/50";
};

/**
 * Get sentiment label
 * @param {number} score - Sentiment score
 * @returns {string} Sentiment label
 */
export const getSentimentLabel = (score) => {
  if (score > 0.3) return "Positive";
  if (score < -0.3) return "Negative";
  return "Neutral";
};

/**
 * Get sentiment emoji
 * @param {number} score - Sentiment score
 * @returns {string} Emoji
 */
export const getSentimentEmoji = (score) => {
  if (score > 0.3) return "😊";
  if (score < -0.3) return "😞";
  return "😐";
};

/**
 * Get sentiment text color
 * @param {number} score - Sentiment score
 * @returns {string} Tailwind text color class
 */
export const getSentimentTextColor = (score) => {
  if (score > 0.3) return "text-green-400";
  if (score < -0.3) return "text-red-400";
  return "text-yellow-400";
};

/**
 * Get sentiment progress bar gradient
 * @param {number} score - Sentiment score
 * @returns {string} Tailwind gradient classes
 */
export const getSentimentProgressGradient = (score) => {
  if (score > 0) return "bg-gradient-to-r from-green-500 to-emerald-400";
  return "bg-gradient-to-r from-red-500 to-rose-400";
};
