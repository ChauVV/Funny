
import React from 'react'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'

export const IcHome = ({ color, size }) => { return <IconFontAwesome name='home' style={{ color: color || 'white', fontSize: size || 16 }} /> }
export const IcFilm = ({ color, size }) => { return <IconFontAwesome name='film' style={{ color: color || 'white', fontSize: size || 12 }} /> }
export const IcCalculator = ({ color, size }) => { return <IconFontAwesome name='calculator' style={{ color: color || 'white', fontSize: size || 12 }} /> }
export const IcUser = ({ color, size }) => { return <IconFontAwesome name='user' style={{ color: color || 'white', fontSize: size || 14 }} /> }
export const IcBook = ({ color, size }) => { return <IconFontAwesome name='book' style={{ color: color || 'white', fontSize: size || 14 }} /> }
export const IcEdit = ({ color, size }) => { return <IconFontAwesome name='edit' style={{ color: color || 'white', fontSize: size || 14 }} /> }
export const IcSaveEdit = ({ color, size }) => { return <IconFontAwesome name='check-square' style={{ color: color || 'white', fontSize: size || 14 }} /> }
export const IcCloseEdit = ({ color, size }) => { return <IconFontAwesome name='window-close' style={{ color: color || 'white', fontSize: size || 14 }} /> }
export const IcClose = ({ color, size }) => { return <IconFontAwesome name='close' style={{ color: color || 'white', fontSize: size || 14 }} /> }
export const IcPre = ({ color, size }) => { return <IconFontAwesome name='chevron-left' style={{ color: color || 'white', fontSize: size || 14 }} /> }
export const IcNext = ({ color, size }) => { return <IconFontAwesome name='chevron-right' style={{ color: color || 'white', fontSize: size || 14 }} /> }
export const IcPreCircle = ({ color, size }) => { return <IconFontAwesome name='chevron-circle-left' style={{ color: color || 'white', fontSize: size || 14 }} /> }
export const IcNextCircle = ({ color, size }) => { return <IconFontAwesome name='chevron-circle-right' style={{ color: color || 'white', fontSize: size || 14 }} /> }
export const IcYoutube = ({ color, size, style }) => { return <IconFontAwesome name='play' style={[{ color: color || 'white', fontSize: size || 14 }, style]} /> }
export const IcBack = ({ color, size, style }) => { return <Ionicons name='md-arrow-round-back' style={[{ color: color || 'white', fontSize: size || 14 }, style]} /> }
