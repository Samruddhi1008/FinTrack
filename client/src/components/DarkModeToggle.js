export default function DarkModeToggle({ theme, setTheme }) {
    return (
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-3 py-1 rounded bg-indigo_dye text-white hover:opacity-80"
      >
        {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    );
  }
  