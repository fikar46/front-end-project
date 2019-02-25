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
    axios.get('http://localhost:2000/user')
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
    console.log(cookies.get('dataUser'))
    if(this.props.username === ''){
    return (
      <div>
        <Navbar color="light" light expand="md" className="navbar fixed-top navbar-expand-lg navbar-light bg-white fixed-top">
          <NavbarBrand href="/">Warehousenesia.id</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/how-it-works">How it works</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/register">Register</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/login">Login</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
  return (
      <Navbar light expand="md" className="navbar fixed-top navbar-expand-lg navbar-light bg-white fixed-top">
        <Link to='/'><NavbarBrand style={{color:'black'}}>Warehousenesia.id</NavbarBrand></Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="mr-auto" navbar>
        </Nav>
          <Nav className="ml-auto" navbar>
          <NavItem>
             <Link to='/order'><NavLink>Order</NavLink></Link>
            </NavItem>
            <NavItem>
            <NavLink href='/cart'><i class="fa fa-shopping-cart"></i></NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Hello, {this.props.username}
              </DropdownToggle>
              <DropdownMenu right>
                <Link to='/history'><DropdownItem>
                  History
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