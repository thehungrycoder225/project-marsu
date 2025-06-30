import { useEffect } from 'react';

function SEOHead({ 
  title, 
  description, 
  keywords = [], 
  image, 
  url, 
  type = 'website',
  siteName = 'University College'
}) {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) {
      metaDescription.setAttribute('content', description);
    } else if (description) {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = description;
      document.head.appendChild(meta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords.length) {
      metaKeywords.setAttribute('content', keywords.join(', '));
    } else if (keywords.length) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = keywords.join(', ');
      document.head.appendChild(meta);
    }

    // Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: type },
      { property: 'og:url', content: url || window.location.href },
      { property: 'og:site_name', content: siteName },
      { property: 'og:image', content: image },
    ];

    ogTags.forEach(({ property, content }) => {
      if (content) {
        let existing = document.querySelector(`meta[property="${property}"]`);
        if (existing) {
          existing.setAttribute('content', content);
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('property', property);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      }
    });

    // Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
    ];

    twitterTags.forEach(({ name, content }) => {
      if (content) {
        let existing = document.querySelector(`meta[name="${name}"]`);
        if (existing) {
          existing.setAttribute('content', content);
        } else {
          const meta = document.createElement('meta');
          meta.setAttribute('name', name);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        }
      }
    });

    // Structured data for organization
    if (title && description) {
      const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'EducationalOrganization',
        'name': title,
        'description': description,
        'url': url || window.location.href,
        ...(image && { 'image': image })
      };

      let existing = document.querySelector('script[type="application/ld+json"]');
      if (existing) {
        existing.textContent = JSON.stringify(structuredData);
      } else {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(structuredData);
        document.head.appendChild(script);
      }
    }
  }, [title, description, keywords, image, url, type, siteName]);

  return null; // This component doesn't render anything
}

export default SEOHead;
