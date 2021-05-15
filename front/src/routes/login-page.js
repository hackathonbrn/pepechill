import React from 'react';
import { FlexboxGrid, Content, Container } from 'rsuite';

import LoginPanel from '../components/login-panel';

const LoginPage = () => {
  return (
    <div className="show-fake-browser login-page">
      <Container>
        <Content>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <LoginPanel />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
};

export default LoginPage;
