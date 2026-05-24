/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
} from "lucide-react";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import AOS from "aos";
import "aos/dist/aos.css";


const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20" />
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          FullStack
        </span>
      </span>

      <br />

      <span className="relative inline-block mt-1 sm:mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20" />
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 hidden sm:block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700 lg:mx-20" />

      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20" />

        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>

          <Icon
            className={`w-4 h-4 text-gray-200 ${
              text === "Contact"
                ? "group-hover:translate-x-1"
                : "group-hover:rotate-45"
            } transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300" />

      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;

const WORDS = ["Code. Deploy. Repeat."];

const TECH_STACK = [
  "Node.js",
  "Express.js",
  "React",
  "Spring Boot",
  "Java",
  "C++",
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    link: "https://github.com/utkarshrastogi121",
  },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/utkarshrastogi121",
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/utkarsh_rastogi.121",
  },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 10,
    });
  }, []);

  useEffect(() => {
    setIsLoaded(true);

    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((p) => p + WORDS[wordIndex][charIndex]);
        setCharIndex((p) => p + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((p) => p.slice(0, -1));
        setCharIndex((p) => p - 1);
      } else {
        setWordIndex((p) => (p + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const t = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );

    return () => clearTimeout(t);
  }, [handleTyping, isTyping]);

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-5 sm:px-6 lg:px-0 min-h-screen lg:mx-20">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-screen pt-24 pb-10 sm:pt-28 lg:pt-0 gap-4 sm:gap-8 lg:gap-20">

            {/* Left Column */}
            <div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left"
              data-aos="fade-right"
            >
              <MainTitle />

              <div className="h-8 flex items-center justify-center lg:justify-start">
                <span className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                  {text}
                </span>

                <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink" />
              </div>

              <p className="text-gray-400 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed">
                Building responsive, fast, and accessible websites.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {TECH_STACK.map((tech) => (
                  <TechStack key={tech} tech={tech} />
                ))}
              </div>

              <div className="flex gap-3 justify-center lg:justify-start flex-wrap">
                <CTAButton
                  href="#Portfolio"
                  text="Projects"
                  icon={ExternalLink}
                />

                <CTAButton
                  href="#Contact"
                  text="Contact"
                  icon={Mail}
                />
              </div>

              <div className="flex sm:hidden justify-center gap-4 pt-2">
                {SOCIAL_LINKS.map((s, i) => (
                  <SocialLink key={i} {...s} />
                ))}
              </div>

              <div className="hidden sm:flex gap-4 justify-center lg:justify-start">
                {SOCIAL_LINKS.map((s, i) => (
                  <SocialLink key={i} {...s} />
                ))}
              </div>
            </div>

            {/* Right Column – Lottie */}
            <div
              className="w-full lg:w-[40%] flex items-center justify-center relative mt-2 sm:mt-4 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
            >
              <div className="w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] flex items-center justify-center">
                <Lottie
                  animationData={animationData}
                  loop
                  autoplay
                  className={`w-full h-full transition-all duration-500 ${
                    isHovering
                      ? "scale-110 sm:scale-115 rotate-2"
                      : "scale-100"
                  }`}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);