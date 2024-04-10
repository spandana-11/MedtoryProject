import React from "react";
import Header from "./Header";
// import DataTable from 'react-data-table-component'

import { AddItemContext } from "../components/UseContext";

const Displaydata = () => {
  const getData = AddItemContext();
  const {
    formData,
    setFormData,
    handleSubmit,
    suppliers,
    existingData,
    col,
    handleShow,
    suppres,
    setSuppRes,
    imagePreview,
    setimagePreview,
    Loading,
    setLoading,
    isError,
    handledelete
  } = getData;
  console.log(existingData);
  return (
    <>
      <Header />
      {isError&&<p style={{color:"red"}}>something went wrong</p>}
{Loading && <p style={{color:"red"}}>Loading....</p>}
{
!Loading&& <div className="card " >
<div className="card-header" >INVENTORY ITEM</div>
<div className="card-body table-responsive">
  {/* <DataTable columns={col} data={existingData} pagination >

  </DataTable> */}
  <table className="table table-striped table-bordered ">
    <thead>
      <tr>
        {col.map((eachdata) => {
          return <th>{eachdata}</th>;
          
        })}
        <th>Actions</th>
      </tr>

    </thead>
    <tbody>
      {existingData.map((eachitem, index) => {
        return (
          <tr key={index}>
            <td>{eachitem.id}</td>

            <td>{eachitem.itemname}</td>
            <td>{eachitem.description}</td>
            <td>{eachitem.category}</td>
            <td>{eachitem.manufacturer}</td>
            <td>{eachitem.unitOfMeasure}</td>
            <td>{eachitem.unitPrice}</td>
            <td>{eachitem.initialQuantity}</td>
            <td>{eachitem.expirationDate}</td>
            <td>{eachitem.suppliers}</td>
            <td>{eachitem.imageUpload}</td>
            <td><button className="editbtn" >Edit</button><button className="delbtn" onClick={()=>handledelete(eachitem.id)}>Delete</button></td>
            
            

          </tr>
        );
      })}
    </tbody>
  </table>
</div>
</div>
}
     
    </>
  );
};

export default Displaydata;
