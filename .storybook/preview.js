import '../styles/globals.scss';

export const parameters = {
  themes: {
    default: 'light',
    list: [
      { name: 'light', class: 'light', color: '#fff' },
      { name: 'dark', class: 'dark', color: '#000' }
    ],
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
    themes: {
      default: 'light',
      list: [
        { name: 'light', class: 'light', color: '#fff' },
        { name: 'dark', class: 'dark', color: '#000' }
      ],
    },
  },
}
