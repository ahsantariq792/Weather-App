import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import { Navbar, Container } from 'react-bootstrap';


function Nav(){
    return(

  <Navbar expand="lg" variant="light" bg="success">
    <Container>
      <Navbar.Brand className="nav">Weather App</Navbar.Brand>
    </Container>
  </Navbar>
    )
}

export default Nav;