module.exports = {
  signUp: async (req, res) => {
    try {
      console.log(req.body, "coming from users signup controller");
      res.send("employers signup api");
    } catch (err) {
      console.log(err);
    }
  }
};
