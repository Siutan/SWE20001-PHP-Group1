import React, { useState, useRef, useEffect } from "react";
import AuthService from "../services/auth.service";
// react plugin for creating notifications over the dashboard

// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ModalBody,
  Alert
} from "reactstrap";

function LoginModal(props) {

  const [showModal, setShowModal] = useState(false);

  const onDismiss = () => setShowAlert(false);
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    if(username !== '1' && username !== '2'){
        setMessage('Invalid username');
        setShowAlert(true);
    }else{
      setShowAlert(false);
    }
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
  //   if(password !== 'password'){
  //     setMessage('Invalid password');
  //     setShowAlert(true);
  // }else{
  //   setShowAlert(false);
  // }
    setPassword(password);
  };

  useEffect(() => {
    setShowModal(props.showLogin)
  }, [props]);

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    if (true) {
      AuthService.login(username, password).then(
        (response) => {
          setShowAlert(true)
          window.location.reload();
          
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setShowAlert(true);
          console.log(resMessage);
          setMessage('User credentials are invalid!');
        }
      );
    } else {
      setLoading(false);
    }}

  return (
    <> 
			<Modal
      className="modal-container custom-map-modal"
      isOpen={showModal}
      backdrop="static"
			>
  
        <ModalBody>
            {/*===========  form *================*/}
            <Alert color="danger" isOpen={showAlert} toggle={onDismiss}>
                {message}
              </Alert>
       
					<Form onSubmit={handleLogin} ref={form}>
          
						<Row>
							<Col>
								<FormGroup>
									<label
										className="form-control-label"
										htmlFor="service_provider_type"
									>
										Username
									</label>
									<Input
                    style={{color:'black'}}
										className="form-control-alternative"
										id="service_provider_type"
										type="text"
										name="username"
                    value={username}
                    onChange={onChangeUsername}
									/>
								</FormGroup>
							</Col>
						</Row>

						<Row>
							<Col>
								<FormGroup>
									<label className="form-control-label" htmlFor="company_name">
										Password
									</label>
									<Input
                    style={{color:'black'}}
										className="form-control"
										id="company_name"
										type="password"
										name="password"
                    value={password}
                    onChange={onChangePassword}
									/>
								</FormGroup>
							</Col>
						</Row>

						{/* ========= Buttons =============== */}
						<div className="modal-footer">
							
            <Button className="w-100 btn btn-primary btn-block block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </Button>

						</div>
            
					</Form>
          
        </ModalBody>
        {/* </CardBody>
            </Card>  */}
    </Modal>
    </>
  );
}

export default LoginModal;
