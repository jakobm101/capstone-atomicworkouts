ATOMIC WORKOUTS


# Offline Mode Setup
fill offline database:
mongoimport --db 2 --collection workouts --file workouts.json --jsonArray
mongoimport --db 2 --collection exercises --file exercises.json --jsonArray