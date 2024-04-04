import styles from "./styles/App.module.css"
import * as NotesApi from "./network/notes_api";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFoundPage from "./Pages/NotFoundPage";
import NotesPage from "./Pages/NotesPage";
import PrivacyPage from "./Pages/PrivacyPage.";
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpmodal';
import LoginModal from './components/form/loginModal';
import { User } from "./models/user";

function App() {
  
   const [loggedInUser,setLoggedInUser] = useState<User|null>(null);
   const [showSignUpModal,setShowSignUpModal]= useState(false);
   const [showloginModal,setShowLoginModal]= useState(false);
  
   useEffect(()=>{
      async function fetchLoggedInUser() {
        try {
          const user = await NotesApi.getLoginUser();
          setLoggedInUser(user);
        } catch (error) {
           console.error(error);
        }
      }
      fetchLoggedInUser();
   },[])



  return (
    <BrowserRouter>
    <div>
      <NavBar
      loggedInUser={loggedInUser}
      onlogInClicked={()=> setShowLoginModal(true)}
      onsignUpClicked={()=> setShowSignUpModal(true)}
      onLogoutSuccessful={()=>setLoggedInUser(null)}
      />

      <Container className={styles.pageContainer}>
         <Routes>
             <Route
             path="/"
             element={<NotesPage loggedInUser={loggedInUser}/>}
             />
             <Route
             path="/aboutUs"
             element={<PrivacyPage/>}
             />
             <Route
             path="/*"
             element={<NotFoundPage/>}
             />
         </Routes>
      </Container>
   
    { showSignUpModal && 
    <SignUpModal
    onDismiss={()=> setShowSignUpModal(false)}
    onSignUpSuccessful={(user)=>{
         setLoggedInUser(user);
         setShowSignUpModal(false);
    }}
          
    />

    }
    {showloginModal &&
      <LoginModal
      onDismiss={()=> setShowLoginModal(false)}
      onLoginSuccessful={(user)=>{
        setLoggedInUser(user);
        setShowLoginModal(false)
      }}
      />
    }
    </div>
    </BrowserRouter>
  );
}

export default App;
