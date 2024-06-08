import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'views')));
app.use(express.static(join(__dirname, 'views/src')));
app.use(express.static(join(__dirname, 'views/create_blog')));

let blogPosts = []; 

app.get("/", (req, res) => {
    res.render("index.ejs", { blogPosts: blogPosts });
});

app.get('/about', (req, res) => {
    res.render('src/about.ejs');
});

app.get('/books', (req, res) => {
    res.render('src/books.ejs');
});

app.get('/home', (req, res) => {
    res.render('index.ejs', { blogPosts: blogPosts });
});

app.post("/submit", (req, res) => {
    res.render('create_blog/create_blog.ejs');
});

app.post("/add_new", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    blogPosts.push({ title: title, content: content });
    res.redirect("/home");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
