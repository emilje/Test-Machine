import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
// import BasicReflex from "./pages/Games/BasicReflex/BasicReflex";
// import AimReflex from "./pages/Games/AimReflex/AimReflex";
import SoundReflex from "./pages/Games/SoundReflex/SoundReflex";
import React, { Suspense } from "react";

const BasicReflex = React.lazy(() =>
  import("./pages/Games/BasicReflex/BasicReflex")
);
const AimReflex = React.lazy(() => import("./pages/Games/AimReflex/AimReflex"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route
        path="basicgame"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <BasicReflex />
          </Suspense>
        }
      />
      <Route
        path="aimreflex"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <AimReflex />
          </Suspense>
        }
      />
      <Route path="soundreflex" element={<SoundReflex />} />
    </Routes>
  );
}

export default App;
