# balti

Stupidly minimal file sharing service.

## Architecture

A static webpage uploads directly to minio (or any S3 storage bucket).

`bucket_policy.json` contains the necessary permissions to setup the minio bucket.

`lifecycle_expiry.json` set the rules to expire objects depending on their `ExpireAfter` tag.

Uses [chota](https://github.com/mradigen/chota) to shorten long S3 URLs.

## Self-host

Clone the repository:

```sh
git clone https://github.com/mradigen/balti
cd balti
```

### Minio

1. Copy the `.env.example` file and edit it as needed:

    ```sh
    cp .env.example .env
    ```

2. Run the compose stack:
    ```sh
    docker compose up -d
    ```

### Frontend

If you wish to host the static frontend as well

1. Switch to the `frontend/` directory:

    ```sh
    cd frontend
    ```

2. Copy the `.env.example` file and edit it as needed:

    ```sh
    cp .env.example .env
    ```

3. Run the compose stack:
    ```sh
    docker compose up -d
    ```

## Testing

WIP

## Contributing

Contributions are highly encouraged! Please open an issue or submit a pull request with your changes.

## Credits

- [Font](https://www.1001fonts.com/dual-font.html)
