import React from "react";
import ContactForm from "./_components/contact-us-form";

const ContactUsPage = () => {
  return (
    <div className='relative w-full min-h-screen flex flex-col justify-center items-center bg-[url("/images/contact_bg.jpg")] bg-cover bg-no-repeat bg-center'>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[120%] text-center">
          Get In Touch
        </h1>

        <p className="text-base md:text-lg lg:text-xl font-normal text-[#EBEBEB] text-center pt-4 pb-7">
          Have a question or need support with your legal journey? Our <br className="hidden md:block"/>
          team is here to help with applications, events, and everything in <br className="hidden md:block"/>
          between.
        </p>

        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUsPage;
