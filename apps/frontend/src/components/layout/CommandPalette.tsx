'use client';
import React from "react";
export const CommandPalette = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => isOpen ? <div style={{position:'fixed',inset:0,zIndex:999,background:'rgba(0,0,0,0.5)'}} onClick={onClose}><div style={{margin:'100px auto',width:'500px',background:'#1e293b',borderRadius:'12px',padding:'20px',color:'white'}}>Search commands...</div></div> : null;
