import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const collegeColors = {
  cics: {
    '--primary-700': '#6ec207',
    '--primary-600': '#7edc2a',
    '--primary-500': '#8efc3d',
    '--secondary-700': '#ffeb00',
    '--secondary-600': '#ffeb00',
    '--secondary-500': '#ffeb00',
  },
  ceng: {
    '--primary-700': '#ff6600',
    '--primary-600': '#ff7f00',
    '--primary-500': '#ff9900',
  },
  cit: {
    '--primary-700': '#fac937',
    '--primary-600': '#f0e68c',
    '--primary-500': '#e6d641',
  },
  coahs: {
    '--primary-700': '#652483',
    '--primary-600': '#7a2b9c',
    '--primary-500': '#8f32b5',
  },
  cass: {
    '--primary-700': '#ff5d99',
    '--primary-600': '#ff6daa',
    '--primary-500': '#ff7ebb',
  },
  cfas: {
    '--primary-700': '#02d8e9',
    '--primary-600': '#1ee0f2',
    '--primary-500': '#3ae8fc',
  },
  ccj: {
    '--primary-700': '#800000',
    '--primary-600': '#9b0000',
    '--primary-500': '#b70000',
  },
  cens: {
    '--primary-700': '#125c13',
    '--primary-600': '#1a6f1a',
    '--primary-500': '#228522',
  },
  cba: {
    '--primary-700': '#636b2f',
    '--primary-600': '#7a8b3a',
    '--primary-500': '#8faf4d',
  },
  cgov: {
    '--primary-700': '#a70000',
    '--primary-600': '#b70000',
    '--primary-500': '#c70000',
  },
  coed: {
    '--primary-700': '#2d80d2',
    '--primary-600': '#3f9be0',
    '--primary-500': '#51b6ef',
  },
  cagri: {
    '--primary-700': '#00b200',
    '--primary-600': '#00c700',
    '--primary-500': '#00d800',
  },
  gs: {
    '--primary-700': '#660020',
    '--primary-600': '#80002a',
    '--primary-500': '#990033',
    '--secondary-700': '#ec8305',
    '--secondary-600': '#f59b0a',
    '--secondary-500': '#f5c20a',
  },
};

const defaultColors = {
  '--primary-700': '#660033',
  '--primary-600': '#80004d',
  '--primary-500': '#990066',
};

function updateCSSVariables(colors) {
  const root = document.documentElement;
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}

export function useDynamicTheme() {
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const collegeKey = pathSegments[2]; // Assuming URL structure is /colleges/:collegeKey

    if (collegeColors[collegeKey]) {
      updateCSSVariables(collegeColors[collegeKey]);
    } else {
      updateCSSVariables(defaultColors);
    }
  }, [location]);
}

// example usage in a component
// import React from 'react';
// import { useDynamicTheme } from '../hooks/useDynamicTheme';
//
// const ExampleComponent = () => {
//   useDynamicTheme();
//
//   return (
//     <div className="example-component">
//       <h1>Hello, World!</h1>
//     </div>
//   );
// };

// export default ExampleComponent;
// This hook dynamically updates CSS variables based on the college key in the URL.

// example usage in css
// :root {
//   --primary-700: #660033;
//   --primary-600: #80004d;
//   --primary-500: #990066;
//   --secondary-700: #ec8305;
//   --secondary-600: #f59b0a;
//   --secondary-500: #f5c20a;
// }

// .example-component {
//   background-color: var(--primary-500);
//   color: var(--secondary-500);
//   padding: 20px;
//   border-radius: 5px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//   transition: background-color 0.3s ease, color 0.3s ease;
// }

// .example-component:hover {
//   background-color: var(--primary-600);
//   color: var(--secondary-600);
//   transform: scale(1.02);
//   box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
// }
