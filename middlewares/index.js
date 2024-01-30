export const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json("internal server error");
};

export const notFoundMiddleware = (req, res, next) => {
    res.status(404).json("not found")
}
