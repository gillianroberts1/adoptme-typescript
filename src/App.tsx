import { createRoot } from "react-dom/client";
import { useState } from "react";
import SearchParams from "./SearchParams";
import { StrictMode } from "react";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Details from "./Details";
import AdoptedPetContext from "./AdoptedPetContext";
import { Pet } from "./APIResponsesTypes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null as Pet | null)
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPet}>
          <header>
            <Link to="/"> Adopt Me!</Link>
          </header>
          <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
          </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container to render to")
}
const root = createRoot(container);
root.render(<App />);

// export default App;
