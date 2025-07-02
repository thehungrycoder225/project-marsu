import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useDynamicTheme } from '../../hooks/useDynamicTheme';
import {
  PhotoIcon,
  HeartIcon,
  ShareIcon,
  PlusIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  TagIcon,
  UserIcon,
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  StarIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';
import {
  HeartIcon as HeartIconSolid,
  StarIcon as StarIconSolid,
  FireIcon as FireIconSolid,
} from '@heroicons/react/24/solid';

const getLang = () => navigator.language?.slice(0, 2) || 'en';

function CampusLife() {
  const [campusLife, setCampusLife] = useState([]);
  const [lang] = useState(getLang());
  const [themeTag, setThemeTag] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [selectedStory, setSelectedStory] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('netflix'); // 'netflix', 'grid'
  const [likedStories, setLikedStories] = useState(new Set());
  const [bookmarkedStories, setBookmarkedStories] = useState(new Set());
  const [storyRatings, setStoryRatings] = useState(new Map());
  const [featuredStoryIndex, setFeaturedStoryIndex] = useState(0);

  // Enhanced form state with all new features
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    author: '',
    tags: '',
    category: 'General',
    template: 'blank',
  });
  const [formStep, setFormStep] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [autoSaveEnabled] = useState(true);
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [tagSuggestions, setTagSuggestions] = useState([]);
  const [characterCounts, setCharacterCounts] = useState({
    title: 0,
    description: 0,
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [imageFilters, setImageFilters] = useState({
    brightness: 100,
    contrast: 100,
    saturation: 100,
    blur: 0,
  });

  const submitBtnRef = useRef(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  // Enhanced story templates for guided creation
  const storyTemplates = useMemo(
    () => [
      {
        id: 'blank',
        name: lang === 'fil' ? 'Blankong Template' : 'Blank Template',
        description:
          lang === 'fil' ? 'Simulan mula sa simula' : 'Start from scratch',
        prompt: '',
      },
      {
        id: 'academic',
        name: lang === 'fil' ? 'Academic Achievement' : 'Academic Achievement',
        description:
          lang === 'fil'
            ? 'Mga tagumpay sa pag-aaral'
            : 'Academic success stories',
        prompt:
          lang === 'fil'
            ? 'Ikwento ang inyong academic achievement sa MARSU...'
            : 'Share your academic achievement at MARSU...',
      },
      {
        id: 'sports',
        name: lang === 'fil' ? 'Sports & Athletics' : 'Sports & Athletics',
        description:
          lang === 'fil' ? 'Mga karanasan sa sports' : 'Sports experiences',
        prompt:
          lang === 'fil'
            ? 'Magkwento tungkol sa inyong sports experience...'
            : 'Tell us about your sports experience...',
      },
      {
        id: 'event',
        name: lang === 'fil' ? 'Campus Event' : 'Campus Event',
        description:
          lang === 'fil'
            ? 'Mga memorable na events'
            : 'Memorable campus events',
        prompt:
          lang === 'fil'
            ? 'Ano ang pinaka-memorable na campus event na na-attend ninyo?'
            : 'What was the most memorable campus event you attended?',
      },
      {
        id: 'friendship',
        name:
          lang === 'fil' ? 'Friendship & Community' : 'Friendship & Community',
        description:
          lang === 'fil'
            ? 'Mga kaibigan at community'
            : 'Friends and campus community',
        prompt:
          lang === 'fil'
            ? 'Ikwento ang tungkol sa mga kaibigan o community sa MARSU...'
            : 'Share about your friends or community at MARSU...',
      },
    ],
    [lang]
  );

  // Enhanced form handlers
  const handleEnhancedFormChange = useCallback(
    (e) => {
      const { name, value } = e.target;

      // Update form state
      setForm((prev) => ({ ...prev, [name]: value }));

      // Update character counts
      if (name === 'title' || name === 'description') {
        setCharacterCounts((prev) => ({ ...prev, [name]: value.length }));
      }

      // Clear validation errors for the field
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));

      // Auto-save functionality
      if (autoSaveEnabled && value.trim().length > 10) {
        const autoSaveData = {
          ...form,
          [name]: value,
          id: Date.now(),
          timestamp: Date.now(),
        };

        // Save to localStorage
        const drafts = JSON.parse(
          localStorage.getItem('marsu-story-drafts') || '[]'
        );
        const existingDraftIndex = drafts.findIndex(
          (d) => d.tempId === 'current'
        );

        if (existingDraftIndex >= 0) {
          drafts[existingDraftIndex] = { ...autoSaveData, tempId: 'current' };
        } else {
          drafts.push({ ...autoSaveData, tempId: 'current' });
        }

        localStorage.setItem(
          'marsu-story-drafts',
          JSON.stringify(drafts.slice(-5))
        ); // Keep only last 5 drafts
      }

      // Generate tag suggestions based on existing stories
      if (name === 'tags' && value.length > 2) {
        const allTags = campusLife.flatMap((story) => story.tags || []);
        const uniqueTags = [...new Set(allTags)];
        const suggestions = uniqueTags
          .filter(
            (tag) =>
              tag.toLowerCase().includes(value.toLowerCase()) &&
              !form.tags
                .split(',')
                .map((t) => t.trim())
                .includes(tag)
          )
          .slice(0, 5);
        setTagSuggestions(suggestions);
      } else if (name === 'tags') {
        setTagSuggestions([]);
      }
    },
    [form, autoSaveEnabled, campusLife]
  );

  // Template selection handler
  const handleTemplateSelect = useCallback(
    (templateId) => {
      const template = storyTemplates.find((t) => t.id === templateId);
      if (template) {
        setForm((prev) => ({
          ...prev,
          template: templateId,
          description: template.prompt || prev.description,
        }));
        setCharacterCounts((prev) => ({
          ...prev,
          description: (template.prompt || prev.description).length,
        }));
      }
    },
    [storyTemplates]
  );

  // Step navigation
  const nextStep = useCallback(() => {
    // Validate current step
    const errors = {};

    if (formStep === 1) {
      if (!form.title.trim()) {
        errors.title =
          lang === 'fil' ? 'Kailangan ang pamagat' : 'Title is required';
      }
      if (!form.description.trim()) {
        errors.description =
          lang === 'fil'
            ? 'Kailangan ang deskripsyon'
            : 'Description is required';
      }
      if (!form.author.trim()) {
        errors.author =
          lang === 'fil' ? 'Kailangan ang pangalan' : 'Author name is required';
      }
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setFormStep((prev) => Math.min(prev + 1, 3));
  }, [formStep, form, lang]);

  const prevStep = useCallback(() => {
    setFormStep((prev) => Math.max(prev - 1, 1));
  }, []);

  // Image upload handlers
  const handleImageUpload = useCallback(
    (file) => {
      if (!file) return;

      // Validate file type and size
      if (!file.type.startsWith('image/')) {
        alert(
          lang === 'fil'
            ? 'Piliin lamang ang mga larawan'
            : 'Please select only image files'
        );
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        alert(
          lang === 'fil'
            ? 'Ang larawan ay masyadong malaki (max 10MB)'
            : 'Image too large (max 10MB)'
        );
        return;
      }

      setUploadedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setForm((prev) => ({ ...prev, imageUrl: e.target.result }));
      };
      reader.readAsDataURL(file);
    },
    [lang]
  );

  // Drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith('image/'));

      if (imageFile) {
        handleImageUpload(imageFile);
      }
    },
    [handleImageUpload]
  );

  // Apply image filters
  const applyImageFilters = useCallback(() => {
    if (!imagePreview) return;

    // Create a canvas to apply filters
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      // Apply filters
      ctx.filter = `brightness(${imageFilters.brightness}%) contrast(${imageFilters.contrast}%) saturate(${imageFilters.saturation}%) blur(${imageFilters.blur}px)`;
      ctx.drawImage(img, 0, 0);

      // Convert back to data URL
      const filteredImageUrl = canvas.toDataURL('image/jpeg', 0.9);
      setForm((prev) => ({ ...prev, imageUrl: filteredImageUrl }));
      setImagePreview(filteredImageUrl);
    };

    img.src = imagePreview;
  }, [imagePreview, imageFilters]);

  // Enhanced form submission
  const handleEnhancedFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      // Final validation
      const errors = {};
      if (!form.title.trim())
        errors.title =
          lang === 'fil' ? 'Kailangan ang pamagat' : 'Title is required';
      if (!form.description.trim())
        errors.description =
          lang === 'fil'
            ? 'Kailangan ang deskripsyon'
            : 'Description is required';
      if (!form.author.trim())
        errors.author =
          lang === 'fil' ? 'Kailangan ang pangalan' : 'Author name is required';

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setFormStep(1); // Go back to first step if there are errors
        return;
      }

      // Prepare submission data
      const submissionData = {
        ...form,
        id: `user-story-${Date.now()}`,
        date: Date.now(),
        tags: form.tags
          .split(',')
          .map((tag) => tag.trim())
          .filter(Boolean),
        submittedByUser: true,
        likes: 0,
        isFeatured: false,
        isTrending: false,
      };

      // Fire custom event for submission
      window.dispatchEvent(
        new CustomEvent('campuslife_submit', { detail: submissionData })
      );

      // Update local state to show the new story
      setCampusLife((prev) => [submissionData, ...prev]);

      // Reset form and close modal
      setForm({
        title: '',
        description: '',
        imageUrl: '',
        author: '',
        tags: '',
        category: 'General',
        template: 'blank',
      });
      setFormStep(1);
      setImagePreview('');
      setUploadedImage(null);
      setValidationErrors({});
      setCharacterCounts({ title: 0, description: 0 });
      setImageFilters({
        brightness: 100,
        contrast: 100,
        saturation: 100,
        blur: 0,
      });
      setShowModal(false);

      // Clear auto-saved draft
      const drafts = JSON.parse(
        localStorage.getItem('marsu-story-drafts') || '[]'
      );
      const filteredDrafts = drafts.filter((d) => d.tempId !== 'current');
      localStorage.setItem(
        'marsu-story-drafts',
        JSON.stringify(filteredDrafts)
      );

      // Show success message
      const successMessage = document.createElement('div');
      successMessage.textContent =
        lang === 'fil'
          ? 'Salamat sa pagbabahagi ng inyong kwento!'
          : 'Thank you for sharing your story!';
      successMessage.className =
        'fixed top-5 right-5 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 text-sm font-medium';
      document.body.appendChild(successMessage);
      setTimeout(() => {
        if (document.body.contains(successMessage)) {
          document.body.removeChild(successMessage);
        }
      }, 5000);
    },
    [form, lang]
  );

  // Enhanced modal close handler
  const handleCloseModal = useCallback(() => {
    // Check if there's unsaved content
    if (form.title.trim() || form.description.trim()) {
      const shouldSave = window.confirm(
        lang === 'fil'
          ? 'May mga pagbabago na hindi pa na-save. Gusto ninyo bang i-save bilang draft?'
          : 'You have unsaved changes. Would you like to save as draft?'
      );

      if (shouldSave) {
        const draftData = {
          ...form,
          id: Date.now(),
          timestamp: Date.now(),
          title: form.title || 'Untitled Draft',
        };

        const drafts = JSON.parse(
          localStorage.getItem('marsu-story-drafts') || '[]'
        );
        drafts.push(draftData);
        localStorage.setItem(
          'marsu-story-drafts',
          JSON.stringify(drafts.slice(-5))
        );
        setSavedDrafts((prev) => [...prev, draftData].slice(-5));
      }
    }

    // Reset form and close
    setForm({
      title: '',
      description: '',
      imageUrl: '',
      author: '',
      tags: '',
      category: 'General',
      template: 'blank',
    });
    setFormStep(1);
    setImagePreview('');
    setUploadedImage(null);
    setValidationErrors({});
    setCharacterCounts({ title: 0, description: 0 });
    setImageFilters({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
    });
    setShowModal(false);
  }, [form, lang]);

  // Enhanced modal open handler
  const handleOpenModal = useCallback(() => {
    setShowModal(true);
    setFormStep(1);
  }, []);

  // Set dynamic theme based on tag
  useDynamicTheme(themeTag);

  // Enhanced data processing
  const processStoryData = useCallback((rawStories) => {
    return rawStories.map((story, index) => ({
      ...story,
      id: story.id || `story-${Date.now()}-${index}`,
      title: {
        en: story.title?.en || story.title || `Campus Story ${index + 1}`,
        fil: story.title?.fil || story.title || `Kwentong Campus ${index + 1}`,
      },
      description: {
        en: story.description?.en || story.description || 'A campus life story',
        fil:
          story.description?.fil ||
          story.description ||
          'Isang kwento ng buhay-campus',
      },
      author: story.author || 'Anonymous Student',
      date: story.date || Date.now(),
      imageUrl: story.imageUrl || '/images/landing-bg-1.jpg',
      tags: story.tags || ['CampusLife'],
      isFeatured: story.isFeatured || false,
      isTrending: story.isTrending || false,
      submittedByUser: story.submittedByUser || false,
      likes: story.likes || Math.floor(Math.random() * 50) + 5,
      category: story.category || 'General',
    }));
  }, []);

  // Enhanced sharing functionality
  const handleShareStory = useCallback(
    async (story, platform = 'copy') => {
      const shareUrl = `${window.location.origin}/#/campus-life/${story.id}`;
      const shareTitle = story.title?.[lang] || story.title?.en;
      const shareText = `${shareTitle} - ${story.description?.[lang] || story.description?.en}`;

      switch (platform) {
        case 'facebook': {
          const fbParams = new URLSearchParams({
            u: shareUrl,
            quote: shareTitle,
            hashtag: '#MARSUCampusLife',
          });
          window.open(
            `https://www.facebook.com/sharer/sharer.php?${fbParams.toString()}`,
            'facebook-share',
            'width=626,height=436'
          );
          break;
        }
        case 'twitter': {
          const twitterText = `${shareText}\n\n${shareUrl} #MARSUCampusLife`;
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}`,
            'twitter-share',
            'width=550,height=420'
          );
          break;
        }
        case 'copy': {
          try {
            await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
            // Show success notification
            const notification = document.createElement('div');
            notification.textContent =
              lang === 'fil' ? 'Nakopya sa clipboard!' : 'Copied to clipboard!';
            notification.className =
              'fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-medium';
            document.body.appendChild(notification);
            setTimeout(() => {
              if (document.body.contains(notification)) {
                document.body.removeChild(notification);
              }
            }, 3000);
          } catch (err) {
            console.error('Failed to copy:', err);
            alert(lang === 'fil' ? 'Nakopya sa clipboard!' : 'Link copied!');
          }
          break;
        }
      }
      setShowShareModal(false);
    },
    [lang]
  );

  // Like story functionality
  const handleLikeStory = useCallback((storyId) => {
    setLikedStories((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(storyId)) {
        newLiked.delete(storyId);
      } else {
        newLiked.add(storyId);
      }
      return newLiked;
    });
  }, []);

  // Bookmark story functionality
  const handleBookmarkStory = useCallback((storyId) => {
    setBookmarkedStories((prev) => {
      const newBookmarked = new Set(prev);
      if (newBookmarked.has(storyId)) {
        newBookmarked.delete(storyId);
      } else {
        newBookmarked.add(storyId);
      }
      return newBookmarked;
    });
  }, []);

  // Rating story functionality
  const handleRateStory = useCallback((storyId, rating) => {
    setStoryRatings((prev) => {
      const newRatings = new Map(prev);
      newRatings.set(storyId, rating);
      return newRatings;
    });
  }, []);

  // Open story detail modal
  const handleOpenStoryModal = useCallback((story) => {
    setSelectedStory(story);
    setShowStoryModal(true);
    window.dispatchEvent(
      new CustomEvent('story_view', {
        detail: { id: story.id },
      })
    );
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch('/data/marsu-resources/Resources.json')
      .then((res) => res.json())
      .then((data) => {
        const processedStories = processStoryData(data.campusLife || []);
        setCampusLife(processedStories);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load campus life data.');
        setLoading(false);
      });
  }, [processStoryData]);

  useEffect(() => {
    if (campusLife.length) {
      const featured = campusLife.find(
        (item) => item.isFeatured || item.isTrending
      );
      if (featured && featured.tags?.length) setThemeTag(featured.tags[0]);
    }
  }, [campusLife]);

  useEffect(() => {
    if (campusLife.length) {
      window.dispatchEvent(
        new CustomEvent('campuslife_view', {
          detail: { count: campusLife.length },
        })
      );
    }
  }, [campusLife]);

  // Accessibility: focus modal on open
  useEffect(() => {
    if (showModal && submitBtnRef.current) {
      submitBtnRef.current.focus();
    }
  }, [showModal]);

  // Load saved drafts on component mount
  useEffect(() => {
    const drafts = JSON.parse(
      localStorage.getItem('marsu-story-drafts') || '[]'
    );
    setSavedDrafts(drafts.filter((d) => d.tempId !== 'current'));
  }, []);

  // Handlers are now defined above as enhanced versions

  // Enhanced filtering and searching
  const filteredStories = useMemo(() => {
    return campusLife.filter((story) => {
      const matchesFilter =
        filter === 'all' ||
        story.category === filter ||
        story.tags?.includes(filter);

      const matchesSearch =
        !search ||
        [
          story.title?.[lang],
          story.title?.en,
          story.description?.[lang],
          story.description?.en,
          story.author,
          ...(story.tags || []),
        ].some((field) => field?.toLowerCase().includes(search.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [campusLife, filter, search, lang]);

  // Enhanced categories for filtering
  const categories = useMemo(() => {
    const allCategories = new Set();
    campusLife.forEach((story) => {
      if (story.category) allCategories.add(story.category);
      story.tags?.forEach((tag) => allCategories.add(tag));
    });
    return Array.from(allCategories).sort();
  }, [campusLife]);

  // Enhanced loading component with skeleton
  const LoadingState = () => (
    <div className='w-full max-w-7xl mx-auto'>
      <div className='text-center mb-6'>
        <div className='h-8 bg-gray-300 rounded w-64 mx-auto animate-pulse mb-2'></div>
        <div className='h-5 bg-gray-300 rounded w-96 mx-auto animate-pulse'></div>
      </div>
      <div className='bg-white rounded-xl shadow-lg p-6 mb-6'>
        <div className='flex flex-col lg:flex-row gap-4 items-center'>
          <div className='h-10 bg-gray-300 rounded w-full lg:w-1/2 animate-pulse'></div>
          <div className='h-10 bg-gray-300 rounded w-full lg:w-1/4 animate-pulse'></div>
          <div className='h-10 bg-gray-300 rounded w-32 animate-pulse'></div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-md p-6 animate-pulse'
            >
              <div className='h-40 bg-gray-300 rounded-lg mb-4'></div>
              <div className='h-6 bg-gray-300 rounded w-3/4 mb-2'></div>
              <div className='h-4 bg-gray-300 rounded w-full mb-2'></div>
              <div className='h-4 bg-gray-300 rounded w-5/6 mb-4'></div>
              <div className='flex gap-2'>
                <div className='h-6 bg-gray-300 rounded w-16'></div>
                <div className='h-6 bg-gray-300 rounded w-20'></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );

  // Loading and error states
  if (loading) return <LoadingState />;

  if (error) {
    return (
      <div className='w-full max-w-7xl mx-auto text-center py-12'>
        <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto'>
          <PhotoIcon className='w-12 h-12 text-red-600 mx-auto mb-4' />
          <h3 className='text-lg font-semibold text-red-800 mb-2'>
            {lang === 'fil'
              ? 'Hindi Ma-load ang mga Kwento'
              : 'Failed to Load Stories'}
          </h3>
          <p className='text-red-600 mb-4'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'
          >
            {lang === 'fil' ? 'Subukan Muli' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  if (campusLife.length === 0 && !loading) {
    return (
      <div className='w-full max-w-7xl mx-auto text-center py-12'>
        <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto'>
          <PhotoIcon className='w-12 h-12 text-yellow-600 mx-auto mb-4' />
          <h3 className='text-lg font-semibold text-yellow-800 mb-2'>
            {lang === 'fil'
              ? 'Walang Available na Kwento'
              : 'No Stories Available'}
          </h3>
          <p className='text-yellow-600 mb-4'>
            {lang === 'fil'
              ? 'Magbalik sa ibang oras para sa mga bagong kwento.'
              : 'Check back later for new campus life stories.'}
          </p>
          <button
            onClick={handleOpenModal}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-flex items-center gap-2'
          >
            <PlusIcon className='w-4 h-4' />
            {lang === 'fil' ? 'Magbahagi ng Kwento' : 'Share Your Story'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Enhanced Header */}
      <div className='mb-8'>
        <div className='text-center mb-6'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-2'>
            {lang === 'fil' ? 'Buhay Campus' : 'Campus Life'}
          </h2>
          <p className='text-gray-600 text-lg max-w-2xl mx-auto'>
            {lang === 'fil'
              ? 'Makulay na buhay-campus kung saan nagtatagpo ang edukasyon, komunidad, at pag-unlad.'
              : 'Experience vibrant campus life where education meets community, creativity, and growth.'}
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className='bg-white rounded-xl shadow-lg p-6 mb-6'>
          <div className='flex flex-col lg:flex-row gap-4 items-center'>
            {/* Search Input */}
            <div className='relative flex-1 w-full lg:w-auto'>
              <MagnifyingGlassIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <input
                type='text'
                placeholder={
                  lang === 'fil'
                    ? 'Maghanap ng kwento, may-akda, o tag...'
                    : 'Search stories, author, or tags...'
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                aria-label='Search campus life stories'
              />
            </div>

            {/* Filter Dropdown */}
            <div className='relative w-full lg:w-auto lg:min-w-[200px]'>
              <FunnelIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className='w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white'
                aria-label='Filter stories'
              >
                <option value='all'>
                  {lang === 'fil' ? 'Lahat ng Kategorya' : 'All Categories'}
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronRightIcon className='absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 w-4 h-4 text-gray-400 pointer-events-none' />
            </div>

            {/* View Mode Toggle - Netflix and Bento Grid */}
            <div className='flex bg-gray-100 rounded-lg p-1'>
              <button
                onClick={() => setViewMode('netflix')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'netflix'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <EyeIcon className='w-4 h-4 inline mr-1' />
                {lang === 'fil' ? '' : ''}
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <TagIcon className='w-4 h-4 inline mr-1' />
                {lang === 'fil' ? '' : ''}
              </button>
            </div>

            {/* Add Story Button */}
            <button
              onClick={handleOpenModal}
              className='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-2 whitespace-nowrap'
            >
              <PlusIcon className='w-4 h-4' />
              {lang === 'fil' ? 'Magbahagi' : 'Share Story'}
            </button>
          </div>

          {/* Results Summary */}
          {search && (
            <div className='mt-4 text-sm text-gray-600'>
              {lang === 'fil'
                ? `Natagpuan: ${filteredStories.length} kwento${filteredStories.length !== 1 ? '' : ''}`
                : `Found: ${filteredStories.length} stor${filteredStories.length !== 1 ? 'ies' : 'y'}`}
            </div>
          )}
        </div>
      </div>

      {/* No Stories Message */}
      {filteredStories.length === 0 && !loading && (
        <div className='text-center py-12'>
          <PhotoIcon className='w-16 h-16 text-gray-400 mx-auto mb-4' />
          <h3 className='text-xl font-semibold text-gray-600 mb-2'>
            {lang === 'fil' ? 'Walang kwento na natagpuan' : 'No stories found'}
          </h3>
          <p className='text-gray-500 mb-4'>
            {lang === 'fil'
              ? 'Subukan ang ibang search term o filter.'
              : 'Try adjusting your search or filter criteria.'}
          </p>
          <button
            onClick={handleOpenModal}
            className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors inline-flex items-center gap-2'
          >
            <PlusIcon className='w-4 h-4' />
            {lang === 'fil' ? 'Magbahagi ng Kwento' : 'Share Your Story'}
          </button>
        </div>
      )}

      {/* Stories Display - Netflix Style */}
      {filteredStories.length > 0 && (
        <>
          {viewMode === 'netflix' ? (
            /* Netflix-Style Thumbs Gallery */
            <div className='mb-8'>
              {/* Main Featured Story */}
              <div className='relative mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl overflow-hidden'>
                <div className='absolute inset-0'>
                  <img
                    src={filteredStories[featuredStoryIndex]?.imageUrl}
                    alt={
                      filteredStories[featuredStoryIndex]?.title?.[lang] ||
                      filteredStories[featuredStoryIndex]?.title?.en
                    }
                    className='w-full h-full object-cover opacity-60'
                    loading='lazy'
                  />
                  <div className='absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent'></div>
                </div>

                <div className='relative z-10 p-8 md:p-12 lg:p-16'>
                  <div className='max-w-3xl'>
                    {/* Featured badges */}
                    <div className='flex gap-3 mb-4'>
                      {filteredStories[featuredStoryIndex]?.isFeatured && (
                        <span className='inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full'>
                          <StarIconSolid className='w-4 h-4 mr-1' />
                          {lang === 'fil' ? 'TAMPOK' : 'FEATURED'}
                        </span>
                      )}
                      {filteredStories[featuredStoryIndex]?.isTrending && (
                        <span className='inline-flex items-center px-4 py-2 bg-orange-500 text-white text-sm font-bold rounded-full'>
                          <FireIconSolid className='w-4 h-4 mr-1' />
                          {lang === 'fil' ? 'SIKAT' : 'TRENDING'}
                        </span>
                      )}
                    </div>

                    {/* Title and Description */}
                    <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight'>
                      {filteredStories[featuredStoryIndex]?.title?.[lang] ||
                        filteredStories[featuredStoryIndex]?.title?.en}
                    </h2>

                    <p className='text-gray-200 text-lg md:text-xl mb-6 leading-relaxed max-w-2xl'>
                      {filteredStories[featuredStoryIndex]?.description?.[
                        lang
                      ] || filteredStories[featuredStoryIndex]?.description?.en}
                    </p>

                    {/* Story Meta */}
                    <div className='flex items-center gap-6 text-gray-300 mb-8'>
                      <div className='flex items-center gap-2'>
                        <UserIcon className='w-5 h-5' />
                        <span className='font-medium'>
                          {filteredStories[featuredStoryIndex]?.author}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <CalendarDaysIcon className='w-5 h-5' />
                        <span>
                          {new Date(
                            filteredStories[featuredStoryIndex]?.date
                          ).toLocaleDateString(lang)}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <EyeIcon className='w-5 h-5' />
                        <span>
                          {Math.floor(Math.random() * 500) + 100} views
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className='flex items-center gap-4'>
                      <button
                        onClick={() =>
                          handleOpenStoryModal(
                            filteredStories[featuredStoryIndex]
                          )
                        }
                        className='bg-white text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-200 inline-flex items-center gap-2'
                      >
                        <EyeIcon className='w-5 h-5' />
                        {lang === 'fil' ? 'Basahin' : 'Read Story'}
                      </button>

                      <button
                        onClick={() =>
                          handleLikeStory(
                            filteredStories[featuredStoryIndex]?.id
                          )
                        }
                        className='bg-gray-800/80 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700/80 transition-all duration-200 inline-flex items-center gap-2'
                      >
                        {likedStories.has(
                          filteredStories[featuredStoryIndex]?.id
                        ) ? (
                          <HeartIconSolid className='w-5 h-5 text-red-500' />
                        ) : (
                          <HeartIcon className='w-5 h-5' />
                        )}
                        {filteredStories[featuredStoryIndex]?.likes +
                          (likedStories.has(
                            filteredStories[featuredStoryIndex]?.id
                          )
                            ? 1
                            : 0)}
                      </button>

                      <button
                        onClick={() =>
                          handleBookmarkStory(
                            filteredStories[featuredStoryIndex]?.id
                          )
                        }
                        className='bg-gray-800/80 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700/80 transition-all duration-200 inline-flex items-center gap-2'
                      >
                        <BookmarkIcon
                          className={`w-5 h-5 ${bookmarkedStories.has(filteredStories[featuredStoryIndex]?.id) ? 'text-yellow-500' : ''}`}
                        />
                        {lang === 'fil' ? 'Save' : 'Save'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className='relative'>
                <h3 className='text-xl font-bold text-gray-900 mb-4'>
                  {lang === 'fil' ? 'Mga Kwento' : 'Campus Stories'}
                </h3>

                <Swiper
                  modules={[Navigation]}
                  spaceBetween={16}
                  slidesPerView={2}
                  navigation={{
                    prevEl: '.netflix-prev',
                    nextEl: '.netflix-next',
                  }}
                  breakpoints={{
                    640: { slidesPerView: 3 },
                    768: { slidesPerView: 4 },
                    1024: { slidesPerView: 5 },
                    1280: { slidesPerView: 6 },
                    1536: { slidesPerView: 7 },
                  }}
                  className='thumbs-swiper'
                >
                  {/* Custom Navigation */}
                  <div className='netflix-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 -ml-6'>
                    <ChevronLeftIcon className='w-6 h-6 text-white' />
                  </div>
                  <div className='netflix-next absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 -mr-6'>
                    <ChevronRightIcon className='w-6 h-6 text-white' />
                  </div>

                  {filteredStories.map((story, index) => (
                    <SwiperSlide key={story.id}>
                      <div
                        className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                          index === featuredStoryIndex
                            ? 'ring-4 ring-blue-500 ring-opacity-70'
                            : ''
                        }`}
                        onClick={() => setFeaturedStoryIndex(index)}
                      >
                        <div className='aspect-video'>
                          <img
                            src={story.imageUrl}
                            alt={story.title?.[lang] || story.title?.en}
                            className='w-full h-full object-cover'
                            loading='lazy'
                          />

                          {/* Hover Overlay */}
                          <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'>
                            <div className='text-center text-white p-2'>
                              <h4 className='font-semibold text-sm mb-1 line-clamp-2'>
                                {story.title?.[lang] || story.title?.en}
                              </h4>
                              <p className='text-xs text-gray-300'>
                                {story.author}
                              </p>
                            </div>
                          </div>

                          {/* Active indicator */}
                          {index === featuredStoryIndex && (
                            <div className='absolute inset-0 border-4 border-blue-500 rounded-lg pointer-events-none'></div>
                          )}

                          {/* Status badges on thumbnail */}
                          <div className='absolute top-2 left-2 flex gap-1'>
                            {story.isFeatured && (
                              <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                            )}
                            {story.isTrending && (
                              <div className='w-2 h-2 bg-orange-500 rounded-full'></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ) : (
            /* Enhanced Bento Grid View */
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[240px]'>
              {filteredStories.map((story, index) => {
                // Define bento grid patterns for dynamic sizing
                const getBentoClass = (idx) => {
                  const patterns = [
                    // Large featured cards
                    'col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-4 row-span-2',
                    // Medium cards
                    'col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 row-span-1',
                    'col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-2 row-span-1',
                    // Tall cards
                    'col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 row-span-2',
                    // Wide cards
                    'col-span-2 md:col-span-3 lg:col-span-3 xl:col-span-3 row-span-1',
                    // Square cards
                    'col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1',
                    'col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2 row-span-2',
                    // Small cards
                    'col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 row-span-1',
                  ];

                  // Priority sizing for featured and trending stories
                  if (story.isFeatured) return patterns[0]; // Large
                  if (story.isTrending) return patterns[1]; // Medium

                  // Cycle through patterns for visual variety
                  return patterns[(idx % (patterns.length - 2)) + 2];
                };

                return (
                  <div
                    key={story.id}
                    className={`group bg-white rounded-xl shadow-lg border transition-all duration-500 cursor-pointer hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] overflow-hidden ${getBentoClass(index)} ${
                      story.isFeatured
                        ? 'border-blue-500 ring-2 ring-blue-200 bg-gradient-to-br from-blue-50 to-purple-50'
                        : story.isTrending
                          ? 'border-orange-500 ring-2 ring-orange-200 bg-gradient-to-br from-orange-50 to-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      handleOpenStoryModal(story);
                    }}
                  >
                    {/* Story Image - Full coverage for bento grid */}
                    <div className='relative w-full h-full overflow-hidden'>
                      <img
                        src={story.imageUrl}
                        alt={story.title?.[lang] || story.title?.en}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
                        loading='lazy'
                      />

                      {/* Gradient overlay for readability */}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500'></div>

                      {/* Status Badges */}
                      <div className='absolute top-3 left-3 flex gap-2'>
                        {story.isFeatured && (
                          <div className='flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg'>
                            <StarIconSolid className='w-3 h-3' />
                            <span className='hidden sm:inline'>
                              {lang === 'fil' ? 'Tampok' : 'Featured'}
                            </span>
                          </div>
                        )}
                        {story.isTrending && (
                          <div className='flex items-center gap-1 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg'>
                            <FireIconSolid className='w-3 h-3' />
                            <span className='hidden sm:inline'>
                              {lang === 'fil' ? 'Trending' : 'Trending'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className='absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmarkStory(story.id);
                          }}
                          className='p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-all shadow-lg hover:scale-110'
                          title={lang === 'fil' ? 'I-bookmark' : 'Bookmark'}
                        >
                          <BookmarkIcon
                            className={`w-4 h-4 ${bookmarkedStories.has(story.id) ? 'text-yellow-500' : 'text-gray-700'}`}
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLikeStory(story.id);
                          }}
                          className='p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-all shadow-lg hover:scale-110'
                          title={lang === 'fil' ? 'I-like' : 'Like'}
                        >
                          {likedStories.has(story.id) ? (
                            <HeartIconSolid className='w-4 h-4 text-red-500' />
                          ) : (
                            <HeartIcon className='w-4 h-4 text-gray-700' />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStory(story);
                            setShowShareModal(true);
                          }}
                          className='p-2 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full transition-all shadow-lg hover:scale-110'
                          title={lang === 'fil' ? 'I-share' : 'Share'}
                        >
                          <ShareIcon className='w-4 h-4 text-gray-700' />
                        </button>
                      </div>

                      {/* Story Content Overlay */}
                      <div className='absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white'>
                        {/* Title */}
                        <h3
                          className={`font-bold text-white mb-2 leading-tight group-hover:text-blue-200 transition-colors ${
                            getBentoClass(index).includes('col-span-2') ||
                            getBentoClass(index).includes('col-span-3') ||
                            getBentoClass(index).includes('col-span-4')
                              ? 'text-lg md:text-xl line-clamp-2'
                              : 'text-sm md:text-base line-clamp-1'
                          }`}
                        >
                          {story.title?.[lang] || story.title?.en}
                        </h3>

                        {/* Description - only show on larger cards */}
                        {(getBentoClass(index).includes('row-span-2') ||
                          getBentoClass(index).includes('col-span-3') ||
                          getBentoClass(index).includes('col-span-4')) && (
                          <p className='text-gray-200 text-sm line-clamp-2 mb-3 opacity-90'>
                            {story.description?.[lang] || story.description?.en}
                          </p>
                        )}

                        {/* Meta Information */}
                        <div className='flex items-center justify-between text-xs text-gray-300'>
                          <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-1'>
                              <UserIcon className='w-3 h-3' />
                              <span className='truncate max-w-16 sm:max-w-24'>
                                {story.author}
                              </span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <CalendarDaysIcon className='w-3 h-3' />
                              <span className='hidden sm:inline'>
                                {new Date(story.date).toLocaleDateString(lang)}
                              </span>
                            </div>
                          </div>

                          {/* Engagement Stats */}
                          <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-1'>
                              <HeartIcon className='w-3 h-3' />
                              <span>
                                {story.likes +
                                  (likedStories.has(story.id) ? 1 : 0)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Tags - only show on larger cards */}
                        {(getBentoClass(index).includes('col-span-2') ||
                          getBentoClass(index).includes('col-span-3') ||
                          getBentoClass(index).includes('col-span-4')) &&
                          story.tags?.length > 0 && (
                            <div className='flex flex-wrap gap-1 mt-2'>
                              {story.tags?.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className='inline-flex items-center px-2 py-1 bg-white/20 backdrop-blur-sm text-white rounded-md text-xs font-medium'
                                >
                                  #{tag}
                                </span>
                              ))}
                              {story.tags?.length > 3 && (
                                <span className='text-xs text-gray-300'>
                                  +{story.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
      {/* Enhanced Multi-Step Story Creation Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-2'>
          {/* Mobile-first full-screen modal on small screens */}
          <div
            className={`bg-white shadow-2xl w-full max-w-4xl mx-auto max-h-[95vh] overflow-hidden ${
              formStep === 3 ? 'rounded-lg' : 'sm:rounded-xl'
            } ${window.innerWidth < 768 ? 'h-full rounded-none' : 'rounded-xl'}`}
          >
            {/* Header */}
            <div className='flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                  <PlusIcon className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h3 className='text-lg sm:text-xl font-bold text-gray-900'>
                    {lang === 'fil'
                      ? 'Ibahagi ang Inyong Kuwento'
                      : 'Share Your Campus Story'}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {lang === 'fil'
                      ? `Hakbang ${formStep} ng 3`
                      : `Step ${formStep} of 3`}
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                {/* Auto-save indicator */}
                {autoSaveEnabled && (form.title || form.description) && (
                  <div className='flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full'>
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                    {lang === 'fil' ? 'Auto-save' : 'Auto-saved'}
                  </div>
                )}

                <button
                  type='button'
                  onClick={handleCloseModal}
                  className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'
                >
                  <XMarkIcon className='w-5 h-5' />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className='px-4 sm:px-6 py-3 bg-gray-50'>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm font-medium text-gray-700'>
                  {formStep === 1 &&
                    (lang === 'fil'
                      ? 'Template at Nilalaman'
                      : 'Template & Content')}
                  {formStep === 2 &&
                    (lang === 'fil' ? 'Larawan at Detalye' : 'Image & Details')}
                  {formStep === 3 &&
                    (lang === 'fil' ? 'Preview at Submit' : 'Preview & Submit')}
                </span>
                <span className='text-sm text-gray-500'>
                  {Math.round((formStep / 3) * 100)}%
                </span>
              </div>
              <div className='w-full bg-gray-200 rounded-full h-2'>
                <div
                  className='bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300'
                  style={{ width: `${(formStep / 3) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Form Content */}
            <form
              ref={formRef}
              onSubmit={handleEnhancedFormSubmit}
              className='flex-1 overflow-hidden'
            >
              <div className='max-h-[60vh] overflow-y-auto p-4 sm:p-6'>
                {/* Step 1: Template Selection & Basic Content */}
                {formStep === 1 && (
                  <div className='space-y-6'>
                    {/* Template Selection */}
                    <div>
                      <label className='block text-sm font-semibold text-gray-900 mb-3'>
                        {lang === 'fil'
                          ? 'Pumili ng Template'
                          : 'Choose a Template'}
                      </label>
                      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                        {storyTemplates.map((template) => (
                          <div
                            key={template.id}
                            onClick={() => handleTemplateSelect(template.id)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                              form.template === template.id
                                ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <h4 className='font-medium text-gray-900 mb-1'>
                              {template.name}
                            </h4>
                            <p className='text-sm text-gray-600'>
                              {template.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Title Input */}
                    <div>
                      <label className='block text-sm font-semibold text-gray-900 mb-2'>
                        {lang === 'fil' ? 'Pamagat' : 'Title'}
                        <span className='text-red-500 ml-1'>*</span>
                      </label>
                      <input
                        name='title'
                        value={form.title}
                        onChange={handleEnhancedFormChange}
                        maxLength={100}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-lg ${
                          validationErrors.title
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder={
                          lang === 'fil'
                            ? 'Magbigay ng catchy na pamagat...'
                            : 'Give it a catchy title...'
                        }
                      />
                      <div className='flex justify-between items-center mt-1'>
                        {validationErrors.title && (
                          <span className='text-sm text-red-600'>
                            {validationErrors.title}
                          </span>
                        )}
                        <span
                          className={`text-sm ml-auto ${characterCounts.title > 90 ? 'text-red-500' : 'text-gray-500'}`}
                        >
                          {characterCounts.title}/100
                        </span>
                      </div>
                    </div>

                    {/* Description Input */}
                    <div>
                      <label className='block text-sm font-semibold text-gray-900 mb-2'>
                        {lang === 'fil' ? 'Deskripsyon' : 'Description'}
                        <span className='text-red-500 ml-1'>*</span>
                      </label>
                      <textarea
                        name='description'
                        value={form.description}
                        onChange={handleEnhancedFormChange}
                        rows={6}
                        maxLength={1000}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
                          validationErrors.description
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder={
                          lang === 'fil'
                            ? 'Ikwento ang inyong karanasan sa campus...'
                            : 'Tell us about your campus experience...'
                        }
                      />
                      <div className='flex justify-between items-center mt-1'>
                        {validationErrors.description && (
                          <span className='text-sm text-red-600'>
                            {validationErrors.description}
                          </span>
                        )}
                        <span
                          className={`text-sm ml-auto ${characterCounts.description > 900 ? 'text-red-500' : 'text-gray-500'}`}
                        >
                          {characterCounts.description}/1000
                        </span>
                      </div>
                    </div>

                    {/* Author Input */}
                    <div>
                      <label className='block text-sm font-semibold text-gray-900 mb-2'>
                        {lang === 'fil' ? 'May-akda' : 'Author'}
                        <span className='text-red-500 ml-1'>*</span>
                      </label>
                      <input
                        name='author'
                        value={form.author}
                        onChange={handleEnhancedFormChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                          validationErrors.author
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-300'
                        }`}
                        placeholder={
                          lang === 'fil'
                            ? 'Ang inyong pangalan...'
                            : 'Your name...'
                        }
                      />
                      {validationErrors.author && (
                        <span className='text-sm text-red-600 mt-1 block'>
                          {validationErrors.author}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Step 2: Image Upload & Details */}
                {formStep === 2 && (
                  <div className='space-y-6'>
                    {/* Image Upload Section */}
                    <div>
                      <label className='block text-sm font-semibold text-gray-900 mb-3'>
                        {lang === 'fil' ? 'Larawan' : 'Image'}
                      </label>

                      {/* Drag and Drop Area */}
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-all ${
                          isDragging
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {imagePreview ? (
                          <div className='space-y-4'>
                            <img
                              src={imagePreview}
                              alt='Preview'
                              className='w-full h-48 object-cover rounded-lg'
                              style={{
                                filter: `brightness(${imageFilters.brightness}%) contrast(${imageFilters.contrast}%) saturate(${imageFilters.saturation}%) blur(${imageFilters.blur}px)`,
                              }}
                            />
                            <div className='flex gap-2 justify-center'>
                              <button
                                type='button'
                                onClick={() => fileInputRef.current?.click()}
                                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm'
                              >
                                {lang === 'fil' ? 'Palitan' : 'Change Image'}
                              </button>
                              <button
                                type='button'
                                onClick={() => {
                                  setImagePreview('');
                                  setUploadedImage(null);
                                  setForm((prev) => ({
                                    ...prev,
                                    imageUrl: '',
                                  }));
                                }}
                                className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm'
                              >
                                {lang === 'fil' ? 'Alisin' : 'Remove'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className='space-y-4'>
                            <PhotoIcon className='w-12 h-12 text-gray-400 mx-auto' />
                            <div>
                              <p className='text-gray-600 mb-2'>
                                {lang === 'fil'
                                  ? 'I-drag ang larawan dito o mag-click para pumili'
                                  : 'Drag and drop an image here, or click to select'}
                              </p>
                              <button
                                type='button'
                                onClick={() => fileInputRef.current?.click()}
                                className='px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                              >
                                {lang === 'fil'
                                  ? 'Pumili ng Larawan'
                                  : 'Choose Image'}
                              </button>
                            </div>
                            <p className='text-xs text-gray-500'>
                              {lang === 'fil'
                                ? 'PNG, JPG hanggang 10MB'
                                : 'PNG, JPG up to 10MB'}
                            </p>
                          </div>
                        )}
                      </div>

                      <input
                        ref={fileInputRef}
                        type='file'
                        accept='image/*'
                        onChange={(e) => handleImageUpload(e.target.files[0])}
                        className='hidden'
                      />
                    </div>

                    {/* Image Filters */}
                    {imagePreview && (
                      <div className='bg-gray-50 p-4 rounded-lg'>
                        <label className='block text-sm font-semibold text-gray-900 mb-3'>
                          {lang === 'fil' ? 'I-edit ang Larawan' : 'Edit Image'}
                        </label>
                        <div className='grid grid-cols-2 gap-4'>
                          <div>
                            <label className='block text-xs text-gray-600 mb-1'>
                              {lang === 'fil' ? 'Liwanag' : 'Brightness'}
                            </label>
                            <input
                              type='range'
                              min='50'
                              max='150'
                              value={imageFilters.brightness}
                              onChange={(e) =>
                                setImageFilters((prev) => ({
                                  ...prev,
                                  brightness: e.target.value,
                                }))
                              }
                              className='w-full'
                            />
                          </div>
                          <div>
                            <label className='block text-xs text-gray-600 mb-1'>
                              {lang === 'fil' ? 'Contrast' : 'Contrast'}
                            </label>
                            <input
                              type='range'
                              min='50'
                              max='150'
                              value={imageFilters.contrast}
                              onChange={(e) =>
                                setImageFilters((prev) => ({
                                  ...prev,
                                  contrast: e.target.value,
                                }))
                              }
                              className='w-full'
                            />
                          </div>
                          <div>
                            <label className='block text-xs text-gray-600 mb-1'>
                              {lang === 'fil' ? 'Saturation' : 'Saturation'}
                            </label>
                            <input
                              type='range'
                              min='0'
                              max='200'
                              value={imageFilters.saturation}
                              onChange={(e) =>
                                setImageFilters((prev) => ({
                                  ...prev,
                                  saturation: e.target.value,
                                }))
                              }
                              className='w-full'
                            />
                          </div>
                          <div>
                            <label className='block text-xs text-gray-600 mb-1'>
                              {lang === 'fil' ? 'Blur' : 'Blur'}
                            </label>
                            <input
                              type='range'
                              min='0'
                              max='10'
                              value={imageFilters.blur}
                              onChange={(e) =>
                                setImageFilters((prev) => ({
                                  ...prev,
                                  blur: e.target.value,
                                }))
                              }
                              className='w-full'
                            />
                          </div>
                        </div>
                        <button
                          type='button'
                          onClick={applyImageFilters}
                          className='mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm'
                        >
                          {lang === 'fil'
                            ? 'I-apply ang Filters'
                            : 'Apply Filters'}
                        </button>
                      </div>
                    )}

                    {/* Tags with Suggestions */}
                    <div>
                      <label className='block text-sm font-semibold text-gray-900 mb-2'>
                        {lang === 'fil' ? 'Mga Tag' : 'Tags'}
                      </label>
                      <input
                        name='tags'
                        value={form.tags}
                        onChange={handleEnhancedFormChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                        placeholder={
                          lang === 'fil'
                            ? 'Academic, Sports, Events...'
                            : 'Academic, Sports, Events...'
                        }
                      />
                      {tagSuggestions.length > 0 && (
                        <div className='mt-2'>
                          <p className='text-xs text-gray-600 mb-2'>
                            {lang === 'fil'
                              ? 'Mga mungkahing tag:'
                              : 'Suggested tags:'}
                          </p>
                          <div className='flex flex-wrap gap-2'>
                            {tagSuggestions.map((tag) => (
                              <button
                                key={tag}
                                type='button'
                                onClick={() => {
                                  const currentTags = form.tags
                                    .split(',')
                                    .map((t) => t.trim())
                                    .filter(Boolean);
                                  if (!currentTags.includes(tag)) {
                                    setForm((prev) => ({
                                      ...prev,
                                      tags:
                                        currentTags.length > 0
                                          ? `${form.tags}, ${tag}`
                                          : tag,
                                    }));
                                  }
                                }}
                                className='px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors'
                              >
                                #{tag}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Category Selection */}
                    <div>
                      <label className='block text-sm font-semibold text-gray-900 mb-2'>
                        {lang === 'fil' ? 'Kategorya' : 'Category'}
                      </label>
                      <select
                        name='category'
                        value={form.category}
                        onChange={handleEnhancedFormChange}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
                      >
                        <option value='General'>General</option>
                        <option value='Academic'>Academic</option>
                        <option value='Sports'>Sports</option>
                        <option value='Events'>Events</option>
                        <option value='Clubs'>Clubs & Organizations</option>
                        <option value='Achievement'>Achievement</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Preview */}
                {formStep === 3 && (
                  <div className='space-y-6'>
                    <div className='text-center mb-6'>
                      <h4 className='text-lg font-semibold text-gray-900 mb-2'>
                        {lang === 'fil'
                          ? 'Preview ng Inyong Kwento'
                          : 'Preview Your Story'}
                      </h4>
                      <p className='text-gray-600'>
                        {lang === 'fil'
                          ? 'Tingnan kung paano magmumukhang inyong kwento'
                          : 'See how your story will appear'}
                      </p>
                    </div>

                    {/* Story Preview Card */}
                    <div className='bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg'>
                      {form.imageUrl && (
                        <img
                          src={form.imageUrl}
                          alt={form.title}
                          className='w-full h-48 object-cover rounded-lg mb-4'
                        />
                      )}

                      <div className='space-y-3'>
                        <h3 className='text-xl font-bold text-gray-900'>
                          {form.title}
                        </h3>
                        <p className='text-gray-600 leading-relaxed'>
                          {form.description}
                        </p>

                        <div className='flex items-center justify-between text-sm text-gray-500'>
                          <div className='flex items-center gap-2'>
                            <UserIcon className='w-4 h-4' />
                            <span>{form.author}</span>
                          </div>
                          <div className='flex items-center gap-2'>
                            <TagIcon className='w-4 h-4' />
                            <span>{form.category}</span>
                          </div>
                        </div>

                        {form.tags && (
                          <div className='flex flex-wrap gap-2 pt-2'>
                            {form.tags.split(',').map((tag, index) => (
                              <span
                                key={index}
                                className='inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium'
                              >
                                #{tag.trim()}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Final Check */}
                    <div className='bg-blue-50 p-4 rounded-lg'>
                      <div className='flex items-start gap-3'>
                        <div className='w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mt-0.5'>
                          <span className='text-white text-xs font-bold'>
                            ✓
                          </span>
                        </div>
                        <div>
                          <h5 className='font-medium text-blue-900 mb-1'>
                            {lang === 'fil'
                              ? 'Handa na ba kayo?'
                              : 'Ready to share?'}
                          </h5>
                          <p className='text-sm text-blue-700'>
                            {lang === 'fil'
                              ? 'Ang inyong kwento ay magiging makikita ng lahat ng estudyante sa campus.'
                              : 'Your story will be visible to all students on campus.'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer with Navigation */}
              <div className='p-4 sm:p-6 border-t border-gray-200 bg-gray-50'>
                <div className='flex items-center justify-between'>
                  {/* Saved Drafts */}
                  {savedDrafts.length > 0 && formStep === 1 && (
                    <div className='flex items-center gap-2'>
                      <span className='text-sm text-gray-600'>
                        {lang === 'fil' ? 'Mga Draft:' : 'Drafts:'}
                      </span>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            const draft = savedDrafts.find(
                              (d) => d.id.toString() === e.target.value
                            );
                            if (draft) {
                              setForm(draft);
                            }
                          }
                        }}
                        className='text-sm border border-gray-300 rounded px-2 py-1'
                      >
                        <option value=''>
                          {lang === 'fil' ? 'Pumili ng draft' : 'Load draft'}
                        </option>
                        {savedDrafts.map((draft) => (
                          <option key={draft.id} value={draft.id}>
                            {draft.title || 'Untitled'} -{' '}
                            {new Date(draft.timestamp).toLocaleDateString()}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className='flex items-center gap-3 ml-auto'>
                    {formStep > 1 && (
                      <button
                        type='button'
                        onClick={prevStep}
                        className='px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors'
                      >
                        {lang === 'fil' ? 'Bumalik' : 'Back'}
                      </button>
                    )}

                    <button
                      type='button'
                      onClick={handleCloseModal}
                      className='px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors'
                    >
                      {lang === 'fil' ? 'Kanselahin' : 'Cancel'}
                    </button>

                    {formStep < 3 ? (
                      <button
                        type='button'
                        onClick={nextStep}
                        className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2'
                      >
                        {lang === 'fil' ? 'Susunod' : 'Next'}
                        <ChevronRightIcon className='w-4 h-4' />
                      </button>
                    ) : (
                      <button
                        type='submit'
                        ref={submitBtnRef}
                        className='px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2'
                      >
                        <PlusIcon className='w-4 h-4' />
                        {lang === 'fil' ? 'Ibahagi' : 'Share Story'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedStory && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
          <div className='bg-white rounded-xl shadow-2xl max-w-md w-full p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-lg font-semibold text-gray-900'>
                {lang === 'fil' ? 'I-share ang Kwento' : 'Share Story'}
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className='p-1 text-gray-400 hover:text-gray-600 rounded-md'
              >
                <XMarkIcon className='w-6 h-6' />
              </button>
            </div>

            <div className='mb-4 p-3 bg-gray-50 rounded-lg'>
              <h4 className='font-medium text-gray-900 mb-1'>
                {selectedStory.title?.[lang] || selectedStory.title?.en}
              </h4>
              <p className='text-sm text-gray-600'>
                {lang === 'fil' ? 'Ni' : 'By'} {selectedStory.author}
              </p>
            </div>

            <div className='grid grid-cols-1 gap-3'>
              <button
                onClick={() => handleShareStory(selectedStory, 'facebook')}
                className='flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                <ShareIcon className='w-5 h-5' />
                Facebook
              </button>
              <button
                onClick={() => handleShareStory(selectedStory, 'twitter')}
                className='flex items-center justify-center gap-3 px-4 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors'
              >
                <ShareIcon className='w-5 h-5' />
                Twitter
              </button>
              <button
                onClick={() => handleShareStory(selectedStory, 'copy')}
                className='flex items-center justify-center gap-3 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors'
              >
                <DocumentDuplicateIcon className='w-5 h-5' />
                {lang === 'fil' ? 'Kopyahin ang Link' : 'Copy Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Story Detail Modal - Enhanced & Fully Responsive */}
      {showStoryModal && selectedStory && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-2 sm:p-4 overflow-y-auto'>
          <div className='bg-white rounded-xl shadow-2xl w-full max-w-4xl mx-auto my-4 sm:my-8'>
            {/* Modal Header */}
            <div className='flex items-center justify-between p-4 sm:p-6 border-b border-gray-200'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                  <UserIcon className='w-5 h-5 text-white' />
                </div>
                <div>
                  <h3 className='text-lg sm:text-xl font-semibold text-gray-900'>
                    {selectedStory.title?.[lang] || selectedStory.title?.en}
                  </h3>
                  <p className='text-sm text-gray-500'>
                    {lang === 'fil' ? 'Ni' : 'By'} {selectedStory.author}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowStoryModal(false)}
                className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'
              >
                <XMarkIcon className='w-6 h-6' />
              </button>
            </div>

            {/* Modal Content */}
            <div className='max-h-[70vh] overflow-y-auto'>
              <div className='p-4 sm:p-6'>
                {/* Story Image with Lightbox */}
                <div className='mb-6'>
                  <div className='relative group cursor-pointer'>
                    <img
                      src={selectedStory.imageUrl}
                      alt={
                        selectedStory.title?.[lang] || selectedStory.title?.en
                      }
                      className='w-full h-48 sm:h-64 md:h-80 object-cover rounded-lg transition-transform hover:scale-[1.02]'
                      loading='lazy'
                      onClick={() => {
                        // Image lightbox functionality
                        const lightbox = document.createElement('div');
                        lightbox.className =
                          'fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4';
                        lightbox.innerHTML = `
                          <div class="relative max-w-full max-h-full">
                            <img src="${selectedStory.imageUrl}" alt="${selectedStory.title?.[lang] || selectedStory.title?.en}" class="max-w-full max-h-full object-contain rounded-lg">
                            <button class="absolute top-4 right-4 text-white hover:text-gray-300 p-2 bg-black bg-opacity-50 rounded-full">
                              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                              </svg>
                            </button>
                          </div>
                        `;
                        document.body.appendChild(lightbox);
                        lightbox.addEventListener('click', (e) => {
                          if (
                            e.target === lightbox ||
                            e.target.closest('button')
                          ) {
                            document.body.removeChild(lightbox);
                          }
                        });
                      }}
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg flex items-center justify-center'>
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity bg-white bg-opacity-90 rounded-full p-3'>
                        <MagnifyingGlassIcon className='w-6 h-6 text-gray-700' />
                      </div>
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className='flex gap-2 mt-3'>
                    {selectedStory.isFeatured && (
                      <span className='inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full'>
                        <FireIconSolid className='w-4 h-4 mr-1' />
                        {lang === 'fil' ? 'Tampok' : 'Featured'}
                      </span>
                    )}
                    {selectedStory.isTrending && (
                      <span className='inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full'>
                        <FireIconSolid className='w-4 h-4 mr-1' />
                        {lang === 'fil' ? 'Sikat' : 'Trending'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Story Meta Information */}
                <div className='mb-6 p-4 bg-gray-50 rounded-lg'>
                  <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm'>
                    <div className='flex items-center gap-2'>
                      <CalendarDaysIcon className='w-5 h-5 text-gray-400' />
                      <span className='text-gray-600'>
                        {new Date(selectedStory.date).toLocaleDateString(lang, {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <EyeIcon className='w-5 h-5 text-gray-400' />
                      <span className='text-gray-600'>
                        {Math.floor(Math.random() * 500) + 100}{' '}
                        {lang === 'fil' ? 'views' : 'views'}
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <TagIcon className='w-5 h-5 text-gray-400' />
                      <span className='text-gray-600'>
                        {selectedStory.category || 'General'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className='mb-6'>
                  <div className='flex flex-wrap gap-2'>
                    {selectedStory.tags?.map((tag) => (
                      <span
                        key={tag}
                        className='inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 border border-blue-200 rounded-full text-sm font-medium hover:from-blue-100 hover:to-purple-100 transition-colors cursor-pointer'
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Story Description */}
                <div className='mb-6'>
                  <p className='text-gray-700 leading-relaxed text-base'>
                    {selectedStory.description?.[lang] ||
                      selectedStory.description?.en}
                  </p>
                </div>

                {/* Star Rating System */}
                <div className='mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200'>
                  <h4 className='text-sm font-semibold text-gray-900 mb-3'>
                    {lang === 'fil'
                      ? 'I-rate ang kwentong ito'
                      : 'Rate this story'}
                  </h4>
                  <div className='flex items-center gap-1'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRateStory(selectedStory.id, star)}
                        className='p-1 hover:scale-110 transition-transform'
                        title={`${star} ${star === 1 ? 'star' : 'stars'}`}
                      >
                        {star <= (storyRatings.get(selectedStory.id) || 0) ? (
                          <StarIconSolid className='w-6 h-6 text-yellow-500' />
                        ) : (
                          <StarIcon className='w-6 h-6 text-gray-300 hover:text-yellow-400' />
                        )}
                      </button>
                    ))}
                    <span className='ml-2 text-sm text-gray-600'>
                      {storyRatings.get(selectedStory.id) || 0}/5
                    </span>
                  </div>
                </div>

                {/* Comments Section */}
                <div className='mb-6'>
                  <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2'>
                    <ChatBubbleLeftIcon className='w-5 h-5' />
                    {lang === 'fil' ? 'Mga Komento' : 'Comments'}
                  </h4>

                  {/* Comment Input */}
                  <div className='mb-4 p-4 bg-gray-50 rounded-lg'>
                    <textarea
                      placeholder={
                        lang === 'fil' ? 'Magkomento...' : 'Write a comment...'
                      }
                      className='w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      rows='3'
                    />
                    <div className='flex justify-end mt-2'>
                      <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'>
                        {lang === 'fil' ? 'I-post' : 'Post Comment'}
                      </button>
                    </div>
                  </div>

                  {/* Sample Comments */}
                  <div className='space-y-4 max-h-40 overflow-y-auto'>
                    {[
                      {
                        author: 'Maria Santos',
                        comment:
                          lang === 'fil'
                            ? 'Napakagandang kwento!'
                            : 'Great story!',
                        time: '2 hours ago',
                      },
                      {
                        author: 'Juan Dela Cruz',
                        comment:
                          lang === 'fil'
                            ? 'Salamat sa pagbabahagi!'
                            : 'Thanks for sharing!',
                        time: '1 day ago',
                      },
                    ].map((comment, index) => (
                      <div
                        key={index}
                        className='flex gap-3 p-3 bg-white rounded-lg border border-gray-200'
                      >
                        <div className='w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm'>
                          {comment.author.charAt(0)}
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2 mb-1'>
                            <span className='font-medium text-gray-900 text-sm'>
                              {comment.author}
                            </span>
                            <span className='text-xs text-gray-500'>
                              {comment.time}
                            </span>
                          </div>
                          <p className='text-gray-700 text-sm'>
                            {comment.comment}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer - Action Buttons */}
            <div className='p-4 sm:p-6 border-t border-gray-200 bg-gray-50 rounded-b-xl'>
              <div className='flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between'>
                <div className='flex items-center gap-3'>
                  {/* Like Button */}
                  <button
                    onClick={() => handleLikeStory(selectedStory.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      likedStories.has(selectedStory.id)
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {likedStories.has(selectedStory.id) ? (
                      <HeartIconSolid className='w-5 h-5 text-red-500' />
                    ) : (
                      <HeartIcon className='w-5 h-5' />
                    )}
                    <span className='text-sm'>
                      {selectedStory.likes +
                        (likedStories.has(selectedStory.id) ? 1 : 0)}
                    </span>
                  </button>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleBookmarkStory(selectedStory.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      bookmarkedStories.has(selectedStory.id)
                        ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <BookmarkIcon
                      className={`w-5 h-5 ${bookmarkedStories.has(selectedStory.id) ? 'text-yellow-600' : ''}`}
                    />
                    <span className='text-sm'>
                      {lang === 'fil' ? 'Bookmark' : 'Bookmark'}
                    </span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => {
                      setShowShareModal(true);
                      setShowStoryModal(false);
                    }}
                    className='flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 font-medium transition-all'
                  >
                    <ShareIcon className='w-5 h-5' />
                    <span className='text-sm'>
                      {lang === 'fil' ? 'I-share' : 'Share'}
                    </span>
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowStoryModal(false)}
                  className='px-6 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors'
                >
                  {lang === 'fil' ? 'Isara' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default CampusLife;
