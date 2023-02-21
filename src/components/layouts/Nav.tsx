import * as React from "react";
import { useEffect, useState } from "react";
import Logo from "../../images/logo-header.svg";
import Menu from "./Menu";
import { CSSTransition } from "react-transition-group";
import { humburgerIcon, logo } from "../../../sites-global/global";

const Nav = (props: any) => {
  React.useEffect(() => {
    document.body.setAttribute("id", "body");
  })
  const toggle = () => {
    (document.getElementById("body") as HTMLInputElement).classList.toggle("menu-opened");
  };

  return (
    <>
      <div className="site-header">
        <div className="header-top">
          <div className="container">
            {/* <div className="logo">
              {props._site.c_matalan_header_logo?
              <img src={props._site.c_matalan_header_logo.image.url} />:
              <div dangerouslySetInnerHTML={{ __html: logo }} />}
            </div> */}


          </div>
        </div>

        <navbar className="main-nav">
          <div className="container">
            <Menu c_matalanMenu={props._site} />
          </div>
        </navbar>

        <button type="button" className="menu-btn" id="menu-btn" onClick={toggle}>
        <div dangerouslySetInnerHTML={{ __html: humburgerIcon }} />
        <span>Menu</span>
        </button>

      </div>
    </>
  )
}

export default Nav;
