import React from 'react'
import { AddItemContext } from "../components/UseContext";

const Notification = () => {
    const getData = AddItemContext();
  const {
    reorderData
  } = getData;
  return (
    <div>
        {reorderData.map((item)=>{
        return(
        <>
<div class="alert alert-warning alert-dismissible fade show" role="alert">
    
  <strong>Alert Item has  reached to ReorderLevel!</strong> Note:please reorder this item: {item.itemname}.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>


      
</div>
</>
        )
    })}
    </div>
  )
}

export default Notification