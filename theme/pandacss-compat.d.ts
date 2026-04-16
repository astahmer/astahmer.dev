import type { Preset } from '@pandacss/dev'

type PresetWithoutName = Omit<Preset, 'name'> & {
  name?: string
}

declare module '@pandacss/dev' {
  export function definePreset(preset: PresetWithoutName): Preset
}
