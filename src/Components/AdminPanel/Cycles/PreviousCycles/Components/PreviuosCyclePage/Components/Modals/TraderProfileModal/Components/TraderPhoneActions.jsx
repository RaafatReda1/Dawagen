import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import styles from "./TraderPhoneActions.module.css";

const TraderPhoneActions = ({ phoneNumbers = [] }) => {
  const list = (Array.isArray(phoneNumbers) ? phoneNumbers : [phoneNumbers])
    .filter(Boolean)
    .map((p) => String(p).trim());

  if (list.length === 0) {
    list.push("01000000000");
  }

  return (
    <div className={styles.phoneContainer}>
      {list.map((phone, idx) => {
        const cleanDigits = phone.replace(/\D/g, "");
        const formattedWa = cleanDigits.startsWith("20") ? cleanDigits : `20${cleanDigits.replace(/^0/, "")}`;
        return (
          <div key={idx} className={styles.phoneGroup}>
            <span className={styles.phoneNum}>{phone}</span>
            <a href={`tel:${phone}`} className={styles.callBtn} title="اتصال تلفوني">
              <Phone size={13} />
              <span>اتصال</span>
            </a>
            <a
              href={`https://wa.me/${formattedWa}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.waBtn}
              title="واتساب مباشر"
            >
              <MessageCircle size={13} />
              <span>واتساب</span>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default TraderPhoneActions;
