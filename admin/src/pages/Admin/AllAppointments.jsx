import React, { useEffect,useState} from 'react'
import { assets } from '../../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'


const AllAppointments = () => {
  const { aToken, appointments,totalPages, cancelAppointment, getAllAppointments } = useContext(AdminContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)

   //applying pagination
   const [pageNo,setPageNo]=useState(1);
   const nextBtn=Array.from({length:2},(_,index)=>(pageNo+index)).filter((item)=>((item>=1 && item<=totalPages)?item:""));
   const prevBtn=Array.from({length:2},(_,index)=>(pageNo-1-index)).filter((item)=>((item>=1 && item<=totalPages)?item:"")).reverse();
   const mergedArray=[...prevBtn,...nextBtn];

   const handlePrev=()=>{
      setPageNo(pageNo-1);
   }
   const handleNext=()=>{
       setPageNo(pageNo+1);
   }

  

  useEffect(() => {
    if (aToken) {
      getAllAppointments(pageNo)
    }
  }, [aToken,pageNo])

  return (
    <div className='w-full max-w-6xl m-5 bg-gray-200 p-4'>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden bg-gray-400 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-800 py-3 px-6 border-b hover:bg-gray-300' key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img src={item.docData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />}
          </div>
        ))}
      </div> 

      <div className="flex justify-center">
        <button onClick={()=>handlePrev()} className={pageNo<=1?"hidden":"border rounded-lg border-gray-500 md:m-2 px-[1%] m-[2%] hover:bg-blue-200  "}>prev</button>
        { mergedArray.map((item,index)=>(
          <button key={index} onClick={()=>setPageNo(item)} className={`  px-[3%]  py-[1%] m-[2%] rounded-lg border md:m-2 md:px-[2%]  md:py-[0.5%]  ${item==pageNo?" border-blue-600 bg-white":" border-gray-500"} ` }>{item}</button>
        ))  }
        <button  onClick={()=>handleNext()} className={pageNo>=totalPages-1?"hidden":" px border rounded-lg border-gray-500 md:m-2 px-[1%] m-[2%] hover:bg-blue-200"}>next</button>
      </div>

    </div>
  )
}

export default AllAppointments