import { User, Comment } from "../interfaces/Types";
import axios from "axios";

// export const registerUser = async (user: User) => {
//   let users: User[] = (await localforage.getItem<User[]>(USERS_KEY)) || [];
//   users.push(user);
//   await localforage.setItem(USERS_KEY, users);
// };

export const registerUser = async (user:User) => {
  try {
       await axios.post("http://localhost:4001/api/register", user, {headers:{
        "Content-Type": "application/json"
       }})
  } catch (error) {
    console.log("Error registering User")
  }
}

// export const loginUser = async (username: string, password: string) => {
//   let users: User[] = (await localforage.getItem<User[]>(USERS_KEY)) || [];
//   if (users) {
//     const user = users.find(
//       (u) => u.username === username && u.password === password
//     );
//     return user;
//   }
//   return null;
// };

export const loginUser = async (username: string, password: string) =>{
  try {
    const response = await axios.post("http://localhost:4001/api/login", {username, password}, {headers:
      {"Content-Type": "application/json"}
    })
    return response.data.user
  } catch (error) {
    console.log("error loging in")
  }
}

// export const addFavoriteMovie = async (username: string, imdbID: string) => {
//   let users: User[] = (await localforage.getItem<User[]>(USERS_KEY)) || [];
//   const userIndex = users.findIndex((u) => u.username === username);

//   if (userIndex > -1) {
//     const user = users[userIndex];
//     if (!user.favorites) {
//       user.favorites = [];
//     }
//     if (!user.favorites.includes(imdbID)) {
//       user.favorites.push(imdbID);
//       users[userIndex] = user;
//       await localforage.setItem(USERS_KEY, users);
//     }
//   }
// };

export const addFavoriteMovie = async(username: string, imdbID:string) =>{
  try {
    await axios.post("http://localhost:4001/api/addfavorite", {username, imdbID}, {headers:{
      "Content-Type": "application/json"
    }})
  } catch (error) {
    console.log("falied to add favorite", error)
  }
}

// export const getFavoriteMovies = async (
//   username: string
// ): Promise<string[]> => {
//   let users: User[] = (await localforage.getItem<User[]>(USERS_KEY)) || [];
//   const user = users.find((u) => u.username === username);
//   return user ? user.favorites || [] : [];
// };

export const getFavoriteMovies = async(username: string)=>{
  try {
    const response = await axios.get(`http://localhost:4001/api/getfavorite/${username}`)
    return response.data.favmovies
  } catch (error) {
    console.log("error fetching movies",error)
  }
}

// export const removeFavoriteMovie = async (
//   username: string,
//   imdbID: string
// ): Promise<void> => {
//   let users: User[] = (await localforage.getItem<User[]>(USERS_KEY)) || [];
//   const userIndex = users.findIndex((u) => u.username === username);

//   if (userIndex > -1) {
//     const user = users[userIndex];
//     if (!user.favorites) {
//       user.favorites = [];
//     }
//     user.favorites = user.favorites.filter((id) => id !== imdbID);
//     users[userIndex] = user;
//     await localforage.setItem(USERS_KEY, users);
//   }
// };

export const removeFavoriteMovie = async(username: string, imdbID: string)=>{
  try {
    await axios.delete("http://localhost:4001/api/removefavorite", {
      data: {username, imdbID},
      headers: {"Content-Type": "application/json"}
    })
  } catch (error) {
    console.log("FavMovie Removed", error)
  }
}

// export const addComment = async (
//   username: string,
//   imdbID: string,
//   text: string,
//   rating: number
// ) => {
//   const comment: Comment = {
//     id: `${imdbID}_${Date.now()}`,
//     imdbID,
//     username,
//     text,
//     rating,
//     date: new Date().toISOString(),
//   };

//   let comments: Comment[] =
//     (await localforage.getItem<Comment[]>(COMMENTS_KEY_PREFIX)) || [];
//   if (!Array.isArray(comments)) {
//     comments = [];
//   }

//   comments.push(comment);
//   await localforage.setItem(COMMENTS_KEY_PREFIX, comments);
// };

export const addComment = async(username: string, imdbID: string, comment: string, rating: number)=>{
  try {
  await axios.post(`http://localhost:4001/api/addcomment/${imdbID}`,{username, imdbID, comment, rating}, {headers: {
      "Content-Type": "application/json"
    }})
  } catch (error) {
    console.log("falied to add comments", error)
  }
}

// export const getComments = async (imdbID: string): Promise<Comment[]> => {
//   const comments =
//     (await localforage.getItem<Comment[]>(COMMENTS_KEY_PREFIX)) || [];
//   return comments.filter((comment) => comment.imdbID === imdbID);
// };

export const getComments = async(imdbID:string) =>{
  try {
    const response = await axios.get(`http://localhost:4001/api/getcomment/${imdbID}`)
    return response.data.comments
  } catch (error) {
    console.log("failed to fetch comments", error)    
  }
}