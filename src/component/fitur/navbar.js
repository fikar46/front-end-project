import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {onUserLogout,keepLogin} from "../../actions";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem  } from 'reactstrap';
  import Cookies from "universal-cookie";
  const cookies = new Cookies();
class Header extends React.Component {
  state = { listUser:[], searchListUser: [] }
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  componentDidMount() {
    axios.get('http://localhost:2001/user')
        .then((res) => {
            this.setState({ listUser: res.data, searchListUser: res.data })
        }).catch((err) => {
            console.log(err)
        })
}
  onLogOutSelect=()=>{
    this.props.onUserLogout();
    cookies.remove('dataUser');
  }

  render() {
    if(this.props.username === ''){
    return (
      <div>
        <Navbar color="light" light expand="md">
<<<<<<< HEAD
          <NavbarBrand href="/">Warehousenesia.id</NavbarBrand>
=======
          <NavbarBrand href="/">Dilizents</NavbarBrand>
>>>>>>> 5bab4105e4339f65873030869ae36a1b36a9cdfb
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
<<<<<<< HEAD
                <NavLink href="/how-it-works">How it works</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
=======
                <NavLink href="/daftar">Daftar</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/masuk">Masuk</NavLink>
>>>>>>> 5bab4105e4339f65873030869ae36a1b36a9cdfb
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  return (
      <Navbar light expand="md">
<<<<<<< HEAD
        <Link to='/homes'><NavbarBrand style={{color:'black'}}>Warehousenesia.id</NavbarBrand></Link>
=======
        <Link to='/homes'><NavbarBrand style={{color:'black'}}>Dilizents</NavbarBrand></Link>
>>>>>>> 5bab4105e4339f65873030869ae36a1b36a9cdfb
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="mr-auto" navbar>
        </Nav>
          <Nav className="ml-auto" navbar>
          <NavItem>
             <Link to='/diskusi'><NavLink>Diskusi</NavLink></Link>
            </NavItem>
            <NavItem>
            <NavLink href='/leaderboard'>Leader board</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Hello, {this.props.username}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Profile
                </DropdownItem>
                <Link to='/'><DropdownItem>
                  Option
                </DropdownItem></Link>
                <DropdownItem divider />
                <a href="/"><DropdownItem onClick={this.onLogOutSelect}>
                  Log Out
                </DropdownItem></a>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
   );
  }
}
const mapStateToProps = (state) => {
  return{
    username:state.auth.username
  }
}

export default connect(mapStateToProps, {onUserLogout, keepLogin})(Header);