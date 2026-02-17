import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpWideNarrow,
  BrainCircuit,
  Dices,
  Filter,
  Layers,
  Search,
  Sparkles,
  TimerReset,
  X,
  Zap,
} from 'lucide-react';

const algorithmsCatalog = [
  {
    id: 'bubble-sort',
    title: 'Bubble Sort',
    description:
      'A simple sorting algorithm that repeatedly compares adjacent elements and swaps them when needed.',
    path: '/visualizer/bubble-sort',
    category: 'sorting',
    type: 'Comparison',
    complexity: 'O(n^2)',
    level: 'Beginner',
    icon: ArrowUpWideNarrow,
    gradient: 'from-cyan-500/25 via-blue-500/15 to-transparent',
    accent: 'text-cyan-200',
  },
  {
    id: 'selection-sort',
    title: 'Selection Sort',
    description:
      'Selects the minimum value from the unsorted part and places it in its final position each pass.',
    path: '/visualizer/selection-sort',
    category: 'sorting',
    type: 'In-place',
    complexity: 'O(n^2)',
    level: 'Beginner',
    icon: Sparkles,
    gradient: 'from-blue-500/25 via-indigo-500/15 to-transparent',
    accent: 'text-blue-200',
  },
  {
    id: 'quick-sort',
    title: 'Quick Sort',
    description:
      "A fast divide-and-conquer algorithm that partitions around a pivot and recursively sorts subarrays.",
    path: '/visualizer/quick-sort',
    category: 'sorting',
    type: 'Divide & Conquer',
    complexity: 'O(n log n)',
    level: 'Intermediate',
    icon: Zap,
    gradient: 'from-cyan-400/25 via-sky-500/15 to-transparent',
    accent: 'text-sky-200',
  },
  {
    id: 'linear-search',
    title: 'Linear Search',
    description:
      'Scans values one-by-one from left to right until the target is found.',
    path: '/visualizer/linear-search',
    category: 'searching',
    type: 'Sequential',
    complexity: 'O(n)',
    level: 'Beginner',
    icon: Search,
    gradient: 'from-blue-400/25 via-cyan-500/15 to-transparent',
    accent: 'text-cyan-100',
  },
  {
    id: 'radix-sort',
    title: 'Radix Sort',
    description:
      'A non-comparative sorting algorithm that sorts integers by processing individual digits.',
    path: '/visualizer/radix-sort',
    category: 'sorting',
    type: 'Distribution',
    complexity: 'O(nk)',
    level: 'Advanced',
    icon: Sparkles,
    gradient: 'from-fuchsia-500/25 via-purple-500/15 to-transparent',
    accent: 'text-fuchsia-200',
  },
  {
    id: 'heap-sort',
    title: 'Heap Sort',
    description:
      'A comparison-based sorting algorithm that uses a binary heap data structure to sort elements efficiently.',
    path: '/visualizer/heap-sort',
    category: 'sorting',
    type: 'Comparison',
    complexity: 'O(n log n)',
    level: 'Intermediate',
    icon: Layers,
    gradient: 'from-emerald-500/25 via-teal-500/15 to-transparent',
    accent: 'text-emerald-200',
  },
];

const filterTabs = [
  { id: 'all', label: 'All' },
  { id: 'sorting', label: 'Sorting' },
  { id: 'searching', label: 'Searching' },
];

const levelTabs = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const levelRank = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

const complexityRank = {
  'O(1)': 1,
  'O(log n)': 2,
  'O(n)': 3,
  'O(n log n)': 4,
  'O(n^2)': 5,
};

