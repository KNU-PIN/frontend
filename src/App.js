import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <button
                onClick={() => {
                  navigate("/page");
                }}
              >
                글쓰기
              </button>
            </>
          }
        />
        <Route path="/page" element={<Event />} />
        <Route path="*" element={<div>404page</div>} />
      </Routes>
    </div>
  );
}

function Event() {
  return (
    <div>
      <h2>글쓰기 페이지</h2>
      <Outlet />
    </div>
  );
}

export default App;
