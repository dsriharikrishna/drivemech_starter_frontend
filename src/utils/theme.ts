// Theme definition for drivemech_starter_frontend
// You can expand this as needed for your design system


export const theme = {
  colors: {
    primary: '#2563eb', // blue-600
    secondary: '#f59e42', // orange-400
    background: '#f8fafc', // slate-50
    surface: '#ffffff',
    text: '#1e293b', // slate-800
    muted: '#64748b', // slate-400
    border: '#e2e8f0', // slate-200
    borderStrong: '#cbd5e1',
    borderLight: '#f1f5f9',
    borderDark: '#334155',
  },
  font: {
    family: 'Inter, system-ui, sans-serif',
    mono: 'Geist Mono, monospace',
    size: '16px',
    weight: '400',
    headingWeight: '700',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
    xl: '64px',
    p: '16px',
    m: '16px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
  },
  shadow: {
    sm: '0 2px 8px 0 rgba(0,0,0,0.04)',
    lg: '0 4px 24px 0 rgba(0,0,0,0.10)',
  },
};

export type Theme = typeof theme;

