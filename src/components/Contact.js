import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const Contact = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    setResult({
      success: null,
    });
    const form = e.currentTarget;
    e.preventDefault();
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setLoading(true);
    axios
      .post("/contact", { ...state })
      .then((res) => {
        setLoading(false);
        setResult(res.data);
        setState({
          name: "",
          email: "",
          message: "",
        });
      })
      .catch(() => {
        setLoading(false);
        setResult({
          success: false,
        });
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="column">
          <h2 className="heading font-weight-bold text-center">Contact</h2>
        </div>
      </div>
      <div className="container">
        <form onSubmit={sendEmail}>
          <div className="row no-gutters">
            <div className="col-6">
              <Form.Group className="mb-2 mr-1" controlId="name">
                <Form.Control
                  required
                  type="text"
                  name="name"
                  value={state.name}
                  placeholder="Name"
                  onChange={onChange}
                />
              </Form.Group>
            </div>
            <div className="col-6">
              <Form.Group className="mb-2 ml-2" controlId="email">
                <Form.Control
                  required
                  type="text"
                  name="email"
                  value={state.email}
                  placeholder="Email"
                  onChange={onChange}
                />
              </Form.Group>
            </div>
          </div>
          <Form.Group className="my-2" controlId="message">
            <Form.Control
              required
              as="textarea"
              name="message"
              value={state.message}
              rows="3"
              placeholder="Message"
              onChange={onChange}
            />
          </Form.Group>
          {loading ? (
            <Button className="mt-1" variant="info" type="submit" disabled>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            </Button>
          ) : (
            <Button className="mt-1" variant="info" type="submit">
              Submit{" "}
              {result && (
                <i
                  className={`${
                    result.success ? "fas fa-check" : "fas fa-times"
                  } text-center`}
                ></i>
              )}
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
