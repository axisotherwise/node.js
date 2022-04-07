exports.index = async (req, res) => {
  res.render("index");
};

exports.join = async (req, res) => {
  res.render("join");
};

exports.profile = async (req, res) => {
  res.render("profile", {
    user: req.user,
  });
};