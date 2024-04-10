const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/Block4Project"
);
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const { createTablesSQL, createItemSQL, createUserSQL, createReviewSQL, createCommentSQL, getItemsSQL, getReviewsSQL, destroyCommentSQL, modifyCommentSQL, modifyReviewSQL, authenticateSQL, getCommentsSQL, destroyReviewSQL} = require("./sqlQueries");
const seed = require("./seed");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT || "SomeOtherPhrase";

const createTables = async () => {
  try {
    await client.query(createTablesSQL);
  } catch (ex) {
    console.log(ex)
  }
};

const createUser = async ({ id = uuid.v4(), username, password }) => {
  try {
    const response = await client.query(createUserSQL, [id, username, await bcrypt.hash(password, 5)]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "CreateUser")
  }
}

const authenticate = async ({ username, password }) => {
  try {
    const response = await client.query(authenticateSQL, [username]);

    if (
      !response.rows.length ||
      (await bcrypt.compare(password, response.rows[0].password)) === false
    ) {
      const error = Error("not authorized");
      error.status = 401;
      throw error;
    }
    const token = await jwt.sign({ id: response.rows[0].id }, JWT);
    return { token };
  } catch (ex) {
    console.log(ex)
    handleError(ex, "Authenticate")
  }
}


const findUserByToken = async (token) => {
  let id;
  try {
    const payload = await jwt.verify(token.split(" ")[1], JWT);
    id = payload.id;
  } catch (err) {
    const error = Error("not authorized didnt verify token");
    error.status = 401;
    error.stuff = { token };
    throw error;
  }
  const SQL = `
    Select id, username from users where id = ($1)::uuid;
    `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("not authorized didnt match query results");
    error.status = 401;
    throw error;
  }
  return response.rows[0]
};



const createItem = async ({ id = uuid.v4(), name, description }) => {
  try {
    const response = await client.query(createItemSQL, [id, name, description]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "CreateItem")
  }
}

const getItems = async ({ search = "", id = null, count = 20, page = 1 } = {}) => {
  try {
    const response = await client.query(getItemsSQL, [search.trim(), id, count, page]);
    return response.rows;
  } catch (ex) {
    handleError(ex, "GetItems")
    console.log(ex)
  }
}

const createReview = async ({ id = uuid.v4(), review, rating, itemId, userId }) => {
  try {
    const response = await client.query(createReviewSQL, [id, review, rating, itemId, userId]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "CreateReview")
  }
}

const getReviews = async ({ userId = null, itemId = null } = {}) => {
  try {
    const response = await client.query(getReviewsSQL, [userId, itemId]);
    return response.rows;
  } catch (ex) {
    handleError(ex, "GetReviews")
    console.log(ex)
  }
}

const createComment = async ({ id = uuid.v4(), comment, userId, reviewId }) => {
  try {
    const response = await client.query(createCommentSQL, [id, comment, userId, reviewId]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "CreateComment")
  }
}


const getComments = async ({ userId,commentId,comment } = {}) => {
  try {
    const response = await client.query(getCommentsSQL, [commentId,userId,comment]);
    return response.rows;
  } catch (ex) {
    handleError(ex, "Get Comments")
    console.log(ex);
  }
}


const modifyReview = async ({ userId, id }, { newReview, newRating }) => {
  try {
    const response = await client.query(modifyReviewSQL, [id, userId, newReview, newRating]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "modify Comment")
    console.log(ex)
  }
}

const modifyComment = async ({ userId, commentId, comment }) => {
  try {
    const response = await client.query(modifyCommentSQL, [commentId, userId, comment]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "modify Comment")
    console.log(ex)
  }
}

const destroyComment = async ({ userId, commentId,reviewId }={}) => {
  try {
    const response = await client.query(destroyCommentSQL, [commentId, userId,reviewId]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "destroy Comment")
    console.log(ex)
  }
}

const destroyReview = async ({ userId, reviewId }) => {
  try {
    const response = await client.query(destroyReviewSQL, [reviewId, userId]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "destroy Comment")
    console.log(ex)
  }
}

function handleError({ code, detail, severity, table }, endpoint) {
  switch (code) {
    case '23503':
      console.log(`${endpoint} Table ${table} Error. Duplicate key already exists.`)
      break;
    case '23505':
      console.log(`${endpoint} Table ${table} Contraint Error. Only 1 Pair may exist. ${detail}`)
      break;
    default:
      console.log(`${severity} ${code} - ${detail}; ${endpoint}`)
  }
}

module.exports = {
  client,
  createTables,
  createUser,
  createItem,
  createReview,
  createComment,
  getItems,
  getReviews,
  getComments,
  destroyComment,
  destroyReview,
  modifyComment,
  modifyReview,
  authenticate,
  findUserByToken
};
