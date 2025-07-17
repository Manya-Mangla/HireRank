const BackgroundBlobs = () => (
  <>
    {/* Off-white base background */}
    <div className="absolute inset-0 bg-[#f8f9fb] z-[-10]"></div>

    {/* Top Right - Lavender */}
    <div className="absolute top-16 right-16 w-40 h-40 bg-[#cbb4f4]/60 rounded-full blur-2xl z-0"></div>

    {/* Mid Left - Pale Purple */}
    <div className="absolute top-[45%] left-[5%] w-32 h-32 bg-[#d6c8f5]/40 rounded-full blur-2xl z-0"></div>

    {/* Center - Soft Violet */}
    <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-[#bba6e5]/30 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 z-0"></div>

    {/* Bottom Left - Muted Lilac */}
    <div className="absolute bottom-10 left-24 w-24 h-24 bg-[#938ca9]/20 rounded-full blur-2xl z-0"></div>

    {/* Bottom Right - Deep Purple with Rotation */}
    <div className="absolute bottom-0 right-0 w-28 h-28 bg-[#231159]/30 rotate-45 blur-xl z-0"></div>

    {/* Top Left - Soft Pink Circle */}
    <div className="absolute top-20 left-20 w-24 h-24 bg-[#f3c8ea]/40 rounded-full blur-2xl z-0"></div>

    {/* Center Left - Diagonal Abstract Oval */}
    <div className="absolute top-[60%] left-[-10%] w-64 h-32 bg-[#e2c9f5]/40 rounded-full blur-[100px] rotate-45 z-0"></div>

    {/* Right Mid - Bubble */}
    <div className="absolute top-[40%] right-8 w-20 h-20 bg-[#cbb4f4]/30 rounded-full blur-xl z-0"></div>

    {/* Lower Mid - Wide Gradient Blob */}
    <div className="absolute bottom-[25%] left-[30%] w-72 h-36 bg-[#d5b9f5]/20 rounded-full blur-[80px] rotate-12 z-0"></div>
  </>
);

export default BackgroundBlobs;
