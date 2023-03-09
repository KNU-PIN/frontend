import { Routes, Route } from "react-router-dom";
import Pinboard from "./pages/Pinboard";
import PostDetail from "./pages/PostDetail";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Pinboard />} />
                {/* <Route path="/Pinboard" element={<Pinboard />} /> */}
                <Route
                    path="/PostDetail/:pinId"
                    element={<PostDetail />}
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
