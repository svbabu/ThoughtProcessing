/* TypedTextBlock.tsx */
import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
const roles = [
  "Web Designer",
  "Web Developer",
  "Front End Developer",
  "Apps Designer",
  "Apps Developer"
];
export default function TypedTextBlock({ roles }: { roles: string[] }) {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current!, {
      strings: roles,
      typeSpeed: 50,
      backSpeed: 25,
      loop: true,
    });
    return () => typed.destroy();
  }, [roles]);

  return <span ref={el}></span>;
}

