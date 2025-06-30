import { useState } from 'react';

function QuickFacts({ facts = [] }) {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  if (!facts.length) return null;

  return (
    <section className="mb-8" aria-labelledby="quick-facts-heading">
      <h2 
        id="quick-facts-heading"
        className="text-2xl font-bold mb-4 text-primary-700"
      >
        Quick Facts
      </h2>
      <div className="space-y-3">
        {facts.map((fact, index) => (
          <div
            key={index}
            className="bg-white/70 rounded-lg shadow border border-gray-100 overflow-hidden"
          >
            <button
              onClick={() => toggleExpanded(index)}
              className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
              aria-expanded={expandedItems.has(index)}
              aria-controls={`fact-content-${index}`}
            >
              <span className="font-medium text-gray-900">{fact.question}</span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  expandedItems.has(index) ? 'transform rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id={`fact-content-${index}`}
              className={`px-4 pb-3 text-gray-700 transition-all duration-200 ${
                expandedItems.has(index) 
                  ? 'opacity-100 max-h-96' 
                  : 'opacity-0 max-h-0 overflow-hidden'
              }`}
              aria-hidden={!expandedItems.has(index)}
            >
              <div className="pt-1">
                {fact.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default QuickFacts;
