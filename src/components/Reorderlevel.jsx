import React, { useState } from "react";
import { AddItemContext } from "../components/UseContext";

function Reorderlevel() {
    const[count,setCount]=useState("")
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
  } = getData;
  return <div>
   
    <button onClick={()=>setCount(count+1)}>+</button>
    <button onClick={()=>setCount(count-1)}>-</button>
    {
        existingData.map((eachitem)=>{
            console.log(eachitem.Reorderlevel)
        })
    }
    
  </div>;
}

export default Reorderlevel;
