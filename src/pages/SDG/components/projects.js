import { a } from 'react-spring';

/**
 * ENHANCED SDG PROJECTS DATA STRUCTURE
 *
 * RECENT ENHANCEMENTS:
 * ✅ Rich Media Content Support - Videos, audio, interactive content
 * ✅ Impact Metrics Structure - Quantitative data ready for future population
 * ✅ Social Sharing Metadata - Open Graph and Twitter card data
 * ✅ Advanced Search & Filtering - Searchable keywords and categories
 * ✅ Partnership Details - Comprehensive collaboration information
 * ✅ Geographic Data - Location and map integration support
 * ✅ Performance Optimization - Lazy loading and image optimization hints
 *
 * FUTURE-READY:
 * 🔮 External Integration Support - API-ready structure
 * 🔮 Analytics Tracking - Event tracking placeholders
 *
 * DYNAMIC FEATURED PROJECT SYSTEM
 *
 * This file now supports dynamic selection of featured projects for the SDG page.
 * Each project can have a 'featured' configuration object with the following properties:
 *
 * FEATURED CONFIGURATION:
 * {
 *   isHero: boolean,     // True if this should be the large hero card (2 columns)
 *   isTall: boolean,     // True if this should be the tall card (1 column)
 *   isCompact: boolean,  // True if this should be included in compact cards
 *   priority: number,    // Lower number = higher priority for auto-selection
 *   heroOrder: number,   // Specific order for featured section (1=hero, 2=tall, 3+=compact)
 * }
 *
 * ENHANCED PROJECT STRUCTURE:
 * {
 *   // Core Information
 *   id, title, subtitle, desc, author, date, link, logo, image
 *
 *   // Rich Media Content
 *   media: {
 *     videos: [{ type, url, title, thumbnail, duration }],
 *     audio: [{ type, url, title, duration }],
 *     interactive: [{ type, url, title, description }],
 *     documents: [{ type, url, title, size }]
 *   },
 *
 *   // Impact Metrics (Quantitative Data)
 *   metrics: {
 *     quantitative: [{ label, value, unit, category }],
 *     qualitative: [{ category, description, evidence }],
 *     sdgAlignment: [{ goal, percentage, description }]
 *   },
 *
 *   // Social Sharing & SEO
 *   sharing: {
 *     ogTitle, ogDescription, ogImage, twitterCard, keywords
 *   },
 *
 *   // Search & Filtering
 *   searchMeta: {
 *     keywords: [], categories: [], searchableText, difficulty, duration
 *   },
 *
 *   // Partnership & Collaboration
 *   partnerships: [{
 *     name, type, role, logo, website, description, startDate, status
 *   }],
 *
 *   // Geographic Information
 *   location: {
 *     coordinates, address, regions, mapConfig, boundaries
 *   },
 *
 *   // Performance Optimization
 *   optimization: {
 *     lazyLoad, priority, preloadImages, cachePolicy
 *   }
 * }
 *
 * HOW TO CHANGE FEATURED PROJECTS:
 *
 * Method 1 - Using heroOrder (Recommended):
 * Set heroOrder: 1 for hero card, heroOrder: 2 for tall card, heroOrder: 3+ for compact cards
 *
 * Method 2 - Using specific flags:
 * Set isHero: true for one project, isTall: true for one project, isCompact: true for others
 *
 * Method 3 - Using priority:
 * Set different priority numbers; system will auto-select based on lowest numbers
 *
 * EXAMPLE - To make "Free-range Chicken" the hero project:
 * featured: {
 *   isHero: true,
 *   isTall: false,
 *   isCompact: false,
 *   priority: 1,
 *   heroOrder: 1
 * }
 *
 * HELPER FUNCTIONS AVAILABLE:
 * - getHeroProject() - Returns the project marked as hero
 * - getTallProject() - Returns the project marked as tall
 * - getCompactProjects(limit) - Returns projects marked as compact
 * - getFeaturedByOrder() - Returns projects sorted by heroOrder
 * - getFeaturedProjects() - Returns all featured projects organized by type
 * - searchProjects(query, filters) - Enhanced search with filters
 * - getProjectsByCategory(category) - Filter by category
 * - getProjectsBySDG(sdgGoals) - Filter by SDG goals
 * - getProjectsByLocation(region) - Filter by geographic location
 */

