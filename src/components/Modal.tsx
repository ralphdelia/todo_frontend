import { useModal } from "../contexts/modalContext";

const Modal = () => {
  const { title, content, modalIsOpen, closeModal } = useModal();

  const handleClickOutside = (event: React.SyntheticEvent) => {
    if (event.target === event.currentTarget) {
      closeModal(event);
    }
  };

  return (
    <dialog open={modalIsOpen} onClick={handleClickOutside}>
      <article>
        <header>
          <button aria-label="Close" rel="prev" onClick={closeModal}></button>
          <p>
            <strong>{title}</strong>
          </p>
        </header>
        {content}
      </article>
    </dialog>
  );
};

export default Modal;
