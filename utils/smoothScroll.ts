// Ultra-Smooth Scroll with Lenis + GSAP ScrollTrigger

let lenisInstance: any = null;

export const initSmoothScroll = () => {
  if (typeof window === 'undefined') return;

  const Lenis = (window as any).Lenis;
  const gsap = (window as any).gsap;
  const ScrollTrigger = (window as any).ScrollTrigger;

  // Initialize Lenis for ultra-smooth scrolling
  if (Lenis) {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      smooth: true,
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 1.5,
    });

    // Connect Lenis with GSAP ScrollTrigger
    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      
      ScrollTrigger.addEventListener('update', () => {
        lenisInstance.resize();
      });
      
      ScrollTrigger.refresh();
    }

    // Lenis animation loop - optimized
    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (anchor && anchor.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = anchor.getAttribute('href')?.substring(1);
        const targetElement = document.getElementById(targetId || '');
        
        if (targetElement && lenisInstance) {
          lenisInstance.scrollTo(targetElement, {
            offset: -100, // Navbar height + padding
            duration: 1.5,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    // Add click listener for smooth scroll
    document.addEventListener('click', handleAnchorClick, true);
  } else {
    // Fallback to GSAP if Lenis is not available
    if (gsap) {
      const ScrollToPlugin = (window as any).ScrollToPlugin;
      if (ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
      if (ScrollToPlugin) gsap.registerPlugin(ScrollToPlugin);

      const handleAnchorClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
        
        if (anchor && anchor.getAttribute('href') !== '#') {
          e.preventDefault();
          const targetId = anchor.getAttribute('href')?.substring(1);
          const targetElement = document.getElementById(targetId || '');
          
          if (targetElement && ScrollToPlugin) {
            gsap.to(window, {
              duration: 1.2,
              scrollTo: { y: targetElement, offsetY: -100 },
              ease: "power2.inOut"
            });
          }
        }
      };

      document.addEventListener('click', handleAnchorClick, true);
    }
  }

  // Scrollspy using IntersectionObserver for better performance
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  
  const updateActiveNav = (activeId: string) => {
    navLinks.forEach((link) => {
      const linkHref = link.getAttribute('href');
      if (linkHref === `#${activeId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Use IntersectionObserver for better performance
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.getAttribute('id');
        if (sectionId) {
          updateActiveNav(sectionId);
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Initial call
  if (sections.length > 0) {
    const firstSection = sections[0] as HTMLElement;
    if (window.scrollY < firstSection.offsetTop + 200) {
      updateActiveNav(firstSection.getAttribute('id') || '');
    }
  }

  return () => {
    if (lenisInstance) {
      lenisInstance.destroy();
    }
  };
};

