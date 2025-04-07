import { useState, useEffect } from 'react';

export const useColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //   colleges mock data

  const collegeData = {
    cics: {
      name: 'College of Information and Computing Sciences',
      description: 'Focused on IT and computing programs.',
      tagline: 'Empowering the Future with Information and Computing Sciences',
    },
    ceng: {
      name: 'College of Engineering',
      description: 'Specializing in engineering disciplines.',
      tagline: 'Building a Sustainable Future through Engineering Excellence',
    },
    coahs: {
      name: 'College of Allied Health Sciences',
      description: 'Dedicated to health-related programs.',
      tagline: 'Transforming Healthcare through Allied Health Sciences',
    },
    cit: {
      name: 'College of Industrial Technology',
      description: 'Specializing in industrial technology programs.',
      tagline: 'Innovating Industries through Technology and Skills',
    },
    cfas: {
      name: 'College of Fishery and Aquatic Sciences',
      description: 'Specializing in fishery and aquatic sciences.',
      tagline: 'Sustaining Aquatic Resources for Future Generations',
    },
    cba: {
      name: 'College of Business Administration',
      description: 'Focused on business and management programs.',
      tagline: 'Empowering Future Leaders in Business',
    },
    ccj: {
      name: 'College of Criminal Justice',
      description: 'Dedicated to criminal justice programs.',
      tagline: 'Upholding Justice and Integrity in Society',
    },
    cgov: {
      name: 'College of Governance',
      description: 'Specializing in governance and public administration.',
      tagline: 'Leading Change through Effective Governance',
    },

    coed: {
      name: 'College of Education',
      description: 'Dedicated to education and teaching programs.',
      tagline: 'Inspiring Future Generations through Quality Education',
    },
    cass: {
      name: 'College of Arts and Sciences',
      description: 'Specializing in arts and sciences programs.',
      tagline: 'Fostering Creativity and Critical Thinking',
    },
    cens: {
      name: 'College of Environmental Science',
      description: 'Dedicated to environmental science programs.',
      tagline: 'Protecting Our Planet through Environmental Science',
    },
    gs: {
      name: 'Graduate School',
      description: 'Offering advanced degrees and research opportunities.',
      tagline: 'Pursuing Excellence in Graduate Education',
    },
  };

  useEffect(() => {
    const fetchColleges = async () => {
      //   try {
      //     const response = await fetch('/api/colleges'); // Adjust the API endpoint as needed
      //     if (!response.ok) throw new Error('Failed to fetch colleges');
      //     const data = await response.json();
      //     setColleges(data);
      //   } catch (err) {
      //     setError(err.message);
      //   } finally {
      //     setLoading(false);
      //   }
      //   Using mock data for now
      setColleges(
        Object.entries(collegeData).map(([key, value]) => ({ key, ...value }))
      );
      setLoading(false);
    };

    fetchColleges();
  }, []);

  return { colleges, loading, error };
};
