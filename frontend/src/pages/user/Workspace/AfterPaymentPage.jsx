import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {
    MDBContainer,
    MDBCol,
    MDBRow,
    MDBBtnGroup,
    MDBBtn,
  } from "mdb-react-ui-kit";
  


const AfterPaymentPage = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('')
    useEffect(()=>{
        const query = new URLSearchParams(window.location.search)

        if (query.get('success')){
            setMessage('Completed')

        }
        
    })
  return (
    <>
    {message === 'Completed' ? (

<MDBContainer className="py-5">
<div className="d-flex justify-content-between align-items-center mb-5">
  <div className="d-flex flex-row align-items-center">
    <h4 className="text-uppercase mt-1">TeamStudy</h4>
    <span className="ms-2 me-3">Premium Workspace</span>
  </div>
 
</div>
<MDBRow>
  <MDBCol md="7" lg="7" xl="6" className="mb-4 mb-md-0">
    <h5 className="mb-0 text-success">$100</h5>
    <h5 className="mb-3">workspace Name</h5>
    <div>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row mt-1">
          <h6></h6>
          <h6 className="fw-bold text-success ms-1"></h6>
        </div>
        <div className="d-flex flex-row align-items-center text-primary">
         
        </div>
      </div>
      <p>
        Successfully unlocked TeamStudy Premium Workspace 
      </p>
     
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-row mt-1">
          <h6>Patient Balance</h6>
          <h6 className="fw-bold text-success ms-1">$13.24</h6>
        </div>
        <div className="d-flex flex-row align-items-center text-primary">
          
        </div>
      </div>
      <p>
        Insurance claim and all neccessary dependencies will be submitted
        to your insurer for the covered portion of this order.
      </p>
      <div class="d-flex flex-column mb-3">
        
      </div>
      <button class='btn btn-success' onClick={()=>navigate('/')}>Next</button>
    </div>
  </MDBCol>
  <MDBCol md="5" lg="4" xl="4" offsetLg="1" offsetXl="2">
    <div className="p-3" style={{ backgroundColor: "#eee" }}>
      <span className="fw-bold">Order Recap</span>
      <div className="d-flex justify-content-between mt-2">
        <span>contracted Price</span> <span>$95.0</span>
      </div>
      <div className="d-flex justify-content-between mt-2">
        <span>Tax</span> <span>$5.0</span>
      </div>
      <div className="d-flex justify-content-between mt-2">
        <span>Coinsurance(0%)</span> <span>+ $0.0</span>
      </div>
      <div className="d-flex justify-content-between mt-2">
       
      </div>
      <hr />
      
      
      
      <div className="d-flex justify-content-between mt-2">
        <span>Total </span> <span class="text-success">$100</span>
      </div>
    </div>
  </MDBCol>
</MDBRow>
</MDBContainer>


    ):
    (
      <div>
        payment not completed 
      </div>
    )
    }
   
    </>
  )
}

export default AfterPaymentPage
