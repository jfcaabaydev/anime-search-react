import { Routes, Route } from "react-router-dom";
import BrowsePage from "./pages/BrowsePage";
import DetailPage from "./pages/DetailPage";
import MyListPage from "./pages/MyListPage";
import Header from "./components/Header";
import "./App.css";


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<BrowsePage />} />
        <Route path="/anime/:id" element={<DetailPage />} />
        <Route path="/mylist" element={<MyListPage />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </>
  );
}

export default App;
