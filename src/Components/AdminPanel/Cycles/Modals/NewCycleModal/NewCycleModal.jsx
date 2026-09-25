import { useRef, useEffect } from "react";
import gsap from "gsap";
import ModalHeader from "./ModalHeader/ModalHeader";
import CycleForm from "./CycleForm/CycleForm";
import styles from "./NewCycleModal.module.css";
import { useCycles } from "../../Context/CycleContext";

const NewCycleModal = () => {
  const { isNewModalOpen, closeNewModal } = useCycles();
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!isNewModalOpen) return;

    if (backdropRef.current && modalRef.current) {
      gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "back.out(1.2)" }
      );
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeNewModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isNewModalOpen, closeNewModal]);

  if (!isNewModalOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      closeNewModal();
    }
  };

  return (
    <div
      className={styles.backdrop}
      ref={backdropRef}
      onClick={handleBackdropClick}
    >
      <div className={styles.modalCard} ref={modalRef} role="dialog" aria-modal="true">
        <ModalHeader onClose={closeNewModal} />
        <CycleForm onClose={closeNewModal} />
      </div>
    </div>
  );
};

export default NewCycleModal;
