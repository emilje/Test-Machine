import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import BasicReflex from "./pages/Games/BasicReflex/BasicReflex";
import AimReflex from "./pages/Games/AimReflex/AimReflex";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="basicgame" element={<BasicReflex />} />
      <Route path="aimreflex" element={<AimReflex />} />
    </Routes>
  );
}

export default App;
