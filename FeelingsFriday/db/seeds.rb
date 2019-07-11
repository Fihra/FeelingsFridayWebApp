# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Feeling.destroy_all
Comment.destroy_all

u1 = User.create(name: "Tary", currentMood: "Angry")
u2 = User.create(name: "Feebee", currentMood: "Bliss")
u3 = User.create(name: "Mar", currentMood: "Depair" )

feels1 = Feeling.create(content: "I am mad today!!!!!", likes: 3, user: u1)
feels2 = Feeling.create(content: "I had a code challenge this week.", likes: 45, user: u1)
feels3 = Feeling.create(content: "Yay!! I'm Happy. I saw puppers and Doggos <3<3<3", likes: 10, user: u2)
feels4 = Feeling.create(content: "I sad.", likes: 6, user: u3)

comment1 = Comment.create(content: "Awww" , user: u2, feeling: feels4)
comment2 = Comment.create(content: "That's rough" , user: u3, feeling: feels2)
comment3 = Comment.create(content: "Cool" , user: u1, feeling: feels3)