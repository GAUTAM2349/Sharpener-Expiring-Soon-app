import { useState } from 'react';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
  <div className="min-h-screen w-full bg-blue-950 flex items-center justify-center px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md sm:max-w-lg md:max-w-xl bg-blue-900 p-8 py-30 rounded-lg shadow-lg flex flex-col justify-between min-h-[400px]"
    >
      <div className="flex-1">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-100"
          >
            email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@flowbite.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-100"
          >
            password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="flex items-start mb-6">
          <input
            id="remember"
            name="remember"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
            checked={formData.remember}
            onChange={handleChange}
          />
          <label
            htmlFor="remember"
            className="ml-2 text-sm font-medium text-gray-300"
          >
            me
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="mt-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Submit
      </button>
    </form>
  </div>
);

}

export default Login;
