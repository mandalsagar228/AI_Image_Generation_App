import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { logo } from "./assets";
import { CreatePost, Homes } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <header className="w-full flex items-center justify-between   bg-white sm:px-8 px-4 py-4  border-b border-b-[#e6ebf4]">
          <Link to="/">
            <img src={logo} alt="logo" className=" w-28 object-contain" />
          </Link>
          {/* <div className="font-bold text-2xl">Dalle Model</div> */}
          <Link
            to="/create-post"
            className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md"
          >
            Create
          </Link>
        </header>
        <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
          <Routes>
            <Route path="/" element={<Homes />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
