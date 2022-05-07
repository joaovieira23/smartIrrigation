import React from 'react';

import { AuthProvider } from './auth';
import { QueryClientProvider, QueryClient, QueryCache } from 'react-query';

const queryCache = new QueryCache();

export const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: 2
    }
  }
});

const AppProvider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>{children}</AuthProvider>
  </QueryClientProvider>
);

export default AppProvider;
