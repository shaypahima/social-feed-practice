import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient

export async function getLoggedInUser() {
  const response = await fetch("http://192.168.1.100:3000/user");
  console.log('response', response);
  if(!response.ok){
    return null;
  }
  return response.json();
  
}


export async function login(){
//TODO
}

export async function signup(){
//TODO
}

export async function logout(){ 
  console.log('logout');
}