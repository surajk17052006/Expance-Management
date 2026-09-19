import React from "react";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
export default function Dash() {
  const navigate = useNavigate();
  const [ttlc, setTtlc] = useState(0);
  const [ttld, setTtld] = useState(0);
  const { user } = useContext(AuthContext);
  const handleLogout = () => {
    alert("Logged out successfully");
    // later you can add navigate('/login')
    navigate("/");
  };

  const [dshow, setDShow] = useState(false);
  const dhandleClose = () => setDShow(false);
  const dhandleShow = () => setDShow(true);

  //Debit
  const [ddt, setDDate] = useState(0);
  const [damt, setDAmt] = useState(0);
  const [dnt, setDNote] = useState(0);

  let dhndldt = (e) => {
    setDDate(e.target.value);
  };
  let dhndlamt = (e) => {
    setDAmt(e.target.value);
  };
  let dhndlnt = (e) => {
    setDNote(e.target.value);
  };

  //Credit
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data, setData] = useState([]);
  const [dt, setDate] = useState(0);
  const [amt, setAmt] = useState(0);
  const [nt, setNote] = useState(0);
  const [val, setVal] = useState(0);
  const [id, setId] = useState(Number(localStorage.getItem("id")) || 0);
  let hndldt = (e) => {
    setDate(e.target.value);
  };
  let hndlamt = (e) => {
    setAmt(e.target.value);
  };
  let hndlnt = (e) => {
    setNote(e.target.value);
  };
  const [opbl, setOpbal] = useState(0);
  let opbal = () => {
    axios
      .get("https://codingshika.com/APP/EXP/opbal_list.php?uid=" + id)
      .then((res) => {
        if (res.data.posts.status == 200) {
          console.log(res.data);
          setOpbal(res.data.posts.post[0]["OPBAL"]);
        } else {
          alert("Error");
        }
      });
  };

  let tran = () => {
    axios
      .get("https://codingshika.com/APP/EXP/transaction_list.php?uid=" + id)
      .then((res) => {
        if (res.data.posts.status == 200) {
          console.log(res.data);
          setData(res.data.posts.post);
          const totalc = res.data.posts.post.reduce(
            (sum, item) => sum + Number(item.CREDIT),
            0,
          );
          setTtlc(totalc);
          const totald = res.data.posts.post.reduce(
            (sum, item) => sum + Number(item.DEBIT),
            0,
          );
          setTtld(totald);
        } else {
          alert("Error");
        }
      });
  };

  let credit = () => {
    axios
      .post(
        "https://codingshika.com/APP/EXP/insert_credit.php?date=" +
          dt +
          "&note=" +
          nt +
          "&debit=" +
          val +
          "&credit=" +
          amt +
          "&uid=" +
          id,
      )
      .then((res) => {
        if (res.data.posts.status == "200") {
          alert("Credit Success..!");
          opbal();
          tran();
          setShow(false);
        } else {
          alert("Failed..!");
          setShow(false);
        }
      });
  };

  let debiit = () => {
    axios
      .post(
        "https://codingshika.com/APP/EXP/insert_debit.php?date=" +
          ddt +
          "&note=" +
          dnt +
          "&debit=" +
          damt +
          "&credit=" +
          val +
          "&uid=" +
          id,
      )
      .then((res) => {
        if (res.data.posts.status == "200") {
          alert("Debit Success..!");
          opbal();
          tran();
          setDShow(false);
        } else {
          alert("Failed..!");
          setDShow(false);
        }
      });
  };

  // //onload
  useEffect(() => {
    tran();
    opbal();
  }, []);
  return (
    <>
      {/* Add Credit */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Credit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="date"
            onChange={hndldt}
            placeholder="Select date:"
          />
          <br />
          <Form.Control
            type="number"
            onChange={hndlamt}
            placeholder="Credit Amount:"
          />
          <br />
          <Form.Control type="text" onChange={hndlnt} placeholder=" Note:" />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={credit}>
            Add Cedit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Debit */}
      <Modal show={dshow} onHide={dhandleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Credit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="date"
            onChange={dhndldt}
            placeholder="Select date:"
          />
          <br />
          <Form.Control
            type="number"
            onChange={dhndlamt}
            placeholder="Credit Amount:"
          />
          <br />
          <Form.Control type="text" onChange={dhndlnt} placeholder=" Note:" />
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={dhandleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={debiit}>
            Add Debit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm rounded-pill px-4 mx-3 mt-3">
        <span className="navbar-brand fw-bold">
          {localStorage.getItem("nm")}
        </span>

        <div className="ms-auto d-flex align-items-center gap-3">
          {/* ROUND CARD ICON */}
          <div
            className="rounded-circle d-flex align-items-center justify-content-center text-white"
            style={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg,#ff7a18,#ffb347)",
            }}
          >
            💳
          </div>

          {/* LOGOUT */}
          <button
            className="btn btn-outline-dark rounded-pill px-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container py-4">
        {/* TOP SECTION */}
        <div className="row g-4 align-items-stretch">
          {/* CARD */}
          <div className="col-md-6">
            <div
              className="p-4 text-white h-100 rounded-4"
              style={{
                background:
                  "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
              }}
            >
              <h2 className="mb-4">Opbal:{opbl}</h2>

              <div className="d-flex justify-content-between mt-5">
                <div>
                  <small className="text-muted">Card Holder</small>
                  <h6 className="mb-0">{localStorage.getItem("nm")}</h6>
                </div>
                <div>
                  <small className="text-muted">Expires</small>
                  <h6 className="mb-0">11/22</h6>
                </div>
              </div>

              <div className="mt-3 text-end">
                <span className="badge bg-danger rounded-circle me-1">
                  &nbsp;
                </span>
                <span className="badge bg-warning rounded-circle">&nbsp;</span>
              </div>
            </div>
          </div>

          {/* SALARY */}
          <div className="col-md-3">
            <div className="card h-100 shadow-sm rounded-4 text-center p-3">
              <div
                className="mx-auto mb-3 rounded-3"
                style={{ width: 60, height: 60, background: "#177410" }}
              ></div>
              <h3>Credit</h3>

              <h2 className="mt-3 text-success">{ttlc}</h2>
              <button
                onClick={handleShow}
                className="btn btn-dark rounded-pill"
              >
                Add New Credit
              </button>
            </div>
          </div>

          {/* PAYPAL */}
          <div className="col-md-3">
            <div className="card h-100 shadow-sm rounded-4 text-center p-3">
              <div
                className="mx-auto mb-3 rounded-3"
                style={{ width: 60, height: 60, background: "#ff1818" }}
              ></div>
              <h3>Debit</h3>

              <h2 className="mt-3">{ttld}</h2>
              <button
                onClick={dhandleShow}
                className="btn btn-dark rounded-pill"
              >
                Add New Debit
              </button>
            </div>
          </div>
        </div>

        {/* PAYMENT METHOD */}
        <div className="card mt-4 shadow-sm rounded-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0">Payment History</h5>
            </div>

            <div className="row g-3">
              <div className="col-md-12">
                <div>
                  <table class="table table">
                    <thead>
                      <tr>
                        <th scope="col">TID</th>
                        <th scope="col">DATE</th>
                        <th scope="col">NOTE</th>
                        <th scope="col">DEBIT</th>
                        <th scope="col">CREDIT</th>
                        <th scope="col">CLBAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item) => {
                        return (
                          <tr>
                            <td>{item.T_ID}</td>
                            <td>{item.DATE}</td>
                            <td>{item.NOTE}</td>
                            <td style={{ color: "red" }}>{item.DEBIT}</td>
                            <td style={{ color: "green" }}>{item.CREDIT}</td>
                            <td>{item.CLBAL}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
