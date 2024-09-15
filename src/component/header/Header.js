'use client'

import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { navLinks } from '@/app/utils/constant';
import styles from "./header.module.css";

const Header = () => {
   const pathName = usePathname();
   return (
      <div className={styles.header}>
         <nav className={styles.navbar}>
            {navLinks.map((item, i) => {
               const isActive = item.route === pathName ? styles.active : styles.link;
               return (
                  <Link
                     key={i}
                     href={item.route}
                     className={isActive}
                  >
                     {item.title}
                  </Link>
               )
            })}
         </nav>
      </div>
   )
}

export default Header;