import "./styles/main.scss";
import Resource from "./Resource/Resource.js";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Input } from "antd";

const App = () => {
  const [signInModalVisible, setSignInModalVisible] = useState(false);

  const showSignInModal = () => {
    setSignInModalVisible(true);
  };

  const hideSignInModal = () => {
    setSignInModalVisible(false);
  };

  const signInModal = (
    <Modal
      className='modal--custom'
      title='Sign in'
      visible={signInModalVisible}
      onOk={() => hideSignInModal()}
      onCancel={() => hideSignInModal()}
      footer={null}
    >
      <Input size='large' placeholder='email' />
      <br />
      <br />
      <Input size='large' placeholder='password' />
      <br />
      <br />
      <Button
        type='primary'
        loading={false}
        style={{ width: "100%" }}
        // onClick={() => this.enterLoading(0)}
      >
        <Resource locationResource='global' keyResource='signIn' />
      </Button>
    </Modal>
  );

  return (
    <div className='main'>
      {signInModal}
      <header className='main-navigation'>
        <nav>
          <div className='main-navigation__logo'>FU</div>
          <div className='main-navigation__links'>
            <a
              className='main-navigation__link'
              onClick={() => showSignInModal()}
            >
              <Resource locationResource='global' keyResource='signIn' />
            </a>
            <a href='/' className='main-navigation__link'>
              <Resource locationResource='global' keyResource='signUp' />
            </a>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default App;
