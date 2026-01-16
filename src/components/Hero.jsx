

// import React, { useContext, useState, useEffect } from "react";
// import { NavLink } from "react-router";
// import { ThemeContext } from "../contexts/ThemeProvider";

// const Hero = () => {
//   const { theme } = useContext(ThemeContext);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   // ১০টি ছবির লিস্ট (আপনার ১টি, আগের ২টি এবং নতুন ৭টি)
//   const images = [
//     "https://plus.unsplash.com/premium_photo-1682089748132-d9bda2c7a220?w=1000&q=80", // Your 1st Image
//     "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1000&q=80", // Previous Image 2
//     "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&q=80", // Previous Image 3
//     "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1000&q=80", // New: Fashion Design/Fabrics
//     "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=1000&q=80", // New: Sewing machine close-up
//     "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=1000&q=80", // New: Factory floor
//     "https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&q=80", // New: Clothing display
//     "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=80", // New: Quality Control/Technology
//     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80", // New: Data/Workflow tracking feel
//     "https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=1000&q=80", // New: Finished garment packing
//   ];

//   // অটো স্লাইড হওয়ার লজিক
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(timer);
//   }, [images.length]);

//   const handleScroll = () => {
//     const nextSection = document.getElementById('next-section');
//     if (nextSection) {
//       nextSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <section className={`relative py-12 min-h-[85vh] flex items-center overflow-hidden transition-colors duration-500 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
      
//       {/* Background Decor */}
//       <div className={`absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none bg-gradient-to-l from-teal-400 to-transparent`}></div>

//       <div className="container mx-auto px-6 lg:px-16 grid md:grid-cols-2 gap-10 items-center relative z-10">
        
//         {/* --- Left Side: Content & CTA --- */}
//         <div className="text-center md:text-left">
//           <h1 className={`text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] ${theme === "light" ? "text-slate-900" : "text-white"}`}>
//             Streamline Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-teal-400">Garments</span> Production
//           </h1>
//           <p className={`mt-6 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 ${theme === "light" ? "text-slate-600" : "text-slate-300"}`}>
//             A robust workflow solution to track orders, manage stages, and boost factory efficiency in real-time.
//           </p>
          
//           <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
//             <NavLink to="/products">
//               <button className="px-10 py-4 bg-gradient-to-r from-purple-400 to-teal-400 text-white font-bold rounded-2xl shadow-xl hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300">
//                 Explore Products
//               </button>
//             </NavLink>
//             <NavLink to="/dashboard">
//               <button className={`px-10 py-4 font-bold rounded-2xl border-2 transition-all duration-300 ${theme === 'light' ? 'border-slate-200 text-slate-700 hover:bg-slate-50' : 'border-slate-600 text-white hover:bg-slate-700'}`}>
//                 View Tracker
//               </button>
//             </NavLink>
//           </div>
//         </div>

//         {/* --- Right Side: Image Slider (Now with 10 images) --- */}
//         <div className="relative group flex justify-center items-center">
//           <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/20 to-teal-500/20 rounded-3xl blur-2xl group-hover:opacity-60 transition duration-1000"></div>
          
//           <div className="relative w-full aspect-[4/3] md:aspect-square lg:max-w-md overflow-hidden rounded-3xl shadow-2xl border-4 border-white/10">
//             {images.map((img, index) => (
//               <div
//                 key={index}
//                 className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
//                   index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
//                 }`}
//               >
//                 <img
//                   src={img}
//                   alt={`Factory Slide ${index + 1}`}
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
//               </div>
//             ))}

//             {/* Slide Indicators (10 Dots) */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
//               {images.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentSlide(i)}
//                   className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
//                 ></button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* --- Visual Flow Index --- */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center group" onClick={handleScroll}>
//           <div className={`w-6 h-10 border-2 rounded-full flex justify-center p-1 mb-2 ${theme === 'light' ? 'border-slate-300' : 'border-slate-600'}`}>
//               <div className={`w-1 h-2 rounded-full animate-bounce ${theme === 'light' ? 'bg-purple-500' : 'bg-teal-400'}`}></div>
//           </div>
//           <span className={`text-[10px] font-bold tracking-[3px] uppercase opacity-60 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Explore</span>
//       </div>

