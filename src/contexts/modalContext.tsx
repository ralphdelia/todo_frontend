import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

interface ModalProviderProps {
  children: ReactNode;
}

interface ModalContextType {
  title: string | null;
  content: ReactNode | null;
  modalIsOpen: boolean;
  openModal: ({ title, child }: { title: string; child: ReactNode }) => void;
  closeModal: (event: React.SyntheticEvent) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context || context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<ReactNode | null>(null);

  const htmlTag = document.documentElement;
  const modalAnimationDuration = 400;

  const openModal = ({ title, child }: { title: string; child: ReactNode }) => {
    setTitle(title);
    setContent(child);

    if (htmlTag) {
      setModalIsOpen(true);
      htmlTag.classList.add("modal-is-open", "modal-is-opening");

      setTimeout(() => {
        htmlTag.classList.remove("modal-is-opening");
      }, modalAnimationDuration);
    }
  };

  const closeModal = (event: React.SyntheticEvent | KeyboardEvent) => {
    event.preventDefault();
    htmlTag.classList.add("modal-is-closing");
    setTimeout(() => {
      setModalIsOpen(false);
      htmlTag.classList.remove("modal-is-open", "modal-is-closing");
      setTitle(null);
      setContent(null);
    }, modalAnimationDuration);
  };

  useEffect(() => {
    if (!modalIsOpen) {
      return;
    }
    const handleEscape = (event: KeyboardEvent) => {
      if ("key" in event && event.key === "Escape") {
        event.preventDefault();
        closeModal(event);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [modalIsOpen]);

  return (
    <ModalContext.Provider
      value={{ title, content, modalIsOpen, openModal, closeModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModal };
