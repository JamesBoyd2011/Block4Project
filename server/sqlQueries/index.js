const fs = require('fs');
const path = require('path');

const createTablesSQL = fs.readFileSync(path.resolve(__dirname, `./createTables.sql`)).toString();

const authenticateSQL = fs.readFileSync(path.resolve(__dirname, `./authenticate.sql`)).toString();

const createUserSQL = fs.readFileSync(path.resolve(__dirname, `./createUser.sql`)).toString();
const createItemSQL = fs.readFileSync(path.resolve(__dirname, `./createItem.sql`)).toString();
const createCommentSQL = fs.readFileSync(path.resolve(__dirname, `./createComment.sql`)).toString();
const createReviewSQL = fs.readFileSync(path.resolve(__dirname, `./createReview.sql`)).toString();

const getItemsSQL = fs.readFileSync(path.resolve(__dirname, `./getItems.sql`)).toString();
const getCommentsSQL = fs.readFileSync(path.resolve(__dirname, `./getComments.sql`)).toString();
const getReviewsSQL = fs.readFileSync(path.resolve(__dirname, `./getReviews.sql`)).toString();

const modifyReviewSQL = fs.readFileSync(path.resolve(__dirname, `./modifyReview.sql`)).toString();
const modifyCommentSQL = fs.readFileSync(path.resolve(__dirname, `./modifyComment.sql`)).toString();

const destroyCommentSQL = fs.readFileSync(path.resolve(__dirname, `./destroyComment.sql`)).toString();
const destroyReviewSQL = fs.readFileSync(path.resolve(__dirname, `./destroyReview.sql`)).toString();


module.exports = {
    authenticateSQL,
    createTablesSQL,
    createItemSQL,
    createUserSQL,
    createReviewSQL,
    createCommentSQL,
    getItemsSQL,
    getReviewsSQL,
    getCommentsSQL,
    modifyCommentSQL,
    modifyReviewSQL,
    destroyCommentSQL,
    destroyReviewSQL,
}