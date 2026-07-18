'use client';
import React from "react";
const cn = (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ');

export const RealTimeTradeFeed = () => <div>Live Trades</div>;
export const MarketWatch = () => <div>Market Watch</div>;
export const ActiveBotsWidget = () => <div>Active Bots</div>;
export const RiskAlertsWidget = () => <div>Risk Alerts</div>;
