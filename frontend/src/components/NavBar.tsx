import { Container, Nav, Navbar } from "react-bootstrap";
import { User } from "../models/user";
import NavBarLoggedInView from "./NavBarloggedInView";
import NavBarLoggedOutView from "./NavBarLoggedOutView";
import {Link } from "react-router-dom"

interface NavBarProps{
    loggedInUser:User | null,
    onsignUpClicked:()=>void,
     onlogInClicked:()=>void,
    onLogoutSuccessful:()=>void,
}

const NavBar = ({loggedInUser,onsignUpClicked,onLogoutSuccessful,onlogInClicked}:NavBarProps) => {
    return ( 
       <Navbar bg="primary"  expand="sm" sticky="top">
           <Container>
               <Navbar>
                  <Navbar.Brand as={Link} to="/">
                    Yearly Motivations
                  </Navbar.Brand>
                  <Navbar.Toggle aria-controls="main-navbar"/>
                  <Navbar.Collapse id="main-navbar">
                     <Nav>
                       <Nav.Link as={Link} to="/aboutUs">
                           
                           About Us

                        </Nav.Link>
                     </Nav>
                   <Nav className="ms-auto">
                     {loggedInUser
                     ? <NavBarLoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
                     : <NavBarLoggedOutView onLogInClicked={onlogInClicked} onSignUpClicked={onsignUpClicked}/>
                     }
                   </Nav>
                   </Navbar.Collapse>
               </Navbar>
           </Container>
       </Navbar>

     );
}
 
export default NavBar;