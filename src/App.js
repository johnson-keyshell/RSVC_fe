import React from "react";
import HomeScreen from "../src/Screens/Seller/HomeScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./Screens/Buyer/LandingPage";
import i18n from "./Translator/config";
import BuyerMultiStepScreen from "./Screens/Buyer/BuyerMultiStepScreen";
import BuyerLandingPage from "./Screens/Buyer/BuyerLandingPage/BuyerLandingPage";
import { useState, useEffect } from "react";
import BuyerDetailsPage from "./Screens/Buyer/BuyerDetailsPage";
import LayoutScreen from "./Screens/Buyer/LayoutScreen/LayoutScreen";
import PropertyListings from "./Screens/Buyer/PropertyListings";
import SellerDetailsPage from '../src/Screens/Seller/SellerDetailsPage/SellerDetailsPage'
import AgentChatScreen from '../src/Components/Chat/Agent/ChatScreen'
import BuyerContactList from '../src/Components/Documents/Buyer/BuyerContactList'
import AgentContactList from '../src/Components/Documents/Agent/AgentContactList'
import SellerContactList from '../src/Components/Documents/Seller/SellerContractList'
import BuyerInfoPage from "./Screens/Buyer/BuyerInfoPage/BuyerInfoPage";
import Cookies from 'js-cookie';
import socketIO from "socket.io-client";
import config from "./config";
import AgentLandingPage from "./Screens/Agent/AgentLandingPage/AgentLandingPage";
import AgentDashboard from "./Screens/Agent/AgentDashboard/AgentDashboard";
import AgentDetailsPage from "../src/Screens/Agent/AgentDetailsPage";
import ChatScreen from "./Components/Chat/Buyer/ChatScreen";
import PageNotFound from "./Components/PageNotFound/PageNotFound";
import SellerChatScreen from "./Components/Chat/Seller/SellerChatScreen";
import AgentList from "./Screens/Seller/AgentList/AgentList";
import BuyerAgentsPage from "./Screens/Buyer/BuyerAgentsPage";
import AgentProfilePage from "./Screens/Agent/AgentProfilePage";
import BuyerProfilePage from "./Screens/Buyer/BuyerProfilePage";
import SellerProfilePage from "./Screens/Seller/SellerProfilePage"
import AdminSettings from "./Screens/Admin/AdminSettings";

const storedLanguage = localStorage.getItem("language");
if (storedLanguage) {
  i18n.changeLanguage(storedLanguage);
} else {
  i18n.changeLanguage("en"); // Set a default language if no preference is found
}

function App() {

  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("isLoggedIn")
      ? localStorage.getItem("isLoggedIn")
      : false);
  const profileType = Cookies.get('role');
  let isBuyer = false;
  let isAgent = false;
  let isOwner = false;
  let isAdmin = false;

  if (profileType === "buyer")
    isBuyer = true;
  else if (profileType === "agent")
    isAgent = true;
  else if (profileType === "owner")
    isOwner = true;
  else if (profileType === "admin")
    isAdmin = true;

  return (
    <BrowserRouter>
      <div>
        <main>
          <div>
            <Routes>
              {/* Admin Pages */}
              <Route path="/admin/settings" element={(isLogin && isAdmin) ? <AdminSettings /> : <PageNotFound />} />
              {/* OWner Pages */}
              <Route path="/sellers" element={(isLogin && isOwner) ? <HomeScreen /> : <PageNotFound />} />
              <Route path="/seller/detailspage/:id" element={(isLogin && isOwner) ? <SellerDetailsPage /> : <PageNotFound />} />
              <Route path="/seller/chat" element={(isLogin && isOwner) ? <SellerChatScreen /> : <PageNotFound />} />
              <Route path="/seller/documents" element={(isLogin && isOwner) ? <SellerContactList /> : <PageNotFound />} />
              <Route path="/seller/profile" element={(isLogin && isOwner) ? <SellerProfilePage /> : <PageNotFound />} />
              <Route path="/seller/agents" element={(isLogin && isOwner) ? <AgentList /> : <PageNotFound />} />

              {/* Buyer Pages */}
              <Route path="/" element={<BuyerLandingPage />} />
              <Route path="/propertylistings" element={<PropertyListings />} />
              <Route path="/buyerdetailspage" element={<BuyerDetailsPage />} />
              <Route path="/layoutscreen" element={(isLogin && isBuyer) ? <LayoutScreen /> : <PageNotFound />} />
              <Route path="/buyer/chat" element={(isLogin && isBuyer) ? <ChatScreen /> : <PageNotFound />} />
              <Route path="/buyer/documents" element={(isLogin && isBuyer) ? <BuyerContactList /> : <PageNotFound />} />
              <Route path="/buyer/agents" element={(isLogin && isBuyer) ? <BuyerAgentsPage /> : <PageNotFound />} />

              <Route path="/buyer/profile" element={(isLogin && isBuyer) ? <BuyerProfilePage /> : <PageNotFound />} />


              {/* Agent Pages */}
              <Route path="/agentlisting" element={(isLogin && isAgent) ? <AgentDashboard /> : <PageNotFound />} />
              <Route path="/agent/chat" element={(isLogin && isAgent) ? <AgentChatScreen /> : <PageNotFound />} />
              <Route path="/agent/documents" element={(isLogin && isAgent) ? <AgentContactList /> : <PageNotFound />} />
              <Route path="/agent/profile" element={(isLogin && isAgent) ? <AgentProfilePage /> : <PageNotFound />} />

              <Route path="*" element={<PageNotFound />} />

            </Routes>
          </div>
        </main>
        <footer></footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
