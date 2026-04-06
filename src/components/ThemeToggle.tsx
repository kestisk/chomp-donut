import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center gap-2 rounded-full border-2 border-on-primary/30 bg-on-primary/20 px-4 py-2 text-lg font-bold text-on-primary backdrop-blur-sm transition-all hover:bg-on-primary/30"
      aria-label={`Switch to ${theme === 'blue' ? 'pink' : 'blue'} theme`}
    >
      <span className="inline-block h-3 w-3 rounded-full bg-indicator transition-colors" />
      {theme === 'blue' ? 'Blue' : 'Pink'}
    </button>
  );
}
