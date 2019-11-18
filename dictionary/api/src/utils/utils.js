module.exports = function sendErrorResponse(e, res) {
  const { status, error } = e;
  return res.status(status).json({ error });
}
