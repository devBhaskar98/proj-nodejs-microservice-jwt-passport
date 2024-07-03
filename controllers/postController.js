// ES6 module syntax
export const get_post = (req, res) => {

  console.log('user accessing:', req.user.username); // Log username for debugging


  res.send("Secret Post");
};