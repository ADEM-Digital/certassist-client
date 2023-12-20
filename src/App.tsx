import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Tests from "./pages/tests/Tests";
import TestWizard from "./pages/TestWizard/TestWizard";
import { QueryClient, QueryClientProvider } from "react-query";
import TestInstance from "./pages/TestInstance/TestInstance";
import { ReactQueryDevtools } from "react-query/devtools";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./pages/Login/Login";
import { useEffect } from "react";

const queryClient = new QueryClient();

function App() {  

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Tests />} />
              <Route path="/tests/new" element={<TestWizard />} />
            </Route>
            <Route path="/test/:id" element={<TestInstance />} />
          </>

          <Route path="/login" element={<Login />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
