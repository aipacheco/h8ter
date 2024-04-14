const URL = "https://h8ter.zeabur.app/api/users"

//el param que le mandamos desde profile.jsx(el nombre de usuario)
export const GetProfile = async (username) => {
  try {
    const response = await fetch(`${URL}/${username}`, {
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

export const UpdateProfile = async (profile, token) => {
  //cuando hay imágenes de por medio, hay que hacer un formdata
  const formdata = new FormData()
  formdata.append("avatar", profile.avatar)
  formdata.append("banner", profile.banner)
  formdata.append("description", profile.description)
  try {
    const response = await fetch(`${URL}/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
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
