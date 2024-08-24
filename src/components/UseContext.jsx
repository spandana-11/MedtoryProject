// UserProvider.js
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import Swal from "sweetalert2";

import swal from "sweetalert";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [existingData, setExistingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [suppliers, setSuppliers] = useState([]);
  const [col, setCol] = useState([]);
  const [show, setShow] = useState(false);
  const [suppres, setSuppRes] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const [updateBtn, setUpdateBtn] = useState(false);
  const [reorderData, setReorderData] = useState([]);
  const [notificationShow, setNotficatonshow] = useState(false);
  const multiSelectRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(col);

  const [formData, setFormData] = useState({
    id: new Date().getTime().toString().slice(0, 9),
    sku: "",
    itemname: "",
    description: "",
    category: "",
    manufacturer: "",
    unitOfMeasure: "",
    unitPrice: "",
    initialQuantity: "",
    expirationDate: "",
    reorderlevel: "",
    suppliers: "",
    imageUpload: null,
  });
  console.log(formData);
  useEffect(() => {
    setFormData((previousData) => ({
      ...previousData,
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

  const getData = () => {
    setLoading(true);
    axios
      .get(" http://localhost:4000/ExistingData")
      .then((response) => {
        setExistingData(response.data);
        setCol(Object.keys(response.data[0]));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching existing items", error);
        setLoading(false);
        setIsError(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        customClass: {
          popup: "swal2-popup", // Apply custom styles
        },
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(` http://localhost:4000/ExistingData/${id}`)
            .then((response) => {
              setExistingData(existingData.filter((item) => item.id !== id));
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };
  // const splitdata = formData.itemname.split(" ");
  // if (splitdata.length >= 2 && splitdata[0] && splitdata[1]) {
  //   const result = `${splitdata[0][0].toUpperCase()}${splitdata[1][0].toUpperCase()}-${new Date().getDate()}`;
  //   console.log(result);
  //   const finaldata = { ...formData, sku: result };
  // }
  // console.log(finaldata.unitPrice);
  //  else {
  //     console.log("Insufficient data to generate result.");
  // }
  const handleSubmit = (e) => {
    e.preventDefault();
    reorderlevel();
    axios
      .get(" http://localhost:4000/ExistingData")
      .then((response) => {
        setExistingData(response.data);
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
    // .some() method tests whether at least one element in the array passes
    // the test implemented by the provided function.
    const isDuplicate = existingData.some((item) => {
      return (
        item.itemname === formData.itemname &&
        item.manufacturer === formData.manufacturer
      );
    });

    if (isDuplicate) {
      Swal.fire({
        title: "Duplicate Data",
        text: "Item is already existing in the records",
        icon: "error",
      });
      return;
    }

    if (isEdit) {
      axios
        .put(` http://localhost:4000/ExistingData${isEdit}`, formData)
        .then((res) => {
          alert("Data updated successfully");
          setIsEdit("");
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
          getData();
          setUpdateBtn(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios.post("http://localhost:8081/addItem", formData).then((res) => {
        swal({
          title: "Good job!",
          text: "Item added to inventory successfully",
          icon: "success",
        });
        setFormData({
          id: "",
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
        if (multiSelectRef.current) {
          multiSelectRef.current.resetSelectedValues();
        }
      });
    }
  };

  const handleEdit = (id) => {
    const editData = existingData.find((item) => item.id === id);
    console.log(editData);

    const Duplicatedata = existingData.some((item) => {
      return (
        item.itemname === editData.itemname &&
        item.manufacturer === editData.manufacturer &&
        item.id !== id
      );
    });

    if (Duplicatedata) {
      Swal.fire({
        title: "Duplicate Data",
        text: "Item is already existing ",
        icon: "error",
      });
      return;
    }

    setFormData(editData);
    setIsEdit(id);
    setUpdateBtn(true);
  };

  const reorderlevel = () => {
    // reorder level logic
  };

  const handleDecrement = (id) => {
    const updatedData = existingData.map((row) => {
      if (row.id === id) {
        const newQuantity = row.initialQuantity - 10;
        if (newQuantity <= parseInt(row.reorderlevel)) {
          Swal.fire({
            title: "Reorder Level Reached!",
            text: `The initial quantity for item ${row.itemname} has reached the reorder level.`,
            icon: "info",
            confirmButtonText: "OK",
          });
          setReorderData([...reorderData, row]);
        }
        return { ...row, initialQuantity: newQuantity };
      }
      return row;
    });
    setExistingData(updatedData);
  };

  // useEffect(()=>{

  // },[])

  return (
    <UserContext.Provider
      value={{
        formData,
        setFormData,
        handleSubmit,
        suppliers,
        existingData,
        setExistingData,
        col,
        show,
        setShow,
        handleClose,
        handleShow,
        suppres,
        setSuppRes,
        imagePreview,
        setImagePreview,
        loading,
        setLoading,
        isError,
        handleDelete,
        reorderlevel,
        handleEdit,
        isEdit,
        setIsEdit,
        updateBtn,
        setUpdateBtn,
        multiSelectRef,
        handleDecrement,
        reorderData,
        setReorderData,
        notificationShow,
        setNotficatonshow,
        // finaldata,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const AddItemContext = () => {
  return useContext(UserContext);
};
