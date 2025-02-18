# Frank Meet

Frank Meet is an online meeting application, akin to Zoom, crafted using Next JS, Clerk, and Stream.io. Experience seamless, secure, and dynamic virtual meetings.

## Demo

Check out the live demo [here](https://frank-meet.vercel.app/).

## Features

- **High-Quality Video and Audio**: Ensure crystal clear video and sound during meetings.
- **User Authentication**: Secure sign-ups and log-ins using Clerk.
- **Real-Time Messaging**: Engage with participants using Stream.io's robust messaging capabilities.
- **Responsive Design**: Fully responsive and optimized for various devices.

## Technologies Used

- **Next JS**: A powerful React framework for building fast and user-friendly applications.
- **Clerk**: Handles user authentication and management with ease.
- **Stream.io**: Provides scalable and reliable chat functionalities.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/frank-meet.git
    ```

2. Change directory:

    ```sh
    cd frank-meet
    ```

3. Install dependencies:

    ```sh
    npm install
    ```

4. Create a `.env` file and add your environment variables:

    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
    CLERK_SECRET_KEY
    NEXT_PUBLIC_CLERK_SIGN_IN_URL
    NEXT_PUBLIC_CLERK_SIGN_UP_URL
    NEXT_PUBLIC_STREAM_API_KEY
    STREAM_SECRET_KEY
    ```

5. Run the development server:

    ```sh
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Thanks

Thanks to JS Mastery for his very thorough explanation of Stream.io & Clerk. 

