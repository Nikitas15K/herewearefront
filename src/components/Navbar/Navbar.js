import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Actions as authActions } from "../../redux/auth"
import {
  EuiAvatar,
  EuiHeaderSectionItemButton,
  EuiPopover,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink
} from "@elastic/eui"
import { Link } from "react-router-dom";
import loginIcon from "../../assets/img/loginIcon.svg";
import styled from "styled-components";


const COLORS = {
  primaryDark: "#abd544",
  primaryLight: "white",
};

const MenuLabel = styled.label`
  background-color: ${COLORS.primaryLight};
  position: fixed;
  top: 1rem;
  right: 1rem;
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 0.5rem 1rem rgba(182, 237, 200, 0.3);
  text-align: center;
`;

const NavBackground = styled.div`
  position: fixed;
  top: 1rem;
  right: 1rem;
  background-image: radial-gradient(
    ${COLORS.primaryDark},
    ${COLORS.primaryLight}
  );
  height: 6rem;
  width: 6rem;
  border-radius: 50%;
  z-index: 600;
  transform: ${(props) => (props.clicked ? "scale(80)" : "scale(0)")};
  transition: transform 0.8s;
`;

const Icon = styled.span`
  position: relative;
  background-color: ${(props) => (props.clicked ? "transparent" : "#abd544")};
  width: 1rem;
  height: 2px;
  display: inline-block;
  margin-top: 1rem;
  transition: all 0.3s;
  &::before,
  &::after {
    content: "";
    background-color: #abd544;
    width: 1rem;
    height: 2px;
    display: inline-block;
    position: absolute;
    left: 0;
    transition: all 0.3s;
  }
  &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.3rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "0" : "0.3rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  ${MenuLabel}:hover &::before {
    top: ${(props) => (props.clicked ? "0" : "-0.5rem")};
  }
  ${MenuLabel}:hover &::after {
    top: ${(props) => (props.clicked ? "0" : "0.5rem")};
  }
`;

const Navigation = styled.nav`
  height: 100vh;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 600;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  opacity: ${(props) => (props.clicked ? "1" : "0")};
  transition: width 0.8s, opacity 0.8s;
`;

const List = styled.ul`
  position: absolute;
  list-style: none;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
`;
const ItemLink = styled(NavLink)`
  display: inline-block;
  font-size: 3rem;
  font-weight: 300;
  text-decoration: none;
  color: ${COLORS.primaryLight};
  padding: 1rem 2rem;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fff 50%
  );
  background-size: 240%;
  transition: all 0.4s;
  &:hover,
  &:active {
    background-position: 100%;
    color: ${COLORS.primaryDark};
    transform: translateX(1rem);
  }

  @media screen and (max-width: 651px) {
    font-size: 2rem;
  } 
`;

const AvatarMenu = styled.article`
  min-width: 20rem;
  min-height: 1rem;
`

function Navbar({ user, logUserOut, ...props }) {

  const navigate = useNavigate()
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const toggleAvatarMenu = () => setAvatarMenuOpen(!avatarMenuOpen);
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeAvatarMenu = () => {
    setAvatarMenuOpen(false)
    handleClick()
  };
  const handleLogout = () => {
    closeAvatarMenu()
    logUserOut()
    navigate("/login")
  };

  const avatarButton = (
    <EuiHeaderSectionItemButton
      aria-label="User avatar"
      style={{ marginTop: "2rem" }}
      onClick={() => user?.profile && toggleAvatarMenu()}
    >
      {user?.profile ? (
        <EuiAvatar
          size="l"
          name={user.profile.full_name || "Anonymous"}
          initialsLength={2}
          color="#ffffff"
          imageUrl={user.profile.image}
        />
      ) : (
          <Link to="/login" onClick={handleClick}>
            <EuiAvatar size="l" name="user" imageUrl={loginIcon} />
          </Link>
        )}
    </EuiHeaderSectionItemButton>
  )

  const renderAvatarMenu = () => {
    if (!user?.profile) return null
    return (
      <AvatarMenu>
        <EuiFlexGroup direction="column" className="avatar-actions">
          <EuiFlexItem grow={1}>
            <p>
              Hello {user.username}
            </p>
          </EuiFlexItem>
          <EuiFlexItem grow={1}>
            <EuiFlexGroup justifyContent="spaceBetween">
              <EuiFlexItem grow={1}>
                <Link onClick={closeAvatarMenu} to="/profile">Profile</Link>
              </EuiFlexItem>
              <EuiFlexItem grow={1}>
                <EuiLink onClick={() => handleLogout()}>Log out</EuiLink>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </AvatarMenu>
    )
  }

  return (
    <>
      <MenuLabel htmlFor="navi-toggle" onClick={handleClick}>
        <Icon clicked={click}>&nbsp;</Icon>
      </MenuLabel>
      <NavBackground clicked={click}>&nbsp;</NavBackground>

      <Navigation clicked={click}>
        <List>
          <li>
            <ItemLink onClick={handleClick} to="/">
              Home
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/vehicles/">
              Add Vehicle 
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/accident/">
              Declare Vehicle Accident
            </ItemLink>
          </li>
          <li>
            <ItemLink onClick={handleClick} to="/damage/">
              Estimate Car Damage
            </ItemLink>
          </li>

          <li>
            <EuiPopover
              ownFocus
              id="avatar-menu"
              isOpen={avatarMenuOpen}
              closePopover={closeAvatarMenu}
              anchorPosition="downCenter"
              button={avatarButton}
              panelPaddingSize="l"
            >
              {renderAvatarMenu()}
            </EuiPopover>
          </li>
        </List>
      </Navigation>
    </>
  );
}

export default connect((state) => ({ user: state.auth.user }), {
  logUserOut: authActions.logUserOut
})(Navbar)