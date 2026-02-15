import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-slate-900/80 backdrop-blur border-b border-slate-800/80">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tight text-white">
          <span className="text-blue-500">DSA</span> LAB
        </h1>
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <Link to="/" className="px-4 py-2 rounded-xl hover:text-white hover:bg-slate-800/70 transition">Home</Link>
          <Link to="/algorithms" className="px-4 py-2 rounded-xl hover:text-white hover:bg-slate-800/70 transition">Algorithms</Link>
          <Link to="/contact" className="px-4 py-2 rounded-xl hover:text-white hover:bg-slate-800/70 transition">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}
