import React from "react";
import {
  getSentimentGradient,
  getSentimentLabel,
  getSentimentEmoji,
  getSentimentTextColor,
  getSentimentProgressGradient,
} from "../utils/sentimentUtils";

const ResultsPanel = ({ result, isLoading }) => {
  // Loading State
  if (isLoading) {
    return (
      <div className="lg:col-span-1">
        <div className="space-y-4 sticky top-24">
          <div className="p-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border-2 border-purple-500/40 rounded-2xl backdrop-blur-sm text-center animate-pulseGlow">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600/60 to-pink-600/60 flex items-center justify-center border-2 border-purple-500/70 animate-spin-slow">
              <svg
                className="w-8 h-8 text-purple-300"
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
            <p className="text-purple-300 text-sm mb-2 font-semibold">
              🧠 AI is analyzing...
            </p>
            <div className="flex justify-center space-x-1.5 mt-4">
              <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
              <div className="w-2.5 h-2.5 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
              <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty State
  if (!result) {
    return (
      <div className="lg:col-span-1">
        <div className="space-y-4 sticky top-24">
          <div className="p-8 bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 border-2 border-purple-500/20 rounded-2xl backdrop-blur-sm text-center transition-all duration-500 hover:border-purple-500/50 hover:scale-105">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600/20 to-pink-600/20 flex items-center justify-center border-2 border-purple-500/30 transition-all duration-500 hover:scale-110 animate-float">
              <svg
                className="w-10 h-10 text-purple-400"
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
            <p className="text-gray-300 text-sm mb-2 font-medium">
              Start typing or speaking
            </p>
            <p className="text-gray-600 text-xs">
              Live AI analysis will appear here
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Results State - WITH ANIMATIONS!
  return (
    <div className="lg:col-span-1">
      <div className="space-y-4 sticky top-24">
        {/* Sentiment Result Card */}
        <div
          className={`p-6 border-2 rounded-2xl backdrop-blur-sm transition-all duration-700 ease-out transform hover:scale-105 ${getSentimentGradient(
            result.sentiment_score
          )} animate-slideInRight animate-pulseGlow`}
        >
          <h3 className="text-sm font-semibold text-purple-200 mb-4 flex items-center gap-2">
            <svg
              className="w-4 h-4 animate-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                clipRule="evenodd"
              />
            </svg>
            Sentiment Analysis
          </h3>
          
          <div className="text-center">
            {/* Animated Emoji */}
            <div className="text-7xl mb-4 filter drop-shadow-2xl animate-bounce-slow">
              {getSentimentEmoji(result.sentiment_score)}
            </div>
            
            {/* Sentiment Label with Glow */}
            <p
              className={`text-4xl font-bold mb-3 transition-all duration-500 animate-textGlow ${getSentimentTextColor(
                result.sentiment_score
              )}`}
            >
              {getSentimentLabel(result.sentiment_score)}
            </p>
            
            {/* Confidence Score */}
            <p className="text-gray-300 text-sm transition-all duration-300">
              Confidence:{" "}
              <span className="font-bold text-purple-200 text-lg">
                {(Math.abs(result.sentiment_score) * 100).toFixed(1)}%
              </span>
            </p>
          </div>

          {/* Animated Progress Bar with Shimmer Effect */}
          <div className="mt-5 bg-gray-900/60 rounded-full h-4 overflow-hidden border-2 border-purple-400/30 shadow-inner relative">
            <div
              className={`h-full transition-all duration-1000 ease-out ${getSentimentProgressGradient(
                result.sentiment_score
              )} shadow-lg relative overflow-hidden`}
              style={{
                width: `${Math.abs(result.sentiment_score) * 100}%`,
              }}
            >
              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Keywords Card with Staggered Animations */}
        <div className="p-6 bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-2 border-indigo-400/60 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:border-indigo-300/80 hover:shadow-xl hover:shadow-indigo-500/20 animate-fadeIn"
          style={{animationDelay: '0.3s'}}>
          <h3 className="text-sm font-semibold text-purple-200 mb-4 flex items-center gap-2">
            <svg
              className="w-4 h-4 animate-pulse"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            Key Topics Detected
          </h3>
          
          {result.keywords && result.keywords.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {result.keywords.map((keyword, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600/40 to-pink-600/40 border-2 border-purple-300/60 text-purple-100 rounded-full font-semibold shadow-xl hover:shadow-purple-400/60 transition-all duration-300 hover:scale-110 hover:-translate-y-1 backdrop-blur-sm cursor-pointer animate-fadeInUp"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationFillMode: 'both'
                  }}
                >
                  #{keyword}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 italic text-sm animate-pulse">
              Listening for keywords...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
