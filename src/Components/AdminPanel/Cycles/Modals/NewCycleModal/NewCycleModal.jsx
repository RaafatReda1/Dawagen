import { useRef, useEffect } from "react";
import gsap from "gsap";
import ModalHeader from "./ModalHeader/ModalHeader";
import CycleForm from "./CycleForm/CycleForm";
import { useCycles } from "../../Context/CycleContext";
import styles from "./NewCycleModal.module.css";

const NewCycleModal = () => {
  const { isModalOpen, closeNewModal } = useCycles();
  const modalRef = useRef(null);
  const backdropRef = useRef(null);

  useEffect(() => {
    if (!isModalOpen) return;

    gsap.fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }
    );

    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeNewModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeNewModal]);

  if (!isModalOpen) return null;

  return (
    <div
      className={styles.backdrop}
      ref={backdropRef}
      onClick={(e) => e.target === backdropRef.current && closeNewModal()}
    >
      <div className={styles.modalCard} ref={modalRef} role="dialog" aria-modal="true">
        <ModalHeader onClose={closeNewModal} />
        <CycleForm onClose={closeNewModal} />
      </div>
    </div>
  );
};

export default NewCycleModal;
