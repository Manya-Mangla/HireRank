import React from "react";
import BackgroundBlobs from "./components/BackgroundBlobs";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadForm from "./components/UploadForm";
import ResultsTable from "./components/ResultsTable";

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden font-inter">
      <p>hello</p>
      <BackgroundBlobs />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <UploadForm />
        <ResultsTable />
      </div>
    </div>
  );
}

export default App;
