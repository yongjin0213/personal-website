"use client";

import Link from "next/link";
import { useCms } from "./cms-context";

export default function CmsShell({ children }: { children: React.ReactNode }) {
  const { editMode, toggleEditMode, isAdmin } = useCms();

  return (
    <div className={editMode ? "cms-editing" : ""}>
      {isAdmin ? (
        <div className="cms-toolbar">
          <button
            className={`cms-toggle ${editMode ? "cms-toggle-on" : ""}`}
            onClick={toggleEditMode}
            type="button"
          >
            {editMode ? "Exit edit mode" : "Enter edit mode"}
          </button>
          <Link className="cms-link" href="/admin">
            Admin
          </Link>
        </div>
      ) : null}
      {children}
    </div>
  );
}
