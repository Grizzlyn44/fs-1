
import { useState, useEffect } from "react";
import Resource from "../../../Resource/Resource";
import { Modal, Button, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import axios from "../../../axios.js";

const SIGN_IN_MODAL_KEY = "signInModal";
const SIGN_UP_MODAL_KEY = "signUpModal";

const generateModalVisibleInitial = () => {
    const modalKeys = [SIGN_IN_MODAL_KEY, SIGN_UP_MODAL_KEY]
    let isVisibleModalsObj = {}
    modalKeys.forEach( key => isVisibleModalsObj = {...isVisibleModalsObj, [key]: false})
    return isVisibleModalsObj
}

const Header = () => {

    const [isModalVisible, setIsModalVisible] = useState(() => generateModalVisibleInitial());
    useEffect(() => {
        const doRequest = async () => {
            await axios.post("/signin", {
                email: "grizzlyn44@gmail.com",
                password: "123"
            }).then(e => {
              console.log("e")
            })

            await axios.get("/cards").then(e => {
              console.log("e2", e)
            })
        }

      //   const doRequestUsers = async () => {
      //     const req = await axios.get("/cards")

      //     console.log("req", req)
      // }

        doRequest()
        // doRequestUsers();
    })

    const modalVisibilityToggler = modalKey => {
        setIsModalVisible( {...isModalVisible, [modalKey]: !isModalVisible[modalKey] } )
    }

    const signInModal = (
        <Modal
          className='modal--custom'
          title='Sign in'
          visible={isModalVisible[SIGN_IN_MODAL_KEY]}
          onOk={ () => modalVisibilityToggler(SIGN_IN_MODAL_KEY) }
          onCancel={ () => modalVisibilityToggler(SIGN_IN_MODAL_KEY) }
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
            // onClick={() => { console.log("isVs", isModalVisible) }}
          >
            <Resource locationResource='global' keyResource='signIn' />
          </Button>
        </Modal>
      );

    return (
        <>
            {signInModal}
            <header className='main-navigation'>
            <nav>
            <div className='main-navigation__logo'>FU</div>
            <div className='main-navigation__links'>
                <a
                    className='main-navigation__link'
                    onClick={() => modalVisibilityToggler(SIGN_IN_MODAL_KEY)}
                >
                <Resource locationResource='global' keyResource='signIn' />
                </a>
                <a href='/' className='main-navigation__link'>
                <Resource locationResource='global' keyResource='signUp' />
                </a>
            </div>
            </nav>
        </header>
      </>
    )
}

export default Header;