import { useEffect, useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';

const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY || '';
const CHANNEL_ID = '@MarinduqueStateUniversity'; // Replace with actual channel ID for MarinduqueStateUniversity
const MAX_RESULTS = 8; // Show latest 8 videos

function PlaylistSection() {
  const [videos, setVideos] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = localStorage.getItem('yt_playlist');
    if (cached) {
      setVideos(JSON.parse(cached));
      setLoading(false);
    }
    async function fetchVideos() {
      setLoading(true);
      setError(null);
      try {
        // Fetch uploads playlist ID
        const channelRes = await fetch(
          `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`
        );
        const channelData = await channelRes.json();
        const uploadsId =
          channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
        if (!uploadsId) throw new Error('No uploads playlist found');
        // Fetch latest videos from uploads playlist
        const playlistRes = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${uploadsId}&key=${YOUTUBE_API_KEY}`
        );
        const playlistData = await playlistRes.json();
        const vids = (playlistData.items || []).map((item) => {
          const s = item.snippet;
          return {
            id: s.resourceId.videoId,
            title: s.title,
            description: s.description,
            speaker: s.videoOwnerChannelTitle,
            url: `https://www.youtube.com/embed/${s.resourceId.videoId}`,
            thumbnail: s.thumbnails?.high?.url || s.thumbnails?.default?.url,
            publishedAt: s.publishedAt,
          };
        });
        setVideos(vids);
        localStorage.setItem('yt_playlist', JSON.stringify(vids));
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

  const video = videos[current];

  const handleShare = () => {
    const shareUrl = `https://youtu.be/${video.id}`;
    if (navigator.share) {
      navigator.share({ title: video.title, url: shareUrl });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied!');
    }
  };

  if (loading)
    return <div className='text-center py-8'>Loading playlist...</div>;
  if (error)
    return <div className='text-center text-red-600 py-8'>{error}</div>;
  if (!videos.length)
    return <div className='text-center py-8'>No videos found.</div>;

  return (
    <section className='w-full max-w-3xl mx-auto bg-rose-950 rounded-lg p-6 text-white mb-8 shadow-lg'>
      <div className='flex flex-col md:flex-row gap-6 items-start'>
        <div className='flex-1 w-full'>
          <div className='relative aspect-video rounded-lg overflow-hidden bg-black'>
            {!showPlayer ? (
              <button
                className='absolute inset-0 flex items-center justify-center w-full h-full bg-black/60 hover:bg-black/40 transition'
                onClick={() => setShowPlayer(true)}
                aria-label={`Play video: ${video.title}`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className='w-full h-full object-cover'
                  loading='lazy'
                />
                <span className='absolute text-4xl md:text-6xl text-white bg-primary-700/80 rounded-full px-6 py-2 shadow-lg'>
                  ▶
                </span>
              </button>
            ) : (
              <iframe
                src={video.url}
                title={video.title}
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                className='w-full h-full min-h-[220px] md:min-h-[320px]'
                aria-label={video.title}
              />
            )}
          </div>
          <div className='flex items-center gap-2 mt-2'>
            <button
              onClick={handleShare}
              className='text-xs text-white hover:text-amber-400 underline flex items-center gap-1'
              aria-label='Share this video'
            >
              <ShareIcon className='inline-block w-4 h-4 mr-1' /> Share
            </button>
            <button
              onClick={() => setShowPlayer(false)}
              className='text-xs text-white hover:text-amber-400 underline ml-2'
              aria-label='Close video player'
            >
              Close
            </button>
            <button
              onClick={() =>
                setCurrent((current - 1 + videos.length) % videos.length)
              }
              className='ml-4 px-2 py-1 bg-primary-700 rounded text-xs hover:bg-primary-600'
              aria-label='Previous video'
              disabled={videos.length < 2}
            >
              Prev
            </button>
            <button
              onClick={() => setCurrent((current + 1) % videos.length)}
              className='ml-2 px-2 py-1 bg-primary-700 rounded text-xs hover:bg-primary-600'
              aria-label='Next video'
              disabled={videos.length < 2}
            >
              Next
            </button>
          </div>
        </div>
        <div className='w-full md:w-64 flex flex-col gap-2 mt-4 md:mt-0'>
          <h3 className='text-lg font-bold mb-2'>Playlist</h3>
          <ul className='flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-visible'>
            {videos.map((v, idx) => (
              <li key={v.id}>
                <button
                  className={`flex items-center gap-2 p-2 rounded-lg w-full text-left transition border border-transparent ${
                    idx === current
                      ? 'bg-primary-700 text-white border-amber-400'
                      : 'bg-white/10 hover:bg-primary-800 text-white'
                  }`}
                  onClick={() => {
                    setCurrent(idx);
                    setShowPlayer(false);
                  }}
                  aria-label={`Select video: ${v.title}`}
                >
                  <img
                    src={v.thumbnail}
                    alt={v.title}
                    className='w-12 h-8 object-cover rounded'
                    loading='lazy'
                  />
                  <span className='truncate text-xs md:text-sm font-semibold'>
                    {v.title}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='mt-4'>
        <h4 className='text-xl font-bold mb-1'>{video.title}</h4>
        <p className='text-sm mb-1'>{video.description}</p>
        <p className='text-xs text-amber-200'>Speaker: {video.speaker}</p>
        <p className='text-xs text-gray-300 mt-1'>
          Published: {new Date(video.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </section>
  );
}

export default PlaylistSection;
