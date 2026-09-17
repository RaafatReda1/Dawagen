import React from 'react';
import styles from './LandingFooter.module.css';

const FacebookIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const GithubIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const LandingFooter = () => {
  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.footerTop}>
        <div className={styles.footerGrid}>
          
          <div className={styles.brandCol}>
            <div className={styles.brandTitle}>
              <img src="logo.png" alt="Dawagen Logo" className={styles.logo} />
              <h2 style={{ fontFamily: 'var(--font-secondary)' }}>Dawagen</h2>
            </div>
            <p className={styles.brandDesc}>
              النظام الأذكى والأسرع لإدارة مزارع الدواجن وتحليل بياناتها بدقة عالية للحصول على أعلى إنتاجية وأقل نسبة هدر.
            </p>
          </div>

          <div className={styles.linksCol}>
            <h3>روابط سريعة</h3>
            <ul>
              <li><a href="#home">الرئيسية</a></li>
              <li><a href="#features">المميزات</a></li>
              <li><a href="#contact">تواصل معنا</a></li>
            </ul>
          </div>

          <div className={styles.linksCol}>
            <h3>قانوني</h3>
            <ul>
              <li><a href="#">الشروط والأحكام</a></li>
              <li><a href="#">سياسة الخصوصية</a></li>
              <li><a href="#">سياسة الاسترجاع</a></li>
            </ul>
          </div>

          <div className={styles.devCol}>
            <h3>المطور</h3>
            <p className={styles.devName}>Raafat Shahin</p>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/raafat.reda.366930" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <FacebookIcon size={20} />
              </a>
              <a href="https://github.com/RaafatReda1" target="_blank" rel="noreferrer" className={styles.socialLink}>
                <GithubIcon size={20} />
              </a>
            </div>
          </div>

        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.bottomContent}>
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} Dawagen</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;