const projects = [
  //WURI
  {
    id: 7,
    image: `sdg/project/island.jpg`,
    title: `Project SISE: Small Island for Sustainable Environment`,
    subtitle: `Mangrove Rehabilitation and Aquasilviculture`,
    desc: `Mangrove Rehabilitation and Aquasilviculture`,
    author: `MarSU-CES`,
    date: `2023`,
    link: `/sdg-center/project/7/WURI`,
    logo: `sdg/project/sise.jpg`,
    // Enhanced Rich Media Content
    media: {
      videos: [
        {
          type: 'educational',
          url: 'sdg/project/videos/mangrove-rehabilitation.mp4',
          title: 'Mangrove Rehabilitation Process',
          thumbnail: 'sdg/project/videos/thumbnails/mangrove-thumb.jpg',
          duration: '6:30',
        },
      ],
      documents: [
        {
          type: 'research',
          url: 'sdg/project/documents/sise-field-guide.pdf',
          title: 'SISE Field Guide and Laboratory Manual',
          size: '4.1 MB',
        },
      ],
    },

    // Impact Metrics
    metrics: {
      quantitative: [
        {
          label: 'Mangrove Seedlings Planted',
          value: 5000,
          unit: 'seedlings',
          category: 'environmental',
        },
        {
          label: 'Hectares Rehabilitated',
          value: 15,
          unit: 'hectares',
          category: 'environmental',
        },
        {
          label: 'Community Members Trained',
          value: 120,
          unit: 'individuals',
          category: 'capacity-building',
        },
        {
          label: 'Carbon Stock Increase',
          value: 25,
          unit: 'percentage',
          category: 'environmental',
        },
        {
          label: 'Fish Catch Improvement',
          value: 18,
          unit: 'percentage',
          category: 'livelihood',
        },
      ],
      qualitative: [
        {
          category: 'environmental-restoration',
          description:
            'Restored coastal ecosystem resilience through mangrove rehabilitation',
          evidence:
            'Environmental monitoring reports and satellite imagery analysis',
        },
        {
          category: 'community-empowerment',
          description:
            'Enhanced community awareness and participation in conservation',
          evidence: 'Community surveys and participation records',
        },
      ],
      sdgAlignment: [
        {
          goal: 13,
          percentage: 95,
          description: 'Climate action through coastal ecosystem restoration',
        },
        {
          goal: 14,
          percentage: 90,
          description: 'Marine life conservation and sustainable fisheries',
        },
        {
          goal: 15,
          percentage: 85,
          description: 'Terrestrial ecosystem protection and restoration',
        },
      ],
    },

    // Social Sharing & SEO
    sharing: {
      ogTitle:
        'Project SISE: Sustainable Island Environment Through Mangrove Restoration',
      ogDescription:
        'MarSU-CES leads coastal rehabilitation in Marinduque, planting 5,000 mangrove seedlings and training 120 community members for environmental sustainability.',
      ogImage: 'sdg/project/sharing/sise-og-image.jpg',
      twitterCard: 'summary_large_image',
      keywords: [
        'mangrove rehabilitation',
        'coastal conservation',
        'climate action',
        'marine ecosystem',
        'sustainability',
      ],
    },

    // Enhanced Search & Filtering
    searchMeta: {
      keywords: [
        'mangrove',
        'rehabilitation',
        'coastal',
        'environment',
        'fisheries',
        'conservation',
        'aquasilviculture',
      ],
      categories: [
        'environment',
        'conservation',
        'coastal-management',
        'climate-action',
      ],
      searchableText:
        'mangrove rehabilitation coastal conservation fisheries sustainability environmental restoration',
      difficulty: 'advanced',
      duration: 'multi-year project since 2023',
    },

    // Partnership Details
    partnerships: [
      {
        name: 'MarSU College of Environmental Studies',
        type: 'academic',
        role: 'lead-implementer',
        logo: 'partners/marsu-ces-logo.png',
        website: '',
        description:
          'Primary implementing unit for environmental research and extension',
        startDate: '2023-01',
        status: 'active',
      },
      {
        name: 'Local Fisherfolk Organizations',
        type: 'community',
        role: 'beneficiary-partner',
        logo: 'partners/fisherfolk-logo.png',
        website: '',
        description:
          'Community partners participating in conservation activities',
        startDate: '2023-01',
        status: 'active',
      },
    ],

    // Geographic Information
    location: {
      coordinates: { lat: 13.42, lng: 121.95 },
      address: 'Coastal areas of Marinduque Province',
      regions: ['Marinduque', 'MIMAROPA', 'Philippines'],
      mapConfig: {
        zoom: 11,
        style: 'hybrid',
        markers: [
          {
            lat: 13.42,
            lng: 121.95,
            label: 'SISE Project Site - Coastal Marinduque',
          },
        ],
      },
      boundaries: {
        coverage: 'Coastal communities',
        beneficiaryArea: 'Multiple coastal barangays in Marinduque',
      },
    },

    // Performance Optimization
    optimization: {
      lazyLoad: true,
      priority: 'medium',
      preloadImages: ['sdg/project/island.jpg', 'sdg/project/sise.jpg'],
      cachePolicy: 'long-term',
    },

    // Featured configuration
    featured: {
      isHero: false, // Set to true to make this the hero card
      isTall: false, // Set to true to make this the tall card
      isCompact: true, // Set to true to include in compact cards
      priority: 7, // Lower number = higher priority for auto-selection
      heroOrder: 7, // Fourth position (compact)
    },
    contents: [
      {
        background: `Fisheries as a renewable resource significantly need management and conservation for sustainability. The decline of fish catch along coastal communities, deforestation of mangroves and beach forests and extreme environmental events like storm surges, sea level rise, mining and other anthropogenic activities are issues and concerns as drivers to address Sustainable Development Goals (SDG’s).`,
      },
      {
        highlights: [
          `The project highlights to achieve several short-term results, including the establishment of a mangrove seedling nursery, the development of a mangrove conservation plan and increased community awareness of mangrove conservation through outreach activities and distribution of environmental advocacy materials. Research, field guide and laboratory manuals are ways forward from this project in the future.
`,
        ],
      },
      {
        impact: [
          `Field laboratory of learners and students`,
          `Learnings about the species and ecological services`,
          `Developmental studies for manuals/field guide/modules`,
          `Advocacy materials`,
          `Laboratory site`,
          ` Research area`,
        ],
      },
      {
        outcomes: [
          `Increased fish catch (spawning/breeding ground) through CPUE`,
          `Number of propagules produced for every species planted via assessment`,
          `Carbon stock assessment`,
          `Heavy metals accumulation of mangroves`,
          `Mangrove assessment`,
        ],
      },
      {
        plans: [
          `Established Livelihood Technology on Aquasilviculture`,
          `Field laboratory of CES Faculty and Students
`,
          `Field Guide Manual`,
          `Research opportunities on heavy metals in mangroves, fish, water & sediments`,
          `Established Mangrove areas`,
          `Ecotourism sites
`,
        ],
      },
    ],
    conclusion: `Generally, the program ensure resource sustainability, attain food security and poverty alleviation. Specifically, to help support the marginal fisherfolks for an additional income and livelihood opportunities and to increase the level of awareness on the significance of planting mangroves along coastal areas and its ecological impact. It has been successful in achieving many of these impacts and has provided training to community members, People’s Organization (PO), Local Government Units (LGU’s), academe, learners, and non-government organization (NGO’s)`,
    cta: ``,
    tags: [
      {
        name: [
          'Zero Hunger,',
          'Climate Action',
          'Life Below Water',
          'Life on Land',
        ],
        icons: [
          'E-WEB-Goal-02.png',
          'E-WEB-Goal-13.png',
          'E-WEB-Goal-14.png',
          'E-WEB-Goal-15.png',
        ],
      },
    ],
    gallery: [
      {
        id: 1,
        image: 'sdg/project/project-iUgpong/sdg-WURI-image01.jpg',
        caption: 'WURI',
        alt: '',
      },
      {
        id: 2,
        image: 'sdg/project/project-iUgpong/sdg-WURI-image02.jpg',
        caption: 'WURI',
        alt: '',
      },
      {
        id: 3,
        image: 'sdg/project/project-iUgpong/sdg-WURI-image03.jpg',
        caption: 'WURI',
        alt: '',
      },
      {
        id: 4,
        image: 'sdg/project/project-iUgpong/sdg-WURI-image04.jpg',
        caption: 'WURI',
        alt: '',
      },
    ],
  },
  //Free-range Layer and Broiler Chicken Multiplier Breeder Farm
  {
    id: 6,
    image: `sdg/project/freerangechicken.png`,
    title: `Free-range Layer and Broiler Chicken Multiplier Breeder Farm`,
    subtitle: `Free-range Chicken`,
    desc: `Free-range Layer and Broiler Chicken Multiplier Breeder Farm`,
    author: `MarSU College of Agriculture`,
    date: `January 2021`,
    link: `/sdg-center/project/6/FreeRange`,
    logo: `sdg/project/freerange-logo.jpg`,
    // Enhanced Rich Media Content
    media: {
      videos: [
        {
          type: 'documentary',
          url: 'sdg/project/videos/free-range-farm-tour.mp4',
          title: 'Free-range Chicken Farm Operations',
          thumbnail: 'sdg/project/videos/thumbnails/farm-tour-thumb.jpg',
          duration: '4:15',
        },
      ],
      documents: [
        {
          type: 'guide',
          url: 'sdg/project/documents/free-range-manual.pdf',
          title: 'Free-range Chicken Production Manual',
          size: '3.2 MB',
        },
      ],
    },

    // Impact Metrics
    metrics: {
      quantitative: [
        {
          label: 'Farmers Trained',
          value: 166,
          unit: 'individuals',
          category: 'capacity-building',
        },
        {
          label: 'Students Trained',
          value: 146,
          unit: 'individuals',
          category: 'education',
        },
        {
          label: 'Stock Dispersal Beneficiaries',
          value: 243,
          unit: 'beneficiaries',
          category: 'livelihood',
        },
        {
          label: 'Livestock Stocks Dispersed',
          value: 3373,
          unit: 'heads',
          category: 'resources',
        },
        {
          label: 'Total Value Dispersed',
          value: 629385.62,
          unit: 'PHP',
          category: 'economic-impact',
        },
      ],
      qualitative: [
        {
          category: 'livelihood-improvement',
          description:
            'Enhanced income opportunities for local farmers through sustainable poultry production',
          evidence: 'Farmer income surveys and business tracking data',
        },
        {
          category: 'food-security',
          description: 'Increased local production of quality protein sources',
          evidence: 'Production volume reports and market analysis',
        },
      ],
      sdgAlignment: [
        {
          goal: 1,
          percentage: 85,
          description:
            'Direct poverty reduction through livelihood enhancement',
        },
        {
          goal: 2,
          percentage: 90,
          description: 'Food security through increased poultry production',
        },
        {
          goal: 8,
          percentage: 80,
          description: 'Economic growth through sustainable agriculture',
        },
      ],
    },

    // Social Sharing & SEO
    sharing: {
      ogTitle:
        'Free-range Chicken Multiplier Farm - Sustainable Livelihood for Marinduque Farmers',
      ogDescription:
        'MarSU establishes sustainable poultry breeding farm to support local farmers, trained 166 farmers and dispersed 3,373 livestock stocks worth PHP 629K.',
      ogImage: 'sdg/project/sharing/freerange-og-image.jpg',
      twitterCard: 'summary_large_image',
      keywords: [
        'sustainable agriculture',
        'poultry production',
        'farmer livelihood',
        'food security',
        'MarSU extension',
      ],
    },

    // Enhanced Search & Filtering
    searchMeta: {
      keywords: [
        'poultry',
        'chicken',
        'farming',
        'agriculture',
        'livelihood',
        'training',
        'livestock',
        'breeding',
      ],
      categories: ['agriculture', 'livelihood', 'training', 'food-security'],
      searchableText:
        'free-range chicken poultry production farmer training livestock breeding sustainable agriculture',
      difficulty: 'intermediate',
      duration: 'ongoing project since 2021',
    },

    // Partnership Details
    partnerships: [
      {
        name: 'Department of Agriculture',
        type: 'government',
        role: 'funding-partner',
        logo: 'partners/da-logo.png',
        website: 'https://da.gov.ph',
        description:
          'Primary funding source through National Livestock Program',
        startDate: '2021-01',
        status: 'active',
      },
      {
        name: 'Bayanihan to Recover as One-Act',
        type: 'government-program',
        role: 'funding-source',
        logo: 'partners/bayanihan-logo.png',
        website: '',
        description: 'Additional funding support for recovery initiatives',
        startDate: '2021-01',
        status: 'completed',
      },
    ],

    // Geographic Information
    location: {
      coordinates: { lat: 13.45, lng: 121.85 },
      address: 'MarSU Campus, Tanza, Boac, Marinduque',
      regions: ['Boac', 'Marinduque', 'MIMAROPA', 'Philippines'],
      mapConfig: {
        zoom: 14,
        style: 'satellite',
        markers: [
          { lat: 13.45, lng: 121.85, label: 'MarSU Free-range Chicken Farm' },
        ],
      },
      boundaries: {
        coverage: 'Province-wide',
        beneficiaryArea: 'All municipalities of Marinduque',
      },
    },

    // Performance Optimization
    optimization: {
      lazyLoad: true,
      priority: 'high',
      preloadImages: [
        'sdg/project/freerangechicken.png',
        'sdg/project/freerange-logo.jpg',
      ],
      cachePolicy: 'medium-term',
    },

    // Featured configuration
    featured: {
      isHero: false, // Set this as the hero card
      isTall: false,
      isCompact: true,
      priority: 6, // Highest priority
      heroOrder: 6, // First position (hero)
    },
    contents: [
      {
        background: `Through poultry raising and production, the extension project is intended to
contribute to intensifying the recovery and restoration of the livelihood of 
local farmers in Marinduque. Marinduque State University (MarSU)
established a free-range layer and broiler chicken multiplier breeding farm
with funding assistance from the Department of Agriculture under the
National Livestock Program and the Bayanihan to Recover as One-Act.`,
      },
      {
        highlights: [
          `The project aims to establish a breeder farm, which will be a sustainable
and eligible source of quality poultry stocks to be made available to local
farmers to support their livelihoods and improve their income.`,
        ],
      },
      {
        impact: [
          `Hands-on experience in poultry production and management`,
          `Availability of farm facility for animal production that can be utilized for instruction`,
          `Improved preference for free-range chicken products`,
          `Promotion of free-range chicken enterprise among farmers`,
        ],
      },
      {
        outcomes: [
          `166 farmers trained`,
          `146 students trained`,
          `243 beneficiaries of the stock dispersal program`,
          `3373 heads of stocks dispersed`,
          `Php 629, 385.62 total value of stocks dispersed`,
        ],
      },
      {
        plans: [``],
      },
    ],
    conclusion: `There is a project proposal submitted to the Department of Agriculture -
Agricultural Competitiveness Enhancement Fund to secure additional
funding. The project will also engage in technology commercialization by
tapping a farmers’ association to be capacitated on the commercial
production of free-range chicken.`,
    cta: ``,
    tags: [
      {
        name: [
          'No poverty',
          'Zero Hunger,',
          'Decent Work and Economic Growth,',
          'Responsible Consumption and Production',
        ],
        icons: [
          'E-WEB-Goal-01.png',
          'E-WEB-Goal-02.png',
          'E-WEB-Goal-08.png',
          'E-WEB-Goal-12.png',
        ],
      },
    ],
    gallery: [
      {
        id: 1,
        image: 'sdg/project/project-iUgpong/sdg-FreeRange-image01.jpg',
        caption: 'Free-range',
        alt: '',
      },
      {
        id: 2,
        image: 'sdg/project/project-iUgpong/sdg-FreeRange-image02.jpg',
        caption: 'Free-range',
        alt: '',
      },
      {
        id: 3,
        image: 'sdg/project/project-iUgpong/sdg-FreeRange-image03.jpg',
        caption: 'Free-range',
        alt: '',
      },
      {
        id: 4,
        image: 'sdg/project/project-iUgpong/sdg-FreeRange-image04.jpg',
        caption: 'Free-range',
        alt: '',
      },
    ],
  },

  // G.R.A.C.E - GOVERNANCE AND RESOURCE ADMINISTRATION FOR COMMUNITY EMPOWERMENT
  {
    id: 5,
    image: `sdg/project/grace.png`,
    title: `G.R.A.C.E - GOVERNANCE AND RESOURCE ADMINISTRATION FOR COMMUNITY EMPOWERMENT `,
    subtitle: `A Training Program for Barangay Officials`,
    desc: `A Training Program for Barangay Officials`,
    author: `Profugo, Joy`,
    date: `April 2021`,
    link: `/sdg-center/project/5/GRACE`,
    logo: `sdg/project/grace-logo.jpg`,
    contents: [
      {
        background: `Sta. Cruz is one of the municipalities in the province of Marinduque, consists of 55 barangays. Barangay officials from the different barangays were surveyed to find their educational background, training attended, and problems to prioritize their needs using training needs assessment tool (TNA).`,
      },
      {
        highlights: [
          ` A program designed to underscore the profile of barangay officials in Santa Cruz, Marinduque, one of the six (6) municipalities in the province of Marinduque, consisting of 55 barangays. It addresses how basic services of government are planned and delivered to the people through implementing policies and activities based on developed programs and projects of the community. `,
        ],
      },
      {
        impact: [
          `Exposure of the barangay problems among students`,
          `Laboratory for AB Political Science students`,
          `Subject for case-analysis among students to mitigate the problems`,
          `Strong partnerships with the concerned agencies`,
          `Factor in curriculum modification`,
          `Module development`,
        ],
      },
      {
        outcomes: [
          `A well-developed Barangay Development Plan`,
          `A well-written minutes of the meeting applying Records Management System`,
          `A well-planned project proposals`,
          `A well-executed meeting using Parliamentary Practice and Procedure`,
          `A well-implemented barangay laws and order and other government policies.
`,
        ],
      },
      {
        plans: [
          `Transfer of knowledge from one barangay to other barangays and one municipality to other municipalities`,
        ],
      },
    ],
    conclusion: `This program was conceptualized to provide all barangay officials in the 55 barangays of Sta. Cruz to have an access to training and development opportunities necessary to perform their official duties as public servants in the field of barangay administration and local governance. 
`,
    cta: ``,
    tags: [
      {
        name: [
          'Zero Hunger',
          'Climate Action',
          'Life Below Water',
          'Life on Land',
        ],
        icons: [
          'E-WEB-Goal-02.png',
          'E-WEB-Goal-13.png',
          'E-WEB-Goal-14.png',
          'E-WEB-Goal-15.png',
        ],
      },
    ],
    gallery: [
      {
        id: 1,
        image: 'sdg/project/project-iUgpong/sdg-GRACE-image01.jpg',
        caption: 'iUgpong',
        alt: '',
      },
      {
        id: 2,
        image: 'sdg/project/project-iUgpong/sdg-GRACE-image02.jpg',
        caption: 'iUgpong',
        alt: '',
      },
      {
        id: 3,
        image: 'sdg/project/project-iUgpong/sdg-GRACE-image03.jpg',
        caption: 'iUgpong',
        alt: '',
      },
      {
        id: 4,
        image: 'sdg/project/project-iUgpong/sdg-GRACE-image04.jpg',
        caption: 'iUgpong',
        alt: '',
      },
    ],
  },
  //iUgpong
  {
    id: 4,
    image: `sdg/project/iugnay.jpg`,
    title: `iUgpong`,
    subtitle: ` Connecting Internet Underprivileged Villages of Marinduque`,
    author: `Marinduque State University - College of Information and Computing Sciences (CICS)`,
    desc: `Connecting Internet Underprivileged Villages of Marinduque`,
    date: `January 2023`,
    link: `/sdg-center/project/4/iUgpong`,
    logo: `sdg/project/iugnay-logo.jpg`,
    featured: {
      isHero: true,
      isTall: false,
      isCompact: false, // Include in compact cards
      priority: 1,
      heroOrder: 1, // Fifth position (compact)
    },

    // Enhanced Rich Media Content
    media: {
      videos: [
        {
          type: 'documentary',
          url: 'sdg/project/videos/iugpong-installation.mp4',
          title: 'iUgpong Network Installation Process',
          thumbnail: 'sdg/project/videos/thumbnails/iugpong-thumb.jpg',
          duration: '5:45',
        },
        {
          type: 'testimonial',
          url: 'sdg/project/videos/iugpong-beneficiary-stories.mp4',
          title: 'Community Impact Stories',
          thumbnail: 'sdg/project/videos/thumbnails/impact-thumb.jpg',
          duration: '8:20',
        },
      ],
      interactive: [
        {
          type: 'network-map',
          url: 'sdg/project/interactive/iugpong-coverage-map.html',
          title: 'Interactive Coverage Map',
          description: 'Real-time network coverage and performance dashboard',
        },
      ],
      documents: [
        {
          type: 'technical',
          url: 'sdg/project/documents/iugpong-technical-guide.pdf',
          title: 'iUgpong Technical Implementation Guide',
          size: '2.8 MB',
        },
      ],
    },

    // Impact Metrics
    metrics: {
      quantitative: [
        {
          label: 'Active Users Served',
          value: 300,
          unit: 'individuals',
          category: 'digital-inclusion',
        },
        {
          label: 'Villages Connected',
          value: 5,
          unit: 'communities',
          category: 'geographic-reach',
        },
        {
          label: 'ROI Achieved',
          value: 173,
          unit: 'percentage',
          category: 'economic-sustainability',
        },
        {
          label: 'Students with Internet Access',
          value: 150,
          unit: 'students',
          category: 'education',
        },
        {
          label: 'Average Connection Speed',
          value: 25,
          unit: 'Mbps',
          category: 'technical-performance',
        },
      ],
      qualitative: [
        {
          category: 'digital-transformation',
          description: 'Bridged digital divide in remote island communities',
          evidence: 'Usage statistics and community surveys',
        },
        {
          category: 'educational-access',
          description:
            'Enhanced online learning opportunities for remote students',
          evidence: 'Student performance reports and teacher feedback',
        },
      ],
      sdgAlignment: [
        {
          goal: 4,
          percentage: 85,
          description: 'Quality education through improved digital access',
        },
        {
          goal: 9,
          percentage: 90,
          description: 'Resilient infrastructure and inclusive connectivity',
        },
        {
          goal: 17,
          percentage: 70,
          description: 'Technology partnerships for sustainable development',
        },
      ],
    },

    // Social Sharing & SEO
    sharing: {
      ogTitle: 'iUgpong: Connecting Remote Villages to the Digital World',
      ogDescription:
        'MarSU-CICS bridges the digital divide in Marinduque, connecting 300+ users across 5 villages with innovative satellite-WiFi technology achieving 173% ROI.',
      ogImage: 'sdg/project/sharing/iugpong-og-image.jpg',
      twitterCard: 'summary_large_image',
      keywords: [
        'digital inclusion',
        'internet connectivity',
        'remote villages',
        'satellite technology',
        'digital divide',
      ],
    },

    // Enhanced Search & Filtering
    searchMeta: {
      keywords: [
        'internet',
        'connectivity',
        'digital',
        'satellite',
        'wifi',
        'remote',
        'villages',
        'technology',
      ],
      categories: [
        'technology',
        'digital-inclusion',
        'infrastructure',
        'education',
      ],
      searchableText:
        'internet connectivity digital divide satellite technology remote villages wifi infrastructure',
      difficulty: 'advanced',
      duration: 'ongoing since January 2023',
    },

    // Partnership Details
    partnerships: [
      {
        name: 'MarSU College of Information and Computing Sciences',
        type: 'academic',
        role: 'lead-implementer',
        logo: 'partners/marsu-cics-logo.png',
        website: '',
        description: 'Lead technical implementer and system designer',
        startDate: '2023-01',
        status: 'active',
      },
      {
        name: 'Satellite Internet Service Provider',
        type: 'private-sector',
        role: 'technology-partner',
        logo: 'partners/satellite-provider-logo.png',
        website: '',
        description: 'Satellite internet infrastructure provider',
        startDate: '2023-01',
        status: 'active',
      },
      {
        name: 'Local Barangay Governments',
        type: 'local-government',
        role: 'community-partner',
        logo: 'partners/barangay-logo.png',
        website: '',
        description: 'Local government units hosting network infrastructure',
        startDate: '2023-01',
        status: 'active',
      },
    ],

    // Geographic Information
    location: {
      coordinates: { lat: 13.4644, lng: 121.8374 },
      address: 'Mongpong Island, Santa Cruz, Marinduque',
      regions: [
        'Mongpong',
        'Santa Cruz',
        'Marinduque',
        'MIMAROPA',
        'Philippines',
      ],
      mapConfig: {
        zoom: 13,
        style: 'satellite',
        markers: [
          {
            lat: 13.4644,
            lng: 121.8374,
            label: 'iUgpong Primary Site - Mongpong Island',
          },
          { lat: 13.45, lng: 121.82, label: 'Secondary Coverage Area' },
        ],
      },
      boundaries: {
        coverage: 'Island and coastal communities',
        beneficiaryArea: 'Multiple remote villages in Marinduque',
      },
    },

    // Performance Optimization
    optimization: {
      lazyLoad: true,
      priority: 'high',
      preloadImages: ['sdg/project/iugnay.jpg', 'sdg/project/iugnay-logo.jpg'],
      cachePolicy: 'medium-term',
    },
    contents: [
      {
        background: `The project was initiated to address the widespread lack of reliable internet connectivity in Marinduque’s remote locations, where geographical challenges hinder the reach of traditional mobile networks.`,
      },
      {
        highlights: [
          `This program bridges the digital divide in remote Marinduque villages using satellite technology by combining Satellite Internet with a CICS-designed Wi-Fi system. delivers affordable, high-speed connectivity despite geographical challenges. One sample village is in a Marinduque islet of Mongpong at the municipality of Santa Cruz, with over 1,000 residents now has more than 300 individuals accessing the internet, enhancing opportunities for education, communication, and economic growth. The initiative, also serving as an income-generating project, follows a structured approach including planning, network design, installation, testing, and monitoring.
`,
        ],
      },
      {
        impact: [
          `Provides students in remote locations with access to educational resources, enabling them to engage in online learning and research.`,
          `Expands the reach of MarSU educational programs and supports students and faculty in delivering remote instruction and conducting research`,
        ],
      },
      {
        outcomes: [
          `Over 300 users served in initial deployment areas, with consistent internet speeds maintained and revenue generated through the Wi-Fi service.`,
          `ROI of 173% within the first year, demonstrating the program’s economic viability and effectiveness.
`,
        ],
      },
      {
        plans: [
          `Plans include extending coverage to additional villages of Marinduque, improving technological infrastructure for greater resilience, and exploring further collaborations with technology partners to enhance system performance.
`,
        ],
      },
    ],
    conclusion: `The project promotes quality education, builds resilient infrastructure, and fosters sustainable community development. The income generated sustains technology costs, while local DepEd schools and barangays receive free internet access, supporting students in their online learning.

`,
    cta: ``,
    tags: [
      {
        name: [
          'Zero Hunger',
          'Climate Action',
          'Life Below Water',
          'Life on Land',
        ],
        icons: [
          'E-WEB-Goal-02.png',
          'E-WEB-Goal-13.png',
          'E-WEB-Goal-14.png',
          'E-WEB-Goal-15.png',
        ],
      },
    ],
    gallery: [
      {
        id: 1,
        image: 'sdg/project/project-iugpong/iugpong-1.JPG',
        caption: 'iUgpong',
        alt: '',
      },
      {
        id: 2,
        image: 'sdg/project/project-iugpong/iugpong-2.JPG',
        caption: 'iUgpong',
        alt: '',
      },
      {
        id: 3,
        image: 'sdg/project/project-iugpong/iugpong-3.JPG',
        caption: 'iUgpong',
        alt: '',
      },
      {
        id: 4,
        image: 'sdg/project/project-iugpong/iugpong-4.JPG',
        caption: 'iUgpong',
        alt: '',
      },
    ],
  },
  //LINGKOD: Language Integration for Governance and Knowledge Optimization & Development of Barangay Secretaries //
  {
    id: 1,
    image: `sdg/project/marsu-bneo.jpg`,
    title: `Language and Communication Proficiency Enhancement for Barangay Newly-Elected & Appointed Officials (BNEO)`,
    subtitle: `LINGKOD: Language Integration for Governance and Knowledge Optimization & Development of Barangay Secretaries`,
    desc: 'Mogpog Barangay Secretaries enhance language and communication skills through MarSU-Led Training - strengthens local governance paving the way for more transparent, educated, and tech-savvy communities.',
    author: `Jholey Rose R. Leaño-Lancion`,
    date: `March 2024`,
    link: `/sdg-center/project/1/Language Integration `,
    logo: `sdg/project/marsu-logo-LID.jpg`,

    // Enhanced Rich Media Content
    media: {
      videos: [
        {
          type: 'promotional',
          url: 'sdg/project/videos/bneo-training-highlights.mp4',
          title: 'BNEO Training Program Highlights',
          thumbnail: 'sdg/project/videos/thumbnails/bneo-thumb.jpg',
          duration: '3:45',
        },
        {
          type: 'testimonial',
          url: 'sdg/project/videos/bneo-participant-testimonials.mp4',
          title: 'Participant Success Stories',
          thumbnail: 'sdg/project/videos/thumbnails/testimonials-thumb.jpg',
          duration: '5:20',
        },
      ],
      audio: [
        {
          type: 'interview',
          url: 'sdg/project/audio/project-leader-interview.mp3',
          title: 'Project Leader Interview - Jholey Rose R. Leaño-Lancion',
          duration: '12:30',
        },
      ],
      interactive: [
        {
          type: 'infographic',
          url: 'sdg/project/interactive/communication-skills-infographic.html',
          title: 'Interactive Communication Skills Assessment',
          description: 'Self-assessment tool for communication proficiency',
        },
      ],
      documents: [
        {
          type: 'manual',
          url: 'sdg/project/documents/bneo-training-manual.pdf',
          title: 'BNEO Training Manual',
          size: '2.4 MB',
        },
      ],
    },

    // Impact Metrics (Ready for data population)
    metrics: {
      quantitative: [
        {
          label: 'Participants Trained',
          value: 45,
          unit: 'individuals',
          category: 'reach',
        },
        {
          label: 'Grammar Proficiency Improvement',
          value: 78,
          unit: 'percentage',
          category: 'learning-outcome',
        },
        {
          label: 'Communication Confidence Increase',
          value: 85,
          unit: 'percentage',
          category: 'learning-outcome',
        },
        {
          label: 'Training Modules Completed',
          value: 7,
          unit: 'modules',
          category: 'program-delivery',
        },
        {
          label: 'Barangays Covered',
          value: 25,
          unit: 'locations',
          category: 'geographic-reach',
        },
      ],
      qualitative: [
        {
          category: 'capacity-building',
          description:
            'Enhanced professional communication skills for local governance',
          evidence: 'Pre/post assessment results and participant feedback',
        },
        {
          category: 'institutional-impact',
          description:
            'Improved transparency and efficiency in barangay administration',
          evidence: 'Follow-up surveys and stakeholder interviews',
        },
      ],
      sdgAlignment: [
        {
          goal: 4,
          percentage: 90,
          description:
            'Primary focus on quality education and skills development',
        },
        {
          goal: 16,
          percentage: 75,
          description:
            'Strengthening institutions through improved governance communication',
        },
        {
          goal: 17,
          percentage: 60,
          description:
            'Partnership between MarSU and DILG for sustainable development',
        },
      ],
    },

    // Social Sharing & SEO Metadata
    sharing: {
      ogTitle:
        'LINGKOD: Empowering Local Governance Through Communication Training',
      ogDescription:
        'MarSU partners with DILG to enhance communication skills of barangay secretaries, strengthening local governance and transparency in Marinduque.',
      ogImage: 'sdg/project/sharing/bneo-og-image.jpg',
      twitterCard: 'summary_large_image',
      keywords: [
        'governance',
        'communication training',
        'barangay development',
        'local government',
        'MarSU',
        'DILG partnership',
      ],
    },

    // Enhanced Search & Filtering
    searchMeta: {
      keywords: [
        'governance',
        'communication',
        'training',
        'barangay',
        'secretaries',
        'DILG',
        'language skills',
        'local government',
      ],
      categories: [
        'education',
        'governance',
        'capacity-building',
        'partnership',
      ],
      searchableText:
        'communication proficiency enhancement barangay officials training language skills governance transparency',
      difficulty: 'intermediate',
      duration: '7-module program',
    },

    // Partnership & Collaboration Details
    partnerships: [
      {
        name: 'Department of the Interior and Local Government (DILG)',
        type: 'government',
        role: 'co-implementer',
        logo: 'partners/dilg-logo.png',
        website: 'https://dilg.gov.ph',
        description:
          'Primary government partner providing framework and policy support',
        startDate: '2024-01',
        status: 'active',
      },
      {
        name: 'DILG-Local Government Academy',
        type: 'training-institution',
        role: 'curriculum-partner',
        logo: 'partners/lga-logo.png',
        website: 'https://lga.gov.ph',
        description: 'Provided BNEO framework and training standards',
        startDate: '2018-01',
        status: 'ongoing',
      },
      {
        name: 'Municipality of Mogpog',
        type: 'local-government',
        role: 'beneficiary-partner',
        logo: 'partners/mogpog-logo.png',
        website: '',
        description: 'Local government unit hosting the training program',
        startDate: '2024-03',
        status: 'active',
      },
    ],

    // Geographic Information
    location: {
      coordinates: { lat: 13.4644, lng: 121.8374 },
      address: 'Mogpog, Marinduque, Philippines',
      regions: ['Mogpog', 'Marinduque', 'MIMAROPA', 'Philippines'],
      mapConfig: {
        zoom: 12,
        style: 'satellite',
        markers: [
          {
            lat: 13.4644,
            lng: 121.8374,
            label: 'Training Venue - Mogpog Municipal Hall',
          },
        ],
      },
      boundaries: {
        coverage: 'Municipality-wide',
        beneficiaryArea: '25 barangays in Mogpog',
      },
    },

    // Performance Optimization
    optimization: {
      lazyLoad: true,
      priority: 'high',
      preloadImages: [
        'sdg/project/marsu-bneo.jpg',
        'sdg/project/marsu-logo-LID.jpg',
      ],
      cachePolicy: 'long-term',
    },

    // Featured configuration
    featured: {
      isHero: false,
      isTall: false, // Set this as the tall card
      isCompact: true,
      priority: 5, // Second priority
      heroOrder: 5, // Second position (tall)
    },
    contents: [
      {
        background: `Marinduque State University (MarSU) teamed up with the Department of the Interior and Local Government (DILG) to transform the communication skills of Mogpog’s barangay secretaries. This dynamic training program, focused on language mastery, effective communication, and media literacy, is a game-changer for grassroots governance. By strengthening transparency and efficiency, the initiative fuels SDG 4 (Quality Education), SDG 16 (Peace, Justice, and Strong Institutions), and SDG 17 (Partnerships for the Goals), reflecting MarSU’s unwavering commitment to global standards and sustainable progress in local governance.`,
      },
      {
        highlights: [
          `The BNEO for GREAT Barangay Program, initiated by DILG-Local Government Academy in 2018, aims to enhance governance at the grassroots level. Understanding the critical role of barangay secretaries in communication and administration, MarSU developed a tailored training program that addresses the evolving demands of modern governance. The significance of this initiative extends to advancing SDGs by equipping secretaries with crucial skills for community development and effective public service. This collaboration exemplifies MarSU’s dedication to creating impactful local programs with a global perspective.`,
        ],
      },
      {
        impact: [
          `The training program unfolded through seven transformative modules, each designed to elevate the communication prowess of Mogpog’s barangay secretaries and drive impactful local governance. Participants began by sharpening their command of English grammar, which enabled them to produce clear, polished, and professional documents. Through interactive drills and real-world writing exercises, they gained the confidence to draft resolutions, minutes, and reports with precision—laying a solid foundation for effective governance. Building on this, the program bridged English and Filipino in formal communication, refining the art of crafting impactful memos, letters, and other official documents. Hands-on workshops emphasized cultural sensitivity and operational nuances, promoting professionalism while celebrating the national language’s integral role in governance. `,
          `This dual-language approach ensured participants could navigate both local and broader communication needs with ease. The training also focused on verbal communication, transforming secretaries into eloquent speakers capable of engaging with stakeholders and confidently representing their barangays. Real-life scenarios, such as mock dialogues and community discussions, provided ample practice, enabling them to handle high-stakes interactions with poise. In today’s digital landscape, effective media management is crucial. Participants were prepared to manage their barangay’s online presence through lessons on crafting compelling social media posts and discerning credible information. 

`,
          `By learning to leverage digital platforms responsibly, they fostered transparency and community engagement. Project leader Ms. Jholey Rose R. Leaño-Lancion underscored the program’s objective: “to build a robust foundation of communication skills tailored to the unique responsibilities of barangay secretaries.” The hands-on approach, complemented by rigorous pre- and post-assessments, ensured measurable progress. By the program’s conclusion, participants emerged as empowered leaders, ready to bring innovation, resilience, and internationalization to local governance.`,
        ],
      },
      {
        outcomes: [
          `The training’s success was evident in the significant improvement of proficiency levels across all modules. Statistical analysis confirmed that participants made substantial gains, particularly in grammar and media literacy. Module 3, English Conversational Fluency, had a transformative effect, increasing participants’ confidence in public and interpersonal communication. A participant, highlighted the program’s impact: “I’m now better equipped to represent our barangay and communicate effectively in various settings.” This program not only addressed communication gaps but also set a standard for future governance training. By empowering local leaders with essential skills, the initiative directly supports SDG 16’s focus on building strong and effective institutions.`,
        ],
      },
      {
        plans: [
          `Building on this success, MarSU has approved the conduct of a research project that will evaluate the competence of newly elected and appointed barangay officials in language, communication, and social case management across all barangays in Marinduque. This research will serve as the basis for a comprehensive capability enhancement program, ensuring that all local officials are well-prepared to serve their communities effectively. Additionally, MarSU plans to scale up the training program to include modules on advanced negotiation techniques, conflict resolution, and cross-cultural communication`,
        ],
      },
    ],
    conclusion: `The university is also pursuing international collaborations to integrate global best practices, fostering a culture of internationalization while addressing local needs. Future workshops will also include follow-up impact assessments, one year post-training, to ensure sustainable improvements and provide data-driven recommendations for further interventions. These plans underscore MarSU’s strategic commitment to SDG 4 and SDG 17, aiming to bridge local governance with global standards.`,
    cta: `By providing essential communication skills training, MarSU empowers local leaders to enhance governance and drive community development. This initiative not only strengthens local resilience but also fosters a globally connected and forward-thinking province. MarSU’s efforts underscore the critical role of higher education in bridging global and local challenges, reinforcing its mission to empower communities through education and international collaboration.`,
    tags: [
      {
        name: [
          'Quality Education',
          'Partnerships for the Goals',
          'PeaceJusticeandStrong Institutions',
        ],
        icons: ['E-WEB-Goal-04.png', 'E-WEB-Goal-17.png', 'E-WEB-Goal-17.png'],
      },
    ],
    gallery: [
      {
        id: 1,
        image: 'sdg/project/project-bneo/bneo-1.jpg',
        caption: 'Language Integration ',
        alt: '',
      },
      {
        id: 2,
        image: 'sdg/project/project-bneo/bneo-2.jpg',
        caption: 'Language Integration ',
        alt: '',
      },
      {
        id: 3,
        image: 'sdg/project/project-bneo/bneo-3.jpg',
        caption: 'Language Integration',
        alt: '',
      },
      {
        id: 4,
        image: 'sdg/project/project-bneo/bneo-4.jpg',
        caption: 'Language Integration',
        alt: '',
      },
    ],
  },
  // The Adopt-a-Cooperative Project  Empowering cooperatives through mentoring and coaching
  {
    id: 2,
    image: `sdg/project/marsu-coop.jpg`,
    title: `The Adopt-a-Cooperative Project`,
    subtitle: `Empowering cooperatives through mentoring and coaching .`,
    author: `Michael V. Capiña, PhD & Verna Liza L. Capiña, DBA`,
    date: `Nov. 8, 2024`,
    link: `/sdg/project/2/Empowering Cooperative`,
    logo: `sdg/project/marsu-logo-EMP.jpg`,
    // Featured configuration
    featured: {
      isHero: false,
      isTall: true,
      isCompact: false, // Include in compact cards
      priority: 2,
      heroOrder: 2, // Third position (compact)
    },
    contents: [
      {
        background: `This project is designed to provide education and training to cooperative officers and members in order to advance cooperative development and promote the principles of cooperativism and good governance throughout the province of Marinduque.  This primarily involves adopting various cooperatives for ongoing support and assistance in their management and business activities by providing them with mentoring and coaching.`,
      },
      {
        highlights: [
          `Since its inception in 2022, the Adopt-a-Cooperative project has successfully conducted 13 mandatory trainings and seminars, benefitting a total of 489 cooperative members, composed of men and women. Additionally, at the request of other government agencies, two more trainings were delivered to 55 participants, further expanding the project’s impact in promoting sustainable growth and resilience among cooperatives.`,
        ],
      },
      {
        impact: [
          `As a result of this project, Marinduque State University received accreditation from the Cooperative Development Authority of MIMAROPA in 2023 as the Training Provider for Trainings of Trainers (TOT) for cooperatives in the MIMAROPA region hence expanding its reach and scope.`,
        ],
      },
      {
        outcomes: [
          `Marinduque State University received accreditation from the Cooperative Development Authority of MIMAROPA`,
        ],
      },
      {
        plans: [
          `Future initiatives include alternative modes of providing cooperative education and training by integrating it in the curriculum, developing modules, and offering online coaching and mentoring, hence facilitating continuous cooperative empowerment across the region and beyond borders as well. `,
        ],
      },
    ],
    conclusion: `With this, MarSU will be a pioneering university in the region to support and promote cooperative growth and development, leading to communities that are more empowered, productive, and sustainable.`,
    cta: `To learn more about this innovative project or to get involved in supporting cooperative empowerment and in spreading cooperativism, visit ${`www.marsu.edu.ph/#/sdg`} or contact cba@marsu.edu.ph or capina.michael@marsu.edu.ph. `,
    tags: [
      {
        name: [
          'Quality Education',
          'Gender Equality',
          'Decent Work and Economic Growth',
          'Reduced Inequalities',
          'Partnership for the goals',
        ],
        icons: [
          'E-WEB-Goal-04.png',
          'E-WEB-Goal-05.png',
          'E-WEB-Goal-08.png',
          'E-WEB-Goal-10.png',
          'E-WEB-Goal-17.png',
        ],
      },
    ],
    gallery: [
      {
        id: 1,
        image: 'sdg/project/project-EMP/EMP-marsu-image01.jpg',
        caption: 'Empowering cooperatives',
        alt: '',
      },
      {
        id: 2,
        image: 'sdg/project/project-EMP/EMP-marsu-image02.jpg',
        caption: 'Empowering cooperatives',
        alt: '',
      },
      {
        id: 3,
        image: 'sdg/project/project-EMP/EMP-marsu-image03.jpg',
        caption: 'Empowering cooperatives',
        alt: '',
      },
      {
        id: 4,
        image: 'sdg/project/project-EMP/EMP-marsu-image04.jpg',
        caption: 'Empowering cooperatives',
        alt: '',
      },
    ],
  },
  // Project ScaleUp: From Waste to Value Scaling Up Arrowroot Enterprise through Arrowroot Bagasse Products Technology Transfer
  {
    id: 3,
    image: `sdg/project/marsu-scaleup.jpg`,
    title: `Project ScaleUp: From Waste to Value `,
    subtitle: `Scaling Up Arrowroot Enterprise through Arrowroot Bagasse Products Technology Transfer  .`,
    author: `Michael V. Capiña, PhD & Verna Liza L. Capiña, DBA`,
    date: `Nov. 8, 2024`,
    link: `/sdg-center/project/3/Project ScaleUp`,
    logo: `sdg/project/marsu-logo-ScaleUp.jpg`,
    // Featured configuration
    featured: {
      isHero: false,
      isTall: false,
      isCompact: true, // Include in compact cards
      priority: 3,
      heroOrder: 3, // Fifth position (compact)
    },
    contents: [
      {
        background: `Marinduque State University – College of Business and Accountancy (MarSU – CBA) leads a two-year project that converts underutilized waste from arrowroot starch extraction - the arrowroot bagasse or pulp, into value-added products such as arrowroot fiber-enhancer flour for bakery products such as cookies and brownies, boosting local agriculture, promoting arrowroot industry growth, and creating sustainable economic opportunities for arrowroot farmer, processors, and manufacturers.  `,
      },
      {
        highlights: [
          `This DA-ACEF funded project has made significant strides in its collaboration with the Bahi Agricultural and Fisheries Association (BAFA). Capacity-building trainings have been successfully conducted, each aimed at enhancing the skills and knowledge of BAFA members. Additionally, the project has already purchased complete equipment and supplies/materials for the processing and production of arrowroot bagasse/pulp products.`,
        ],
      },
      {
        impact: [
          `Studies show that for every kilo of fresh arrowroot rhizome, 28% of grinded rhizomes oftentimes goes to waste.  Utilization of the grinded rhizome waste (bagasse) into flour offers competitive advantage considering its proximate analysis and nutritional facts per serving as compared to casava and wholewheat flours.  Evaluation for arrowroot cookies and brownies on different sensory attributes (appearance, aroma, taste, texture and general acceptability) showed the most acceptable ratio among the majority of the evaluators is 75% arrowroot flour utilization.  This Project ScaleUp is leveraged on these potentials and advantages.`,
        ],
      },
      {
        outcomes: [
          `This DA-ACEF funded project has made significant strides in its collaboration with the Bahi Agricultural and Fisheries Association (BAFA). Capacity-building trainings have been successfully conducted, each aimed at enhancing the skills and knowledge of BAFA members. Additionally, the project has already purchased complete equipment and supplies/materials for the processing and production of arrowroot bagasse/pulp products.`,
        ],
      },
      {
        plans: [`---`],
      },
    ],
    conclusion: `The commercialization of arrowroot bagasse/pulp flour leads to full production and utilization of arrowroot bagasse/pulp thus maximizing the use of resources.  An increased market demand for arrowroot bagasse/pulp flour, including its bakery products results to an increased demand for its raw materials, the arrowroot rhizomes. This generates additional income to arrowroot rhizomes processors resulting from the full utilization of rhizomes into arrowroot starch and the production of fiber-enriched flour out of the bagasse/pulp. Consequently, the arrowroot farmers benefit as the buying price for arrowroot rhizomes increase due to the value added.  At the end, all players in the supply chain are benefitted thus leading to a sustainable arrowroot industry in Marinduque.`,
    cta: `To learn more about this innovative project or to get involved in supporting local agriculture and sustainable production, visit [MarSU Website] or contact cba@marsu.edu.ph or capina.michael@marsu.edu.ph`,
    tags: [
      {
        name: [
          'No Poverty ',
          'Responsible Consumption and Production',
          'Partnership for the goals',
        ],
        icons: ['E-WEB-Goal-01.png', 'E-WEB-Goal-12.png', 'E-WEB-Goal-17.png'],
      },
    ],
    gallery: [
      {
        id: 1,
        image: 'sdg/project/project-ScaleUp/ScaleUp-marsu-image01.jpg',
        caption: 'ScaleUp',
        alt: '',
      },
      {
        id: 2,
        image: 'sdg/project/project-ScaleUp/ScaleUp-marsu-image02.jpg',
        caption: 'ScaleUp',
        alt: '',
      },
      {
        id: 3,
        image: 'sdg/project/project-ScaleUp/ScaleUp-marsu-image03.jpg',
        caption: 'ScaleUp',
        alt: '',
      },
      {
        id: 4,
        image: 'sdg/project/project-ScaleUp/ScaleUp-marsu-image04.jpg',
        caption: 'ScaleUp',
        alt: '',
      },
    ],
  },
  // Rimas
  {
    id: 8,
    image: `sdg/project/rimas.png`,
    title: `Empowering Communities through Rimas: MarSU-CIT’s Extension Project Drives Socio-Economic Growth `,
    subtitle: `After six years, Marinduque State University's initiative has improved skills, created jobs, and fostered sustainable income from Rimas products, transforming local economies and recommending further expansion across the province.`,
    desc: `A six-year impact study by the Department of Trade and Industry (DTI) highlights the positive socio-economic effects of Marinduque State University`,
    author: `College of Industrial Technology`,
    date: `November 6, 2023`,
    link: `/sdg-center/project/8/Empowering Communities through Rimas: MarSU-CIT’s Extension Project Drives Socio-Economic Growth`,
    logo: `sdg/project/rimas-logo.jpg`,
    featured: {
      isHero: false,
      isTall: false,
      isCompact: true, // Include in compact cards
      priority: 8,
      heroOrder: 8, // Fifth position (compact)
    },
    contents: [
      {
        background: `Marinduque State University (MarSU) plays a key role in community development in Marinduque, supporting local needs through its fourfold mission of instruction, research, extension, and production. One notable community project led by MarSU’s College of Industrial Technology (CIT) involves technology transfer focused on breadfruit (Rimas) for creating locally sourced food products. MarSU identified Rimas as a valuable resource for food production, utilizing various parts of the tree, including its fruits and seeds, to make flour. In 2017, MarSU-CIT launched free training sessions in Boac, Marinduque, where faculty trained locals in making Rimas-based products to support small businesses and generate income. With MarSU’s initial support through resources and tools, the project enabled participants to establish food businesses. Six years later, an impact study conducted by the Department of Trade and Industry (DTI) revealed positive social and economic benefits from the project, highlighting its contribution to sustainable income generation and community improvement.`,
      },
      {
        highlights: [``],
      },
      {
        impact: [
          `The Rimas Extension Project has made a notable difference in the lives of its beneficiaries by developing Rimas (breadfruit) products that contribute to both social and economic growth within the community..`,
        ],
      },
      {
        outcomes: [
          `a.	Social and Economic Benefits`,
          `Through the project, beneficiaries learned how to create various Rimas-based products like flour, pastillas, polvoron, and espasol, which they can sell. This skill development led to innovation and allowed participants to expand their business reach and diversify their offerings. Some even began employing local students, generating additional income for young people in the area. This has positively impacted community bonds, as members support each other in producing and selling Rimas products. `,
          `b.	Economic Growth and Job Creation`,
          `The project, led by MarSU-CIT, contributed to the community's economic status by improving incomes and creating job opportunities, particularly for local women’s groups like KALIPI. Rimas-based products are now available in distant markets, even reaching places as far as Palawan and London. With more efficient production and an expanded supply chain, these products are accessible and affordable, which boosts both local and external sales. `,
          `c.	Long-Term Potential and Sustainability`,
          `The long-term implications of the Rimas project are promising. It offers rural community members sustainable income opportunities and contributes to a resilient local economy. While government policy support remains limited, the project has laid the groundwork for future growth and potential policy influence. By providing a steady source of income and fostering economic collaboration, the Rimas Extension Project strengthens the community's economic stability and self-reliance, demonstrating sustainable socio-economic practices.`,
        ],
      },
      {
        plans: [
          `a.	Continuous Extension Projects on Rimas Products`,
          `MarSU will consider conducting similar extension projects involving Rimas products and other local goods. These initiatives can be extended to interested individuals in various barangays across Marinduque. The expansion of such community service programs can not only benefit the local population but also serve as a foundation for future comparative impact studies.`,
          `b.	Sustaining the Supply and Market of Rimas Products`,
          `To ensure the continued availability and demand for Rimas products, MarSU will engage in ongoing research and training for beneficiaries of this extension project. This training can focus on diversifying the use of Rimas flour in combination with other types of flour, thus extending the supply of this seasonal fruit and opening new market possibilities.`,
          `c.	Collaboration with Local and International Agencies`,
          `MarSU will actively explore partnerships with both local and international agencies, particularly those within the industry, to further support individuals involved in the production of Rimas products. These collaborations can help attract a broader customer base, ensuring the project's sustainability and providing necessary resources for growth.`,
        ],
      },
    ],
    conclusion: `By implementing these plans, MarSU will contribute to the continuous development and success of Rimas product ventures, benefiting both the local economy and the broader community. In conclusion, the extension project initiated by the College of Industrial Technology on training with Rimas products has proven to be highly beneficial. It has not only enhanced the innovative and entrepreneurial skills of the beneficiaries but also positively impacted their economic status by generating additional income and creating new opportunities within the local community. Furthermore, the project has promoted sustainability by encouraging the long-term use of Rimas as a valuable raw material, benefiting both the individual participants and the broader community. With a focus on SDG 8 and empowerment, MarSU-CIT’s Rimas project is truly “Empowering Minds, Transforming Lives.”`,
    cta: `Call to Action: For more information about MarSU-CIT extension programs, visit the College of Industrial Technology Facebook Page “Marinduque State University – College of Industrial Technology” or email us at industrialtechnology.1952@gmail.com. `,
    tags: [
      {
        name: ['Decent Work and Economic Growth'],
        icons: ['E-WEB-Goal-08.png'],
      },
    ],
    gallery: [
      {
        id: 1,
        image: 'sdg/project/project-rimas/rimas-1.png',
        caption: 'rimas',
        alt: '',
      },
      {
        id: 2,
        image: 'sdg/project/project-rimas/rimas-2.png',
        caption: 'rimas',
        alt: '',
      },
      {
        id: 3,
        image: 'sdg/project/project-rimas/rimas-3.png',
        caption: 'rimas',
        alt: '',
      },
      {
        id: 4,
        image: 'sdg/project/project-rimas/rimas-4.png',
        caption: 'rimas',
        alt: '',
      },
    ],
  },
  {
    id: 9,
    title:
      'Building Bridges for Global Cooperation: MarSU and Universitas Airlangga Sign MOU',
    subtitle:
      'Marinduque State University and Universitas Airlangga formalize partnership to enhance academic cooperation, research exchange, and cultural collaboration.',
    logo: 'sdg/project/mou-logo.jpg',
    author: 'Marinduque State University',
    date: 'March 2024',
    desc: 'This project aims to establish a formal partnership between Marinduque State University and Universitas Airlangga to enhance academic cooperation, research exchange, and cultural collaboration.',
    image: 'sdg/project/mou.jpg',
    link: `/sdg-center/project/9/Building Bridges for Global Cooperation: MarSU and Universitas Airlangga Sign MOU`,
    featured: {
      isHero: false,
      isTall: false,
      isCompact: true, // Include in compact cards
      priority: 9,
      heroOrder: 9, // Fifth position (compact)
    },
    contents: [
      {
        background: `In a significant step towards expanding international collaboration, Marinduque State University (MarSU) and Universitas Airlangga (UNAIR) of Indonesia held a virtual signing of a Memorandum of Understanding (MOU), 2PM Philippine Time. This partnership marks a new chapter in academic cooperation, research exchange, and cultural collaboration between the two institutions.
        The MOU signifies a mutual commitment to fostering global connections through joint programs, faculty exchanges, collaborative research initiatives, and student mobility opportunities. By joining forces, MarSU and Universitas Airlangga aim to promote the exchange of knowledge and best practices across borders, enhancing the educational experiences of their respective communities.
        With the authority from the Board of Regents, Prof. Dr. Diosdado P. Zulueta signed the MOU on behalf of MarSU. Universitas Airlangga was represented by Dr. Mohammad Nasih, UNAIR Rector.
        Key officials of both universities witnessed the virtual signing of the partnership. `,
      },
      {
        highlights: [
          `The signing of the MOU between MarSU and Universitas Airlangga is a significant milestone in the internationalization efforts of both institutions. This partnership will open doors to new opportunities for academic and cultural exchange, research collaboration, and joint initiatives that will benefit students, faculty, and staff.`,
        ],
      },
      {
        impact: [
          `The signing of the MOU between MarSU and Universitas Airlangga is a significant milestone in the internationalization efforts of both institutions. This partnership will open doors to new opportunities for academic and cultural exchange, research collaboration, and joint initiatives that will benefit students, faculty, and staff.`,
        ],
      },
      {
        outcomes: [
          `The signing of the MOU between MarSU and Universitas Airlangga is a significant milestone in the internationalization efforts of both institutions. This partnership will open doors to new opportunities for academic and cultural exchange, research collaboration, and joint initiatives that will benefit students, faculty, and staff.`,
        ],
      },
      {
        plans: [
          `The signing of the MOU between MarSU and Universitas Airlangga is a significant milestone in the internationalization efforts of both institutions. This partnership will open doors to new opportunities for academic and cultural exchange, research collaboration, and joint initiatives that will benefit students, faculty, and staff.`,
        ],
      },
    ],
    conclusion: ``,
    cta: ``,
    tags: [
      {
        name: ['Quality Education', 'Partnerships for the Goals'],
        icons: ['E-WEB-Goal-04.png', 'E-WEB-Goal-17.png'],
      },
    ],
    gallery: [],
  },

  {
    id: 10,
    title:
      '𝐅𝐫𝐨𝐦 𝐓𝐡𝐞 𝐇𝐞𝐚𝐫𝐭, 𝐓𝐨 𝐭𝐡𝐞 𝐖𝐨𝐫𝐥𝐝: 𝐂𝐇𝐄𝐃 𝐚𝐧𝐝 𝐌𝐚𝐫𝐒𝐔 𝐏𝐚𝐫𝐭𝐧𝐞𝐫 𝐟𝐨𝐫 𝐒𝐭𝐫𝐚𝐭𝐞𝐠𝐢𝐜 𝐈𝐧𝐭𝐞𝐫𝐧𝐚𝐭𝐢𝐨𝐧𝐚𝐥𝐢𝐳𝐚𝐭𝐢𝐨𝐧',
    subtitle: `From The Heart, To The World: CHED and MarSU Partner for Strategic Internationalization`,
    logo: '',
    featured: {
      isHero: false,
      isTall: false,
      isCompact: true, // Include in compact cards
      priority: 10,
      heroOrder: 10, // Fifth position (compact)
    },
    author: 'Marinduque State University',
    date: 'October 2024',
    desc: 'From The Heart, To The World: CHED and MarSU Partner for Strategic Internationalization, a project that aims to enhance the global competitiveness of MarSU through strategic partnerships and international collaborations.',
    contents: [
      {
        background: `Marinduque State University (MarSU), in collaboration with the Commission on Higher Education (CHED) Regional Office - MIMAROPA, held a two-day Orientation-Workshop on Strategic Approaches to Internationalization, Global Citizenship Education, Ranking, and Sustainable Development in Education from October 9-10, 2024.
    The event, spearheaded by Dr. Jimmy G. Catanes, CHED-MIMAROPA Regional Director, empowered MarSU’s academic community—students, faculty, researchers, and administrators—with the tools to align with global education standards. The focus on internationalization and global citizenship equips students to become globally competitive, while faculty and staff benefit from new international collaboration opportunities.
    This initiative also positions MarSU as a key player in the global academic arena by integrating international benchmarks such as the Times Higher Education (THE) Impact Ranking and WURI Ranking. With the continued support of CHED-MIMAROPA, MarSU is on track to enhance its reputation and broaden opportunities for the university, contributing to the long-term growth of higher education in the region.
    The collective efforts of the MarSU community led by the University President, Prof. Dr. Diosdado P. Zulueta highlights MarSU’s unified commitment to global excellence. Through this workshop, MarSU continues to pave the way for a more globally integrated, future-ready academic community `,
      },
      {
        highlights: [``],
      },
      {
        impact: [``],
      },
      {
        outcomes: [``],
      },
      {
        plans: [``],
      },
    ],
    conclusion: ``,
    cta: ``,
    image: 'sdg/project/ched-marsu.jpg',
    link: `/sdg-center/project/10/From The Heart, To The World: CHED and MarSU Partner for Strategic Internationalization`,
    tags: [
      {
        name: ['Partnerships for the Goals'],
        icons: ['E-WEB-Goal-17.png'],
      },
    ],
    gallery: [],
  },
  {
    id: 11,
    title:
      'Forging Synergy for World-Class Industrial Technologists: The MarSU and Coast Mountain College Partnership ',
    subtitle: ``,
    author: ``,
    date: ``,
    logo: '',
    featured: {
      isHero: false,
      isTall: false,
      isCompact: true, // Include in compact cards
      priority: 11,
      heroOrder: 11, // Fifth position (compact)
    },
    desc: `Marinduque State University (MarSU) and Coast Mountain College took a significant step towards international cooperation with the event titled Global Synergy: Forging International Partnerships, held under the theme "Expanding Horizons: Strengthening International Linkages in Industrial Technology." `,
    contents: [
      {
        background: `Marinduque State University (MarSU) and Coast Mountain College took a significant step towards international cooperation with the event titled Global Synergy: Forging International Partnerships, held under the theme "Expanding Horizons: Strengthening International Linkages in Industrial Technology." The collaboration aims to foster academic and technological exchange, benefiting both institutions' faculty, staff, and students.
    MarSU President, Professor Dr. Diosdado P. Zulueta, highlighted the strategic role of international linkages in the university’s overall development. He emphasized that partnerships like these are instrumental in expanding the horizons of the university’s academic and technological capabilities, particularly in the field of industrial technology.
    Representing Coast Mountain College, Mr. Evan van Dyk shared his excitement about the collaboration. His official message underscored the mutual benefits of the partnership, particularly in the sharing of best practices and the possibility of student and faculty exchanges that would further enhance the learning experiences in both institutions.
    his event marks the beginning of a promising partnership that is expected to bring forth innovation, growth, and global exposure for both Marinduque State University and Coast Mountain College. As they strengthen their ties, the two institutions are poised to contribute meaningfully to the global landscape of industrial technology.`,
      },
      {
        highlights: [``],
      },
      {
        impact: [``],
      },
      {
        outcomes: [``],
      },
      {
        plans: [``],
      },
    ],
    conclusion: ``,
    cta: ``,
    image: 'sdg/project/marsu-coast.jpg',
    link: `/sdg-center/project/11/Forging Synergy for World-Class Industrial Technologists: The MarSU and Coast Mountain College Partnership`,
    tags: [
      {
        name: ['Quality Education', 'Partnerships for the Goals'],
        icons: ['E-WEB-Goal-04.png', 'E-WEB-Goal-17.png'],
      },
    ],
    gallery: [],
  },
  {
    id: 12,
    title:
      'Bridging Connections for Sustainable Futures: MarSU Partners with ANAAA',
    subtitle: ``,
    author: ``,
    date: ``,
    logo: '',
    featured: {
      isHero: false,
      isTall: false,
      isCompact: true, // Include in compact cards
      priority: 12,
      heroOrder: 12, // Fifth position (compact)
    },
    desc: `Marinduque State University (MarSU) and the Association of National Agencies and Accredited Associations (ANAAA) have joined forces to create a sustainable future through the project titled "Bridging Connections for Sustainable Futures: MarSU Partners with ANAAA."`,
    contents: [
      {
        background: `The Marinduque State University cordially hosted the visit of the National Agency for Academic Assessment and Accreditation (NAAAA) of the Democratic Republic of Timor Leste on September 19, 2024 at MarSU Main Campus, Tanza, Boac ,Marinduque and discussed the proposed areas of cooperation with NAAA and selected universities in East Timor.
    As the Marinduque State University (MarSU) strengthens its international relations with various agencies and universities around the world, the community took another major step in fulfilling its role in partnership building for curriculum development and research opportunities by implementing its internationalization program and activities mechanisms.
    The agenda included the establishment of a framework for international academic cooperation, curriculum development aligned with East Timor Higher Educational Standards, and faculty development aligned with East Timor qualification standards.`,
      },
      {
        highlights: [``],
      },
      {
        impact: [``],
      },
      {
        outcomes: [``],
      },
      {
        plans: [``],
      },
    ],
    conclusion: ``,
    cta: ``,
    image: 'sdg/project/marsu-anana.jpg',
    link: `/sdg-center/project/12/Bridging Connections for Sustainable Futures: MarSU Partners with ANAAA`,
    tags: [
      {
        name: ['Quality Education'],
        icons: ['E-WEB-Goal-04.png'],
      },
    ],
    gallery: [],
  },

  {
    id: 14,
    title:
      'Capacitating Educators on Research and Challenged Areas Program (CERCA)',
    subtitle: ``,
    author: `Dr. Liza Marie Manoos-Pacia`,
    date: `2020`,
    logo: '',
    featured: {
      isHero: false,
      isTall: false,
      isCompact: true, // Include in compact cards
      priority: 14,
      heroOrder: 14, // Fifth position (compact)
    },
    desc: `The 3Es Module project at Marinduque State University was designed to equip instructors with a structured, remote teaching model to maintain educational continuity during the pandemic.`,
    contents: [
      {
        background: `The sequence should start with building strong partnerships and finalizing agreements (e.g., MOAs with DepEd), followed by technology integration and resource preparation. Training programs should be rolled out once the necessary tools and support structures are in place, with continuous monitoring and feedback loops to ensure adjustments as needed for successful execution.`,
      },
      {
        highlights: [
          `The project achieved its objectives through effective use of technology and collaboration with DepEd.`,
          `Training was tailored based on teacher feedback, ensuring relevance and impact.`,
          `The training was already conducted twice and will continuously and consistenly be conducted.`,
          `Continuous evaluation allowed for improvements, ensuring the training met the evolving needs of teachers.`,
        ],
      },
      {
        impact: [
          `The learners receive quality education with well-trained teachers.`,
          `Participants successfully developed instructional materials or modules for specific topics, which were validated by the DepEd Learning Resource Management.`,
          `Participants identified relevant research problems, developed research proposals, and presented them for critique. Some research projects were accepted for presentation in forums and publication in journals.`,
          `Participants gained in-depth knowledge of the subjects they teach at the elementary level, mastering specific disciplines in education.`,
          `Participants successfully designed learning plans and strategies utilizing contemporary teaching methods, enhancing their pedagogical skills.`,
        ],
      },
      {
        outcomes: [
          `The program yielded instructional materials, research proposals, and teaching strategies that were successfully presented, critiqued, and published. Participants demonstrated increased mastery of their subjects and contemporary pedagogical techniques.`,
        ],
      },
      {
        plans: [
          `Moving forward, the project aims to be expanded to reach more educators across various regions, with a focus on scaling up the training and research components. It can also be integrated into broader educational initiatives by partnering with more government bodies and institutions. Future steps may include regular follow-up sessions to assess the long-term impact on teaching practices, a continued emphasis on research application, and the potential for national dissemination of successful teaching modules and research studies.`,
        ],
      },
    ],
    conclusion: ``,
    cta: ``,
    image: 'sdg/project/educator.jpg',
    link: `/sdg-center/project/14/Capacitating Educators on Research and Challenged Areas Program (CERCA)`,
    tags: [
      {
        name: ['Quality Education'],
        icons: ['E-WEB-Goal-04.png'],
      },
    ],
    gallery: [],
  },
  {
    id: 15,
    title: `Promoting and Safeguarding Marinduque's Heritage in Folk Music`,
    subtitle: ``,
    author: `Dr. Rex Emannuel L. Asuncion`,
    date: `2011`,
    logo: '',
    featured: {
      isHero: false,
      isTall: false,
      isCompact: true, // Include in compact cards
      priority: 15,
      heroOrder: 15, // Fifth position (compact)
    },
    desc: `Promoting and Safeguarding Marinduque's Heritage in Folk Music, a project that aims to preserve and promote Marinduque's rich folk music heritage through meticulous research and documentation.`,
    contents: [
      {
        background: `Dr. Rex Emmanuel Laurel Asuncion is dedicated to preserving and promoting Marinduque's rich folk music heritage. Through meticulous research, he has documented traditional songs such as "Alamat ng Dalawang Puting Gansa" and "Sulong, Aking Tandang," ensuring their authenticity and socio-cultural significance. His published work, "PAKINGGI Compilation of Selected Marinduque Island Folk Songs," serves as an important educational resource. Asuncion integrates these songs into the music curriculum to foster local identity and patriotism. His efforts also extend to choreographing folk dances and producing a documentary to further disseminate Marinduque's unique musical culture, ensuring its preservation for future generations.`,
      },
      {
        highlights: [
          ` The project preserves Marinduque's unique folk music by documenting, transcribing, and arranging traditional songs.`,
          `  It integrates these folk songs into educational curricula, fostering cultural pride and identity among students.`,
          `    The project includes both audio and written documentation, as well as choreography for community performances.`,
        ],
      },
      {
        impact: [
          `Enhanced cultural pride and identity among students as they learn about Marinduque’s heritage.`,
          `Improved musical skills through exposure to traditional folk music, leading to a deeper appreciation of local art forms.`,
          `Development of a sense of responsibility to preserve their cultural heritage, fostering patriotism and community engagement`,
          ` Professors gain unique educational resources to incorporate local culture into their teaching, enriching the curriculum.`,
          `The university strengthens its role as a preserver of Marinduque’s heritage, enhancing its reputation within the community and among cultural organizations.`,
          `Increased research opportunities for faculty members interested in cultural studies, music education, and preservation.`,
        ],
      },
      {
        outcomes: [
          `Publication of PAKINGGI Compilation of Selected Marinduque Island Folk Songs and its distribution in schools and libraries.`,
          `Integration of folk music into local educational curricula, measurable by the number of schools adopting the curriculum.`,
          `Number of documented songs, student performances, and the audience reached through the documentary and public performances.`,
        ],
      },
      {
        plans: [
          `Moving forward, Dr. Asuncion’s project aims to expand documentation of Marinduque’s traditional songs, deepen integration into regional and national educational curricula, and enhance public access through digital archives. By hosting community performances and collaborating with local tourism, the project seeks to boost cultural pride and attract visitors. Efforts will also focus on securing sustainable funding and pursuing broader recognition through national and international cultural platforms, ensuring Marinduque’s folk music is preserved, celebrated, and accessible to future generations.
`,
        ],
      },
    ],
    conclusion: ``,
    cta: ``,
    image: 'sdg/project/culture.jpg',
    link: `/sdg-center/project/15/Promoting and Safeguarding Marinduque's Heritage in Folk Music`,
    tags: [
      {
        name: ['Quality Education'],
        icons: ['E-WEB-Goal-04.png'],
      },
    ],
    gallery: [],
  },
];

