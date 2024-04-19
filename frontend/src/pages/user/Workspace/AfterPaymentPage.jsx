import React, {useState, useEffect} from 'react'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtnGroup,
    MDBBtn,
  } from "mdb-react-ui-kit";
  


const AfterPaymentPage = () => {
    const [message, setMessage] = useState('')
    useEffect(()=>{
        const query = new URLSearchParams(window.location.search)

        if (query.get('success')){
            setMessage('Order Completed')
        }
    })
  return (
    <MDBContainer className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex flex-row align-items-center">
          <h4 className="text-uppercase mt-1">Eligible</h4>
          <span className="ms-2 me-3">Pay</span>
        </div>
        <a href="#!">Cancel and return to the website</a>
      </div>
      <MDBRow>
        <MDBCol md="7" lg="7" xl="6" className="mb-4 mb-md-0">
          <h5 className="mb-0 text-success">$85.00</h5>
          <h5 className="mb-3">Diabites Pump &amp; Supplies</h5>
          <div>
            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row mt-1">
                <h6>Insurance Responsibility</h6>
                <h6 className="fw-bold text-success ms-1">$71.76</h6>
              </div>
              <div className="d-flex flex-row align-items-center text-primary">
                <span className="ms-1">Add Insurer card</span>
              </div>
            </div>
            <p>
              Insurance claim and all neccessary dependencies will be submitted
              to your insurer for the covered portion of this order.
            </p>
            <div
              className="p-2 d-flex justify-content-between align-items-center"
              style={{ backgroundColor: "#eee" }}
            >
              <span>Aetna - Open Access</span>
              <span>Aetna - OAP</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex flex-row mt-1">
                <h6>Patient Balance</h6>
                <h6 className="fw-bold text-success ms-1">$13.24</h6>
              </div>
              <div className="d-flex flex-row align-items-center text-primary">
                <span className="ms-1">Add Payment card</span>
              </div>
            </div>
            <p>
              Insurance claim and all neccessary dependencies will be submitted
              to your insurer for the covered portion of this order.
            </p>
            <div class="d-flex flex-column mb-3">
              <MDBBtnGroup vertical aria-label="Vertical button group">
                <input
                  type="radio"
                  className="btn-check"
                  name="options"
                  id="option1"
                  autocomplete="off"
                />
                <label className="btn btn-outline-primary btn-lg" for="option1">
                  <div className="d-flex justify-content-between">
                    <span>VISA </span>
                    <span>**** 5436</span>
                  </div>
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="options"
                  id="option2"
                  autocomplete="off"
                  checked
                />
                <label className="btn btn-outline-primary btn-lg" for="option2">
                  <div className="d-flex justify-content-between">
                    <span>MASTER CARD </span>
                    <span>**** 5038</span>
                  </div>
                </label>
              </MDBBtnGroup>
            </div>
            <MDBBtn color="success" size="lg" block>
              Proceed to payment
            </MDBBtn>
          </div>
        </MDBCol>
        <MDBCol md="5" lg="4" xl="4" offsetLg="1" offsetXl="2">
          <div className="p-3" style={{ backgroundColor: "#eee" }}>
            <span className="fw-bold">Order Recap</span>
            <div className="d-flex justify-content-between mt-2">
              <span>contracted Price</span> <span>$186.86</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span>Amount Deductible</span> <span>$0.0</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span>Coinsurance(0%)</span> <span>+ $0.0</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span>Copayment </span> <span>+ 40.00</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-2">
              <span className="lh-sm">
                Total Deductible,
                <br />
                Coinsurance and copay
              </span>
              <span>$40.00</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span className="lh-sm">
                Maximum out-of-pocket <br />
                on insurance policy
              </span>
              <span>$40.00</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-2">
              <span>Insurance Responsibility </span> <span>$71.76</span>
            </div>
            <div className="d-flex justify-content-between mt-2">
              <span>Patient Balance </span> <span>$13.24</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mt-2">
              <span>Total </span> <span class="text-success">$85.00</span>
            </div>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default AfterPaymentPage
