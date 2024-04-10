const state = {
    item:{},
    myReview:{},
    comments:[]
}

await registerUser("developer","asdf");
// await getItems();
// await getMyReviews();
// await getMyComments();


await authenticateUser("developer","asdf");
await getItems();
await createReview(state.item,"This is my sample Review",28)
await createReviewComment(state.myReview,"This is my sample Review Comment #1")
await createReviewComment(state.myReview,"This is my sample Review Comment #2")
await getMyReviews();
await getMyComments();

await modifyComment(state.comments[0],"Updated this comment");
await getMyComments();

await deleteComment(state.comments[0]);


await deleteReview(state.myReview)
await getMyReviews();
await getMyComments();


async function registerUser(username,password){
   try{
        const req = await fetch("http://localhost:3000/api/users/register", {
        "headers": {
            "content-type": "application/json",
        },
        "referrer": "http://localhost:3000/api/items",
        "body": JSON.stringify({
           username,password
        }),
        "method": "POST",
    });
    const res = await req;
    console.log(`Create an account for: ${username}`);
   }catch(err){
       console.log("Error Registering",err)
   }
}

async function authenticateUser(username,password){
    try{
        const req = await fetch("http://localhost:3000/api/users/login", {
        "headers": {
            "content-type": "application/json",
        },
        "referrer": "http://localhost:3000/api/items",
        "body": JSON.stringify({
            username,password
        }),
        "method": "POST",
    });
    const res = await req.json()
    console.log("Logged In",res);
    }
    catch(err){
        console.log("Error Authenticating",err)
    }
    
}

async function logout(){
    try{
        const req = await fetch("http://localhost:3000/api/users/logout", {
        "headers": {
            "content-type": "application/json",
        },
        "referrer": "http://localhost:3000/api/items",
        "body": JSON.stringify({
        }),
        "method": "POST",
    });
    const res = await req.text()
    console.log("Logged Out",res);
    }
    catch(err){
        console.log("Error logging out",err)
    }
    
}


async function getItems(){
    try {
        const request = await fetch(`http://localhost:3000/api/items`, {
            headers: {
                "Content_Type": "application/json"
            }
        })

        const response = await request.json();
        
        state.item = response[4];
        console.log("Got Items!",response)
    }
    catch (err) {
        console.log("Error getting Items",err)
    }
}

async function createReview( {id},review,rating){
    try {
        const request = await fetch(`http://localhost:3000/api/items/${id}/review`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                review,
                rating
            })
        })

        const response = await request.json();
        state.myReview = response;
        console.log("Created Item Review",response);
    }
        
    catch (err) {
        console.log("Error Creating Item Reviews",err)
    }
}

async function createReviewComment({itemId,id}){
    try {
        const request = await fetch(`http://localhost:3000/api/items/${itemId}/review/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                comment:"This is my sample comment",
                itemId:id
            })
        })

        const response = await request.json();
        console.log("Created Review Comment",response);
    }
        
    catch (err) {
        console.log("Error Creating Review Comment",err)
    }
}

async function getMyReviews(){
    try {
        const request = await fetch(`http://localhost:3000/api/me/reviews`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const response = await request.json();
        console.log("My Reviews",response);
    }
        
    catch (err) {
        console.log("Error Getting Reviews",err)
    }
}

async function getMyComments(){
    try {
        const request = await fetch(`http://localhost:3000/api/me/comments`, {
            headers: {
                "Content-Type": "application/json"
            }
        })

        const response = await request.json();
        console.log("My Comments",response);
        state.comments = response;
        return response;
    }
        
    catch (err) {
        console.log("Error getting Comments",err)
    }
}

async function modifyComment({reviewid,id},comment){
    try {
        
        console.log(state)
        const request = await fetch(`http://localhost:3000/api/reviews/${reviewid}/comments/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                comment
            })
        })

        const response = await request.json();
        console.log("Modify Comment",response);
    }
        
    catch (err) {
        console.log("Error Modifying Comment",err)
    }
}

async function deleteComment({reviewid,id}){
    try {
        const request = await fetch(`http://localhost:3000/api/reviews/${reviewid}/comments/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method:"DELETE"
        })

        const response = await request.json();
        console.log("Deleted Comment",response)
    }
        
    catch (err) {
        console.log("Error deleting Comment",err)
    }
}

async function deleteReview({id}){
    try {
        const request = await fetch(`http://localhost:3000/api/reviews/${id}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method:"DELETE"
        })

        const response = await request.json();
        console.log("Deleted Review",response)
    }
        
    catch (err) {
        console.log("Error deleting Comment",err)
    }
}