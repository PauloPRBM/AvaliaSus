
const REGEX = /^(?:\b[a-zA-Z]{3,}\b\s+){1,}\b[a-zA-Z]{3,}\b$/;

export const validateName = (name: string) => {
  return REGEX.test(name)
}
