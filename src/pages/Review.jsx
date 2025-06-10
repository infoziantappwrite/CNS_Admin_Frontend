import { useState } from 'react';

export default function Review() {
  const [form, setForm] = useState({
    service: '',
    benefits: '',
    rating: '',
    comments: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Review Submitted:', form);
    alert('Thank you for your review!');
    setForm({ service: '', benefits: '', rating: '', comments: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-[#013243] mb-2">Reviews</h1>
        <p className="text-gray-600">Share your experience with our services!</p>
      </div>

      {/* Review Form */}
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service You Used</label>
            <input
              type="text"
              name="service"
              value={form.service}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#013243]"
              placeholder="Eg: Cleaning, Repairing, Landscaping"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefits You Got</label>
            <textarea
              name="benefits"
              value={form.benefits}
              onChange={handleChange}
              rows={3}
              required
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#013243]"
              placeholder="How did our service help you?"
            />
          </div>

<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
  <div className="flex space-x-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setForm({ ...form, rating: star })}
        className={`text-4xl transition ${
          star <= form.rating ? 'text-yellow-400' : 'text-gray-300'
        } hover:scale-110 focus:outline-none`}
        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
      >
        ★
      </button>
    ))}
  </div>
  {form.rating === 5 && <p className="text-sm text-[#013243] mt-1">Excellent!</p>}
  {form.rating === 4 && <p className="text-sm text-[#013243] mt-1">Very Good</p>}
  {form.rating === 3 && <p className="text-sm text-[#013243] mt-1">Average</p>}
  {form.rating === 2 && <p className="text-sm text-[#013243] mt-1">Poor</p>}
  {form.rating === 1 && <p className="text-sm text-[#013243] mt-1">Very Bad</p>}
</div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Additional Comments</label>
            <textarea
              name="comments"
              value={form.comments}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#013243]"
              placeholder="Any other suggestions or feedback?"
            />
          </div>

          <button
            type="submit"
            className="bg-[#013243] text-white font-semibold px-6 py-2 rounded-md hover:bg-[#025a75] transition duration-300"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
