export interface EventColor {
  background: string;
  foreground: string;
}

const eventColorPalette = {
  rose: { background: '#E91E63', foreground: 'black' },
  red: { background: '#F44336', foreground: 'black' },
  orange: { background: '#FF9800', foreground: 'black' },
  amber: { background: '#FFC107', foreground: 'black' },
  yellow: { background: '#FFEB3B', foreground: 'black' },
  lime: { background: '#CDDC39', foreground: 'black' },
  green: { background: '#4CAF50', foreground: 'black' },
  teal: { background: '#009688', foreground: 'black' },
  cyan: { background: '#00BCD4', foreground: 'black' },
  blue: { background: '#2196F3', foreground: 'black' },
  indigo: { background: '#3F51B5', foreground: 'white' },
  violet: { background: '#673AB7', foreground: 'white' },
  purple: { background: '#9C27B0', foreground: 'white' },
  graphite: { background: '#41424C', foreground: 'white' },
} satisfies Record<string, EventColor>;

export default eventColorPalette;
