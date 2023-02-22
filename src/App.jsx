import { Routes, Route, useNavigate, Outlet } from "react-router-dom";

import GlobalStyle from "./components/layout/GlobalStyle";

import Landing from "./pages/Landing";
import Pinboard from "./pages/Pinboard";
import Err from "./pages/Err";
import PinList from "./pages/PinList";
import CreatePin from "./pages/CreatePin";
import PostDetail from "./pages/PostDetail";


function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <GlobalStyle/>
      <Routes>
        <Route path="/" element={<Pinboard />} />
        <Route path="/Pinboard" element={<Pinboard />} />
        <Route path="/PinList" element={<PinList />} />
        <Route path="/CreatePin" element={<CreatePin />} />
        <Route path="/PostDetail" element={<PostDetail/>}></Route>
        <Route path="*" element={<Err />} />
      </Routes>
    </div>
  );
}

export default App;
