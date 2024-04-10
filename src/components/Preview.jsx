import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { AddItemContext } from "../components/UseContext";

function Preview() {
  const getData = AddItemContext();
  const {
    formData,
    setFormData,
    handleSubmit,
    suppliers,
    existingData,
    col,
    handleShow,
    show,
    setShow,
    handleClose,
    suppres,
    setSuppRes,
  } = getData;
  // console.log(suppres[2])
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}> */}
              <table className="table table-striped border w-100">
                <tbody>
                
                    <tr>
                      <th>{col[1]}</th>
                      <td>{formData.itemname}</td>
                    </tr>
                    <tr>
                      <th>{col[2]}</th>
                      <td>{formData.description}</td>
                    </tr>
                    <tr>
                      <th>{col[3]}</th>
                      <td>{formData.category}</td>
                    </tr>
                    <tr>
                      <th>{col[4]}</th>
                      <td>{formData.manufacturer}</td>
                    </tr>
                    <tr>
                      <th>{col[5]}</th>
                      <td>{formData.unitOfMeasure}</td>
                    </tr>
                    <tr>
                      <th>{col[6]}</th>
                      <td>{formData.unitPrice}</td>
                    </tr>
                    <tr>
                      <th>{col[7]}</th>
                      <td>{formData.initialQuantity}</td>
                    </tr>
                    <tr>
                      <th>{col[8]}</th>
                      <td>{formData.expirationDate}</td>
                    </tr>
                    <tr>
                      <th>{col[9]}</th>
                      <td>{formData.reorderlevel}</td>
                    </tr>
                    <tr>
                      <th>{col[10]}</th>
                      <td>{formData.suppliers}</td>
                    </tr>

                    <tr>
                      <th>{col[11]}</th>
                      <td>{formData.imageUpload}</td>
                    </tr>
                  
                </tbody>
              </table>
            {/* </div>
          </div> */}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Preview;
