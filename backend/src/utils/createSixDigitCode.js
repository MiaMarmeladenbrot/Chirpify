export const createSixDigitCode = () => {
  return Math.random().toString().slice(2, 8)
}