//     </section>
//   );
// };

// export default Hero;

// import React, { useContext, useState, useEffect } from "react";
// import { NavLink } from "react-router";
// import { ThemeContext } from "../contexts/ThemeProvider";

// const Hero = () => {
//   const { theme } = useContext(ThemeContext);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const images = [
//     "https://plus.unsplash.com/premium_photo-1682089748132-d9bda2c7a220?w=1000&q=80", 
//     "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1000&q=80", 
//     "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&q=80", 
//     "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1000&q=80", 
//     "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=1000&q=80", 
//     "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=1000&q=80", 
//     "https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&q=80", 
//     "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=80", 
//     "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80", 
//     "https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=1000&q=80", 
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//     }, 4000); 
//     return () => clearInterval(timer);
//   }, [images.length]);

//   const handleScroll = () => {
//     const nextSection = document.getElementById('next-section');
//     if (nextSection) {
//       nextSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <section className={`relative py-16 min-h-[90vh] flex items-center overflow-hidden transition-colors duration-500 ${theme === "light" ? "bg-slate-50" : "bg-[#0f172a]"}`}>
      
//       {/* ব্যাকগ্রাউন্ডে বড় গ্রেডিয়েন্ট সার্কেল (গ্লাসমরফিজম আরও ফুটিয়ে তোলার জন্য) */}
//       <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]"></div>
//       <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]"></div>

//       <div className="container mx-auto px-6 lg:px-16 grid md:grid-cols-2 gap-12 items-center relative z-10">
        
//         {/* --- Left Side: Content --- */}
//         <div className="text-center md:text-left">
//           <h1 className={`text-5xl md:text-6xl lg:text-8xl font-black leading-[1.05] tracking-tight ${theme === "light" ? "text-slate-900" : "text-white"}`}>
//             Next-Gen <br />
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-teal-400">Garments</span> Flow
//           </h1>
//           <p className={`mt-8 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>
//             Track, Manage, and Deliver. Experience the most intuitive workflow for modern apparel manufacturing.
//           </p>
          
//           <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
//             {/* Glassmorphism Button */}
//             <NavLink to="/products">
//               <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-black font-bold rounded-2xl shadow-xl hover:bg-gradient-to-r hover:from-purple-400 hover:to-teal-400 hover:text-white transition-all duration-500">
//                 Explore Items
//               </button>
//             </NavLink>
//             <NavLink to="/dashboard">
//               <button className={`px-10 py-4 font-bold rounded-2xl border-2 transition-all duration-300 ${theme === 'light' ? 'border-slate-200 text-slate-700 hover:bg-slate-100' : 'border-slate-700 text-white hover:bg-slate-800'}`}>
//                 Dashboard
//               </button>
//             </NavLink>
//           </div>
//         </div>

//         {/* --- Right Side: Glassmorphic Slider Container --- */}
//         <div className="relative group">
//           {/* এই ফ্রেমটি হলো Glassmorphism এর মূল অংশ */}
//           <div className={`p-4 rounded-[2.5rem] backdrop-blur-xl border shadow-2xl transition-all duration-700 ${theme === 'light' ? 'bg-white/30 border-white/50' : 'bg-slate-900/40 border-slate-700/50'}`}>
            
