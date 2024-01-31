const express = require('express');
const app = express();
let port=3000;
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride('_method'));

let posts=[
    {
        id:uuidv4(),
        user:"400 Days",
        content:"A mystery and romance story like none other. An unputdownable tale of suspense, human relationships, love, friendship, the crazy world we live in and, above all, a mother's determination to never give up."
    },
    {
        id:uuidv4(),
        user:"A girl in room 105",
        content:"This is not a love story. It is an unlove story."
    },
    {
        id:uuidv4(),
        user:"Power of your subconscious mind",
        content:"This remarkable book by Dr. Joseph Murphy, one of the pioneering voices of affirmative thinking, will unlock for you the truly staggering powers of your subconscious mind."
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("form.ejs");
});

app.post("/posts",(req,res)=>{
    let {user,content}=req.body;
    let newId=uuidv4();
    posts.push({id:newId,user,content});
    res.redirect("http://localhost:3000/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id==p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    let newContent=req.body.content;
    post.content=newContent;
    res.redirect("http://localhost:3000/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
    
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("http://localhost:3000/posts");
});

app.listen(port,()=>{
    console.log("listening");
});