import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, student) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.student = student;
    next();
  });
};

export const verifyAdminToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, admin) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.admin = admin;
    next();
  });
};
export const verifyStudent = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.student.id === req.params.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyAdminToken(req, res, next, () => {
    if (req.admin.id === req.params.id) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

/*export const verifyAdmin = (req, res, next) => {
  console.log("inside verify admin")
  verifyAdminToken(req,res,)
  //verifyToken(req, res, next, () => {
   /* if (req.admin.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));

    } */
   // return next(createError(403, "You are not authorized!"));
  //});
//};