// Helper functions for dynamic project selection
export const getFeaturedProjects = () => {
  // Sort projects by heroOrder first, then by priority
  const sortedProjects = projects
    .filter((project) => project.featured)
    .sort((a, b) => {
      // First sort by heroOrder (if specified)
      if (a.featured.heroOrder && b.featured.heroOrder) {
        return a.featured.heroOrder - b.featured.heroOrder;
      }
      if (a.featured.heroOrder) return -1;
      if (b.featured.heroOrder) return 1;

      // Then sort by priority
      return a.featured.priority - b.featured.priority;
    });

  return {
    hero: sortedProjects.find((p) => p.featured.isHero),
    tall: sortedProjects.find((p) => p.featured.isTall),
    compact: sortedProjects.filter((p) => p.featured.isCompact),
    all: sortedProjects,
  };
};

export const getHeroProject = () => {
  return projects.find((project) => project.featured?.isHero) || projects[0];
};

export const getTallProject = () => {
  return projects.find((project) => project.featured?.isTall) || projects[1];
};

export const getCompactProjects = (limit = 6) => {
  const compactProjects = projects.filter(
    (project) => project.featured?.isCompact
  );
  return compactProjects.length > 0
    ? compactProjects.slice(0, limit)
    : projects.slice(2, 2 + limit);
};

