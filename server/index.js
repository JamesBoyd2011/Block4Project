const {
    client,
    createTables,
    createUser,
    createItem,
    createReview,
    createComment,
    getItems,
    getReviews,
    getComments,
    modifyComment,
    destroyComment,
    modifyReview
} = require("./db");

const express = require("express");
const app = express();
app.use(express.json());

app.get('/api/items',async(req,res,next)=>{
    try{
        res.send(await getItems(req.query));
    }
    catch(ex){
        next(ex)
    }
});


const { USERS,ITEMS,REVIEWS,COMMENTS } = require("./seed");

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
    app.listen(port, ()=> console.log(`listening on port ${port}`));
};

init();

async function seedDataObjects(objects, SQL) {
    return [] = await Promise.all([...objects.map(obj => SQL(obj))]);
}