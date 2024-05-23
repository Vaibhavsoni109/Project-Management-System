import React from 'react'
import { useForm } from 'react-hook-form'
import { useChangePasswordMutation } from '../redux/slices/userApiSlice';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalWrapper from './ModalWrapper';
import Textbox from './Textbox';
import Loading from './Loader';
import Button from './Button';
import { Dialog } from "@headlessui/react";
const ChangePassword = ({ open, setOpen }) => {
   
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password!= data.cpass) {
      toast.warning("password Doesn't match");
    }

    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("new password added succesfully");

      setTimeout(() => {
        setopen(false);
      }, 1500);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title as='h2'
            className="text-base font-bold leading-64 to-gray-900 mb-4"
          >
            Change Password
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder="New Password"
              type="password"
              name="password"
              label="New Password"
              className="w-full rounded"
              register={register("password", {
                required: "new password is required",
              })}
              error={errors.password? errors.password.message : " "}
            />
            <Textbox
              placeholder="Confirm New Password"
              type="password"
              name="cpass"
              label=" Confirm New Password"
              className="w-full rounded"
              register={register("cpass", {
                required: "Confirm new password is required",
              })}
              error={errors.cpass? errors.cpass.message : " "}
            />

          </div>
          {isLoading? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex-row-reverse'>
              <Button
                type="submit"
                className='bg-blue-600 px-8 text-sm font-semibold rounded text-white hover:bg-blue-700' label="save"
              />
              <button
                type='button'
                className='bg-red-500 ml-2 px-8 py-2 text-sm font-semibold rounded to-gray-900 sm:w-auto'
                onClick={() => setOpen(false)} 
              >
                Cancle
              </button>
            </div>
          )}
        </form>

      </ModalWrapper>
    </>
  )
}

export default ChangePassword