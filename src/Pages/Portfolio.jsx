/* eslint-disable react/prop-types */
import { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Boxes, Briefcase } from "lucide-react";

// ToggleButton
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-300 ${
          isShowingMore
            ? "group-hover:-translate-y-0.5"
            : "group-hover:translate-y-0.5"
        }`}
      >
        <polyline
          points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
        ></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

// Tab Panel
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "/html.svg", language: "HTML" },
  { icon: "/css.svg", language: "CSS" },
  { icon: "/javascript.svg", language: "JavaScript" },
  { icon: "/typescript.svg", language: "TypeScript" },
  { icon: "/react.svg", language: "React" },
  { icon: "/vite.svg", language: "Vite" },
  { icon: "/nextjs.svg", language: "Next.js" },
  { icon: "/redux.svg", language: "Redux" },
  { icon: "/shadcn.svg", language: "Shadcn UI" },
  { icon: "/tailwind.svg", language: "Tailwind CSS" },
  { icon: "/bootstrap.svg", language: "Bootstrap" },
  { icon: "/nodejs.svg", language: "Node.js" },
  { icon: "/express.svg", language: "Express.js" },
  { icon: "/zod.svg", language: "Zod" },
  { icon: "/mongo.svg", language: "MongoDB" },
  { icon: "/mongoose.svg", language: "Mongoose" },
  { icon: "/postgresql.svg", language: "PostgreSQL" },
  { icon: "/prisma.svg", language: "Prisma" },
  { icon: "/sequelize.svg", language: "Sequelize" },
  { icon: "/firebase.svg", language: "Firebase" },
  { icon: "/clerk.svg", language: "Clerk" },
  { icon: "/jwt.svg", language: "JWT" },
  { icon: "/stripe.svg", language: "Stripe" },
  { icon: "/gemini.svg", language: "Gemini AI" },
  { icon: "/git.svg", language: "Git" },
  { icon: "/github.svg", language: "GitHub" },
  { icon: "/postman.svg", language: "Postman" },
  { icon: "/vercel.svg", language: "Vercel" },
  { icon: "/render.jpg", language: "Render" },
  { icon: "/netlify.png", language: "Netlify" },
];

const localProjects = [
  {
    id: 1,
    Img: "/Buzzline.png",
    Title: "BuzzLine",
    Description:
      "A social media app for sharing posts and connecting with friends.",
    Link: "https://buzz-line.vercel.app/",
    GithubLink: "https://github.com/utkarshrastogi121/buzzline",
  },
  {
    id: 2,
    Img: "/AIinterview.png",
    Title: "AI Interview App",
    Description:
      "Practice mock interviews with AI-driven questions and feedback.",
    Link: "https://ai-interview-app-sepia.vercel.app/",
    GithubLink: "https://github.com/utkarshrastogi121/AiInterviewApp",
  },
  {
    id: 3,
    Img: "/DoctorAppointment.png",
    Title: "Medicare",
    Description:
      "A platform to schedule, manage, and track doctor appointments effortlessly.",
    Link: "https://doctorappointment2-1fef.onrender.com/",
    GithubLink: "https://github.com/utkarshrastogi121/DoctorAppointmentApp",
  },
];

//  Experience Data
const experiences = [
  {
    id: 1,
    role: "SDE Intern",
    company: "Mixins Technology",
    duration: "July 2025 - November 2025",
    description: [
      "Developed web apps with React, TypeScript, Node.js, and PostgreSQL.",
      "Designed and implemented REST APIs for core business modules.",
      "Implemented JWT authentication for secure user sessions.",
      "Integrated OpenAI APIs to assist users with personalized support.",
    ],
  },
  {
    id: 2,
    role: "Open Source Contributor",
    company: "GirlScript Summer of Code (GSSoC)",
    duration: "August 2025 - October 2025",
    description: [
      "Contributed to open-source projects by fixing bugs and adding features.",
      "Improved project documentation and onboarding guides.",
      "Collaborated with maintainers and developers across the community.",
      "Gained hands-on experience with Git, GitHub, and CI/CD workflows.",
    ],
  },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback(() => {
    setShowAllProjects((prev) => !prev);
  }, []);

  const displayedProjects = showAllProjects
    ? localProjects
    : localProjects.slice(0, initialItems);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portfolio"
    >
      {/* Header */}
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          Explore my journey through projects, certifications, and technical
          expertise. Each section represents a milestone in my continuous
          learning path.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* Tabs */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5" />}
              label="Tech Stack"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Briefcase className="mb-2 w-5 h-5" />}
              label="Experience"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        {/* Projects Tab */}
        <TabPanel value={value} index={0} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
              {displayedProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                      ? "fade-up"
                      : "fade-up-left"
                  }
                  data-aos-duration={
                    index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                  }
                >
                  <CardProject
                    Img={project.Img}
                    Title={project.Title}
                    Description={project.Description}
                    Link={project.Link}
                    GithubLink={project.GithubLink}
                    id={project.id}
                  />
                </div>
              ))}
            </div>
          </div>
          {localProjects.length > initialItems && (
            <div className="mt-6 w-full flex justify-start">
              <ToggleButton
                onClick={() => toggleShowMore("projects")}
                isShowingMore={showAllProjects}
              />
            </div>
          )}
        </TabPanel>

        {/* Tech Stack Tab */}
        <TabPanel value={value} index={1} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-4">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos={
                    index % 3 === 0
                      ? "fade-up-right"
                      : index % 3 === 1
                      ? "fade-up"
                      : "fade-up-left"
                  }
                  data-aos-duration={
                    index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"
                  }
                  className="flex justify-center"
                >
                  <TechStackIcon
                    TechStackIcon={stack.icon}
                    Language={stack.language}
                    size="w-12 h-12"
                  />
                </div>
              ))}
            </div>
          </div>
        </TabPanel>

        {/* Experience Tab */}
        <TabPanel value={value} index={2} dir={theme.direction}>
          <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  data-aos={index % 2 === 0 ? "fade-up-right" : "fade-up-left"}
                  data-aos-duration={index % 2 === 0 ? "1000" : "1200"}
                  className="bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-xl border border-white/10 p-6 backdrop-blur-sm"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {exp.role}
                  </h3>
                  <p className="text-purple-400 font-medium">{exp.company}</p>
                  <p className="text-slate-400 text-sm">{exp.duration}</p>
                  <ul className="mt-2 list-disc list-inside text-slate-300 text-sm space-y-1">
                    {exp.description.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}
