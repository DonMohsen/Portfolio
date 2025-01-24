import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ReactQueryProvider;
