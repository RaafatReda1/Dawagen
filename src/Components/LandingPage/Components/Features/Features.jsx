import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, ShieldCheck, TrendingUp } from 'lucide-react';
import styles from './Features.module.css';

gsap.registerPlugin(ScrollTrigger);

const data = [
  { name: 'الأسبوع 1', value: 4000 },
  { name: 'الأسبوع 2', value: 3000 },
  { name: 'الأسبوع 3', value: 2000 },
  { name: 'الأسبوع 4', value: 2780 },
  { name: 'الأسبوع 5', value: 1890 },
  { name: 'الأسبوع 6', value: 2390 },
  { name: 'الأسبوع 7', value: 3490 },
];

const Features = () => {
  const featuresRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          }
        }
      );
    });
  }, []);

  const addToRefs = el => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <section id="features" className={styles.featuresSection} ref={featuresRef}>
      <div className={styles.header}>
        <h2 className={styles.title}>كيف يساعدك <span className="text-gradient">دواجن</span>؟</h2>
        <p className={styles.subtitle}>نوفر لك أفضل الأدوات لإدارة مزارعك بكفاءة عالية وبدون أرقام وهمية</p>
      </div>

      <div className={styles.cardsContainer}>
        <div className={`${styles.card} glass-panel`} ref={addToRefs}>
          <div className={styles.iconWrapper}>
            <Activity size={32} color="var(--color-primary)" />
          </div>
          <h3>متابعة صحية دقيقة</h3>
          <p>سجل تفصيلي لحالة القطيع الصحية ونسب النفوق بشكل يومي للتحكم السريع في الأزمات.</p>
        </div>

        <div className={`${styles.card} ${styles.chartCard} glass-panel`} ref={addToRefs}>
          <h3>مؤشر الأداء والإنتاجية</h3>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${styles.card} glass-panel`} ref={addToRefs}>
          <div className={styles.iconWrapper}>
            <ShieldCheck size={32} color="var(--color-primary)" />
          </div>
          <h3>حماية واستقرار</h3>
          <p>نظام ذكي ينبهك عند وجود أي خلل في استهلاك العلف أو المياه لضمان استقرار الدورة.</p>
        </div>

        <div className={`${styles.card} glass-panel`} ref={addToRefs}>
          <div className={styles.iconWrapper}>
            <TrendingUp size={32} color="var(--color-primary)" />
          </div>
          <h3>تقارير وإحصائيات</h3>
          <p>تحليل كامل للمصروفات والإيرادات لمعرفة الأرباح والخسائر بدقة متناهية.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;