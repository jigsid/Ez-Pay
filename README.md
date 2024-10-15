# Payments App

A third part payments app in which a user can send money to someone or on ramp/ off ramp from/to the bank.

## Tech Stack

- Nextjs
- Expressjs
- Tailwind
- PostgreSQL
- Prisma ORM
- Docker
- CI/CD for deployemnt of image to docker hub

## Workflow

![workflow](images/workflow.png)

## Running the project locally

clone the repo
cd Payments-App

There is a [docker-compose.yml](./docker-compose.yml) in each of the services fill in the environment variables after that in the project's root dir run

```shell
docker-compose up
```

Note:-

When on ramping money you will be directed to a bank webpage(will build a bank project later and interlink both of them) and it'll generate a token in the database with a status of pending. So to test that you need to hit the webhook with a post request
Body of the psot request for the webhook

![post req body](images/post_req.png)

if it responds with captured that means transaction completed.

## Contributing

Contributions are welcome! If you have suggestions for new features, bug fixes, or improvements, please fork the repository and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

## Contact

If you have any questions or suggestions, please feel free to contact.
