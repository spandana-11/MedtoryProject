import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable, faUpload } from "@fortawesome/free-solid-svg-icons";
import { AddItemContext } from "../components/UseContext";
import Header from "./Header";
import Preview from "./Preview";
import Button from "react-bootstrap/Button";
import Multiselect from "multiselect-react-dropdown";

function Additem() {
  // console.log(suppres)
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
  const handleInputChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, suppliers: value });
  };
  console.log(existingData);

  console.log(suppliers);

  const style = {
    width: "75%",

    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    flexWrap: "wrap",
  };
  const style1 = {
    color: "red",
  };
  console.log(formData);

  return (
    <>
      <Header />
      <Preview />
      <div className="d-flex w-100 justify-content-center align-items-center mt-5">
        <form className="w-75">
          <h1 className="text-center addItem" style={{color:"rgb(3, 3, 96)"}}>ADD ITEM</h1>
          <div className="inputFields" style={style}>
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="itemname" className="form-label">
                Item Name <span style={style1}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="itemname"
                name="itemname"
                value={formData.itemname}
                onChange={(e) =>
                  setFormData({ ...formData, itemname: e.target.value })
                }
                required
                maxLength={100}
              />
              {formData.itemname.length > 100 && (
                <span style={style1}>
                  itemname max lentgth is 100 characters
                </span>
              )}
            </div>
            <div className=" p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="category" className="form-label">
                category <span style={style1}>*</span>
              </label>
              <select
                name="category"
                id="category"
                className="form-control select"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option selected>Select...</option>
                <option value="medical">Medical</option>
                <option value="ot">OT</option>
                <option value="icu">ICU</option>
                <option value="nicu">NICU</option>
                <option value=" MedicalSupplies"> Medical Supplies </option>
              </select>
            </div>

            <div className=" p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="manufacturer" className="form-label">
                Manufacturer <span style={style1}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={(e) =>
                  setFormData({ ...formData, manufacturer: e.target.value })
                }
                required
              />
            </div>

            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="unitOfMeasure" className="form-label">
                Unit of Measure <span style={style1}>*</span>
              </label>
              <select
                name="unitOfMeasure"
                id="unitOfMeasure"
                className="form-control select"
                value={formData.unitOfMeasure}
                onChange={(e) =>
                  setFormData({ ...formData, unitOfMeasure: e.target.value })
                }
                required
              >
                <option value="Not Selected unit Of Measure">Select...</option>
                <option value="box">Box</option>
                <option value="strips">Strips</option>
                <option value="mg">Mg</option>
                <option value="bottle">Bottle</option>
              </select>
            </div>
            <div className=" p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="unitPrice" className="form-label">
                Unit Price <span style={style1}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="unitPrice"
                name="unitPrice"
                value={formData.unitPrice}
                onChange={(e) =>
                  setFormData({ ...formData, unitPrice: e.target.value })
                }
                required
              />
            </div>
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="initialQuantity" className="form-label">
                Initial Quantity <span style={style1}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="initialQuantity"
                name="initialQuantity"
                min="1"
                value={formData.initialQuantity}
                onChange={(e) =>
                  setFormData({ ...formData, initialQuantity: e.target.value })
                }
                required
              />
            </div>
            <div className="p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="expirationDate" className="form-label">
                Expiration Date
              </label>
              <input
                type="date"
                className="form-control select"
                id="expirationDate"
                name="expirationDate"
                value={formData.expirationDate}
                onChange={(e) =>
                  setFormData({ ...formData, expirationDate: e.target.value })
                }
              />
            </div>
            {/* reorder */}
            <div className=" p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="reorderlevel" className="reorderlevel">
                Reorder Level <span style={style1}>*</span>
              </label>
              <input
                type="number"
                className="form-control"
                id="reorderlevel"
                name="reorderlevel"
                value={formData.reorderlevel}
                onChange={(e) =>
                  setFormData({ ...formData, reorderlevel: e.target.value })
                }
                required
              />
            </div>
            {/* multi selection  */}
            <div className=" p-2 col-lg-6 col-md-6 col-sm-12">
              <label htmlFor="Suppliers" className="Suppliers">
                Suppliers  <span style={style1}>*</span>
              </label>
              {Loading && <p>Loading....</p>}
              <div>
                <Multiselect
                  className={isError ? "multiselecterField isError" : "multiselecterField"}  
                  options={suppliers.map((eachsupp) => {
                    return eachsupp.supplierName;
                  })}
                  isObject={false}
                  onSelect={(event) => setSuppRes(event)}
                  onRemove={(event) => setSuppRes(event)}
                  onChange={handleInputChange}
                  placeholder=""
                  
                  />
              <label htmlFor="" className="iserror">{isError ?<span style={{color:"red"}}>something went wrong....</span> :<span>Select..</span>}</label>
            </div>
            </div>
             

            <label htmlFor="imageupload">Upload image</label>
            <div className="image col-lg-12 col-md-12 col-sm-12 p-2">
              <input
                type="file"
                className="imageupload-input"
                name="imageupload"
                id="image"
                onChange={(e) => {
                  setimagePreview(URL.createObjectURL(e.target.files[0]));
                  setFormData({
                    ...formData,
                    imageUpload: e.target.files[0].name,
                  });
                }}
              />
              <label htmlFor="image" className="custom-file-upload">
                {formData.imageUpload
                  ? formData.imageUpload
                  : "choose file...."}
                <FontAwesomeIcon icon={faUpload} />
              </label>
            </div>
            <img src={imagePreview} alt="" width={"100px"} />
            <div>{/* image upload  */}</div>
          </div>

          <div className="submit_btn d-flex justify-content-end mt-3 mb-3" style={style}>
            <Button  onClick={handleShow} style={{background:"rgb(3, 3, 96)"}}>
              preview
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Additem;
