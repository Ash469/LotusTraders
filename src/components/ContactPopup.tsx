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
          <h2>Welcome To Lotus Traders</h2>
          <p>Help us with your contact details</p>
          
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
            
            <button type="submit" className="submitButton">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;