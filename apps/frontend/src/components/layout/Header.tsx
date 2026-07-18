'use client';
import React from "react";
export const Header = ({ onOpenCommand }: { onOpenCommand: () => void }) => (
  <header style={{borderBottom:'1px solid #334155',padding:'12px 24px',background:'#0f172a',display:'flex',justifyContent:'flex-end'}}>
    <button onClick={onOpenCommand} style={{padding:'8px 16px',background:'#1e293b',border:'1px solid #334155',borderRadius:'8px',color:'white',cursor:'pointer',fontSize:'12px'}}>Search ⌘K</button>
  </header>
);
