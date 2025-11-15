// Theme Configuration for TaskMon
// Based on the design: light beige background, red accents, pixelated font

export const theme = {
  colors: {
    // Background colors
    background: '#f5f5dc', // Light beige
    card: '#ffffff', // White for cards
    header: '#2d2d2d', // Dark gray for header/navigation
    
    // Primary colors
    primary: '#dc2626', // Red-600
    primaryHover: '#b91c1c', // Red-700
    primaryLight: '#a78bfa', // Light purple for labels
    
    // Text colors
    text: '#000000', // Black
    textSecondary: '#374151', // Gray-700
    textMuted: '#6b7280', // Gray-600
    
    // Accent colors
    accent: '#dc2626', // Red
    success: '#16a34a', // Green-600
    warning: '#eab308', // Yellow-500
    error: '#dc2626', // Red-600
  },
  
  fonts: {
    pixel: "'Press Start 2P', monospace",
  },
  
  // Tailwind classes for common elements
  classes: {
    background: 'bg-[#f5f5dc]',
    card: 'bg-white border-2 border-gray-300',
    button: 'bg-red-600 hover:bg-red-700 text-white',
    buttonSecondary: 'bg-gray-200 hover:bg-gray-300 text-black',
    text: 'text-black',
    textSecondary: 'text-gray-700',
    header: 'bg-[#2d2d2d] text-white',
  }
};

export default theme;

