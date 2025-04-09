import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 border border-red-500 rounded bg-red-50">
          <h2 className="text-red-700 font-bold mb-2">發生錯誤</h2>
          <p className="text-red-600">
            此組件發生錯誤，請重新載入頁面或聯繫系統管理員。
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 