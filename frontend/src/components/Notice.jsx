import React from "react";
import Marquee from "react-fast-marquee";

const Notice = () => {
  return (<>
    <Marquee speed={60} gradient={false} pauseOnHover className=" my-2 mx-auto w-[50%] bg-gray-300 border rounded-xl ">
      🏥 Free Homeopathy Check-up Camp on Sunday! 🌿 Book your slot now! 🧘 Natural healing with Parijat Homeo Nature Care!
    </Marquee>
</>
  );
};

export default Notice;
