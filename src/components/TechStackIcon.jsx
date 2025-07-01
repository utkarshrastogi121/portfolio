/* eslint-disable react/prop-types */

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="group w-20 h-24 md:w-24 md:h-28 p-2 rounded-xl bg-slate-800/40 hover:bg-slate-700/50 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-2 hover:scale-105 cursor-pointer shadow-sm hover:shadow-md">
      <div className="relative flex items-center justify-center">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-40 blur transition duration-300"></div>
        <img
          src={TechStackIcon}
          alt={`${Language} icon`}
          className="relative h-10 w-10 object-contain"
        />
      </div>
      <span className="text-slate-300 font-medium text-[10px] md:text-xs text-center tracking-wide group-hover:text-white transition-colors duration-300">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;
