source dev.sh 
npx prisma migrate dev --name init --preview-feature
npx nodemon server