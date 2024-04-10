Select * from Reviews r
inner join Items i on r.itemId = i.id
where  ($1::uuid is null and itemId = $2) or (userId = $1::uuid)
