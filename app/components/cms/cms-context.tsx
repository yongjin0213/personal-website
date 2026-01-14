"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type CmsContextValue = {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
  editMode: boolean;
  toggleEditMode: () => void;
  setEditMode: (value: boolean) => void;
  getValue: (path: string) => string | null;
  setValue: (path: string, value: string) => void;
  reset: () => void;
  content: Record<string, string>;
};

const CmsContext = createContext<CmsContextValue | null>(null);

const CONTENT_KEY = "cms-content";
const MODE_KEY = "cms-edit-mode";
const ADMIN_KEY = "cms-admin-auth";

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [editMode, setEditModeState] = useState(false);
  const [isAdmin, setIsAdminState] = useState(false);
  const [content, setContent] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      const savedContent = localStorage.getItem(CONTENT_KEY);
      if (savedContent) {
        setContent(JSON.parse(savedContent) as Record<string, string>);
      }
      const savedMode = localStorage.getItem(MODE_KEY);
      if (savedMode) {
        setEditModeState(savedMode === "true");
      }
      const savedAdmin = localStorage.getItem(ADMIN_KEY);
      if (savedAdmin) {
        setIsAdminState(savedAdmin === "true");
      }
    } catch {
      setContent({});
    }
  }, []);

  const persistContent = useCallback((next: Record<string, string>) => {
    setContent(next);
    localStorage.setItem(CONTENT_KEY, JSON.stringify(next));
  }, []);

  const setEditMode = useCallback((value: boolean) => {
    setEditModeState(value);
    localStorage.setItem(MODE_KEY, String(value));
  }, []);

  const setIsAdmin = useCallback((value: boolean) => {
    setIsAdminState(value);
    localStorage.setItem(ADMIN_KEY, String(value));
  }, []);

  const toggleEditMode = useCallback(() => {
    setEditModeState((prev) => {
      const next = !prev;
      localStorage.setItem(MODE_KEY, String(next));
      return next;
    });
  }, []);

  const getValue = useCallback(
    (path: string) => {
      return content[path] ?? null;
    },
    [content]
  );

  const setValue = useCallback(
    (path: string, value: string) => {
      persistContent({ ...content, [path]: value });
    },
    [content, persistContent]
  );

  const reset = useCallback(() => {
    setContent({});
    localStorage.removeItem(CONTENT_KEY);
  }, []);

  const value = useMemo(
    () => ({
      isAdmin,
      setIsAdmin,
      editMode,
      toggleEditMode,
      setEditMode,
      getValue,
      setValue,
      reset,
      content,
    }),
    [
      content,
      editMode,
      getValue,
      isAdmin,
      reset,
      setEditMode,
      setIsAdmin,
      setValue,
      toggleEditMode,
    ]
  );

  return <CmsContext.Provider value={value}>{children}</CmsContext.Provider>;
}

export function useCms() {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error("useCms must be used within CmsProvider");
  }
  return context;
}
