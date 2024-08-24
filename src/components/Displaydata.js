import React from "react";
import Header from "./Header";
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2';
import Notification from "./Notification";
import { AddItemContext } from "../components/UseContext";
import FadeLoader from "react-spinners/FadeLoader";


const Displaydata = () => {
const usenavigate=useNavigate()

  const getData = AddItemContext();
  const {
    formData,
    setFormData,
    handleSubmit,
    suppliers,
    existingData,
    setExistingData,
    col,
    handleShow,
    suppres,
    setSuppRes,
    imagePreview,
    setimagePreview,
    Loading,
    setLoading,
    isError,
    handleDelete,
    handleEdit,
    isEdit,
        setisEdit,
        updateBtn,
        setUpdateBtn,
        handleDecrement,
        reorderData,
        setReorderData
        , setNotficatonshow,
        notficatonshow
  } = getData;
  console.log(existingData);
  if(Loading){
    return(
    <div className="Loader">
<FadeLoader 
        
        loading={Loading}
        color="blue"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>

    )
  }
  return (
    <>
    
      <Header />
      {notficatonshow&&
      <Notification/>

      }
      {isError&&<p style={{color:"red"}}>something went wrong</p>}

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
            <td></td>
            <td>{eachitem.itemname}</td>
            <td>{eachitem.description}</td>
            <td>{eachitem.category}</td>
            <td>{eachitem.manufacturer}</td>
            <td>{eachitem.unitOfMeasure}</td>
            <td>{eachitem.unitPrice}</td>
            <td>{eachitem.initialQuantity}<button onClick={()=>handleDecrement(eachitem.id)}>-</button></td>
            <td>{eachitem.expirationDate}</td>
            <td>{eachitem.reorderlevel}</td>
           
            <td>{
           eachitem.suppliers
            }
      
            </td>
            <td><img src={eachitem.imageUpload} width="100%" alt="" /></td>
           
            
            <td><button className="editbtn" onClick={()=>{handleEdit(eachitem.id);usenavigate('/')}}>Edit</button>
            <button className="delbtn" onClick={()=>handleDelete(eachitem.id)}>Delete</button></td>
            
            

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