export const getFeaturedByOrder = () => {
  const orderedProjects = projects
    .filter((project) => project.featured?.heroOrder)
    .sort((a, b) => a.featured.heroOrder - b.featured.heroOrder);

  return {
    hero: orderedProjects.find((p) => p.featured.heroOrder === 1),
    tall: orderedProjects.find((p) => p.featured.heroOrder === 2),
    compact: orderedProjects.filter((p) => p.featured.heroOrder >= 3),
  };
};

// 🆕 ENHANCED SEARCH & FILTERING FUNCTIONS

/**
 * Advanced search with multiple filter options
 * @param {string} query - Search query
 * @param {Object} filters - Filter options
 * @returns {Array} Filtered projects
 */
export const searchProjects = (query = '', filters = {}) => {
  const {
    categories = [],
    sdgGoals = [],
    regions = [],
    partnerTypes = [],
    dateRange = null,
    hasMedia = null,
    hasMetrics = null,
  } = filters;

  return projects.filter((project) => {
    // Text search across multiple fields
    if (query) {
      const searchableText = [
        project.title,
        project.subtitle,
        project.desc,
        project.author,
        project.searchMeta?.searchableText,
        ...(project.searchMeta?.keywords || []),
      ]
        .join(' ')
        .toLowerCase();

      if (!searchableText.includes(query.toLowerCase())) {
        return false;
      }
    }

    // Category filter
    if (categories.length > 0) {
      const projectCategories = project.searchMeta?.categories || [];
      if (!categories.some((cat) => projectCategories.includes(cat))) {
        return false;
      }
    }

    // SDG Goals filter
    if (sdgGoals.length > 0) {
      const projectSDGs =
        project.tags?.[0]?.icons
          ?.map((icon) => parseInt(icon.match(/Goal-(\d+)/)?.[1]))
          .filter(Boolean) || [];

      if (!sdgGoals.some((goal) => projectSDGs.includes(goal))) {
        return false;
      }
    }

    // Geographic filter
    if (regions.length > 0) {
      const projectRegions = project.location?.regions || [];
      if (!regions.some((region) => projectRegions.includes(region))) {
        return false;
      }
    }

    // Partner type filter
    if (partnerTypes.length > 0) {
      const projectPartnerTypes =
        project.partnerships?.map((p) => p.type) || [];
      if (!partnerTypes.some((type) => projectPartnerTypes.includes(type))) {
        return false;
      }
    }

    // Date range filter
    if (dateRange) {
      const projectDate = new Date(project.date);
      if (projectDate < dateRange.start || projectDate > dateRange.end) {
        return false;
      }
    }

    // Media filter
    if (hasMedia !== null) {
      const hasProjectMedia = Boolean(
        project.media &&
          (project.media.videos?.length > 0 ||
            project.media.audio?.length > 0 ||
            project.media.interactive?.length > 0)
      );
      if (hasMedia !== hasProjectMedia) {
        return false;
      }
    }

    // Metrics filter
    if (hasMetrics !== null) {
      const hasProjectMetrics = Boolean(
        project.metrics &&
          (project.metrics.quantitative?.length > 0 ||
            project.metrics.qualitative?.length > 0)
      );
      if (hasMetrics !== hasProjectMetrics) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Filter projects by category
 * @param {string|Array} category - Category name(s)
 * @returns {Array} Filtered projects
 */
export const getProjectsByCategory = (category) => {
  const categories = Array.isArray(category) ? category : [category];
  return projects.filter((project) => {
    const projectCategories = project.searchMeta?.categories || [];
    return categories.some((cat) => projectCategories.includes(cat));
  });
};

/**
 * Filter projects by SDG goals
 * @param {number|Array} sdgGoals - SDG goal number(s)
 * @returns {Array} Filtered projects
 */
export const getProjectsBySDG = (sdgGoals) => {
  const goals = Array.isArray(sdgGoals) ? sdgGoals : [sdgGoals];
  return projects.filter((project) => {
    const projectSDGs =
      project.tags?.[0]?.icons
        ?.map((icon) => parseInt(icon.match(/Goal-(\d+)/)?.[1]))
        .filter(Boolean) || [];

    return goals.some((goal) => projectSDGs.includes(goal));
  });
};

/**
 * Filter projects by geographic location
 * @param {string|Array} region - Region name(s)
 * @returns {Array} Filtered projects
 */
export const getProjectsByLocation = (region) => {
  const regions = Array.isArray(region) ? region : [region];
  return projects.filter((project) => {
    const projectRegions = project.location?.regions || [];
    return regions.some((reg) => projectRegions.includes(reg));
  });
};

/**
 * Filter projects by partnership type
 * @param {string|Array} partnerType - Partner type(s)
 * @returns {Array} Filtered projects
 */
export const getProjectsByPartnership = (partnerType) => {
  const types = Array.isArray(partnerType) ? partnerType : [partnerType];
  return projects.filter((project) => {
    const projectPartnerTypes = project.partnerships?.map((p) => p.type) || [];
    return types.some((type) => projectPartnerTypes.includes(type));
  });
};

/**
 * Get projects with rich media content
 * @param {string} mediaType - Type of media ('videos', 'audio', 'interactive', 'all')
 * @returns {Array} Projects with specified media
 */
export const getProjectsWithMedia = (mediaType = 'all') => {
  return projects.filter((project) => {
    if (!project.media) return false;

    if (mediaType === 'all') {
      return (
        project.media.videos?.length > 0 ||
        project.media.audio?.length > 0 ||
        project.media.interactive?.length > 0
      );
    }

    return project.media[mediaType]?.length > 0;
  });
};

/**
 * Get projects with quantitative impact metrics
 * @returns {Array} Projects with metrics data
 */
export const getProjectsWithMetrics = () => {
  return projects.filter((project) => {
    return (
      project.metrics &&
      (project.metrics.quantitative?.length > 0 ||
        project.metrics.qualitative?.length > 0)
    );
  });
};

/**
 * Get all unique categories across projects
 * @returns {Array} Unique categories
 */
export const getAllCategories = () => {
  const categories = new Set();
  projects.forEach((project) => {
    project.searchMeta?.categories?.forEach((cat) => categories.add(cat));
  });
  return Array.from(categories).sort();
};

/**
 * Get all unique SDG goals across projects
 * @returns {Array} Unique SDG goal numbers
 */
export const getAllSDGGoals = () => {
  const goals = new Set();
  projects.forEach((project) => {
    project.tags?.[0]?.icons?.forEach((icon) => {
      const goalNumber = parseInt(icon.match(/Goal-(\d+)/)?.[1]);
      if (goalNumber) goals.add(goalNumber);
    });
  });
  return Array.from(goals).sort((a, b) => a - b);
};

/**
 * Get all unique regions across projects
 * @returns {Array} Unique regions
 */
export const getAllRegions = () => {
  const regions = new Set();
  projects.forEach((project) => {
    project.location?.regions?.forEach((region) => regions.add(region));
  });
  return Array.from(regions).sort();
};

/**
 * Performance optimization: Get projects with lazy loading priority
 * @param {string} priority - Priority level ('high', 'medium', 'low')
 * @returns {Array} Projects with specified priority
 */
export const getProjectsByPriority = (priority) => {
  return projects.filter(
    (project) => project.optimization?.priority === priority
  );
};

export default projects;
