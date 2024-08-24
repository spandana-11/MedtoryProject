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
    isEdit,
    setisEdit,
    updateBtn,
    setUpdateBtn,
    finaldata,
  } = getData;
  // console.log(suppres[2])
  console.log(finaldata);
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
              {/* <tr>
                      <th>sku</th>
                      <td>{formData.sku || "NA"}</td>                   
          </tr>*/}
<tr>
                <th>sku</th>
                <td>{formData.sku}</td>
              </tr>
              <tr>
                <th>id</th>
                <td>{formData.id}</td>
              </tr>
              <tr>
                <th>itemname</th>
                <td>{formData.itemname}</td>
              </tr>
              <tr>
                <th>description</th>
                <td>{formData.description}</td>
              </tr>
              <tr>
                <th>category</th>
                <td>{formData.category}</td>
              </tr>
              <tr>
                <th>manufacturer</th>
                <td>{formData.manufacturer}</td>
              </tr>
              <tr>
                <th>unitOfMeasure</th>
                <td>{formData.unitOfMeasure}</td>
              </tr>
              <tr>
                <th>UnitPrice</th>
                <td>{formData.unitPrice}</td>
              </tr>
              <tr>
                <th>IntialQuantity</th>
                <td>{formData.initialQuantity}</td>
              </tr>
              <tr>
                <th>ExpirationDate</th>
                <td>{formData.expirationDate}</td>
              </tr>
              <tr>
                <th>Reorderlevel</th>
                <td>{formData.reorderlevel}</td>
              </tr>
              <tr>
                <th>suppliers</th>
                <td>{formData.suppliers}</td>
              </tr>
              <tr>
                <th>ImageUpload</th>
                <td><img src={formData.imageUpload} width="40%" alt="" /></td>
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
          {updateBtn ? (
            <Button variant="primary" onClick={handleSubmit}>
              Update
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Preview;
