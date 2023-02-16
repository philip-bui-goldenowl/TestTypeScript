import { StackActions } from '@react-navigation/routers'
import * as React from 'react'

export const navigationRef = React.createRef()

export function navigateToScreen(name: any, params: any) {
  return navigationRef.current?.navigate(name, params)
}

export function navigateBack() {
  return navigationRef.current?.goBack()
}
export function navigateToScreenAndReplace(name: any, params: any) {
  return navigationRef.current?.dispatch(StackActions.replace(name, params))
}
export function navigateToScreenInTab(name: any, params: any) {
  return navigationRef.current?.navigate('MAIN_TAB', { screen: name, params })
}