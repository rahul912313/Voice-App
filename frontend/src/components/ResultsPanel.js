import React from "react";
import {
  getSentimentGradient,
  getSentimentLabel,
  getSentimentEmoji,
  getSentimentTextColor,
  getSentimentProgressGradient,
} from "../utils/sentimentUtils";

const ResultsPanel = ({ result }) => {
  if (!result) {
    return (
      <div className="lg:col-span-1">
        <div className="space-y-4 sticky top-24">
          <div className="p-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border-2 border-purple-500/20 rounded-2xl backdrop-blur-sm text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border-2 border-purple-500/30">
              <svg
                className="w-8 h-8 text-purple-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-sm mb-2">
              Start typing or speaking
            </p>
            <p className="text-gray-600 text-xs">Analysis will appear here</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:col-span-1">
      <div className="space-y-4 sticky top-24">
        {/* Sentiment Result */}
        <div
          className={`p-6 border-2 rounded-2xl backdrop-blur-sm ${getSentimentGradient(
            result.sentiment_score
          )}`}
        >
          <h3 className="text-sm font-semibold text-purple-300 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            Sentiment
          </h3>
          <div className="text-center">
            <div className="text-5xl mb-3 filter drop-shadow-lg">
              {getSentimentEmoji(result.sentiment_score)}
            </div>
            <p
              className={`text-3xl font-bold mb-2 ${getSentimentTextColor(
                result.sentiment_score
              )}`}
            >
              {getSentimentLabel(result.sentiment_score)}
            </p>
            <p className="text-gray-400 text-sm">
              Score:{" "}
              <span className="font-semibold text-purple-300">
                {result.sentiment_score.toFixed(4)}
              </span>
            </p>
          </div>

          <div className="mt-4 bg-gray-800/50 rounded-full h-3 overflow-hidden border border-purple-500/20">
            <div
              className={`h-full transition-all duration-500 ${getSentimentProgressGradient(
                result.sentiment_score
              )} shadow-lg`}
              style={{
                width: `${Math.abs(result.sentiment_score) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Keywords */}
        <div className="p-6 bg-gradient-to-br from-indigo-950/40 to-purple-900/20 border-2 border-indigo-500/50 rounded-2xl backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-purple-300 mb-4 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            Keywords
          </h3>
          {result.keywords && result.keywords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {result.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-400/50 text-purple-200 rounded-full font-medium shadow-lg hover:shadow-purple-500/50 transition-all duration-200 hover:scale-105 backdrop-blur-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic text-sm">No keywords found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
