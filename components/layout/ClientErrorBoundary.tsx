"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ClientErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log internal application errors
    if (process.env.NODE_ENV === "development") {
      console.warn("ClientErrorBoundary caught error:", error, errorInfo);
    }
  }

  public componentDidMount() {
    // Suppress external browser extension unhandled promise rejections / wallet injection errors
    if (typeof window !== "undefined") {
      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        if (
          event.reason &&
          typeof event.reason === "object" &&
          (event.reason.type === "sender-wallet-providerResult" ||
            event.reason.message?.includes("sender-wallet") ||
            event.reason.message?.includes("sender_getProviderState") ||
            event.reason.error === "No account exist")
        ) {
          event.preventDefault();
        }
      };

      window.addEventListener("unhandledrejection", handleUnhandledRejection);
      return () => {
        window.removeEventListener("unhandledrejection", handleUnhandledRejection);
      };
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-matte p-6 text-ivory">
          <div className="max-w-md w-full rounded-xl border border-charcoal-light/60 bg-charcoal/80 p-6 text-center space-y-4 shadow-xl">
            <h2 className="text-xl font-bold text-ivory">Something went wrong</h2>
            <p className="text-sm text-silver">
              An unexpected display issue occurred. Please refresh the page to restore the session.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false });
                if (typeof window !== "undefined") window.location.reload();
              }}
              className="px-4 py-2 bg-gold/90 text-matte hover:bg-gold rounded-lg font-medium transition-colors text-sm"
            >
              Refresh Workspace
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
