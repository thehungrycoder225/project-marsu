import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='min-h-[400px] flex items-center justify-center bg-red-50 rounded-lg border border-red-200'>
          <div className='text-center p-8'>
            <div className='text-red-600 text-5xl mb-4'>⚠️</div>
            <h2 className='text-xl font-bold text-red-800 mb-2'>
              Something went wrong
            </h2>
            <p className='text-red-600 mb-4'>
              We&apos;re sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'
            >
              Refresh Page
            </button>
            {import.meta.env.DEV && (
              <details className='mt-4 text-left'>
                <summary className='cursor-pointer text-red-600 hover:text-red-800'>
                  Error Details (Development Only)
                </summary>
                <pre className='mt-2 text-xs text-red-800 bg-red-100 p-2 rounded overflow-auto'>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
