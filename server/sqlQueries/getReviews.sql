Select * from Reviews r
inner join Items i on r.itemId = i.id
where  ($1::uuid is null) or (userId = $1)
