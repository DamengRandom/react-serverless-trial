import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { StyledNavbar, StyledNavBrand, StyledNavItems, StyledLink } from '../styled/Navbar';
import { Accent } from '../styled/Random';
import Login from './Login';
import Logout from './Logout';

export default function Navbar() {
  const { isAuthenticated } = useAuth0();
  return (
    <StyledNavbar>
      <StyledNavBrand>
        <StyledLink to="/">
          Learn.Build.<Accent>Type.</Accent>
        </StyledLink>
      </StyledNavBrand>
      <StyledNavItems>
        <li>{isAuthenticated ? <Logout /> : <Login />}</li>
        <li><StyledLink to="/">Home</StyledLink></li>
        <li><StyledLink to="/highScores">High Scores</StyledLink></li>
      </StyledNavItems>
    </StyledNavbar>
  );
};
