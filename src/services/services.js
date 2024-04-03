const URL = "https://rrss-dev-fkcm.2.ie-1.fl0.io/api"

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
