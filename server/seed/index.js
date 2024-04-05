const { faker } = require('@faker-js/faker');
const uuid = require("uuid");

const count = 100;

const USERS = faker.helpers.multiple(createRandomUser, { count })
const ITEMS = faker.helpers.multiple(createRandomItem, { count })
const REVIEWS = faker.helpers.multiple(createRandomReview, { count })
const COMMENTS = faker.helpers.multiple(createRandomComment, { count })



function createRandomItem() {
    return {
        id: uuid.v4(),
        name: faker.commerce.productName(),
        description: faker.datatype.boolean() ? faker.commerce.productDescription() : null
    }
}

function createRandomUser() {
    return {
        id: uuid.v4(),
        username: faker.internet.displayName(),
        password: faker.internet.password()
    }
}

function createRandomReview() {
    return {
        id: uuid.v4(),
        review: faker.lorem.paragraph(),
        rating: faker.datatype.boolean() ? faker.number.int({ min: 1, max: 100 }) : null,
        userId: USERS[Math.floor(Math.random() * USERS.length)].id,
        itemId: ITEMS[Math.floor(Math.random() * ITEMS.length)].id
    }
}

function createRandomComment() {
    return {
        id: uuid.v4(),
        comment: faker.lorem.sentence(),
        userId: USERS[Math.floor(Math.random() * USERS.length)].id,
        reviewId: REVIEWS[Math.floor(Math.random() * REVIEWS.length)].id
    }
}


module.exports = {
    USERS,
    ITEMS,
    REVIEWS,
    COMMENTS
}