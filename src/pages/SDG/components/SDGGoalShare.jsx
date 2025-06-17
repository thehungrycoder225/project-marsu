import React from 'react';

const shareUrl = window.location.href;

const SDGGoalShare = ({ title }) => (
  <div className='sdg-share flex gap-3 my-4'>
    <span className='font-medium'>Share:</span>
    <a
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
      target='_blank'
      rel='noopener noreferrer'
      className='sdg-share-btn bg-blue-600 text-white rounded-full px-3 py-1 hover:bg-blue-700 transition'
    >
      Facebook
    </a>
    <a
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
      target='_blank'
      rel='noopener noreferrer'
      className='sdg-share-btn bg-blue-400 text-white rounded-full px-3 py-1 hover:bg-blue-500 transition'
    >
      Twitter
    </a>
    <a
      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`}
      target='_blank'
      rel='noopener noreferrer'
      className='sdg-share-btn bg-blue-800 text-white rounded-full px-3 py-1 hover:bg-blue-900 transition'
    >
      LinkedIn
    </a>
    <button
      onClick={() => {
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied!');
      }}
      className='sdg-share-btn bg-gray-200 text-gray-700 rounded-full px-3 py-1 hover:bg-gray-300 transition'
    >
      Copy Link
    </button>
  </div>
);

export default SDGGoalShare;
