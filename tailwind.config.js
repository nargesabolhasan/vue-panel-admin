/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#009595',
        primary_disabled: '#99e3e3',
        primary_hover: '#007070',
        neutral_fg1: '#333333',
        neutral_fg1_disabled: '#cccccc',
        neutral_bg1_hover: '#f0f0f0',
        neutral_bg1_press: '#ebebeb',
        neutral_bg1: '#ffffff',
        error: '#d61e20',
        error_hover: '#ab181a',
        error_disabled: '#efa5a6',
        neutral_st2: '#cccccc',
        neutral_fg1_hover: '#191919',
        neutral_fg2: '#7F7F7F',
        neutral_st2_hover: '#B3B3B3',
        neutral_bg2_default: '#F0F0F0',
        success_bg1: '#e3f6e9',
        error_bg1: '#fae4e4',
        success_fg1: '#17b24a',
        error_fg1: '#d61e20',
        pt_info_t2_fg1: '#0172b4',
        pt_info_t2_fg1_hover: '#00395A',
        neutral_st1_default: '#7F7F7F',
      },
    },
  },
  plugins: [],
}
