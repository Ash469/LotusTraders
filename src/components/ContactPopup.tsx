import React, { useState } from 'react';
import './ContactPopup.css';

interface ContactPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isVisible, onClose }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ name, phone });
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="overlay">
      <div className={`popup ${isVisible ? 'show' : ''}`}>
        <button className="closeButton" onClick={onClose}>×</button>
        <div className="formContent">
          <h2 className="text-gray-900 text-xl font-semibold">Welcome To Lotus Traders</h2>
          <p className="text-gray-900 mb-4">Help us with your contact details</p>
          
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
             
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            
            <div className="formGroup">
             
              <input 
                type="tel" 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Contact number"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="submitButton bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;