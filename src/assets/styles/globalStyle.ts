import type { CSSProperties } from 'react';

export const buttonStyle: CSSProperties = {
  padding: '12px 0',
  height: 'unset',
  margin: '4px 0',
};

export const inputStyle: CSSProperties = {
  padding: '12px',
  borderRadius: '4px',
};

export const layoutStyle: CSSProperties = {
  minHeight: '100vh',
};

export const secondaryButtonStyle: CSSProperties = {
  ...buttonStyle,
  background: '#f0c417',
  color: '#1a1a1a',
};

export const containerStyle: CSSProperties = {
  width: '100%',
  maxWidth: '1360px',
  height: '100%',
  padding: '0 15px',
};
