import { useState } from 'react';
import { useForm } from 'react-hook-form';

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [disabled, setDisabled] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    display: false,
    message: '',
    type: '',
  });

  const toggleAlert = (message, type) => {
    setAlertInfo({ display: true, message, type });
    setTimeout(() => {
      setAlertInfo({ display: false, message: '', type: '' });
    }, 5000);
  };

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
      setDisabled(true);

      const templateParams = {
        name,
        email,
        subject,
        message,
      };

      toggleAlert('Form submission was successful!', 'success');
    } catch (e) {
      console.error(e);
      toggleAlert('Uh oh. Something went wrong.', 'error');
    } finally {
      setDisabled(false);
      reset();
    }
  };

  return (
    <div className="form-container">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="hero-title">Contact Us</h1>
            <div className="form-box">
              <form id="contact-form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="row input-row">
                  <div className="col-6">
                    <input
                      type="text"
                      name="name"
                      {...register('name', {
                        required: {
                          value: true,
                          message: 'Please enter your name',
                        },
                        maxLength: {
                          value: 30,
                          message: 'Please use 30 characters or less',
                        },
                      })}
                      className="text-input"
                      placeholder="Name"
                    />
                    {errors.name && (
                      <span className="alert-error">{errors.name.message}</span>
                    )}
                  </div>
                  <div className="col-6">
                    <input
                      type="email"
                      name="email"
                      {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      })}
                      className="text-input"
                      placeholder="Email address"
                    />
                    {errors.email && (
                      <span className="alert-error">Please enter a valid email address</span>
                    )}
                  </div>
                </div>
                <div className="row input-row">
                  <div className="col">
                    <input
                      type="text"
                      name="subject"
                      {...register('subject', {
                        required: {
                          value: true,
                          message: 'Please enter a subject',
                        },
                        maxLength: {
                          value: 75,
                          message: 'Subject cannot exceed 75 characters',
                        },
                      })}
                      className="text-input"
                      placeholder="Subject"
                    />
                    {errors.subject && (
                      <span className="alert-error">{errors.subject.message}</span>
                    )}
                  </div>
                </div>
                <div className="row input-row">
                  <div className="col">
                    <textarea
                      rows={3}
                      name="message"
                      {...register('message', { required: true })}
                      className="textarea-input"
                      placeholder="Message"
                    />
                    {errors.message && (
                      <span className="alert-error">Please enter a message</span>
                    )}
                  </div>
                </div>

                <button className="submit-btn" disabled={disabled} type="submit">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14548.208061321366!2d81.32319769999999!3d19.0631655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2c2f9fef25c30f%3A0x1f477973b8ec60!2sDantewada%2C%20Chhattisgarh!5e0!3m2!1sen!2sin!4v1696192434087!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Info Section */}
      <div className="contact-info">
        <p>Email: <a href="mailto:circuitdantewada@example.com">circuitdantewada@example.com</a></p>
        <p>Mobile: <a href="tel:+919876543210">+91 98765 43210</a></p>
      </div>

      {alertInfo.display && (
        <div className={`alert ${alertInfo.type === 'success' ? 'alert-success' : 'alert-error'}`}>
          {alertInfo.message}
        </div>
      )}
    </div>
  );
};

export default ContactForm;
