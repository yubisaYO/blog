import { db } from "../db.js";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";
  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT *, p.img, u.img AS userImg FROM users u JOIN posts p ON u.id = p.uid WHERE p.id=?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
  const q =
    "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`,`uid`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    req.body.uid,
  ];

  console.log(req.body);
  console.log(values);
  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Post has been created");
  });
};
export const deletePost = (req, res) => {
  const q = "DELETE FROM posts WHERE id=?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("succesfully deleted");
  });
};
export const updatePost = (req, res) => {
  const postId = req.params.id;
  const q =
    "UPDATE posts SET `title` = ? , `desc` = ?, `img` = ?, `cat` = ? WHERE `id` = ? ";
  const values = [req.body.title, req.body.desc, req.body.img, req.body.cat];

  console.log(values);
  db.query(q, [...values, postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Post has been updated");
  });
};
