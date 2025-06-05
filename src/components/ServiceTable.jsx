import React from 'react';

const ServiceTable = ({ services, onView, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-md border border-teal-200 mt-2 mb-2">
      <table className="min-w-full divide-y divide-teal-200 text-sm sm:text-base">
        <thead className="bg-[#022C3A] text-white">
          <tr>
            <th className="py-3 px-4 text-left">Full Name</th>
            <th className="py-3 px-4 text-left hidden sm:table-cell">Phone</th>
            <th className="py-3 px-4 text-left">Service Type</th>
            <th className="py-3 px-4 text-left hidden sm:table-cell">Status</th>
            <th className="py-3 px-4 text-left hidden sm:table-cell">Date</th>
            <th className="py-3 px-4 text-left">Actions</th>

          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {services.map(service => (
            <tr key={service._id} className="hover:bg-teal-50 transition-all duration-200">
              <td className="py-2 px-4 font-medium text-gray-800">{service.fullName}</td>
              <td className="py-2 px-4 text-gray-600 hidden sm:table-cell">{service.phone}</td>
              <td className="py-2 px-4 text-gray-700">{service.serviceType}</td>
              <td className="py-2 px-4 hidden sm:table-cell">
                <span className={`px-2 py-1 rounded text-xs font-semibold
                  ${service.serviceStatus === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                    service.serviceStatus === 'Completed' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'}`}>
                  {service.serviceStatus}
                </span>
              </td>
              <td className="py-2 px-4 hidden sm:table-cell text-gray-600">
                {new Date(service.serviceDate).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 space-x-2">
                <button
                  onClick={() => onView(service)}
                  className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded transition"
                >
                  View
                </button>
                <button
                  onClick={() => onDelete(service._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceTable;
