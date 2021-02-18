import React, { Component } from "react";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";

export class NavMenu extends Component {
  // static displayName = NavMenu.name;

  render() {
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3 navbar"
          light
        >
          <Container>
            <NavbarBrand className="navbar-title" tag={Link} to="/">
              <div className="mainLogo">
                <img width="50" height="50" className="logoIMG" src="/logo.svg" alt="logo" />
                <div className="logoWord">
                  <div className="firstWord">Karma</div>
                  <div className="lastWord">Framework</div>
                </div>
              </div>
            </NavbarBrand>
          </Container>
        </Navbar>
      </header>
    );
  }
}
