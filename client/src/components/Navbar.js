import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="bg-indigo_dye text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">💰 𝙁𝙞𝙣𝙏𝙧𝙖𝙘𝙠 </h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-platinum">
            {user.email}
          </span>
          <button
            onClick={handleSignOut}
            className="bg-caribbean_current hover:bg-caribbean_current-600 px-4 py-2 rounded"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}
