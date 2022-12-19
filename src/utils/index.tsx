export const upperCaseText = (value: string) => {
  return value.toUpperCase()
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export const generateGreetings = (hour: string) => {
  if (hour >= '3' && hour < '12') {
    return 'Good Morning'
  } else if (hour >= '12' && hour < '15') {
    return 'Good Afternoon'
  } else if (hour >= '15' && hour < '20') {
    return 'Good Evening'
  } else if (hour >= '20' && hour < '3') {
    return 'Good Night'
  } else {
    return 'Hello'
  }
}
