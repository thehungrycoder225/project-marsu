import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * MetaTags component for dynamic social sharing metadata.
 * Supports Open Graph, Twitter Card, and custom overrides.
 *
 * Props:
 * - title: string (required)
 * - description: string (optional)
 * - image: string (optional, absolute URL preferred)
 * - url: string (optional, canonical URL)
 * - metaTitle: string (optional, overrides title for meta)
 * - metaDescription: string (optional, overrides description)
 * - metaImage: string (optional, overrides image)
 * - type: string (optional, e.g. 'article', 'website')
 * - twitterCard: string (optional, e.g. 'summary_large_image')
 */
const MetaTags = ({
  title,
  description,
  image,
  url,
  metaTitle,
  metaDescription,
  metaImage,
  type = 'article',
  twitterCard = 'summary_large_image',
}) => {
  const finalTitle = metaTitle || null;
  const finalDescription =
    metaDescription ||
    description ||
    'Marinduque State University news and updates.';
  const finalImage = metaImage || image || '/logo.png';
  const finalUrl =
    url || (typeof window !== 'undefined' ? window.location.href : undefined);

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name='description' content={finalDescription} />
      {/* Open Graph */}
      <meta property='og:title' content={finalTitle} />
      <meta property='og:description' content={finalDescription} />
      <meta property='og:image' content={finalImage} />
      {finalUrl && <meta property='og:url' content={finalUrl} />}
      <meta property='og:type' content={type} />
      {/* Twitter Card */}
      <meta name='twitter:card' content={twitterCard} />
      <meta name='twitter:title' content={finalTitle} />
      <meta name='twitter:description' content={finalDescription} />
      <meta name='twitter:image' content={finalImage} />
    </Helmet>
  );
};

MetaTags.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  metaTitle: PropTypes.string,
  metaDescription: PropTypes.string,
  metaImage: PropTypes.string,
  type: PropTypes.string,
  twitterCard: PropTypes.string,
};

export const MetaTagsProvider = HelmetProvider;
export default MetaTags;
