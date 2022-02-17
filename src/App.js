import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage/Homepage";
import BasicReflex from "./pages/Games/BasicReflex/BasicReflex";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="basicgame" element={<BasicReflex />} />
    </Routes>
  );
}

export default App;
