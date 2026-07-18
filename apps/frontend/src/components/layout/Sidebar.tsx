'use client';
import React from "react";
export const Sidebar = ({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) => <div style={{width:isCollapsed?'60px':'220px',background:'#1e293b',height:'100vh',borderRight:'1px solid #334155'}}></div>;
