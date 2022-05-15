import { InjectionKey, Ref } from 'vue-demi'
import { ISettingFormProps } from '../types'

export const SettingsFormSymbol: InjectionKey<Ref<ISettingFormProps>> = Symbol(
  'SettingsFormContext'
)
