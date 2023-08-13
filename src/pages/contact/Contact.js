import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-wrapper container contact-box">
      <div className="contact-banner">
        <h2 className="contact-text">Contact</h2>
      </div>
      <form className="contact">
        <div className="contact-form">
          <div className="contact-left">
            <div className="contact-details">
              <label htmlFor="name">First Name</label>
              <input type="text" id="name" placeholder="First Name" />
            </div>
            <div className="contact-details">
              <label htmlFor="name">Last Name</label>
              <input type="text" id="name" placeholder="Last Name" />
            </div>
            <div className="contact-details">
              <label htmlFor="number">Phone Number</label>
              <input type="number" id="number" placeholder="+36 20 280-4925" />
            </div>
            <div className="contact-details">
              <label htmlFor="number">Contact preference</label>
              <input type="text" name="" id="number" placeholder="Number" />
            </div>
          </div>
          <div className="contact-right">
            <div className="contact-details">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name=""
                id="email"
                placeholder="johndoe@gmail.com"
              />
            </div>
            <div className="contact-details">
              <label htmlFor="region">Region</label>
              <input type="text" name="" id="name" placeholder="eg Africa" />
            </div>

            <div className="contact-details">
              <label htmlFor="name">Zip Code</label>
              <input type="number" name="" id="name" placeholder="3529" />
            </div>
          </div>
        </div>

        <div className="contact-details">
          <p>
            By clicking "Submit & Continue" I agree to share the provided
            information with Tesla to be contacted with more details or offers
            about Tesla products. I understand these calls or texts may use
            computer-assisted dialing or pre-recorded messages. This consent is
            not a condition of the test drive.
          </p>
        </div>
        <button>Submit and continue</button>
      </form>
    </div>
  );
};

export default Contact;
