UPDATE
    Reviews
Set
    review = $3,
    rating = $4,
    modifiedDate = now()
where
    id = $1
    and userId = $2 RETURNING *;