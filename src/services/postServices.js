const URL = "https://h8ter.zeabur.app/api"

export const GetPosts = async () =>{
    try {
      const response = await fetch(`${URL}/posts`, {
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