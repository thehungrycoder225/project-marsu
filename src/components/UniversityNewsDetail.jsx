import { useParams, Link } from 'react-router-dom';
import { useColleges } from '../hooks/useColleges';
import MetaTags from './MetaTags';
import {
  LinkIcon,
  HomeIcon,
  ChevronRightIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon as ChevronRightIconDup,
  ClockIcon,
  UserIcon,
  ShareIcon,
  CalendarIcon,
  MagnifyingGlassIcon,
  PrinterIcon,
  DocumentDuplicateIcon,
  ListBulletIcon,
  EnvelopeIcon,
  BriefcaseIcon,
  LanguageIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import './news.css';

function UniversityNewsDetail() {
  const { newsId } = useParams();
  const { universityNews, loading, error } = useColleges();
  const [lang, setLang] = useState('en');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedText, setSelectedText] = useState('');
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [fontSize, setFontSize] = useState('base');
  const articleRef = useRef(null);
  const [tableOfContents, setTableOfContents] = useState([]);
  const [visibleSections, setVisibleSections] = useState(new Set([0, 1, 2])); // Show first 3 sections initially

  // Lazy loading for long articles
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = parseInt(
              entry.target.dataset.sectionIndex,
              10
            );
            if (!isNaN(sectionIndex)) {
              setVisibleSections((prev) => {
                const newSet = new Set(prev);
                // Load this section and the next 2
                for (let i = sectionIndex; i < sectionIndex + 3; i++) {
                  newSet.add(i);
                }
                return newSet;
              });
            }
          }
        });
      },
      {
        rootMargin: '200px',
        threshold: 0.1,
      }
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Define news early so it can be used in callbacks
  const news = (universityNews || []).find(
    (n) => String(n.id) === String(newsId)
  );

  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!news) return 0;
    const content = `${news.lead?.[lang] || news.lead || ''} ${news.body?.[lang] || news.body || ''}`;
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }, [news, lang]);

  // Get all images for lightbox navigation
  const allImages = useMemo(() => {
    if (!news) return [];
    const images = [];
    if (news.imgUrl)
      images.push({
        src: news.imgUrl,
        alt: news.headline?.[lang] || news.headline,
      });
    if (news.gallery) {
      news.gallery.forEach((img, index) => {
        images.push({ src: img, alt: `Gallery image ${index + 1}` });
      });
    }
    return images;
  }, [news, lang]);

  // Rich text content processor
  const processRichTextContent = useCallback((content) => {
    if (!content) return [];

    const sections = [];
    const lines = content.split('\n');
    let currentSection = null;
    let listItems = [];

    lines.forEach((line) => {
      const trimmed = line.trim();

      // Handle headings
      if (trimmed.match(/^#{1,6}\s+/)) {
        if (listItems.length > 0) {
          sections.push({ type: 'list', items: [...listItems] });
          listItems = [];
        }
        if (currentSection) {
          sections.push(currentSection);
          currentSection = null;
        }

        const level = trimmed.match(/^(#{1,6})/)[1].length;
        const text = trimmed.replace(/^#{1,6}\s+/, '');
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');

        sections.push({
          type: 'heading',
          level,
          text,
          id,
        });
        return;
      }

      // Handle blockquotes
      if (trimmed.startsWith('>')) {
        if (listItems.length > 0) {
          sections.push({ type: 'list', items: [...listItems] });
          listItems = [];
        }
        if (currentSection?.type !== 'blockquote') {
          if (currentSection) sections.push(currentSection);
          currentSection = { type: 'blockquote', content: [] };
        }
        currentSection.content.push(trimmed.replace(/^>\s*/, ''));
        return;
      }

      // Handle list items
      if (trimmed.match(/^[-*]\s+/) || trimmed.match(/^\d+\.\s+/)) {
        if (currentSection) {
          sections.push(currentSection);
          currentSection = null;
        }

        const isOrdered = trimmed.match(/^\d+\.\s+/);
        const text = trimmed.replace(/^([-*]|\d+\.)\s+/, '');

        if (
          listItems.length === 0 ||
          listItems[listItems.length - 1].type !==
            (isOrdered ? 'ordered' : 'unordered')
        ) {
          if (listItems.length > 0) {
            sections.push({ type: 'list', items: [...listItems] });
          }
          listItems = [
            { type: isOrdered ? 'ordered' : 'unordered', items: [text] },
          ];
        } else {
          listItems[listItems.length - 1].items.push(text);
        }
        return;
      }

      // Handle video embeds
      const youtubeMatch = trimmed.match(
        /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
      );
      const vimeoMatch = trimmed.match(/vimeo\.com\/(\d+)/);

      if (youtubeMatch || vimeoMatch) {
        if (listItems.length > 0) {
          sections.push({ type: 'list', items: [...listItems] });
          listItems = [];
        }
        if (currentSection) {
          sections.push(currentSection);
          currentSection = null;
        }

        if (youtubeMatch) {
          sections.push({
            type: 'video',
            platform: 'youtube',
            id: youtubeMatch[1],
            url: trimmed,
          });
        } else if (vimeoMatch) {
          sections.push({
            type: 'video',
            platform: 'vimeo',
            id: vimeoMatch[1],
            url: trimmed,
          });
        }
        return;
      }

      // Handle regular paragraphs
      if (trimmed) {
        if (listItems.length > 0) {
          sections.push({ type: 'list', items: [...listItems] });
          listItems = [];
        }
        if (currentSection?.type !== 'paragraph') {
          if (currentSection) sections.push(currentSection);
          currentSection = { type: 'paragraph', content: [] };
        }
        currentSection.content.push(trimmed);
      } else {
        // Empty line - end current section
        if (currentSection) {
          sections.push(currentSection);
          currentSection = null;
        }
      }
    });

    // Add remaining content
    if (listItems.length > 0) {
      sections.push({ type: 'list', items: [...listItems] });
    }
    if (currentSection) {
      sections.push(currentSection);
    }

    return sections;
  }, []);

  // Generate table of contents from processed content
  const generateTableOfContents = useCallback(
    (content) => {
      const sections = processRichTextContent(content);
      return sections
        .filter((section) => section.type === 'heading' && section.level <= 3)
        .map((section) => ({
          id: section.id,
          text: section.text,
          level: section.level,
        }));
    },
    [processRichTextContent]
  );

  // Update table of contents when content changes
  useEffect(() => {
    if (news?.body) {
      const content = news.body[lang] || news.body;
      const toc = generateTableOfContents(content);
      setTableOfContents(toc);
    }
  }, [news, lang, generateTableOfContents]);

  // Format text with rich formatting (bold, italic, links)
  const formatText = useCallback((text) => {
    if (!text) return text;

    // Handle links [text](url)
    text = text.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:text-blue-800 underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Handle bold **text**
    text = text.replace(
      /\*\*([^*]+)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );

    // Handle italic *text*
    text = text.replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>');

    return text;
  }, []);

  // Handle text selection for sharing
  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();

    if (selectedText && selectedText.length > 10) {
      setSelectedText(selectedText);
      setShowSharePopup(true);

      // Position popup near selection
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      // Show popup with a slight delay to prevent immediate closing
      setTimeout(() => {
        const popup = document.getElementById('share-popup');
        if (popup) {
          popup.style.top = `${rect.bottom + window.scrollY + 10}px`;
          popup.style.left = `${rect.left + window.scrollX}px`;
        }
      }, 100);
    } else {
      setShowSharePopup(false);
      setSelectedText('');
    }
  }, []);

  // Close share popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showSharePopup && !event.target.closest('#share-popup')) {
        setShowSharePopup(false);
        setSelectedText('');
        window.getSelection().removeAllRanges();
      }
    };

    if (showSharePopup) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSharePopup]);

  // Handle sharing selected text
  const shareSelectedText = useCallback(
    async (platform = 'twitter') => {
      const text = `"${selectedText}" - ${news?.headline?.[lang] || news?.headline || 'University News'}`;
      const url = window.location.href;

      switch (platform) {
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(text)}&u=${encodeURIComponent(url)}`,
            '_blank'
          );
          break;
        case 'copy':
          try {
            await navigator.clipboard.writeText(`${text}\n\n${url}`);
            alert('Quote copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
          break;
      }

      setShowSharePopup(false);
      setSelectedText('');
      window.getSelection().removeAllRanges();
    },
    [selectedText, news, lang]
  );

  // Render rich text content with lazy loading
  const renderRichContent = useCallback(
    (content) => {
      const sections = processRichTextContent(content);

      return sections.map((section, index) => {
        // Lazy loading for performance
        const isVisible = visibleSections.has(index);
        const shouldLazyLoad = sections.length > 10 && index > 2;

        if (shouldLazyLoad && !isVisible) {
          return (
            <div
              key={index}
              data-section-index={index}
              ref={(el) => {
                if (el && observerRef.current) {
                  observerRef.current.observe(el);
                }
              }}
              className='min-h-[100px] flex items-center justify-center text-gray-500 bg-gray-50 rounded-lg my-4'
            >
              <div className='text-center'>
                <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--color-primary)] mx-auto mb-2'></div>
                <p className='text-sm'>Loading content...</p>
              </div>
            </div>
          );
        }

        switch (section.type) {
          case 'heading': {
            const HeadingTag = `h${section.level}`;
            const headingClasses = {
              1: 'text-3xl font-bold text-gray-900 mt-8 mb-4',
              2: 'text-2xl font-semibold text-gray-800 mt-6 mb-3',
              3: 'text-xl font-medium text-gray-700 mt-4 mb-2',
              4: 'text-lg font-medium text-gray-700 mt-3 mb-2',
              5: 'text-base font-medium text-gray-700 mt-2 mb-1',
              6: 'text-sm font-medium text-gray-700 mt-2 mb-1',
            };

            return (
              <HeadingTag
                key={index}
                id={section.id}
                className={headingClasses[section.level]}
                data-section-index={index}
                ref={(el) => {
                  if (el && observerRef.current && shouldLazyLoad) {
                    observerRef.current.observe(el);
                  }
                }}
              >
                {section.text}
              </HeadingTag>
            );
          }

          case 'paragraph':
            return (
              <div
                key={index}
                className='mb-4'
                data-section-index={index}
                ref={(el) => {
                  if (el && observerRef.current && shouldLazyLoad) {
                    observerRef.current.observe(el);
                  }
                }}
              >
                {section.content.map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className='text-gray-800 leading-relaxed mb-2'
                    dangerouslySetInnerHTML={{ __html: formatText(line) }}
                  />
                ))}
              </div>
            );

          case 'blockquote':
            return (
              <blockquote
                key={index}
                className='border-l-4 border-[var(--color-primary)] bg-gray-50 p-4 my-6 italic'
                data-section-index={index}
                ref={(el) => {
                  if (el && observerRef.current && shouldLazyLoad) {
                    observerRef.current.observe(el);
                  }
                }}
              >
                {section.content.map((line, lineIndex) => (
                  <p
                    key={lineIndex}
                    className='text-gray-700 mb-2 last:mb-0'
                    dangerouslySetInnerHTML={{ __html: formatText(line) }}
                  />
                ))}
              </blockquote>
            );

          case 'list':
            return (
              <div
                key={index}
                className='mb-4'
                data-section-index={index}
                ref={(el) => {
                  if (el && observerRef.current && shouldLazyLoad) {
                    observerRef.current.observe(el);
                  }
                }}
              >
                {section.items.map((listGroup, groupIndex) => {
                  const ListTag = listGroup.type === 'ordered' ? 'ol' : 'ul';
                  const listClasses =
                    listGroup.type === 'ordered'
                      ? 'list-decimal list-inside space-y-1 ml-4'
                      : 'list-disc list-inside space-y-1 ml-4';

                  return (
                    <ListTag key={groupIndex} className={listClasses}>
                      {listGroup.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className='text-gray-800 leading-relaxed'
                          dangerouslySetInnerHTML={{ __html: formatText(item) }}
                        />
                      ))}
                    </ListTag>
                  );
                })}
              </div>
            );

          case 'video': {
            const aspectRatio = 'aspect-w-16 aspect-h-9';
            return (
              <div
                key={index}
                className={`my-6 ${aspectRatio}`}
                data-section-index={index}
                ref={(el) => {
                  if (el && observerRef.current && shouldLazyLoad) {
                    observerRef.current.observe(el);
                  }
                }}
              >
                <div className='bg-gray-100 rounded-lg overflow-hidden'>
                  {section.platform === 'youtube' ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${section.id}`}
                      title='YouTube video'
                      className='w-full h-full'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                      loading='lazy'
                    />
                  ) : section.platform === 'vimeo' ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${section.id}`}
                      title='Vimeo video'
                      className='w-full h-full'
                      allow='autoplay; fullscreen; picture-in-picture'
                      allowFullScreen
                      loading='lazy'
                    />
                  ) : (
                    <div className='flex items-center justify-center h-48 text-gray-500'>
                      <p>Video: {section.url}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          default:
            return null;
        }
      });
    },
    [processRichTextContent, formatText, visibleSections, observerRef]
  );
  const { previousArticle, nextArticle } = useMemo(() => {
    if (!universityNews || !news)
      return { previousArticle: null, nextArticle: null };

    const sortedNews = [...universityNews].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const currentIndex = sortedNews.findIndex(
      (article) => article.id === news.id
    );

    return {
      previousArticle: currentIndex > 0 ? sortedNews[currentIndex - 1] : null,
      nextArticle:
        currentIndex < sortedNews.length - 1
          ? sortedNews[currentIndex + 1]
          : null,
    };
  }, [universityNews, news]);

  // Lightbox handlers
  const openLightbox = useCallback((imageSrc, imageIndex = 0) => {
    setLightboxImage(imageSrc);
    setCurrentImageIndex(imageIndex);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setLightboxImage('');
    document.body.style.overflow = 'unset';
  }, []);

  const navigateLightbox = useCallback(
    (direction) => {
      if (allImages.length === 0) return;

      let newIndex;
      if (direction === 'next') {
        newIndex =
          currentImageIndex < allImages.length - 1 ? currentImageIndex + 1 : 0;
      } else {
        newIndex =
          currentImageIndex > 0 ? currentImageIndex - 1 : allImages.length - 1;
      }

      setCurrentImageIndex(newIndex);
      setLightboxImage(allImages[newIndex].src);
    },
    [allImages, currentImageIndex]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;

      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox('prev');
          break;
        case 'ArrowRight':
          navigateLightbox('next');
          break;
        default:
          break;
      }
    };

    if (lightboxOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxOpen, closeLightbox, navigateLightbox]);

  // Enhanced share handler with multiple platforms
  const handleShare = useCallback(
    async (platform = 'native') => {
      const url = news?.articleUrl || window.location.href;
      const title =
        news?.headline?.[lang] || news?.headline || 'University News';

      switch (platform) {
        case 'twitter':
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            '_blank'
          );
          break;
        case 'facebook':
          window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            '_blank'
          );
          break;
        case 'copy':
          try {
            await navigator.clipboard.writeText(url);
            alert('Link copied to clipboard!');
          } catch (err) {
            console.error('Failed to copy: ', err);
          }
          break;
        default:
          if (navigator.share && navigator.canShare({ title, url })) {
            try {
              await navigator.share({ title, url });
            } catch (err) {
              if (err.name !== 'AbortError') {
                console.error('Error sharing:', err);
              }
            }
          } else {
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
              '_blank'
            );
          }
      }
    },
    [lang, news?.articleUrl, news?.headline]
  );

  // Skeleton loading component
  const SkeletonLoader = () => (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
        {/* Breadcrumb skeleton */}
        <div className='flex items-center space-x-2 mb-6'>
          <div className='h-4 bg-gray-300 rounded w-12 animate-pulse'></div>
          <div className='h-4 bg-gray-300 rounded w-2 animate-pulse'></div>
          <div className='h-4 bg-gray-300 rounded w-16 animate-pulse'></div>
          <div className='h-4 bg-gray-300 rounded w-2 animate-pulse'></div>
          <div className='h-4 bg-gray-300 rounded w-32 animate-pulse'></div>
        </div>

        {/* Title skeleton */}
        <div className='space-y-3 mb-6'>
          <div className='h-8 bg-gray-300 rounded w-3/4 animate-pulse'></div>
          <div className='h-8 bg-gray-300 rounded w-1/2 animate-pulse'></div>
        </div>

        {/* Meta info skeleton */}
        <div className='flex items-center space-x-4 mb-6'>
          <div className='h-4 bg-gray-300 rounded w-24 animate-pulse'></div>
          <div className='h-4 bg-gray-300 rounded w-20 animate-pulse'></div>
        </div>

        {/* Image skeleton */}
        <div className='h-64 md:h-80 bg-gray-300 rounded-lg mb-6 animate-pulse'></div>

        {/* Tags skeleton */}
        <div className='flex flex-wrap gap-2 mb-6'>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className='h-6 bg-gray-300 rounded w-16 animate-pulse'
              ></div>
            ))}
        </div>

        {/* Content skeleton */}
        <div className='space-y-3 mb-8'>
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className={`h-4 bg-gray-300 rounded animate-pulse ${i % 3 === 2 ? 'w-3/4' : 'w-full'}`}
              ></div>
            ))}
        </div>

        {/* Related articles skeleton */}
        <div className='border-t pt-8'>
          <div className='h-6 bg-gray-300 rounded w-32 mb-6 animate-pulse'></div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className='bg-white rounded-lg shadow p-4'>
                  <div className='h-5 bg-gray-300 rounded w-3/4 mb-2 animate-pulse'></div>
                  <div className='h-3 bg-gray-300 rounded w-1/2 mb-2 animate-pulse'></div>
                  <div className='space-y-2'>
                    <div className='h-3 bg-gray-300 rounded w-full animate-pulse'></div>
                    <div className='h-3 bg-gray-300 rounded w-2/3 animate-pulse'></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <SkeletonLoader />;

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='max-w-md mx-auto text-center'>
          <div className='bg-red-50 border border-red-200 rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-red-800 mb-2'>
              Error Loading Article
            </h3>
            <p className='text-red-600 mb-4'>
              We encountered an error while loading this news article.
            </p>
            <button
              onClick={() => window.location.reload()}
              className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='max-w-md mx-auto text-center'>
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6'>
            <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
              Article Not Found
            </h3>
            <p className='text-yellow-600 mb-4'>
              The news article you&apos;re looking for doesn&apos;t exist or may
              have been removed.
            </p>
            <Link
              to='/'
              className='bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition-colors'
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const metaTitle =
    news.metaTitle ||
    news.headline?.[lang] ||
    news.headline ||
    'University News';
  const metaDescription =
    news.metaDescription || news.lead?.[lang] || news.lead || '';
  const metaImage = news.metaImage || news.imgUrl || '/logo.png';
  const metaUrl = news.articleUrl || window.location.href;

  return (
    <div className='min-h-screen bg-gray-50'>
      <MetaTags
        title={metaTitle}
        description={metaDescription}
        image={metaImage}
        url={metaUrl}
        type='article'
      />

      {/* Enhanced container with better mobile spacing */}
      <div className='max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8'>
        {/* Breadcrumb Navigation */}
        <nav
          className='flex items-center space-x-2 text-sm mb-6'
          aria-label='Breadcrumb'
        >
          <Link
            to='/'
            className='flex items-center text-gray-600 hover:text-[var(--color-primary)] transition-colors'
          >
            <HomeIcon className='w-4 h-4 mr-1' />
            Home
          </Link>
          <ChevronRightIcon className='w-4 h-4 text-gray-400' />
          <span>News</span>
          <ChevronRightIcon className='w-4 h-4 text-gray-400' />
          <span className='text-[var(--color-primary)] font-medium truncate max-w-xs'>
            {(news.headline?.[lang] || news.headline || '').slice(0, 50)}
            {(news.headline?.[lang] || news.headline || '').length > 50
              ? '...'
              : ''}
          </span>
        </nav>

        {/* Article Header */}
        <header className='mb-8'>
          <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4'>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-text-dark)] leading-tight'>
              {news.headline?.[lang] || news.headline}
            </h1>

            {/* Enhanced Share Icons */}
            <div className='flex flex-col sm:flex-row gap-2 sm:ml-4'>
              <div className='flex gap-2'>
                <button
                  onClick={() => handleShare('facebook')}
                  className='flex items-center justify-center w-10 h-10 text-gray-800 rounded-lg transition-colors transform hover:scale-105'
                  title='Share on Facebook'
                >
                  <ArrowUpTrayIcon className='w-5 h-5' />
                </button>

                <button
                  onClick={() => handleShare('copy')}
                  className='flex items-center justify-center w-10 h-10 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors shadow-md hover:shadow-lg transform hover:scale-105'
                  title='Copy link'
                >
                  <LinkIcon className='w-5 h-5' />
                </button>
              </div>
            </div>
          </div>

          {/* Article Meta Information */}
          <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600 mb-6'>
            {news.author && (
              <span className='flex items-center'>
                <UserIcon className='w-4 h-4 mr-1 text-[var(--color-primary)]' />
                By{' '}
                <span className='text-[var(--color-primary)] font-medium ml-1'>
                  {news.author}
                </span>
              </span>
            )}
            {news.date && (
              <span className='flex items-center'>
                <CalendarIcon className='w-4 h-4 mr-1 text-[var(--color-secondary)]' />
                {new Date(news.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            <span className='flex items-center'>
              <ClockIcon className='w-4 h-4 mr-1 text-gray-600' />
              <span className='text-gray-600 font-medium'>
                {readingTime} min read
              </span>
            </span>
          </div>
        </header>

        {/* Featured Image with Lightbox */}
        {news.imgUrl && (
          <div className='mb-8'>
            <div
              className='relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300'
              onClick={() => openLightbox(news.imgUrl, 0)}
            >
              <img
                src={news.imgUrl}
                alt={news.headline?.[lang] || news.headline}
                className='w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-300 group-hover:scale-105'
                loading='lazy'
              />
              <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center'>
                <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 rounded-full p-4 shadow-lg'>
                  <MagnifyingGlassIcon className='w-8 h-8 text-[var(--color-primary)]' />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mb-8'>
            {news.tags.map((tag) => (
              <span
                key={tag}
                className='inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-600)] text-white hover:from-[var(--color-primary-hover)] hover:to-[var(--color-primary-600)] transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105'
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Article Content */}
        <div className='flex flex-col lg:flex-row gap-8 mb-8'>
          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <aside className='lg:w-64 lg:flex-shrink-0'>
              <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-4'>
                <h3 className='text-lg font-semibold text-[var(--color-text-dark)] mb-4 flex items-center'>
                  <ListBulletIcon className='w-5 h-5 mr-2 text-[var(--color-primary)]' />
                  Table of Contents
                </h3>
                <nav className='space-y-2'>
                  {tableOfContents.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`block text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors ${
                        item.level === 1
                          ? 'font-medium'
                          : item.level === 2
                            ? 'ml-3'
                            : 'ml-6'
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(item.id)
                          ?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}

          {/* Main Article Content */}
          <article className='flex-1 min-w-0'>
            {/* Font Size Controls */}
            <div className='flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg'>
              <div className='flex items-center space-x-2'>
                <span className='text-sm text-gray-600'>Font Size:</span>
                <button
                  onClick={() => setFontSize('sm')}
                  className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                    fontSize === 'sm'
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Small
                </button>
                <button
                  onClick={() => setFontSize('base')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    fontSize === 'base'
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Medium
                </button>
                <button
                  onClick={() => setFontSize('lg')}
                  className={`px-3 py-1 rounded text-base font-medium transition-colors ${
                    fontSize === 'lg'
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Large
                </button>
              </div>

              <div className='flex items-center space-x-2'>
                <button
                  onClick={() => window.print()}
                  className='flex items-center px-3 py-1 text-sm text-gray-600 hover:text-[var(--color-primary)] transition-colors'
                  title='Print Article'
                >
                  <PrinterIcon className='w-4 h-4 mr-1' />
                  Print
                </button>
              </div>
            </div>

            {/* Article Lead */}
            <div
              className={`leading-relaxed text-gray-700 mb-6 ${
                fontSize === 'sm'
                  ? 'text-base'
                  : fontSize === 'lg'
                    ? 'text-xl'
                    : 'text-lg'
              }`}
            >
              {news.lead?.[lang] || news.lead}
            </div>

            {/* Rich Text Article Body */}
            <div
              className={`prose max-w-none text-gray-800 leading-relaxed ${
                fontSize === 'sm'
                  ? 'text-sm'
                  : fontSize === 'lg'
                    ? 'text-lg'
                    : 'text-base'
              }`}
              onMouseUp={handleTextSelection}
              onTouchEnd={handleTextSelection}
              ref={articleRef}
              role='main'
              aria-label='Article content'
            >
              {renderRichContent(news.body?.[lang] || news.body || '')}
            </div>
          </article>
        </div>

        {/* Text Selection Share Popup */}
        {showSharePopup && selectedText && (
          <div
            id='share-popup'
            className='fixed z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-3 flex items-center space-x-2'
            style={{ position: 'absolute' }}
          >
            <span className='text-xs text-gray-600'>Share:</span>
            <button
              onClick={() => shareSelectedText('twitter')}
              className='p-1 text-blue-500 hover:bg-blue-50 rounded'
              title='Share on Twitter'
            >
              <ShareIcon className='w-4 h-4' />
            </button>
            <button
              onClick={() => shareSelectedText('facebook')}
              className='p-1 text-blue-600 hover:bg-blue-50 rounded'
              title='Share on Facebook'
            >
              <ShareIcon className='w-4 h-4' />
            </button>
            <button
              onClick={() => shareSelectedText('copy')}
              className='p-1 text-gray-600 hover:bg-gray-50 rounded'
              title='Copy Quote'
            >
              <DocumentDuplicateIcon className='w-4 h-4' />
            </button>
            <button
              onClick={() => {
                setShowSharePopup(false);
                setSelectedText('');
                window.getSelection().removeAllRanges();
              }}
              className='p-1 text-gray-400 hover:bg-gray-50 rounded ml-2'
              title='Close'
            >
              <XMarkIcon className='w-3 h-3' />
            </button>
          </div>
        )}

        {/* Author Profile Section */}
        {news.author && (
          <section className='bg-gradient-to-r from-gray-50 to-[var(--color-bg-light)] rounded-xl p-6 mb-8 border border-gray-200 shadow-sm'>
            <div className='flex items-start space-x-4'>
              <div className='flex-shrink-0'>
                <div className='w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-600)] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg'>
                  {news.author.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className='flex-1'>
                <h3 className='text-lg font-semibold text-[var(--color-text-dark)] mb-2'>
                  About {news.author}
                </h3>
                <p className='text-gray-600 mb-3 leading-relaxed'>
                  {news.authorBio ||
                    `${news.author} is a contributor to the Marinduque State University news team, providing insightful coverage of university events and developments.`}
                </p>
                <div className='flex items-center space-x-4 text-sm text-gray-500'>
                  {news.authorEmail && (
                    <a
                      href={`mailto:${news.authorEmail}`}
                      className='hover:text-[var(--color-primary)] transition-colors flex items-center group'
                    >
                      <EnvelopeIcon className='w-4 h-4 mr-1 group-hover:text-[var(--color-primary)]' />
                      Contact
                    </a>
                  )}
                  <span className='flex items-center'>
                    <BriefcaseIcon className='w-4 h-4 mr-1 text-[var(--color-secondary)]' />
                    <span className='text-[var(--color-secondary-900)] font-medium'>
                      Staff Writer
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Language Toggle */}
        {news.headline?.fil && (
          <div className='mb-8'>
            <button
              onClick={() => setLang(lang === 'en' ? 'fil' : 'en')}
              className='inline-flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105'
            >
              <LanguageIcon className='w-4 h-4 mr-2' />
              {lang === 'en' ? 'Tingnan sa Filipino' : 'View in English'}
            </button>
          </div>
        )}

        {/* Gallery with Lightbox */}
        {news.gallery && news.gallery.length > 0 && (
          <section className='mb-12'>
            <h2 className='text-2xl font-bold text-[var(--color-text-dark)] mb-6'>
              Gallery
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {news.gallery.map((image, index) => {
                const imageIndex = news.imgUrl ? index + 1 : index; // Account for main image
                return (
                  <div
                    key={index}
                    className='group cursor-pointer relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300'
                    onClick={() => openLightbox(image, imageIndex)}
                  >
                    <img
                      src={image}
                      alt={`Gallery image ${index + 1}`}
                      className='w-full h-48 object-cover transition-all duration-300 group-hover:scale-110'
                      loading='lazy'
                    />
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center'>
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/95 rounded-full p-3 shadow-lg'>
                        <MagnifyingGlassIcon className='w-5 h-5 text-[var(--color-primary)]' />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Previous/Next Article Navigation */}
        {(previousArticle || nextArticle) && (
          <section className='border-t border-[var(--color-border-dark)] pt-8 mb-8'>
            <div className='flex justify-between items-center'>
              {previousArticle ? (
                <Link
                  to={`/news/${previousArticle.id}`}
                  className='group flex items-center space-x-3 max-w-sm p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-[var(--color-primary)]'
                >
                  <ChevronLeftIcon className='w-5 h-5 text-gray-400 group-hover:text-[var(--color-primary)] flex-shrink-0 transition-colors' />
                  <div className='text-left'>
                    <p className='text-xs text-[var(--color-secondary-900)] font-medium mb-1'>
                      Previous Article
                    </p>
                    <h3 className='text-sm font-medium text-gray-900 group-hover:text-[var(--color-primary)] line-clamp-2 transition-colors'>
                      {previousArticle.headline?.[lang] ||
                        previousArticle.headline}
                    </h3>
                  </div>
                </Link>
              ) : (
                <div></div>
              )}

              {nextArticle ? (
                <Link
                  to={`/news/${nextArticle.id}`}
                  className='group flex items-center space-x-3 max-w-sm p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-right border border-gray-200 hover:border-[var(--color-primary)]'
                >
                  <div className='text-right'>
                    <p className='text-xs text-[var(--color-secondary-900)] font-medium mb-1'>
                      Next Article
                    </p>
                    <h3 className='text-sm font-medium text-gray-900 group-hover:text-[var(--color-primary)] line-clamp-2 transition-colors'>
                      {nextArticle.headline?.[lang] || nextArticle.headline}
                    </h3>
                  </div>
                  <ChevronRightIconDup className='w-5 h-5 text-gray-400 group-hover:text-[var(--color-primary)] flex-shrink-0 transition-colors' />
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </section>
        )}

        {/* Related News */}
        <section className='border-t border-[var(--color-border-dark)] pt-12'>
          <h2 className='text-2xl font-bold text-[var(--color-text-dark)] mb-8'>
            Related Articles
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6'>
            {(universityNews || [])
              .filter((n) => n.id !== news.id)
              .slice(0, 4)
              .map((related) => (
                <Link
                  key={related.id}
                  to={`/news/${related.id}`}
                  className='group block bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 hover:border-[var(--color-primary)]'
                >
                  {related.imgUrl && (
                    <img
                      src={related.imgUrl}
                      alt={related.headline?.[lang] || related.headline}
                      className='w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300'
                      loading='lazy'
                    />
                  )}
                  <div className='p-4'>
                    <h3 className='font-semibold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors line-clamp-2'>
                      {related.headline?.[lang] || related.headline}
                    </h3>
                    <p className='text-xs text-[var(--color-secondary-900)] font-medium mb-2'>
                      {related.date &&
                        new Date(related.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                    </p>
                    <p className='text-sm text-gray-600 line-clamp-2'>
                      {(related.lead?.[lang] || related.lead || '').slice(
                        0,
                        120
                      )}
                      {(related.lead?.[lang] || related.lead || '').length > 120
                        ? '...'
                        : ''}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {lightboxOpen && (
          <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90'
            onClick={closeLightbox}
          >
            <div className='relative max-w-4xl max-h-screen p-4'>
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className='absolute top-4 right-4 z-10 p-2 bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)] rounded-full transition-colors shadow-lg'
                aria-label='Close lightbox'
              >
                <XMarkIcon className='w-6 h-6 text-white' />
              </button>

              {/* Navigation buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox('prev');
                    }}
                    className='absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)] rounded-full transition-colors shadow-lg'
                    aria-label='Previous image'
                  >
                    <ChevronLeftIcon className='w-6 h-6 text-white' />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateLightbox('next');
                    }}
                    className='absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[var(--color-primary)]/80 hover:bg-[var(--color-primary)] rounded-full transition-colors shadow-lg'
                    aria-label='Next image'
                  >
                    <ChevronRightIconDup className='w-6 h-6 text-white' />
                  </button>
                </>
              )}

              {/* Image */}
              <img
                src={lightboxImage}
                alt={allImages[currentImageIndex]?.alt || 'Lightbox image'}
                className='max-w-full max-h-full object-contain shadow-2xl rounded-lg'
                onClick={(e) => e.stopPropagation()}
                onError={(e) => {
                  console.error(
                    'Failed to load lightbox image:',
                    lightboxImage
                  );
                  e.target.style.display = 'none';
                }}
                onLoad={() => {
                  console.log(
                    'Lightbox image loaded successfully:',
                    lightboxImage
                  );
                }}
              />

              {/* Image counter */}
              {allImages.length > 1 && (
                <div className='absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-600)] text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg'>
                  {currentImageIndex + 1} of {allImages.length}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UniversityNewsDetail;
