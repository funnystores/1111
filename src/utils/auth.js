//封装token
export function setToken(token){
    sessionStorage.setItem("token",token)//属姓名，属性值
}

export function getToken(){
return   sessionStorage.getItem("token")
}

export function removeToken(){
    sessionStorage.clear()
}
