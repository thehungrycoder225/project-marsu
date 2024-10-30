import React from 'react';
import { useParams } from 'react-router-dom';
import goals from './goals'; // Adjust the import path as needed
import projects from './projects'; // Adjust the import path as needed

const SDGGoalDetail = () => {
  const { id } = useParams();
  const goal = goals.find((goal) => goal.id === parseInt(id));

  if (!goal) {
    return <div>Goal not found</div>;
  }

  const relatedProjects = projects.filter((project) =>
    project.tags.some((tag) => tag.name === goal.title)
  );

  return (
    <div className='container'>
      <div className='goal-detail'>
        <h1>{goal.title}</h1>
        <img src={goal.image} alt={goal.alt} />
        <p>{goal.description}</p>
      </div>
      <div className='related-projects'>
        <h2>Related Projects</h2>
        {relatedProjects.length > 0 ? (
          relatedProjects.map((project) => (
            <div key={project.id} className='project-item'>
              <img src={project.image} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>
          ))
        ) : (
          <p>No related projects found.</p>
        )}
      </div>
    </div>
  );
};

export default SDGGoalDetail;
