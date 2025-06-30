import { Link } from 'react-router-dom';

function Breadcrumb({ items }) {
  return (
    <nav 
      aria-label="Breadcrumb navigation" 
      className="mb-6"
      role="navigation"
    >
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <svg
                className="w-4 h-4 mx-2 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {item.href && index < items.length - 1 ? (
              <Link
                to={item.href}
                className="text-primary-600 hover:text-primary-800 hover:underline transition-colors"
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`${
                  index === items.length - 1
                    ? 'text-gray-900 font-medium'
                    : 'text-gray-600'
                }`}
                aria-current={index === items.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
