import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { FallbackLoading } from "./components/Loading";

import * as ModHome from "./modHome";

function App() {
  return (
    <Suspense fallback={<FallbackLoading />}>
      <Routes>
        <Route path="/" element={<ModHome.Landing />} />
      </Routes>
    </Suspense>
  );
}

export default App;
