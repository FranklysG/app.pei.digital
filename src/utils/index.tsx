export const upperCaseText = (value: string) => {
  return value.toUpperCase()
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const generateGreetings = (hour: string) => {
  if (hour >= '3' && hour < '12') {
    return 'Bom dia'
  } else if (hour >= '12' && hour < '18') {
    return 'Boa Tarde'
  } else if (hour >= '18' && hour < '20') {
    return 'Boa Noite'
  } else if (hour >= '20' && hour < '3') {
    return 'Boa Noite'
  } else {
    return 'Olá'
  }
}
