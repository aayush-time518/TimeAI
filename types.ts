import React from 'react';

export type ViewState = 'home' | 'solutions' | 'intel' | 'about' | 'contact';

export interface ServiceDetail {
  features: string[];
  techStack: string[];
  outcome: string;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
  details: ServiceDetail; // Added specific details for the modal
  onClick?: () => void;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface ForecastDataPoint {
  month: string;
  actual: number;
  forecast: number;
}

export enum AnomalySeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface AnomalyAlert {
  id: string;
  timestamp: string;
  metric: string;
  value: string;
  severity: AnomalySeverity;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'Strategy' | 'Engineering' | 'Case Study';
  date: string;
  readTime: string;
  image?: string;
  content?: React.ReactNode; // Updated to support rich content
}