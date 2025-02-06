
# Go Boundless

The frontend is a modern, responsive eSIM shop front built using React, Vite, and Tailwind CSS. It provides customers with an intuitive interface to browse, purchase, and manage eSIM data packages. The application integrates directly with our Python Flask backend API, which in turn communicates with the Dent eSIM provider to handle mobile data package provisioning. This seamless integration with Dent ensures that users receive real-time access to their eSIM services,


## Features

Responsive Design:
Crafted with Tailwind CSS, the application is optimized for a wide range of devices, ensuring a smooth and visually appealing user experience on both desktop and mobile.

User Registration & Account Management:
Simplified user onboarding with integrated account management, allowing new users to register and existing users to easily manage their profiles.

eSIM Package Browsing & Purchasing:
Enables customers to browse available eSIM packages and purchase them directly from the storefront with clear package information and pricing.

Secure Payment Processing:
Integrated with Stripe and Now payments the platform ensures all payment transactions are handled securely and efficiently. Users are able to pay in fiat or a number of different cryptocurrencies.

## Installation

Clone the Repo:

```bash
  git clone https://github.com/liquify-validation/go-boundless.git
```

Install Dependencies:


```bash
  npm install

```

Configure Environment:

Create .env file in root

```bash
  VITE_DENT_CLIENT_ID // Your DENT account ID
  VITE_DENT_CLIENT_SECRET // Your DENT account Secret
  VITE_API_URL // Link to the backend
  VITE_STRIPE_KEY // Your Stripe Key
  VITE_FRONTEND_URL // Your frontend URL
```

Run Development Server:

```bash
  npm run dev

```
## Deployment

To deploy this project run

Build Production Bundle:


```bash
  npm run build

```

This outputs a dist/ folder containing the optimized production build.


### Deploy

Copy the dist/ folder to your preferred hosting (Netlify, Vercel, S3 bucket, etc.).

Ensure your environment variables and API base URLs are set correctly.
## Contributing

Contributions are always welcome!

Fork the repo and create a new branch for your feature or bug fix.

Commit changes with clear messages.

Open a Pull Request describing your changes.

Please follow any coding style or lint guidelines and ensure your code builds successfully before submitting.
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Additional Notes

You can find the python backend at the link below 

[Python Backend](https://github.com/liquify-validation/go-boundless-backend.git)

