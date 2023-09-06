const express = require("express");

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    console.log("logged out");
  });
  res.redirect("/");
});

module.exports = router;
