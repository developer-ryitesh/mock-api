import React from "react";

type State = {
   hasError: boolean;
   error: Error | null;
};

type WithSafeBoundaryOptions = {
   fallback?: React.ReactNode | ((error: Error) => React.ReactNode);
};

export function withSafeBoundary<P>(WrappedComponent: React.ComponentType<P>, options?: WithSafeBoundaryOptions): React.ComponentType<P> {
   return class SafeBoundaryWrapper extends React.Component<P, State> {
      constructor(props: P) {
         super(props);
         this.state = { hasError: false, error: null };
      }

      static getDerivedStateFromError(error: Error): State {
         return { hasError: true, error };
      }

      componentDidCatch(error: Error, info: React.ErrorInfo) {
         console.error("Caught by withSafeBoundary:", error, info);
      }

      render() {
         const { hasError, error } = this.state;

         if (hasError && error) {
            if (typeof options?.fallback === "function") {
               return options.fallback(error);
            }

            return (
               options?.fallback ?? (
                  <div className="p-2 text-red-700 bg-red-50 rounded">
                     <h2 className="text-xl font-bold mb-2">Something went wrong.</h2>
                     <p className="mb-2 text-sm">
                        <strong>Error:</strong> {error.message}
                     </p>
                     <pre className="whitespace-pre-wrap p-2 rounded text-[9px] overflow-x-auto">{error.stack}</pre>
                  </div>
               )
            );
         }

         return <WrappedComponent {...this.props} />;
      }
   };
}
