import React, { useState }from 'react'
import {
    Lucide,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownContent,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    TinySlider,
    PreviewComponent,
    Preview,
    Source,
    Highlight,
  } from "@/base-components";
  import { useNavigate } from 'react-router-dom';
  import { useFormik } from 'formik';
  import { AddPolicySchema } from '../../schemas';
  import Tabulator from '../tabulator/Main';
function AddPolicy() {
    const [superlargeModalSizePreview, setSuperlargeModalSizePreview] = useState(false);
    const navigate = useNavigate()
  const initialValues = {
    policy_name : "",
    policy_price: 0,
    policy_description:""
  }
  const {values, errors, handleBlur, touched,handleChange, handleSubmit} = useFormik({
        initialValues : initialValues,
        validationSchema: AddPolicySchema,
        onSubmit: (values, action) =>{
          console.log("values: ", values)
          // your form submission logic here(endpoint call)
          
          // reset form
          action.resetForm()
          helper.fireToast("success","Policy added successfully")
          // navigate to signup on success
          navigate("/dashboard/addpolicy")
        }
  })
  return (
    <>
    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400">
      <h2 className="font-medium text-base mr-auto"></h2>
      <a
        href="#"
        onClick={() => {
            setSuperlargeModalSizePreview(true);
        }}
        className="btn btn-primary mr-1 mb-2"
        >
        Add New Policy
        </a>
       
    </div>
    <div className="p-5">
        {/* BEGIN: Super Large Modal Content */}
        <Modal
        backdrop="static" // Prevents closing on click outside the modal
        keyboard={false}  // Prevents closing with the keyboard (e.g., pressing Esc key)
          size="modal-xl"
          show={superlargeModalSizePreview}
          onHidden={() => {
            setSuperlargeModalSizePreview(false);
          }}
        >
          <ModalBody className="p-10 text-center">
            <div className='flex justify-end w-full'>
                <button onClick={()=>setSuperlargeModalSizePreview(false) }>
                    <Lucide icon="X"></Lucide>
                </button>
            </div>
            <h1 className='text-2xl'>Add Policy</h1>
            {/* POLICY FIELDS */}
            <form onSubmit={handleSubmit}>
               
               <div className="intro-x mt-8">
               <div className="flex-col items-start form-check form-switch w-full  mt-3 sm:mt-0 ">
                <label htmlFor='policy_name'  className="form-check-label ml-0 mt-4">
                    Policy name
                </label>
                 <input
                   type="text"
                   name="policy_name"
                   className="intro-x login__input form-control py-3 px-4 block "
                   placeholder="Policy name"
                   value={values.policy_name}
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                 {errors.policy_name && touched.policy_name && <p className="text-red-800">{errors.policy_name}</p>}
               </div>
               <div className="flex-col items-start form-check form-switch w-full  mt-3 sm:mt-0 ">

                 <label htmlFor='policy_price' className="form-check-label ml-0 mt-4">
                    Policy price
                </label>
                   <input
                   type="number"
                   name="policy_price"
                   className="intro-x login__input form-control py-3 px-4 block "
                   placeholder="Policy price"
                   value={values.policy_price}
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                 {errors.policy_price && touched.policy_price && <p className="text-red-800 ">{errors.policy_price}</p>} 
               </div>
               <div className="flex-col items-start form-check form-switch w-full  mt-3 sm:mt-0 ">
                 <label htmlFor='policy_description' className="form-check-label ml-0 mt-4">
                    Policy description
                </label>
                <textarea
                   name="policy_description"
                   className="intro-x login__input form-control py-3 px-4 block "
                   placeholder="Policy description"
                   value={values.policy_description}
                   onChange={handleChange}
                   onBlur={handleBlur}
                 />
                 {errors.policy_description && touched.policy_description && <p className="text-red-800">{errors.policy_description}</p>}
               </div>
               <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                 <button className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top">
                   Register
                 </button>
               </div>
               </div>
               </form>
          </ModalBody>
        </Modal>
        {/* END: Super Large Modal Content */}
   

    </div>
    {/* TABULATOR */}
    <div>
     <Tabulator/>   
    </div>
  </>
  )
}

export default AddPolicy
