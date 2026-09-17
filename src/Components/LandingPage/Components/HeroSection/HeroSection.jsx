import { useEffect, useRef } from "react";
import gsap from "gsap";
import SigninGoogleBtn from "../../../Auth/SigninGoogleBtn";
import styles from "./HeroSection.module.css";

const HeroSection = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(
      ".hero-title",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    )
    .fromTo(
      ".hero-subtitle",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.7"
    )
    .fromTo(
      ".hero-cta",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.6"
    )
    .fromTo(
      ".hero-image",
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );
  }, []);

  return (
    <section id="home" className={styles.heroSection} ref={containerRef}>
      <div className={styles.backgroundMesh}></div>
      
      <div className={styles.content}>
        <div className={styles.textContainer}>
          <h1 className={`hero-title ${styles.title}`}>
            ارتقِ بمستوى مزارعك مع <span className="text-gradient" style={{ fontFamily: 'var(--font-secondary)' }}>Dawagen</span>
          </h1>
          <p className={`hero-subtitle ${styles.subtitle}`}>
            تحكم كامل، تحليلات دقيقة، ونتائج مضمونة. إدارة دورات الدواجن لم تكن بهذا الذكاء من قبل.
          </p>
          <div className={`hero-cta ${styles.ctaWrapper}`}>
            <SigninGoogleBtn size="lg" />
          </div>
        </div>

        <div className={`hero-image ${styles.imageContainer}`}>
          <div className={styles.imageGlow}></div>
          <img src="HeroImg.png" alt="Dawagen Platform" className={styles.heroImg} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
