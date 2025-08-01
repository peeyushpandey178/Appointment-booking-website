import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {

    const { dToken, profileData, setProfileData, getProfileData } = useContext(DoctorContext)
    const { currency, backendUrl } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)

    const updateProfile = async () => {

        try {

            const updateData = {
                address: profileData.address,
                fees: profileData.fees,
                about: profileData.about,
                available: profileData.available
            }

            const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

            if (data.success) {
                toast.success(data.message)
                setIsEdit(false)
                getProfileData()
            } else {
                toast.error(data.message)
            }

            setIsEdit(false)

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])

    return profileData && (
        <div className='w-full'>
            <div className='flex flex-col gap-4 my-5  mx-auto'>
                <div>
                    <img className='m-auto bg-primary/80  w-[15%] rounded-lg  ' src={profileData.image} alt="" />
                </div>
 
                <div className='mx-auto flex-1 border border-stone-200 rounded-lg p-10 bg-white max-w-sm md:max-w-xl'>

                    {/* ----- Doc Info : name, degree, experience ----- */}

                    <p className='flex justify-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>


                    <div className='flex justify-center mt-1 gap-2'>
                        <p>{profileData.degree} - {profileData.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
                 </div>

                    {/* ----- Doc About ----- */}
                    <div  className="grid grid-cols-[2fr_3fr] mt-4">
                        <p className='text-lg font-bold text-[#262626] mt-3'>About :</p>
                        <p className='text-sm text-gray-600 mt-3'>
                            {
                                isEdit
                                    ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full outline-primary p-2' rows={8} value={profileData.about} />
                                    : profileData.about
                            }
                        </p>
                   

                    <p className='text-lg font-bold text-[#262626] mt-3'>Appointment fee:</p>
                    <p className='text-gray-600 mt-4'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</p>
                    

                    
                        <p className='text-lg font-bold text-[#262626] mt-3'>Address:</p>
                        <p className='text-gray-600 mt-4'>
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
                            <br />
                            {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
                        </p>
                   </div>

                    <div className='flex gap-2 pt-2'>
                        <input className="accent-blue-600" type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
                        <label htmlFor="">Available</label>
                    </div>
                      <div className="flex justify-center">
                    {
                        isEdit
                            ? <button  onClick={updateProfile} className='px-4 py-1 w-40  border border-primary bg-gray-300 text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
                            : <button onClick={() => setIsEdit(prev => !prev)} className='px-4 py-1 w-40 border border-primary bg-gray-300 text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
                    }
                      </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorProfile