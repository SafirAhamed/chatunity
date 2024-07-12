import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes/routes.js";
import { Suspense } from "react";
import './app.scss'

function App() {


  return (
    <div className="App screen_main">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route) => (
              <Route path={route.path} element={route.component} />
            ))}
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
