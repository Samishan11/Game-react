import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from './pages/home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Contact } from "../src/pages/contact/Contact"
import Footer from './components/footer/Footer';
import Pagenotfound from './pages/404/Pagenotfound';
import Dashboard from './pages/admin/Dashboard';
import { ProtectedAdmin } from './pages/privet/Privetroutes';
import { TeamProvider } from './context/teamContext';
import { SportProvider } from './context/sportContext';
import { UserProvider } from './context/userContext';
import Standing from './pages/standing/Standing';
import Detail from "./pages/detail/Detail";
import History from './pages/history/History';
import Sport from './pages/sport/Sport';
import AddSportPrivet from './pages/AddSportPrivet';
import Forgotpassword from './pages/forgot-password/Forgotpassword';
import Resetpassword from './pages/forgot-password/Reset-password';
import Verify from './pages/verify/Verify';
import { NewsProvider } from './context/newsContext';
import News from './pages/news/News';
function App() {
  return (
    <TeamProvider >
      <SportProvider>
        <UserProvider>
          <NewsProvider>
            <Router>
              <Routes>
                <Route path='/' caseSensitive={false} element={<Home />} />
                <Route path='/login' caseSensitive={false} element={<Login />} />
                <Route path='/register' caseSensitive={false} element={<Register />} />
                <Route path='/contact' caseSensitive={false} element={<Contact />} />
                <Route path='/standing' caseSensitive={false} element={<Standing />} />
                <Route path='/detail/:id' caseSensitive={false} element={<Detail />} />
                <Route path='/sport' caseSensitive={false} element={<Sport />} />
                <Route path='/news' caseSensitive={false} element={<News />} />
                <Route path='/add-sport' caseSensitive={false} element={<AddSportPrivet />} />
                <Route path='/forgot-password' caseSensitive={false} element={<Forgotpassword />} />
                <Route path='/reset-password/:token' caseSensitive={false} element={<Resetpassword />} />
                <Route path='/verify-email/:token' caseSensitive={false} element={<Verify />} />
                <Route element={<ProtectedAdmin />}>
                  <Route exact path='/admin-dashboard' element={<Dashboard></Dashboard>}></Route>
                  <Route path='/history' caseSensitive={false} element={<History />} />
                </Route>
                <Route path='*' element={<Pagenotfound></Pagenotfound>}></Route>
              </Routes>
              <Footer />
              <ToastContainer className="mt-5" />
            </Router>
          </NewsProvider>
        </UserProvider>
      </SportProvider>
    </TeamProvider>
  );
}

export default App;
