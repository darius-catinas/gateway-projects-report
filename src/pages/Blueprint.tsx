import React from 'react';
import Footer from '../components/footer/Footer';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';

interface BlueprintProps{
    child: React.ReactNode
}

function Blueprint({ child }: BlueprintProps) {
  return (
    <div>
      <Navbar />
      <div className="main">
        <Sidebar />
        {child}
        <div className="sidebar-container" />
      </div>
      <Footer />
    </div>
  );
}

export default Blueprint
