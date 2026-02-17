import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Algorithms from './pages/Algorithms';
import Contact from './pages/Contact';
import VisualizerPage from './pages/VisualizerPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { bubbleSortCPP } from './algorithms/bubbleSort';
import { selectionSortCPP } from './algorithms/selectionSort';
import { quickSortCPP } from './algorithms/quickSort';
import { linearSearchCPP } from './algorithms/linearSearch';
import { radixSortCPP } from './algorithms/radixSort';
import { heapSortCPP } from './algorithms/heapSort';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-900 text-white selection:bg-blue-500/30">
        <Navbar />

        {/* Changed 'flex' to 'block' to avoid layout issues with the footer */}
        <main className="block">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* ONLY ONE ROUTE HERE */}
            <Route
              path="/visualizer/bubble-sort"
              element={<VisualizerPage name="Bubble Sort" codeSnippet={bubbleSortCPP} />}
            />
            <Route
              path="/visualizer/selection-sort"
              element={<VisualizerPage name="Selection Sort" codeSnippet={selectionSortCPP} />}
            />
            <Route
              path="/visualizer/quick-sort"
              element={<VisualizerPage name="Quick Sort" codeSnippet={quickSortCPP} />}
            />
            <Route
              path="/visualizer/linear-search"
              element={<VisualizerPage name="Linear Search" codeSnippet={linearSearchCPP} />}
            />
            <Route
              path="/visualizer/radix-sort"
              element={<VisualizerPage name="Radix Sort" codeSnippet={radixSortCPP} />}
            />
            <Route
              path="/visualizer/heap-sort"
              element={<VisualizerPage name="Heap Sort" codeSnippet={heapSortCPP} />}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
