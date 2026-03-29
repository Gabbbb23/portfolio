"use client";

import SmoothScroll from "@/components/providers/SmoothScroll";
import Navbar from "@/components/Navbar";
import SectionTransition from "@/components/SectionTransition";
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
      <Navbar />
      <main>
        <Hero />
        <SectionTransition />
        <About />
        <SectionTransition />
        <Skills />
        <SectionTransition />
        <Projects />
        <SectionTransition />
        <Experience />
        <SectionTransition />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
