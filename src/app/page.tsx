"use client";

import SmoothScroll from "@/components/providers/SmoothScroll";
import FloatingLogo from "@/components/FloatingLogo";
import SideNav from "@/components/SideNav";
import MobileNav from "@/components/MobileNav";
import CustomCursor from "@/components/CustomCursor";
import SectionDivider from "@/components/SectionDivider";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <FloatingLogo />
      <SideNav />
      <MobileNav />
      <CustomCursor />
      <main>
        <Hero />
        <About />
        <SectionDivider className="bg-slate-50" />
        <Skills />
        <SectionDivider />
        <Projects />
        <SectionDivider className="bg-slate-50" />
        <Experience />
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
