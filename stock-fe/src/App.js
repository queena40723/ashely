import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Stock from "./components/Stock";
import About from "./components/About";
import Login from "./components/Login";
import Register from "./components/Register";
import StockDetails from "./components/StockDetails";
import NotFound from "./components/NotFound";
import { AuthContext } from "./context/auth";
import { API_URL } from "./utils/config";
import axios from "axios";

function App() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    // 每次重新整理或開啟頁面時，都去確認一下是否在已經登入的狀態。
    const getMember = async () => {
      try {
        let result = await axios.get(`${API_URL}/member`, {
          withCredentials: true,
        });
        setMember(result.data);
      } catch (e) {
        // 尚未登入過
        // 401 也不會去 setMember
      }
    };
    getMember();
  }, []);
  return (
    <AuthContext.Provider value={{ member, setMember }}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Stock />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stock/:stockId" element={<StockDetails />}>
            <Route path=":currentPage" element={<StockDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
