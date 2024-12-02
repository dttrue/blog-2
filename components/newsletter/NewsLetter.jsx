"use client";

const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-3xl font-bold mb-5">Newsletter</h2>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl text-center">
        <h4 className="text-3xl font-bold text-white">Keep Updated</h4>
        <p className="mt-2 text-lg text-gray-300">
          Receive notifications about recently added high-quality components.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mt-6 flex justify-center gap-4"
        >
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="flex-1 min-w-0 rounded-md bg-white/10 px-3.5 py-2 text-white placeholder-gray-300"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            className="px-5 py-2.5 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Notify Me
          </button>
        </form>
        <svg
          viewBox="0 0 1024 1024"
          className="absolute -z-10 h-full w-full max-w-xs max-h-xs opacity-20 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="512" cy="512" r="512" fill="url(#gradient)" />
          <defs>
            <radialGradient
              id="gradient"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6" />
              <stop offset="1" stopColor="#7ED321" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default NewsLetter;
