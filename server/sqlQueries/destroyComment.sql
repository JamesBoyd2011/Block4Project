DELETE FROM
    Comments
where
    (
        id = $1
        and userId = $2
        and reviewId = $3::uuid 
    )
    or (
        $1 is null
        and userId = $2
        and reviewId = $3::uuid
    ) RETURNING *;