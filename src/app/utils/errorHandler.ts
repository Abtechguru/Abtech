// Error handler to suppress MetaMask and other browser extension errors

let errorHandlerInitialized = false;

export function initErrorHandler() {
  // Only initialize once
  if (errorHandlerInitialized) return;
  errorHandlerInitialized = true;

  // Suppress MetaMask connection errors from console
  const originalError = console.error;
  const originalWarn = console.warn;

  console.error = (...args) => {
    const errorMessage = String(args[0] || '');

    // Ignore MetaMask-related errors
    if (
      errorMessage.includes('MetaMask') ||
      errorMessage.includes('chrome-extension://') ||
      errorMessage.includes('ethereum') ||
      errorMessage.includes('web3') ||
      errorMessage.includes('Failed to connect')
    ) {
      return;
    }

    // Log all other errors normally
    originalError.apply(console, args);
  };

  console.warn = (...args) => {
    const warnMessage = String(args[0] || '');

    // Ignore MetaMask-related warnings
    if (
      warnMessage.includes('MetaMask') ||
      warnMessage.includes('chrome-extension://') ||
      warnMessage.includes('ethereum') ||
      warnMessage.includes('web3')
    ) {
      return;
    }

    // Log all other warnings normally
    originalWarn.apply(console, args);
  };

  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error = String(event.reason?.message || event.reason || '');

    // Ignore MetaMask-related errors
    if (
      error.includes('MetaMask') ||
      error.includes('chrome-extension://') ||
      error.includes('ethereum') ||
      error.includes('web3') ||
      error.includes('Failed to connect')
    ) {
      event.preventDefault();
      return;
    }
  });

  // Handle regular errors
  window.addEventListener('error', (event) => {
    const error = String(event.message || '');

    // Ignore MetaMask-related errors
    if (
      error.includes('MetaMask') ||
      error.includes('chrome-extension://') ||
      error.includes('ethereum') ||
      error.includes('web3') ||
      error.includes('Failed to connect')
    ) {
      event.preventDefault();
      return;
    }
  });

  // Block MetaMask provider injection attempts
  try {
    // Define ethereum as non-configurable undefined
    if (typeof window !== 'undefined' && !window.hasOwnProperty('ethereum')) {
      Object.defineProperty(window, 'ethereum', {
        configurable: false,
        enumerable: false,
        get() {
          return undefined;
        },
        set() {
          // Silently ignore
        }
      });
    }

    // Define web3 as non-configurable undefined
    if (typeof window !== 'undefined' && !window.hasOwnProperty('web3')) {
      Object.defineProperty(window, 'web3', {
        configurable: false,
        enumerable: false,
        get() {
          return undefined;
        },
        set() {
          // Silently ignore
        }
      });
    }
  } catch (e) {
    // If properties already exist, ignore
  }
}

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  // Run immediately
  initErrorHandler();

  // Also run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initErrorHandler);
  }
}