export default function Algorithms() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [activeLevel, setActiveLevel] = useState('All');
  const [spotlightId, setSpotlightId] = useState(algorithmsCatalog[0].id);
  const prefersReducedMotion = useReducedMotion();

  const MotionSection = motion.section;
  const MotionArticle = motion.article;
  const MotionDiv = motion.div;

  const filteredAlgorithms = useMemo(() => {
    const normalizedQuery = searchText.trim().toLowerCase();

    const result = algorithmsCatalog.filter((algorithm) => {
      const matchesFilter = activeFilter === 'all' || algorithm.category === activeFilter;
      const matchesLevel = activeLevel === 'All' || algorithm.level === activeLevel;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        algorithm.title.toLowerCase().includes(normalizedQuery) ||
        algorithm.description.toLowerCase().includes(normalizedQuery) ||
        algorithm.type.toLowerCase().includes(normalizedQuery);
      return matchesFilter && matchesSearch && matchesLevel;
    });

    if (sortBy === 'name') {
      return [...result].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sortBy === 'complexity') {
      return [...result].sort(
        (a, b) =>
          (complexityRank[a.complexity] ?? 99) - (complexityRank[b.complexity] ?? 99),
      );
    }

    if (sortBy === 'level') {
      return [...result].sort(
        (a, b) => (levelRank[a.level] ?? 99) - (levelRank[b.level] ?? 99),
      );
    }

    return result;
  }, [activeFilter, activeLevel, searchText, sortBy]);

  const spotlightAlgorithm = useMemo(() => {
    return (
      filteredAlgorithms.find((algorithm) => algorithm.id === spotlightId) ??
      filteredAlgorithms[0] ??
      algorithmsCatalog[0]
    );
  }, [filteredAlgorithms, spotlightId]);

  const sortingCount = algorithmsCatalog.filter(
    (algorithm) => algorithm.category === 'sorting',
  ).length;
  const searchingCount = algorithmsCatalog.filter(
    (algorithm) => algorithm.category === 'searching',
  ).length;
  const hasActiveFilters =
    activeFilter !== 'all' || activeLevel !== 'All' || searchText.trim().length > 0;
  const SpotlightIcon = spotlightAlgorithm.icon;

  const handleResetFilters = () => {
    setActiveFilter('all');
    setActiveLevel('All');
    setSearchText('');
    setSortBy('featured');
  };

  const handleRandomSpotlight = () => {
    const source = filteredAlgorithms.length > 0 ? filteredAlgorithms : algorithmsCatalog;
    const randomAlgorithm = source[Math.floor(Math.random() * source.length)];
    setSpotlightId(randomAlgorithm.id);
  };

  return (
    <div className="font-body relative mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:py-14">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.15),transparent_38%),radial-gradient(circle_at_80%_0%,rgba(59,130,246,0.18),transparent_36%),linear-gradient(to_bottom,rgba(15,23,42,0.9),rgba(15,23,42,0.4))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(125deg,rgba(16,185,129,0.08)_0%,rgba(14,165,233,0.02)_48%,rgba(245,158,11,0.08)_100%)]" />
      <MotionDiv
        className="pointer-events-none absolute -left-12 top-24 -z-10 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -18, 0], opacity: [0.45, 0.8, 0.45] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { repeat: Infinity, duration: 6.4, ease: 'easeInOut' }
        }
      />
      <MotionDiv
        className="pointer-events-none absolute -right-16 top-36 -z-10 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, 20, 0], opacity: [0.35, 0.65, 0.35] }}
        transition={
          prefersReducedMotion
            ? undefined
            : { repeat: Infinity, duration: 7.2, ease: 'easeInOut' }
        }
      />

      <MotionSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-800/40 p-6 shadow-2xl shadow-slate-950/45 backdrop-blur sm:p-8"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
              <BrainCircuit size={14} />
              Algorithm Explorer
            </p>
            <h1 className="font-display mt-4 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover, Compare, and Visualize Algorithms
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Find the right algorithm with live filters, better metadata, and smooth
              transitions designed for focused learning on desktop and mobile.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-slate-400">Algorithms</p>
                <p className="mt-1 text-2xl font-bold text-white">{algorithmsCatalog.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-slate-400">Sorting</p>
                <p className="mt-1 text-2xl font-bold text-cyan-200">{sortingCount}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-slate-400">Searching</p>
                <p className="mt-1 text-2xl font-bold text-blue-200">{searchingCount}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-xs uppercase tracking-wider text-slate-400">Theme</p>
                <p className="mt-1 text-2xl font-bold text-white">DSA LAB</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/55 p-5 backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Spotlight
            </p>
            <div className="mt-4 flex items-start gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cyan-200">
                <SpotlightIcon size={20} />
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-white">{spotlightAlgorithm.title}</h2>
                <p className="text-xs uppercase tracking-widest text-slate-400">
                  {spotlightAlgorithm.type}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              {spotlightAlgorithm.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-100">
                {spotlightAlgorithm.complexity}
              </span>
              <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-100">
                {spotlightAlgorithm.level}
              </span>
            </div>
            <Link
              to={spotlightAlgorithm.path}
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/35 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition-all hover:gap-3 hover:brightness-110"
            >
              Launch Visualizer
              <ArrowRight size={16} />
            </Link>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleRandomSpotlight}
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-100 transition-colors hover:bg-emerald-500/20"
              >
                <Dices size={13} />
                Shuffle Spotlight
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors hover:bg-white/10"
                >
                  <X size={13} />
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 }}
        className="mt-6 rounded-3xl border border-white/10 bg-slate-800/35 p-4 backdrop-blur sm:p-5"
      >
        <div className="grid gap-4 xl:grid-cols-[1fr_auto_auto] xl:items-center">
          <label className="relative block">
            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by name, type, or keyword..."
              aria-label="Search algorithms by name, type, or keyword"
              className="h-11 w-full rounded-xl border border-white/10 bg-slate-900/70 pl-10 pr-3 text-sm text-slate-100 outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400/40 focus:ring-2 focus:ring-cyan-400/15"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                aria-pressed={activeFilter === tab.id}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all ${activeFilter === tab.id
                  ? 'border-blue-400/60 bg-blue-500/20 text-blue-100 shadow-lg shadow-blue-900/30'
                  : 'border-white/10 bg-white/5 text-slate-300 hover:border-cyan-400/40 hover:text-white'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
            <Filter size={16} className="text-cyan-300" />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort algorithms"
              className="bg-transparent text-sm text-slate-200 outline-none"
            >
              <option value="featured" className="bg-slate-900 text-slate-100">
                Featured
              </option>
              <option value="name" className="bg-slate-900 text-slate-100">
                Name
              </option>
              <option value="complexity" className="bg-slate-900 text-slate-100">
                Complexity
              </option>
              <option value="level" className="bg-slate-900 text-slate-100">
                Difficulty
              </option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {levelTabs.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setActiveLevel(level)}
              aria-pressed={activeLevel === level}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-all ${activeLevel === level
                ? 'border-emerald-400/55 bg-emerald-500/15 text-emerald-100'
                : 'border-white/10 bg-white/5 text-slate-300 hover:border-emerald-400/40 hover:text-white'
                }`}
            >
              {level}
            </button>
          ))}
          <span className="w-full rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300 sm:ml-auto sm:w-auto">
            Showing {filteredAlgorithms.length} result
            {filteredAlgorithms.length === 1 ? '' : 's'}
          </span>
        </div>
      </MotionSection>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredAlgorithms.map((algorithm, index) => {
          const Icon = algorithm.icon;
          return (
            <MotionArticle
              key={algorithm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              whileHover={prefersReducedMotion ? undefined : { y: -6 }}
              onMouseEnter={() => setSpotlightId(algorithm.id)}
              onTouchStart={() => setSpotlightId(algorithm.id)}
              onFocusCapture={() => setSpotlightId(algorithm.id)}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-800/45 p-6 shadow-xl shadow-slate-950/45 backdrop-blur-sm transition-all hover:border-cyan-300/45"
            >
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_45%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${algorithm.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/25 bg-blue-500/15 text-blue-200">
                  <Icon size={22} />
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-200">
                    {algorithm.type}
                  </span>
                  <span className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-blue-200">
                    {algorithm.complexity}
                  </span>
                </div>

                <h2 className="font-display text-2xl font-bold text-white">{algorithm.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">
                  {algorithm.description}
                </p>

                <div className="mt-6 flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${algorithm.accent}`}
                  >
                    {algorithm.level}
                  </span>
                  <Link
                    to={algorithm.path}
                    className="inline-flex items-center gap-2 rounded-full border border-blue-400/35 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-100 transition-all hover:gap-3 hover:bg-blue-500/20"
                  >
                    Visualize
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </MotionArticle>
          );
        })}
      </div>

      {filteredAlgorithms.length === 0 && (
        <MotionDiv
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 rounded-2xl border border-white/10 bg-slate-800/45 px-6 py-10 text-center text-slate-300"
        >
          <div className="mx-auto max-w-md">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
              <TimerReset size={13} />
              No Match
            </p>
            <p className="mt-3 text-sm sm:text-base">
              No algorithm matched your search. Try another keyword or switch filter.
            </p>
          </div>
        </MotionDiv>
      )}
    </div>
  );
}
