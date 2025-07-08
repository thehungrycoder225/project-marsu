import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import {
  BuildingOfficeIcon,
  GlobeAltIcon,
  UsersIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const PartnerModal = ({ partner, onClose }) => {
  if (!partner) return null;

  return (
    <motion.div
      className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className='bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl'>
          <button
            onClick={onClose}
            className='absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors'
          >
            <XMarkIcon className='w-5 h-5' />
          </button>

          <div className='flex items-center gap-4'>
            <div className='w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center'>
              <img
                src={partner.logo}
                alt={partner.name}
                className='w-full h-full object-contain'
              />
            </div>
            <div>
              <h3 className='text-2xl font-bold'>{partner.name}</h3>
              <p className='text-blue-100'>
                {partner.type || 'Partner Organization'}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Description */}
          {partner.description && (
            <div>
              <h4 className='font-semibold text-gray-800 mb-3'>About</h4>
              <p className='text-gray-600 leading-relaxed'>
                {partner.description}
              </p>
            </div>
          )}

          {/* Collaboration Details */}
          {partner.collaboration && (
            <div>
              <h4 className='font-semibold text-gray-800 mb-3'>
                Our Collaboration
              </h4>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-700'>{partner.collaboration}</p>
              </div>
            </div>
          )}

          {/* Key Stats */}
          {partner.stats && (
            <div>
              <h4 className='font-semibold text-gray-800 mb-3'>
                Partnership Impact
              </h4>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                {partner.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 text-center'
                  >
                    <div className='text-2xl font-bold text-blue-600 mb-1'>
                      {stat.value}
                    </div>
                    <div className='text-sm text-gray-600'>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact/Link */}
          {partner.link && (
            <div className='pt-4 border-t border-gray-200'>
              <a
                href={partner.link}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium'
              >
                <GlobeAltIcon className='w-5 h-5' />
                Visit Website
                <ChevronRightIcon className='w-4 h-4' />
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

PartnerModal.propTypes = {
  partner: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
    link: PropTypes.string,
    type: PropTypes.string,
    description: PropTypes.string,
    collaboration: PropTypes.string,
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ),
  }),
  onClose: PropTypes.func.isRequired,
};

const SDGGoalPartners = ({ partners }) => {
  const [selectedPartner, setSelectedPartner] = useState(null);

  if (!partners || partners.length === 0) {
    return (
      <div className='text-center py-12'>
        <BuildingOfficeIcon className='w-16 h-16 text-gray-400 mx-auto mb-4' />
        <p className='text-gray-500 text-lg'>
          No partner organizations found for this goal.
        </p>
        <p className='text-gray-400 text-sm mt-2'>
          We&apos;re always looking for new partnerships to advance sustainable
          development.
        </p>
      </div>
    );
  }

  return (
    <div className='sdg-partners'>
      {/* Header */}
      <div className='text-center mb-8'>
        <h3 className='text-2xl font-bold text-gray-800 mb-2'>Our Partners</h3>
        <p className='text-gray-600'>
          Collaborating with organizations worldwide to achieve sustainable
          development goals
        </p>
      </div>

      {/* Partners Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {partners.map((partner, idx) => (
          <motion.div
            key={idx}
            className='group bg-white/70 backdrop-blur rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedPartner(partner)}
          >
            {/* Partner Logo */}
            <div className='bg-gradient-to-br from-gray-50 to-white p-8 flex items-center justify-center min-h-[120px]'>
              <img
                src={partner.logo}
                alt={partner.name}
                className='max-w-full max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300'
              />
            </div>

            {/* Partner Info */}
            <div className='p-6'>
              <div className='flex items-center gap-2 mb-2'>
                <h4 className='font-semibold text-gray-800 group-hover:text-blue-600 transition-colors'>
                  {partner.name}
                </h4>
                <ChevronRightIcon className='w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors' />
              </div>

              {partner.type && (
                <p className='text-sm text-gray-500 mb-3 flex items-center gap-1'>
                  <BuildingOfficeIcon className='w-4 h-4' />
                  {partner.type}
                </p>
              )}

              {partner.description && (
                <p className='text-sm text-gray-600 line-clamp-2 mb-3'>
                  {partner.description}
                </p>
              )}

              {/* Quick Stats */}
              {partner.stats && (
                <div className='flex items-center gap-4 text-xs text-gray-500'>
                  <div className='flex items-center gap-1'>
                    <UsersIcon className='w-3 h-3' />
                    <span>
                      {partner.stats.find((s) =>
                        s.label.toLowerCase().includes('people')
                      )?.value || 'N/A'}
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <GlobeAltIcon className='w-3 h-3' />
                    <span>
                      {partner.stats.find((s) =>
                        s.label.toLowerCase().includes('project')
                      )?.value || 'Multiple'}
                    </span>
                  </div>
                </div>
              )}

              {/* Hover Actions */}
              <div className='mt-4 opacity-0 group-hover:opacity-100 transition-opacity'>
                <div className='text-sm text-blue-600 font-medium'>
                  Learn more about our partnership →
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Partner Categories */}
      <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center'>
          <BuildingOfficeIcon className='w-12 h-12 text-blue-600 mx-auto mb-3' />
          <h4 className='font-semibold text-blue-900 mb-2'>
            Corporate Partners
          </h4>
          <p className='text-sm text-blue-700'>
            {
              partners.filter((p) =>
                p.type?.toLowerCase().includes('corporate')
              ).length
            }{' '}
            organizations
          </p>
        </div>

        <div className='bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center'>
          <UsersIcon className='w-12 h-12 text-green-600 mx-auto mb-3' />
          <h4 className='font-semibold text-green-900 mb-2'>NGO Partners</h4>
          <p className='text-sm text-green-700'>
            {
              partners.filter((p) => p.type?.toLowerCase().includes('ngo'))
                .length
            }{' '}
            organizations
          </p>
        </div>

        <div className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center'>
          <GlobeAltIcon className='w-12 h-12 text-purple-600 mx-auto mb-3' />
          <h4 className='font-semibold text-purple-900 mb-2'>Global Reach</h4>
          <p className='text-sm text-purple-700'>
            {partners.length} active partnerships
          </p>
        </div>
      </div>

      {/* Modal */}
      {selectedPartner && (
        <PartnerModal
          partner={selectedPartner}
          onClose={() => setSelectedPartner(null)}
        />
      )}
    </div>
  );
};

SDGGoalPartners.propTypes = {
  partners: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired,
      link: PropTypes.string,
      type: PropTypes.string,
      description: PropTypes.string,
      collaboration: PropTypes.string,
      stats: PropTypes.arrayOf(
        PropTypes.shape({
          value: PropTypes.string.isRequired,
          label: PropTypes.string.isRequired,
        })
      ),
    })
  ),
};

export default SDGGoalPartners;
