import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import swal from "sweetalert";
import '../App.css';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [existingData, setExistingdata] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [col, setCol] = useState([]);
  const [show, setShow] = useState(false);
  const [suppres, setSuppRes] = useState([]);
  const [imagePreview, setimagePreview] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const[reorderlevels,setReorderlevels]=useState([])
  const [formData, setFormData] = useState({
    itemname: "",
    description: "",
    category: "",
    manufacturer: "",
    unitOfMeasure: "",
    unitPrice: "",
    initialQuantity: "",
    expirationDate: "",
    reorderlevel: "",
    imageUpload: null,
  });
console.log(formData.reorderlevel)
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      suppliers: [suppres],
    }));
  }, [suppres]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:4000/SuppliersData")
      .then((response) => {
        setSuppliers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching suppliers", error);
        setLoading(false);
        setIsError(true);
      });
  }, []);
const getData=()=>{
  setLoading(true);
  axios
    .get("http://localhost:4000/ExistingData")
    .then((response) => {
      setExistingdata(response.data);
      setCol(Object.keys(response.data[0]));
      setLoading(false);
    })
    .catch((error) => {
      console.error("Error fetching existing items", error);
      setLoading(false);
      setIsError(true);
    });
}
  useEffect(() => {

   getData()
  }, []);

  const handledelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      customClass: {
        popup: 'swal2-popup' // Apply custom styles
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4000/ExistingData/${id}`).then((response)=>{
          setExistingdata(existingData.filter((item)=>item.id!==id))
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error"
        });
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

 reorderlevel()
  
    axios
      .get("http://localhost:4000/ExistingData")
      .then((response) => {
        setExistingdata(response.data);
        setCol(Object.keys(response.data[0]));
        setLoading(false);
        getData();
       
      })
      .catch((error) => {
        console.error("Error fetching existing items", error);
        setLoading(false);
        setIsError(true);
      });
    if (
      !formData.itemname ||
      !formData.category ||
      !formData.manufacturer ||
      !formData.unitOfMeasure ||
      !formData.unitPrice ||
      !formData.initialQuantity
    ) {
      alert("Please fill in all required fields");
      return;
    }
    const duplicateitem = existingData.some((eachitem) => {
      return (
        eachitem.itemname === formData.itemname &&
        eachitem.manufacturer === formData.manufacturer
      );
    });

    if (duplicateitem) {
      Swal.fire({
        title: "Duplicate Data",
        text: "Item is already existing in the records",
        icon: "error",
      });
    } else {
      axios.post("http://localhost:4000/ExistingData", formData).then((res) => {
        swal({
          title: "Good job!",
          text: "Item added to inventory successfully",
          icon: "success",
        });
        setFormData({
          itemname: "",
          description: "",
          category: "",
          manufacturer: "",
          unitOfMeasure: "",
          unitPrice: "",
          initialQuantity: "",
          expirationDate: "",
          reorderlevel: "",
          imageUpload: null,
        });
        setShow(false);
      });
    }
  };

  // reorder level logic
  const reorderlevel=()=>{
    if(formData.reorderlevel===formData.initialQuantity){

      alert("matched")
    }
  
 else{
  alert("not matched")
 }
  // const reorderlevel= existingData.map((eachreorder)=>{
  //    return eachreorder.reorderlevel===eachreorder.initialQuantity
     
  //   })
    
    
  }
  return (
    <UserContext.Provider
      value={{
        formData,
        setFormData,
        handleSubmit,
        suppliers,
        existingData,
        col,
        show,
        setShow,
        handleClose,
        handleShow,
        suppres,
        setSuppRes,
        imagePreview,
        setimagePreview,
        Loading,
        setLoading,
        isError,
        handledelete,
        reorderlevel

      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const AddItemContext = () => {
  return useContext(UserContext);
};
