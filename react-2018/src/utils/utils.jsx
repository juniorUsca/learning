const leftPad = (number) => {
  const pad = '00'
  number = `${number}`
  return `${pad.substr(0, pad.length-number.length)}${number}`
}
const formattedTime = (secs) => {
  const minutos = parseInt(secs/60, 10)
  const segundos = parseInt(secs%60, 10)
  return `${leftPad(minutos)} : ${leftPad(segundos)}`
}

export default {
  formattedTime,
}
