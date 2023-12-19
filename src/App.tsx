import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Tests from "./pages/tests/Tests";
import TestWizard from "./pages/TestWizard/TestWizard";
import { QueryClient, QueryClientProvider } from "react-query";
import TestInstance from "./pages/TestInstance/TestInstance";
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Tests />} />
            <Route path="/tests/new" element={<TestWizard />} />
          </Route>
          <Route path="/test/:id" element={<TestInstance />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </>
  );
}

export default App;
