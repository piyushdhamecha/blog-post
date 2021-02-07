const PATTERN = "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+).([a-zA-Z]{2,5})$"

const getEmailValidation = (value) => {
  if (value.length === 0) {
    return "Email is required"
  }
  if (!value.match(PATTERN)) {
    return "Enter a valid email id"
  }

  return ""
}

const getPasswordValidation = (value) => {
  if (value.length === 0) {
    return "Password is required"
  }
  if (value.length < 6) {
    return "Password must be at least 6 characters"
  }

  return ""
}
const Validate = (name, value) => {
  const errors = {}
  switch (name) {
    case "name":
      errors.name = value.length === 0 ? "Username is required" : ""
      break
    case "email":
      errors.email = getEmailValidation(value)
      break
    case "password":
      errors.password = getPasswordValidation(value)
      break
    case "title":
      errors.title = value.length === 0 ? "Title is required" : ""
      break
    case "body":
      errors.body = value.length === 0 ? "Description is required" : ""
      break
    default:
      break
  }

  return {
    errors,
  }
}

export default Validate