//             <div className="relative w-full aspect-[4/3] md:aspect-square overflow-hidden rounded-[1.8rem]">
//               {images.map((img, index) => (
//                 <div
//                   key={index}
//                   className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//                     index === currentSlide ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-110 translate-x-4"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`Slide ${index}`}
//                     className="w-full h-full object-cover"
//                   />
//                   {/* স্লাইডারের উপর হালকা গ্লাস কার্ড ওভারলে */}
//                   <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/20 backdrop-blur-lg border border-white/10 text-white">
//                     <p className="text-xs font-medium tracking-widest uppercase opacity-80">Manufacturing Stage 0{index + 1}</p>
//                     <h4 className="text-lg font-bold">Smart Tracking Enabled</h4>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Glass Dots Indicators */}
//             <div className="mt-6 flex justify-center gap-2">
//               {images.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentSlide(i)}
//                   className={`h-2 rounded-full transition-all duration-500 ${i === currentSlide ? "w-10 bg-gradient-to-r from-purple-400 to-teal-400" : "w-2 bg-slate-400/30"}`}
//                 ></button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Visual Flow Arrow */}
//       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center group" onClick={handleScroll}>
//           <div className={`w-6 h-10 border-2 rounded-full flex justify-center p-1 mb-2 ${theme === 'light' ? 'border-slate-300' : 'border-slate-700'}`}>
//               <div className={`w-1 h-2 rounded-full animate-bounce ${theme === 'light' ? 'bg-purple-500' : 'bg-teal-400'}`}></div>
//           </div>
//       </div>

//     </section>
//   );
// };

// export default Hero;


import React, { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router";
import { ThemeContext } from "../contexts/ThemeProvider";

const Hero = () => {
  const { theme } = useContext(ThemeContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://plus.unsplash.com/premium_photo-1682089748132-d9bda2c7a220?w=1000&q=80",
    "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1000&q=80",
    "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1000&q=80",
    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1000&q=80",
    "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=1000&q=80",
    "https://images.unsplash.com/photo-1524234107056-1c1f48f64ab8?w=1000&q=80",
    "https://images.unsplash.com/photo-1544441893-675973e31985?w=1000&q=80",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=80",
    "https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=1000&q=80",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handleScroll = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={`relative py-12 min-h-[85vh] flex items-center overflow-hidden transition-colors duration-500 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
      
      <div className={`absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none bg-gradient-to-l from-teal-400 to-transparent`}></div>

      <div className="container mx-auto px-6 lg:px-16 grid md:grid-cols-2 gap-10 items-center relative z-10">
        
        <div className="text-center md:text-left">
          <h1 className={`text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] ${theme === "light" ? "text-slate-900" : "text-white"}`}>
            Streamline Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-teal-400">Garments</span> Production
          </h1>
          <p className={`mt-6 text-lg md:text-xl leading-relaxed max-w-xl mx-auto md:mx-0 ${theme === "light" ? "text-slate-600" : "text-slate-300"}`}>
            A robust workflow solution to track orders, manage stages, and boost factory efficiency in real-time.
          </p>
          
          <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
            <NavLink to="/products">
              <button className="px-10 py-4 bg-gradient-to-r from-purple-400 to-teal-400 text-white font-bold rounded-2xl shadow-xl hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300">
                Explore Products
              </button>
            </NavLink>
            <NavLink to="/dashboard">
              <button className={`px-10 py-4 font-bold rounded-2xl border-2 transition-all duration-300 ${theme === 'light' ? 'border-slate-200 text-slate-700 hover:bg-slate-50' : 'border-slate-600 text-white hover:bg-slate-700'}`}>
                View Tracker
              </button>
            </NavLink>
          </div>
        </div>

        <div className="relative group flex justify-center items-center">
          <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/20 to-teal-500/20 rounded-3xl blur-2xl group-hover:opacity-60 transition duration-1000"></div>
          
          <div className="relative w-full aspect-[4/3] md:aspect-square lg:max-w-md overflow-hidden rounded-3xl shadow-2xl border-4 border-white/10">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
              >
                <img
                  src={img}
                  alt={`Factory Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>
            ))}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer flex flex-col items-center group" onClick={handleScroll}>
          <div className={`w-6 h-10 border-2 rounded-full flex justify-center p-1 mb-2 ${theme === 'light' ? 'border-slate-300' : 'border-slate-600'}`}>
              <div className={`w-1 h-2 rounded-full animate-bounce ${theme === 'light' ? 'bg-purple-500' : 'bg-teal-400'}`}></div>
          </div>
          <span className={`text-[10px] font-bold tracking-[3px] uppercase opacity-60 ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>Explore</span>
      </div>

    </section>
  );
};

export default Hero;
