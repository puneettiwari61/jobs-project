module.exports = {
  signUp: async (req, res) => {
    try {
      console.log(req.body, "coming from employers signup controller");
      res.send("employers signup api");
    } catch (err) {
      console.log(err);
    }
  }
};
