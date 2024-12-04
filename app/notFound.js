export default function NotFound() {
  return (
    <main className="container mx-auto min-h-screen flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="text-lg text-gray-600 mt-4">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="mt-6 inline-block px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow transition duration-200"
      >
        Back to Home
      </a>
    </main>
  );
}
