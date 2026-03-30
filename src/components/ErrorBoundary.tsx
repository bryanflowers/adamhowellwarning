"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      const isThai = typeof window !== "undefined" && (window.location.pathname === "/th" || window.location.pathname.startsWith("/th/"));
      return (
        this.props.fallback ?? (
          <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
            <div className="text-center max-w-md px-6">
              <h1 className="text-4xl font-bold mb-4">
                {isThai ? "เกิดข้อผิดพลาด" : "Something went wrong"}
              </h1>
              <p className="text-muted-foreground mb-6">
                {this.state.error?.message || (isThai ? "เกิดข้อผิดพลาดที่ไม่คาดคิด" : "An unexpected error occurred.")}
              </p>
              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                  window.location.href = isThai ? "/th" : "/";
                }}
                className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                {isThai ? "กลับหน้าหลัก" : "Go Home"}
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
