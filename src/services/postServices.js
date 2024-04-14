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
export const PutLike = async (id, token) => {
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
export const GetPostById = async (id) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
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

export const CreatePost = async (body, token) => {
  try {
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    const data = await response.json()
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log("Error al guardar el post", error)
    throw error
  }
}

export const DeletePost = async (id, token) => {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    })
    const data = await response.json()
    console.log(data)
    if (!data.success) {
      throw new Error(data.message)
    }
    return data
  } catch (error) {
    console.log(error)
    throw error
  }
}