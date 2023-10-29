# URL Shortener

A simple URL shortener service built with Next.js and MongoDB.

## Features

- Shorten long URLs.
- Redirect to the original URL using short slugs.
- Custom error handling for missing or invalid short URLs.
- Easy to self-host with MongoDB as the database.

## Installation and Setup

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Git (optional, for cloning the repository)

### Clone the Repository

You can clone this repository using Git:

```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### Installation

1. Install project dependencies:

```bash
npm install
```

2. Create a `.env` file in the project's root directory with your MongoDB URI. You can get a MongoDB URI by following the [official MongoDB documentation](https://docs.mongodb.com/guides/cloud/connectionstring/).

```dotenv
MONGODB_URI="your-mongodb-uri-here"
```

### Start the Application

Run the following command to start the development server:

```bash
npm run dev
```

The URL shortener will be available at `http://localhost:3000`.

## Usage

1. Access the URL shortener web application.
2. Enter the original URL you want to shorten and click the "Shorten" button.
3. You'll receive a shortened URL that you can use to access the original URL.
4. If you try to access a shortened URL that doesn't exist or is invalid, you'll be redirected to a custom error page.

## Self-Hosting Guide

To self-host this URL shortener on your server, follow these steps:

1. Clone the repository and install the required dependencies as mentioned in the installation section.

2. Create a `.env` file in the project's root directory and add your MongoDB URI. You can obtain a MongoDB URI by following the [official MongoDB documentation](https://docs.mongodb.com/guides/cloud/connectionstring/).

```dotenv
MONGODB_URI="your-mongodb-uri-here"
```

3. Start the application using `npm run dev` and ensure that it's accessible on your server.

4. Make the application accessible to the public by setting up a domain and configuring your server to handle incoming requests.

5. Optionally, you can configure SSL for secure access using a tool like Let's Encrypt.

6. Test the application thoroughly to ensure it's working as expected.

7. Monitor and maintain your URL shortener to keep it available and responsive.

## License

This project is released into the public domain under the Unlicense. No restrictions apply. See the [UNLICENSE](LICENSE) file for details.


# Thankyou!
