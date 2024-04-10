Select
    *
from
    Comments c
where
    ($1::uuid is null and userId = $2::uuid and $3::uuid is null) or
    (id = $1::uuid  and reviewId = $3::uuid)