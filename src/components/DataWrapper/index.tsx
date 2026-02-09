// import React, { createContext, useContext } from 'react';

// // Generic Resource type with a default of `unknown`
// type Resource<T = unknown> = {
//   data: T | null; // The resolved resource value
//   isLoading: boolean; // Loading status
//   error: Error | null; // Error information, if any
// };

// // Infers the resolved data type, ensuring `data` is fully resolved and non-optional
// type ResolvedData<T> = {
//   [K in keyof T]: T[K] extends Resource<infer R> ? NonNullable<R> : never;
// };

// // Props for the Generic DataWrapper
// type DataWrapperProps<T extends Record<string, Resource>> = {
//   data: T; // A dictionary of resources (typed automatically)
//   children: ((resolvedData: ResolvedData<T>) => React.ReactNode) | React.ReactNode; // Children as a function with resolvedData
//   fallback?: React.ReactNode; // Optional fallback for loading states
//   errorFallback?: (errors: { [K in keyof T]: Error | null }) => React.ReactNode; // Custom error fallback
// };

// // Factory function for creating a reusable wrapper and hook
// function createDataWrapper<T>() {
//   // Dynamic Context
//   const Context = createContext<T | null>(null);

//   // Hook to access the context (fully typed)
//   function useData() {
//     const context = useContext(Context);
//     if (!context) {
//       throw new Error('useData must be used within its corresponding DataWrapper.');
//     }
//     return context;
//   }

//   // Wrapper Component
//   function DataWrapper<T extends Record<string, Resource>>({
//     data,
//     children,
//     fallback = <div>Loading...</div>,
//     errorFallback = (errors) => (
//       <div>
//         {Object.entries(errors).map(([key, error]) =>
//           error ? (
//             <div key={key}>
//               Error in {key}: {error.message}
//             </div>
//           ) : null
//         )}
//       </div>
//     ),
//   }: DataWrapperProps<T>) {
//     // Aggregate loading and error states
//     const hasLoading = Object.values(data).some((resource) => resource.isLoading);
//     const hasError = Object.values(data).some((resource) => resource.error !== null);

//     // Create resolved data and error objects
//     const resolvedData = {} as ResolvedData<T>;
//     const errors: { [K in keyof T]: Error | null } = {} as any;

//     for (const key in data) {
//       resolvedData[key] = data[key].data as ResolvedData<T>[typeof key];
//       errors[key] = data[key].error;
//     }

//     // Handle loading and error states
//     if (hasLoading) return <>{fallback}</>;
//     if (hasError) return <>{errorFallback(errors)}</>;

//     // Provide the resolved data to children via context
//     return (
//       <Context.Provider value={resolvedData}>
//         {typeof children === 'function' ? children(resolvedData) : children}
//       </Context.Provider>
//     );
//   }

//   return { DataWrapper, useData };
// }

// export { createDataWrapper, Resource };
