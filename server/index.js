const {
    client,
    createTables,
    createUser,
    createItem,
    createReview,
    createComment,
    getItems,
    getReviews,
    modifyComment,
    destroyComment,
    getComments,
    modifyReview,
    authenticate,
    findUserByToken,
    destroyReview
} = require("./db");

const express = require('express');
const app = express();
app.use(express.json());

let token;

const isLoggedIn = async (req, res, next) => {
    try {
        res.locals.user = await findUserByToken(req.headers.authorization);
        next();
    }
    catch (ex) {
        next(ex)
    }
}

app.all('*', async (req, res, next) => {
    try {
        if (token) {
            req.headers.authorization = `Bearer ${token.token}`
        }
        next();
    }
    catch (ex) {
        next(ex)
    }
})

app.get('/api/items', async (req, res, next) => {
    try {
        res.send(await getItems(req.query));
    }
    catch (ex) {
        next(ex)
    }
});

app.get('/api/items/:id', async (req, res, next) => {
    try {
        res.send(await getItems(req.params));
    }
    catch (ex) {
        next(ex)
    }
});

app.post('/api/users/register', async (req, res, next) => {
    try {
        res.send(await createUser(req.body));
    }
    catch (ex) {
        next(ex)
    }
});

app.post('/api/users/login', async (req, res, next) => {
    try {
        token = await authenticate(req.body);
        res.send(token);
    }
    catch (ex) {
        next(ex)
    }
});

app.post('/api/users/logout',isLoggedIn, async (req, res, next) => {
    try {
        token = null
        res.send({message:"Successfully Logged Out"});
    }
    catch (ex) {
        next(ex)
    }
});

app.post('/api/items/:itemId/review', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await createReview({
            ...req.body,
            ...req.params,
            userId: res.locals.user.id
        }));
    }
    catch (ex) {
        next(ex)
    }
});

app.post('/api/items/:itemId/review/:reviewId', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await createComment({
            ...req.body,
            ...req.params,
            userId: res.locals.user.id
        }));
    }
    catch (ex) {
        next(ex)
    }
});


app.get('/api/reviews/:reviewId/comments/:commentId', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await getComments({
            ...req.params
        }));
    }
    catch (ex) {
        next(ex)
    }
});


app.patch('/api/reviews/:reviewId/comments/:commentId', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await modifyComment({
            ...req.body,
            ...req.params,
            userId: res.locals.user.id
        }));
    }
    catch (ex) {
        next(ex)
    }
});

app.delete('/api/reviews/:reviewId', isLoggedIn, async (req, res, next) => {
    try {

        let review = {  
            ...req.params,
            userId: res.locals.user.id
        };

        console.log("deletereview",review)

        await destroyComment(review)
        
        res.send(await destroyReview(review));
    }
    catch (ex) {
        next(ex)
    }
});


app.delete('/api/reviews/:reviewId/comments/:commentId', isLoggedIn, async (req, res, next) => {
    try {
        console.log(req.params)
        res.send(await destroyComment({  
            ...req.params,
            userId: res.locals.user.id
        }));
    }
    catch (ex) {
        next(ex)
    }
});



app.get('/api/me/comments', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await getComments({
            userId: res.locals.user.id
        }));
    }
    catch (ex) {
        next(ex)
    }
});

app.get('/api/me/reviews', isLoggedIn, async (req, res, next) => {
    try {
        res.send(await getReviews({
            userId: res.locals.user.id
        }));
    }
    catch (ex) {
        next(ex)
    }
});




// app.delete('/api/items/:id/review/:reviewId', isLoggedIn, async (req, res, next) => {
//     try {
//         res.send(await destroyReview(req.body, req.params, res.locals.user));
//     }
//     catch (ex) {
//         next(ex)
//     }
// });



const { USERS, ITEMS, REVIEWS, COMMENTS } = require("./seed");

const init = async () => {
    await client.connect();
    console.log("connected to database");

    await createTables();
    console.log("tables created");

    const seededUsers = await seedDataObjects(USERS, createUser);
    console.log("Users Seeded");

    const seededItems = await seedDataObjects(ITEMS, createItem);
    console.log("Items Seeded");

    const seededReviews = await seedDataObjects(REVIEWS, createReview);
    console.log("Reviews Seeded");

    const seededComments = await seedDataObjects(COMMENTS, createComment);
    console.log("Comments Seeded");

    // console.log(await getItems({search:ITEMS[24].name}))
    // console.log(await getItems())

    // console.log("getting Reviews",USERS[20].id,await getReviews({userId: USERS[20].id}))
    // console.log("getting Reviews",await getReviews())
    // console.log("modify Review",await modifyReview(REVIEWS[0],{newReview:"ASDSAADSAD",newRating:24}))


    // console.log(await getComments({userId:USERS[42].id}))
    // console.log(await modifyComment(COMMENTS[0],{newComment:"ASDFS"}))
    // console.log(await destroyComment(COMMENTS[0]))

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
};

init();

async function seedDataObjects(objects, SQL) {
    return [] = await Promise.all([...objects.map(obj => SQL(obj))]);
}