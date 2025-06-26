import { useState, useEffect } from 'react';

export const useColleges = () => {
  const [colleges, setColleges] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [research, setResearch] = useState([]);
  const [universityNews, setUniversityNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('/data/marsu-resources/Resources.json');
        if (!response.ok) {
          throw new Error('Failed to fetch college resources');
        }
        const resourceData = await response.json();
        setColleges(resourceData.colleges || []);
        setPrograms(resourceData.programs || []);
        setFaculty(resourceData.faculty || []);
        setResearch(resourceData.research || []);
        setUniversityNews(resourceData.news || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchColleges();
  }, []);

  return {
    colleges,
    programs,
    faculty,
    research,
    universityNews,
    loading,
    error,
  };
};
