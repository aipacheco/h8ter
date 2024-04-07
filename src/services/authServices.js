const URL = "https://h8ter.zeabur.app/api"

export const RegisterUser = async (user) => {
  try {
    const response = await fetch(`${URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log("Error al registrar el usuario", error)
    throw error
  }
}
export const LoginUser = async (user) => {
  try {
    const response = await fetch(`${URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log("Error al iniciar sesión", error)
    throw error
  }
}

