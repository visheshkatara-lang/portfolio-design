export interface ExperienceItem {
  id: string;
  num: string;
  category: string;
  company: string;
  role: string;
  period: string;
  location: string;
  points: string[];
  type?: string;
  theme?: 'black' | 'coral' | 'purple' | 'dark2' | 'default';
}

export interface ProjectItem {
  id: string;
  category: string;
  title: string;
  description: string;
  result: string;
  tags: string[];
}

export interface StoryPhase {
  id: string;
  num: string;
  phase: string;
  title: string;
  body: string;
  active?: boolean;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  items: string[];
  year: string;
  theme?: 'black' | 'coral' | 'default';
}

export interface StackCategory {
  id: string;
  label: string;
  pills: string[];
}
