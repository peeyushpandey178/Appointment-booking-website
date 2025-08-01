
import axios from 'axios'

export const sendDoctorMail=async({email,name,speciality}) => {
  const API_KEY = process.env.BREVO_API_KEY;
  const url = process.env.BREVO_URL;

  const emailData = {
    sender: {
      name: "Parijaat Homeo Nature Care",
      email: "peeyushpandey178@gmail.com",
    },
    to: [
      {
        email: email,
      },
    ],
    subject: "Registration Email",
    htmlContent:
      `<html><body><h1>Congratulations ${name} !!</h1><br><h3>You are successfully registered at Parijaat Homeo Nature Care as  ${speciality}.</h3><h3>Thank you !</h3></body></html>`
  };

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
    });

    return{
        success:true,
        message:`Email sent to ${name} successfully`
    }

  } catch (error) {
    console.log(error);
    // throw new Error("Email not sent !!");
    return{
        success:false,
        message:`Email not sent to ${name}.`
    }
  }
}


export const sendUserMail=async({email,name}) => {
  const API_KEY = process.env.BREVO_API_KEY;
  const url = process.env.BREVO_URL;

  const emailData = {
    sender: {
      name: "Parijaat Homeo Nature Care",
      email: "peeyushpandey178@gmail.com",
    },
    to: [
      {
        email,
      },
    ],
    subject: "Registration Email",
    htmlContent:
      `<html><body><h1>Congratulations ${name} !!</h1><br><h3>You are successfully registered at Parijaat Homeo Nature Care .</h3><h3>Thank you !</h3></body></html>`
  };

  try {
    const response = await axios.post(url, emailData, {
      headers: {
        "Content-Type": "application/json",
        "api-key": API_KEY,
      },
    });

    return {
        success:true,
        message:`Email sent to ${name} successfully.`
    }
    
  } catch (error) {
    console.log(error);
    // throw new Error("Email not sent!!")  --> not best practice
    return{
        success:false,
        message:`Email not sent to ${name}.`
    }
  }
}