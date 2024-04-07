const URL = "https://h8ter.zeabur.app/api"

//el param que le mandamos desde profile.jsx(el nombre de usuario)
export const GetProfile = async (username) => {
    try {
      const response = await fetch(`${URL}/users/${username}`, {
        method: "GET",
        redirect: "follow",
      })
      const data = await response.json()
      if (!data.success) {
        throw new Error(data.message)
      }
      return data
    } catch (error) {
      console.log(error)
      throw error
    }
  }
  