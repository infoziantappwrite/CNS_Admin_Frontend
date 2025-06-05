import React, { useState } from 'react';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: 'CNS Admin',
    email: 'admin@cnsservices.com',
    role: 'System Administrator',
    department: 'Facility Management',
    bio: 'Responsible for overseeing all administrative operations related to service requests, ensuring smooth workflows, and maintaining quality standards across the CNS platform.'
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="mt-2 mb-2 rounded-2xl min-h-screen bg-gradient-to-br from-[#5f737a] to-[#013243] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-gray-200 shadow-2xl rounded-3xl p-10">
        <h1 className="text-4xl font-bold text-[#013243] mb-8 text-center">CNS Admin Profile</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {['name', 'email', 'role', 'department'].map((field) => (
            <div key={field}>
              <p className="text-sm font-semibold text-gray-500 capitalize mb-1">{field}</p>
              {isEditing ? (
                <input
                  type="text"
                  name={field}
                  value={profileData[field]}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#013243]"
                />
              ) : (
                <p className="text-lg font-medium text-gray-800">{profileData[field]}</p>
              )}
            </div>
          ))}

          <div className="sm:col-span-2">
            <p className="text-sm font-semibold text-gray-500 mb-1">Bio</p>
            {isEditing ? (
              <textarea
                name="bio"
                value={profileData.bio}
                onChange={handleChange}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#013243]"
              />
            ) : (
              <p className="text-base text-gray-700">{profileData.bio}</p>
            )}
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={toggleEdit}
            className="bg-[#013243] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#01485e] transition duration-300"
          >
            {isEditing ? 'Save Profile' : 'Edit Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}
