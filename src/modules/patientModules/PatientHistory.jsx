import React from 'react'
import { useNavigate } from "react-router-dom";
import HistoryList from '../../functions/HistoryList';

export default function PatientHistory() {

    const navigate = useNavigate()

  return (
    <>
      <div className="w-full md:w-[100%] mt-10 px-[25%]" >
      <h1 className="text-3xl text-center mt-6 font-bold">History of your Appointments</h1>
      <p className='text-1xl text-center mt-3 font-semibold'>List of your completed or missed appointments</p>
          {/* <button className='mb-6 w-full bg-green-700 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md 
          hover:bg-green-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-green-900'
          onClick={()=>navigate("/create-queue")}
          >Create an Appointment</button> */}
{/* 
          <button className='mb-6 w-full bg-green-700 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md 
          hover:bg-green-800 transition duration-150 ease-in-out hover:shadow-lg active:bg-green-900'
          onClick={()=>navigate("/edit-schedule")}
          >Edit Schedule</button>     */}
      </div>

      <div className="container mx-auto p-4">
        <HistoryList />
      </div>
    </>
  )
}
