const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/Block4Project"
);
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const { createTablesSQL, createItemSQL, createUserSQL, createReviewSQL, createCommentSQL, getItemsSQL, getReviewsSQL, destroyCommentSQL,modifyCommentSQL,modifyReviewSQL } = require("./sqlQueries");
const seed = require("./seed")

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
    // console.log("CreatedUser",response.rows[0])
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "CreateUser")
  }
}

const createItem = async ({ id = uuid.v4(), name, description }) => {
  try {
    const response = await client.query(createItemSQL, [id, name, description]);
    // console.log("CreatedItem",response.rows[0]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "CreateItem")
  }
}

const getItems = async ({search=null}={}) => {
  try {
    const response = await client.query(getItemsSQL,[search.trim()]);
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

const getReviews = async ({ userId =null} = {}) => {
  try {
    const response = await client.query(getReviewsSQL, [userId]);
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

const getComments = async ({ userId}) => {
  try {
    const response = await client.query(getReviewsSQL, [userId]);
    return response.rows;
  } catch (ex) {
    handleError(ex, "GetReviews")
  }
}


const modifyReview = async ({ userId,id},{newReview,newRating}) => {
  try {
    const response = await client.query(modifyReviewSQL, [id,userId,newReview,newRating]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "modify Comment")
    console.log(ex)
  }
}

const modifyComment = async ({ userId,id},{newComment}) => {
  try {
    const response = await client.query(modifyCommentSQL, [id,userId,newComment]);
    return response.rows[0];
  } catch (ex) {
    handleError(ex, "modify Comment")
    console.log(ex)
  }
}

const destroyComment = async ({ userId,id}) => {
  try {
    const response = await client.query(destroyCommentSQL, [id,userId]);
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
  modifyComment,
  modifyReview
};
