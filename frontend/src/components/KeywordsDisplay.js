import React, { useState, useEffect } from "react";

/**
 * KeywordsDisplay Component
 * Displays keywords with graceful fade-in animations
 * Keywords float up from bottom and arrange in a tag cloud
 */
const KeywordsDisplay = ({ keywords = [] }) => {
  const [visibleKeywords, setVisibleKeywords] = useState([]);

  // Gradually reveal keywords one by one for graceful effect
  useEffect(() => {
    setVisibleKeywords([]);
    
    if (keywords.length === 0) return;

    keywords.forEach((keyword, index) => {
      setTimeout(() => {
        setVisibleKeywords(prev => [...prev, keyword]);
      }, index * 150); // 150ms delay between each keyword
    });
  }, [keywords]);

  if (keywords.length === 0) {
    return null;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-950/50 to-purple-900/30 border-2 border-indigo-400/60 rounded-2xl backdrop-blur-sm transition-all duration-500 hover:border-indigo-300/80 hover:shadow-xl hover:shadow-indigo-500/20 min-h-[120px]">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-5 h-5 text-purple-300 animate-pulse"
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
        <h3 className="text-sm font-semibold text-purple-200">
          Key Topics
        </h3>
        <span className="ml-auto text-xs text-purple-400 font-medium bg-purple-500/20 px-2 py-1 rounded-full">
          {visibleKeywords.length}
        </span>
      </div>

      {/* Keywords Tag Cloud with Staggered Float-Up Animation */}
      <div className="flex flex-wrap gap-3">
        {visibleKeywords.map((keyword, index) => {
          // Vary sizes for tag cloud effect
          const sizeClasses = [
            'text-sm px-3 py-1.5',
            'text-base px-4 py-2',
            'text-xs px-2.5 py-1'
          ];
          const sizeClass = sizeClasses[index % sizeClasses.length];

          // Vary colors for visual interest
          const colorClasses = [
            'from-purple-600/40 to-pink-600/40 border-purple-300/60',
            'from-indigo-600/40 to-purple-600/40 border-indigo-300/60',
            'from-pink-600/40 to-rose-600/40 border-pink-300/60'
          ];
          const colorClass = colorClasses[index % colorClasses.length];

          return (
            <span
              key={`${keyword}-${index}`}
              className={`${sizeClass} bg-gradient-to-r ${colorClass} border-2 text-purple-100 rounded-full font-semibold shadow-xl hover:shadow-purple-400/60 transition-all duration-500 hover:scale-110 hover:-translate-y-2 backdrop-blur-sm cursor-pointer animate-floatUp`}
              style={{
                animation: `floatUp 0.6s ease-out ${index * 0.15}s both, float 3s ease-in-out infinite ${index * 0.3}s`,
                transformOrigin: 'center bottom'
              }}
            >
              #{keyword}
            </span>
          );
        })}
      </div>

      {/* Loading indicator if more keywords are coming */}
      {visibleKeywords.length < keywords.length && (
        <div className="flex items-center gap-2 mt-4 text-purple-400 text-xs">
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
          <span className="italic">Loading more topics...</span>
        </div>
      )}
    </div>
  );
};

export default KeywordsDisplay;
