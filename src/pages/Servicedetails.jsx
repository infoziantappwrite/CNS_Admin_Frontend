import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiUser, FiMail, FiPhone, FiCalendar, FiClock, FiHome,
  FiMapPin, FiDollarSign, FiStar, FiEdit, FiCheck, FiX, FiSend
} from 'react-icons/fi';
import { IoMdCheckmarkCircle, IoMdTime, IoMdCreate } from 'react-icons/io';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import sendEmail from '../components/sendmail';

const Servicedetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [serviceData, setServiceData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please log in to access this service request.');
          setLoading(false);
          navigate('/login');
          return;
        }

        const response = await fetch(`https://cns-admin-production.up.railway.app/api/v1/serviceRequest/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError('Unauthorized: Invalid or expired token. Please log in again.');
            navigate('/login');
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.error?.message || `Failed to fetch service request: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error?.message || 'Error fetching service request');
        }

        setServiceData(data.data);
         //console.log("data", data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        toast.error(err.message);
      }
    };

    fetchServiceData();
  }, [id, navigate]);

  const updateStatus = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://cns-admin-production.up.railway.app/api/v1/serviceRequest/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ serviceStatus: newStatus }),
      });
      //console.log("response", response);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error data:", errorData);
        throw new Error(errorData.error?.message || 'Failed to update status');
      }

      const data = await response.json();
     
      setServiceData(prev => ({ ...prev, serviceStatus: newStatus }));
      toast.success('Status updated successfully!');
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  const updatePrice = async (newPrice) => {
    try {
      const token = localStorage.getItem('token');
      const numericPrice = parseInt(newPrice.replace(/[^0-9]/g, '')) || 0;

      const response = await fetch(`https://cns-admin-production.up.railway.app/api/v1/serviceRequest/${id}/price`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ servicePriceEstimation: numericPrice }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to update price');
      }

      const data = await response.json();
      setServiceData(prev => ({ ...prev, servicePriceEstimation: numericPrice }));
      toast.success('Price updated successfully!');
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    }
  };

  const sendPriceMail = async (serviceData) => {
    try {
      const mailTo = serviceData.email;


      const htmlMessage = `
      <div style="
        max-width: 600px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        color: #333;
        border-radius: 1rem;
        overflow: hidden;
      ">
        <!-- Header with Gradient -->
        <div style="
          background: linear-gradient(135deg, #5f737a, #013243);
          padding: 2rem;
          text-align: center;
          color: white;
        ">
          <img src="https://cns-site.vercel.app/assets/logo/logo.png" alt="Company Logo" style="height: 60px; margin-bottom: 1rem;">
          <h1 style="margin: 0; font-size: 1.5rem;">Service Request Update</h1>
        </div>
        
        <!-- Content -->
        <div style="padding: 2rem; background:rgb(191, 228, 232);">
          <p style="font-size: 1.1rem;">Dear ${serviceData.fullName},</p>
          
          <div style="
            background: white;
            border-radius: 0.75rem;
            padding: 1.5rem;
            margin: 1.5rem 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          ">
            <h2 style="color: #013243; margin-top: 0;">Service Request Details</h2>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
              <div>
                <p style="font-weight: bold; margin-bottom: 0.25rem;">Service Type</p>
                <p>${serviceData.serviceType}</p>
              </div>
              <div>
                <p style="font-weight: bold; margin-bottom: 0.25rem;">Status</p>
                <p style="color: ${serviceData.serviceStatus === 'Completed' ? '#10b981' :
          serviceData.serviceStatus === 'Cancelled' ? '#ef4444' :
            '#f59e0b'
        }">
                  ${serviceData.serviceStatus}
                </p>
              </div>
              <div>
                <p style="font-weight: bold; margin-bottom: 0.25rem;">Price Estimation</p>
                <p style="font-size: 1.25rem; color: #013243; font-weight: bold;">
                  ₹${serviceData.servicePriceEstimation || 0}
                </p>
              </div>
              <div>
                <p style="font-weight: bold; margin-bottom: 0.25rem;">Request ID</p>
                <p>#${id}</p>
              </div>
            </div>
            
            ${serviceData.serviceDescription ? `
              <div style="margin-top: 1rem;">
                <p style="font-weight: bold; margin-bottom: 0.25rem;">Description</p>
                <p>${serviceData.serviceDescription}</p>
              </div>
            ` : ''}
          </div>
          
          <p style="margin-bottom: 1.5rem;">
  If you have any questions about this update, please contact our support team:<br><br>
  
  <strong>Email:</strong> support@cnsenterprises.com<br>
  <strong>Phone:</strong> +91 9876543210<br>
  <strong>Hours:</strong> Mon-Sat, 9:00 AM - 6:00 PM IST<br><br>
</p>
          
          <div style="
            background: linear-gradient(135deg,rgba(129, 144, 150, 0.13),rgba(104, 116, 120, 0.13));
            border-radius: 0.75rem;
            padding: 1rem;
            text-align: center;
          ">
            <p style="margin: 0; font-size: 0.9rem; color:rgb(26, 59, 66);">
              This is an automated message. Please do not reply directly to this email.
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="
          background: #013243;
          padding: 1.5rem;
          text-align: center;
          color: white;
          font-size: 0.9rem;
        ">
          <p style="margin: 0;">© ${new Date().getFullYear()} CSN Enterprises. All rights reserved.</p>
        </div>
      </div>
    `;

      await sendEmail(mailTo, htmlMessage);
      toast.success('Notification email sent successfully!');
    } catch (error) {
      toast.error('Failed to send notification email');
      console.error('Error sending price mail:', error);
    }
  };
  const sendreviewMail = async (serviceData) => {
    try {
      const mailTo = serviceData.email;
      const frontendurl = window.location.hostname.includes('localhost') || window.location.hostname.includes('127.0.0.1')
        ? 'http://127.0.0.1:5500'
        : 'https://cns-site.vercel.app/';
      const htmlMessage = `
      <div style="
        max-width: 600px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        color: #333;
        border-radius: 1rem;
        overflow: hidden;
      ">
        <!-- Header with Gradient -->
        <div style="
          background: linear-gradient(135deg, #5f737a, #013243);
          padding: 2rem;
          text-align: center;
          color: white;
        ">
          <img src="https://cns-site.vercel.app/assets/logo/logo.png" alt="Company Logo" style="height: 60px; margin-bottom: 1rem;">
          <h1 style="margin: 0; font-size: 1.5rem;">Service Request Update</h1>
        </div>
        
        <div style="padding: 20px; background-color: #BFE4E8; font-family: Arial, sans-serif; color: #1A3B42;">
  <p style="font-size: 16px; margin-bottom: 20px;">Dear ${serviceData.fullName},</p>
  
  <div style="background-color: white; border-radius: 12px; padding: 20px; margin: 20px 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
    <h2 style="color: #013243; font-size: 18px; margin: 0 0 15px;">Request for Service Review</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; font-weight: bold;">Service Type:</td>
        <td style="padding: 8px;">${serviceData.serviceType}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Status:</td>
        <td style="padding: 8px; color: ${serviceData.serviceStatus === 'Completed' ? '#10B981' :
          serviceData.serviceStatus === 'Cancelled' ? '#EF4444' :
            '#F59E0B'
        };">${serviceData.serviceStatus}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Price Estimation:</td>
        <td style="padding: 8px; font-size: 18px; color: #013243; font-weight: bold;">₹${serviceData.servicePriceEstimation || 0}</td>
      </tr>
      <tr>
        <td style="padding: 8px; font-weight: bold;">Request ID:</td>
        <td style="padding: 8px;">#${id}</td>
      </tr>
      ${serviceData.serviceDescription
          ? `
            <tr>
              <td style="padding: 8px; font-weight: bold;">Description:</td>
              <td style="padding: 8px;">${serviceData.serviceDescription}</td>
            </tr>
          `
          : ''
        }
    </table>
    
    <div style="text-align: center; margin-top: 20px;">
      <a href="${frontendurl}/review.html?id=${id}" style="display: inline-block; background-color: #013243; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
        Leave a Review
      </a>
    </div>
  </div>
  
  <p style="font-size: 14px; margin-bottom: 20px;">
    If you have any questions, please contact our support team at <a href="mailto:support@company.com" style="color: #013243;">support@company.com</a> or <a href="tel:+911234567890" style="color: #013243;">+91 123-456-7890</a>.
  </p>
  
  <div style="background: linear-gradient(135deg, rgba(129,144,150,0.13), rgba(104,116,120,0.13)); border-radius: 12px; padding: 15px; text-align: center;">
    <p style="margin: 0; font-size: 12px; color: #1A3B42;">
      This is an automated message. Please do not reply directly to this email.
    </p>
  </div>
</div>
        
        <!-- Footer -->
        <div style="
          background: #013243;
          padding: 1.5rem;
          text-align: center;
          color: white;
          font-size: 0.9rem;
        ">
          <p style="margin: 0;">© ${new Date().getFullYear()} CSN Enterprises. All rights reserved.</p>
        </div>
      </div>
    `;

      await sendEmail(mailTo, htmlMessage);
      toast.success('Notification email sent successfully!');
    } catch (error) {
      toast.error('Failed to send notification email');
      console.error('Error sending price mail:', error);
    }
  };



  if (loading) {
    return (
      <div className="min-h-screen rounded-2xl bg-gradient-to-br from-[#5f737a] to-[#013243] p-6 text-white text-center flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen rounded-2xl bg-gradient-to-br from-[#5f737a] to-[#013243] p-6 text-white">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 mb-4 text-center">
            <p className="font-medium">{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!serviceData) {
    return (
      <div className="min-h-screen rounded-2xl bg-gradient-to-br from-[#5f737a] to-[#013243] p-6 text-white">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <p className="text-gray-600 text-center">No data found for this service request.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen rounded-3xl bg-gradient-to-br from-[#5f737a] to-[#013243] p-6 ">
      <div className=" mx-auto   rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#013243] p-6 text-white rounded-3xl">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <FiHome className="text-2xl" />
            Service Request Details
          </h1>
          <p className="text-blue-100 mt-1">ID: #{id}</p>
        </div>

        {/* Main Content */}
        <div className="pt-6 space-y-6">
          {/* Customer & Service Details Section */}
          <div className="bg-gray-50 p-5 rounded-3xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiUser className="text-blue-600" />
              Customer & Service Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem icon={<FiUser />} label="Full Name" value={serviceData.fullName} />
              <DetailItem icon={<FiMail />} label="Email" value={serviceData.email} />
              <DetailItem icon={<FiPhone />} label="Phone" value={serviceData.phone} />
              <DetailItem icon={<FiCalendar />} label="Service Date" value={formatDate(serviceData.serviceDate)} />
              <DetailItem icon={<FiClock />} label="Start Time" value={formatDate(serviceData.startTime)} />
              <DetailItem icon={<FiClock />} label="End Time" value={formatDate(serviceData.endTime)} />
              <DetailItem icon={<FiHome />} label="Service Type" value={serviceData.serviceType} />
              <DetailItem icon={<FiMapPin />} label="Location" value={serviceData.serviceLocation} />
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
              <p className="bg-white p-3 rounded border border-gray-200">
                {serviceData.serviceDescription}
              </p>
            </div>
          </div>

          {/* Status & Pricing Section (Editable) */}
          <div className="bg-gray-50 p-5 rounded-3xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <IoMdCheckmarkCircle className="text-blue-600" />
                Service Status & Pricing
              </h2>
              <button
                onClick={() => sendPriceMail(serviceData)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl transition"
              >
                <FiSend size={16} />
                Notify Customer
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <EditableField
                icon={<IoMdCheckmarkCircle />}
                label="Status"
                value={serviceData.serviceStatus}
                options={['Pending', 'Completed', 'Cancelled']}
                onSave={updateStatus}
              />

              <EditableField
                icon={<FiDollarSign />}
                label="Price Estimation"
                value={`₹${serviceData.servicePriceEstimation || 0}`}
                isCurrency={true}
                onSave={updatePrice}
              />
            </div>
          </div>

          {/* Rating & Review Section */}
          <div className="bg-gray-50 p-5 rounded-3xl border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FiStar className="text-blue-600" />
                Customer Feedback
              </h2>
              {serviceData.serviceStatus === 'Completed' && !serviceData.serviceReview && !serviceData.serviceRating && (
              <button
                onClick={() => sendreviewMail(serviceData, id)}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-2xl transition"
              >
                <FiSend className="w-4 h-4" />
                Ask Review
              </button>
            )}
            </div>

            <div className=" items-center gap-4">
              <div className="flex items-center">
                <FiStar className="text-yellow-400 text-xl mr-1" />
                <span className="font-medium">Rating:</span>
                <span className="ml-2">{serviceData.serviceRating || 0}</span>
              </div>

              <div className="flex items-center">
                <FiStar className="text-yellow-400 text-xl mr-1" />
                <span className="font-medium">Review:</span>
                <p className="text-gray-600 italic">
                  {serviceData.serviceReview || 'No review provided'}
                </p>
              </div>
            </div>
          </div>

          {/* Metadata Section */}
          <div className="bg-gray-50 p-5 rounded-3xl border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <IoMdTime className="text-blue-600" />
              System Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem
                icon={<IoMdCreate />}
                label="Created At"
                value={formatDate(serviceData.createdAt)}
              />
              <DetailItem
                icon={<IoMdCreate />}
                label="Updated At"
                value={formatDate(serviceData.updatedAt)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Detail Item Component
const DetailItem = ({ icon, label, value }) => (
  <div>
    <div className="flex items-center text-sm text-gray-500 mb-1">
      <span className="mr-2">{icon}</span>
      {label}
    </div>
    <p className="font-medium">{value}</p>
  </div>
);

// Editable Field Component
const EditableField = ({ icon, label, value, options, isCurrency, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await onSave(editValue);
    setIsSaving(false);
    if (success) {
      setIsEditing(false);
    }
  };

  return (
    <div>
      <div className="flex items-center text-sm text-gray-500 mb-1">
        <span className="mr-2">{icon}</span>
        {label}
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="ml-2 text-blue-600 hover:text-blue-800"
          >
            <FiEdit size={14} />
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="flex items-center gap-2">
          {options ? (
            <select
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="border rounded p-1 text-sm w-full"
              disabled={isSaving}
            >
              {options.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : (
            <input
              type={isCurrency ? "text" : "text"}
              value={editValue}
              onChange={(e) => {
                if (isCurrency) {
                  // Allow only numbers and format as currency
                  const num = e.target.value.replace(/[^0-9]/g, '');
                  setEditValue(num ? `₹${num}` : '₹0');
                } else {
                  setEditValue(e.target.value);
                }
              }}
              className="border rounded p-1 text-sm w-full"
              disabled={isSaving}
            />
          )}
          <button
            onClick={handleSave}
            className="text-green-600"
            disabled={isSaving}
          >
            {isSaving ? '...' : <FiCheck />}
          </button>
          <button
            onClick={() => {
              setIsEditing(false);
              setEditValue(value);
            }}
            className="text-red-600"
            disabled={isSaving}
          >
            <FiX />
          </button>
        </div>
      ) : (
        <p className="font-medium">{value}</p>
      )}
    </div>
  );
};

export default Servicedetails;