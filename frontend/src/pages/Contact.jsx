import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>
          CONTACT <span className="text-gray-700 font-semibold">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        {/* <img
          className="w-full   border-[2px] border-gray-300  md:max-w-[360px] shadow-lg "
          src={assets.contact_image}
          alt=""
        /> */}
        <video className="w-[50%]" autoPlay loop>
          <source  src={assets.doctor_contact_us_video}  type="video/mp4">
          </source>
        </video>
        <div className="flex flex-col justify-center items-start gap-6">
          <p className=" font-semibold text-lg text-gray-600">OUR OFFICE</p>
          <p className=" text-gray-500">
             Machchali Sahar Padav Road, <br /><span className="text-gray-700 font-medium">Near :</span>  Shagun Palace , Jaunpur, U.P
          </p>
          <p className=" text-gray-500">
            Tel: (91) 9876543210 <br /> Email: parijathomeonaturecare@gmail.com
          </p>
          <p className=" font-semibold text-lg text-gray-600">
            CAREERS AT PARIJAT HOMEO NATURE CARE
          </p>
          <p className=" text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border rounded-md border-black px-8 py-4 text-sm hover:bg-gray-400 hover:text-white transition-all duration-500">
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
