// Adapted from https://github.com/astahmer/panda-chakra/blob/77c1fb09b150e3b7849360dc41568eb1710f61fd/packages/color-mode/src/color-mode-provider.tsx#L72

export type ColorMode = 'system' | 'light' | 'dark'
type ApplyMethod = 'class' | 'data-theme'

// Constants
const MEDIA = '(prefers-color-scheme: dark)'
const COLOR_MODE_STORAGE_KEY = 'astahmer-colorMode'
const DEFAULT_COLOR_MODE = 'light' satisfies ColorMode // Set your default color mode here
const ATTRIBUTE: ApplyMethod = 'class' // or "class" if you're toggling classes

export const colorModeConfig = {
  MEDIA,
  COLOR_MODE_STORAGE_KEY,
  DEFAULT_COLOR_MODE,
  ATTRIBUTE,
}

// Utility Functions
export function getStoredColorMode() {
  let colorMode: ColorMode | undefined
  try {
    colorMode = (localStorage.getItem(COLOR_MODE_STORAGE_KEY) as ColorMode) || undefined
  } catch (e) {
    // Error handling if localStorage is not supported
    console.error('LocalStorage is not supported: ', e)
  }
  return colorMode
}

function applyColorMode(colorMode?: ColorMode | undefined) {
  const rootElement = document.documentElement

  if (ATTRIBUTE === 'class') {
    rootElement.classList.remove('light', 'dark')
    if (colorMode) rootElement.classList.add(colorMode)
  } else {
    if (colorMode) {
      rootElement.setAttribute(ATTRIBUTE, colorMode)
    } else {
      rootElement.removeAttribute(ATTRIBUTE)
    }
  }
}

function getSystemColorMode() {
  const isDarkMode = window.matchMedia(MEDIA).matches
  return isDarkMode ? 'dark' : 'light'
}

export const registerColorModeListener = () => {
  // Initialization
  document.addEventListener('DOMContentLoaded', function () {
    let colorMode = getStoredColorMode() || DEFAULT_COLOR_MODE

    if (colorMode === 'system') {
      colorMode = getSystemColorMode()
    }

    applyColorMode(colorMode)

    // Listen for system color scheme changes
    window.matchMedia(MEDIA).addEventListener('change', function (e) {
      if (colorMode === 'system') {
        applyColorMode(getSystemColorMode())
      }
    })
  })
}

export function setColorMode(newColorMode: ColorMode) {
  try {
    localStorage.setItem(COLOR_MODE_STORAGE_KEY, newColorMode)
  } catch (e) {
    // Error handling if localStorage is not supported
    console.error('Error setting color mode in localStorage: ', e)
  }
  applyColorMode(newColorMode)
}
