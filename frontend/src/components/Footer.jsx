import React from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate=useNavigate();
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm">
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
           Parijat Homeo Nature Care is a renowned homeopathic hospital with a 100% excellent track record in patient care and treatment.
            The hospital offers holistic, natural healing through personalized homeopathic remedies, ensuring zero side effects.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <NavLink to="/"><li className="hover:text-blue-400 hover:font-medium">Home</li></NavLink>
            <NavLink to="/about"><li className="hover:text-blue-400 hover:font-medium">About us</li></NavLink>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 9876543210</li>
            <li>parijaathomeonaturecare@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright 2024 @ Parijaat.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
