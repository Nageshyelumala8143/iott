import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Home from './components/LandingPages/homePage/index';
import Login from './components/authPages/login';
import Register from './components/authPages/register';
import ForgotPassword from './components/authPages/forgotPassword';
import AboutUs from './components/LandingPages/aboutUs/index';
import FAQs from './components/LandingPages/faq/index';
import Privacy from './components/LandingPages/privacyPolicy';
import TermsAndCondition from './components/LandingPages/termsAndCondition';
import Feedback from './components/LandingPages/feedback';
import DetailsPage from './components/LandingPages/homePageDetails';
import LanguageDetailsone from './components/LandingPages/categoryDetails';
import ViewDetailsone from './components/LandingPages/viewAllDetails';
import ContactUs from './components/LandingPages/contactus/index';
import Notification from './components/LandingPages/notificationPage/index';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}>
            {({ match }) => <Home match={match} />}
          </Route>
          <Route exact path='/login' element={<Login />}>
            {({ match }) => <Login match={match} />}
          </Route>
          <Route exact path='/sign-up' element={<Register />}>
            {({ match }) => <Register match={match} />}
          </Route>
          <Route exact path='/reset-password' element={<ForgotPassword />}>
            {({ match }) => <ForgotPassword match={match} />}
          </Route>
          <Route exact path='/about-us' element={<AboutUs />}>
            {({ match }) => <AboutUs match={match} />}
          </Route>
          <Route exact path='/faqs' element={<FAQs />}>
            {({ match }) => <FAQs match={match} />}
          </Route>
          <Route exact path='/privacy-policy' element={<Privacy />}>
            {({ match }) => <Privacy match={match} />}
          </Route>
          <Route exact path='/terms-and-conditions' element={<TermsAndCondition />}>
            {({ match }) => <TermsAndCondition match={match} />}
          </Route>
          <Route exact path='/feedback' element={<Feedback />}>
            {({ match }) => <Feedback match={match} />}
          </Route>
          <Route exact path='/details/:id' element={<DetailsPage />}>
            {({ match }) => <DetailsPage match={match} />}
          </Route>
          <Route exact path='/individual-details/:categoryName' element={<LanguageDetailsone />}>
            {({ match }) => <LanguageDetailsone match={match} />}
          </Route>
          <Route exact path='/viewall-details/:detailsName' element={<ViewDetailsone />}>
            {({ match }) => <ViewDetailsone match={match} />}
          </Route>
          <Route exact path='/contact-us' element={<ContactUs />}>
            {({ match }) => <ContactUs match={match} />}
          </Route>
          <Route exact path='/notification' element={<Notification />}>
            {({ match }) => <Notification match={match} />}
          </Route>

          {/* <Route exact path='/categories'>
            {({ match, history }) => <Category match={match} history={history} />}
          </Route>
          <Route exact path='/wish-list'>
            {({ match, history }) => <WishList match={match} history={history} />}
          </Route>
          <Route exact path='/profile'>
            {({ match, history }) => <Profile match={match} history={history} />}
          </Route>
          <Route exact path='/search'>
            {({ match, history }) => <Search match={match} history={history} />}
          </Route>
          <Route exact path='/wallet'>
            {({ match, history }) => <Wallet match={match} history={history} />}
          </Route> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
