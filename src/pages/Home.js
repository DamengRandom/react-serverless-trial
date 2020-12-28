import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import CTA from '../styled/CTA';
import { Accent, StyledTitle } from '../styled/Random';

export default function Home() {
  const { user, isAuthenticated } = useAuth0();

  return isAuthenticated ? (
    <div>
      <StyledTitle>Ready to type {user.name}?</StyledTitle>
      <CTA to="/game">Click or type <Accent>'s'</Accent> to start playing!</CTA>
    </div>
  ) : (
    <div>
      <p>Not able to view the home screen yet, please click above (☝️) `login` button Or please contact support for help ..</p>
    </div>
  );
};
