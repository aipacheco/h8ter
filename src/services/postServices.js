const URL = "https://h8ter.zeabur.app/api/posts"

export const GetPosts = async () => {
  try {
    const response = await fetch(`${URL}`, {
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
export const Like = async (id, token) => {
  try {
    const response = await fetch(`${URL}/like/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
