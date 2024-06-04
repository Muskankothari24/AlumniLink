import React, { useEffect, useState } from 'react'

function Rightbar() {

  const [news,setNews] = useState([])
  

  const getNews=()=>{
    fetch("https://newsapi.org/v2/everything?q=Apple&sortBy=popularity&apiKey=9cfaebfe849c4b869cc7088bdd1aad24")
    .then(res=>res.json())
    .then(json=>setNews(json.articles))
  }
  useEffect(()=>{
    getNews()
  },[])

  const newsList = news.slice(0,8)

  return (
    <div style={{borderRadius:"10px",backgroundColor:"white",height:"400px",paddingTop:"5px",paddingLeft:"20px"}}>
    <h4>News</h4>
    {newsList.map((eachNews)=>{
      return <>
      <li style={{marginTop:"10px"}}>{eachNews.title}</li>
      </>
    })}
  </div>
  )
}

export default Rightbar
