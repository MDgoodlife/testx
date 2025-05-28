---

# 👋🏼 **Purpose of the anyKrowd Kodex of Value**

This “Bible of Value” is your roadmap to the platform’s best practices, optimized setups, and strategic recommendations, compiled to guide you in leveraging anyKrowd to its fullest potential. This document provides in-depth insights into feature applications, configuration tips, and case studies, all aimed at helping you achieve operational efficiency, deepen audience engagement, and unlock new streams of value at your events. Use this guide to understand every facet of anyKrowd, from foundational setup in Adminx to enhancing on-the-ground execution in Staffx.

---

![Screenshot 2024-10-22 210944.jpg](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/41d917c8-6342-435d-a2c4-a3fbff080c5a/Screenshot_2024-10-22_210944.jpg)

The image illustrates the three main components of the anyKrowd platform: **Adminx**, **Staffx**, and **Clientx**.

- **Clientx** (left) represents the visitor or attendee-facing app, facilitating user interactions and payments.
- **Adminx** (top) is the organizer's backend interface, where event configuration, financial tracking, and data insights are managed.
- **Staffx** (right) supports on-the-ground operations, allowing staff to check tickets, process sales, and provide assistance during events.

The arrows show the flow of data and functions between these modules: **Adminx** configures and organizes event settings, **Clientx** enables user engagement, and **Staffx** executes the operations, with PRINTx and NUC supporting device functionality and printing needs. Together, they create a connected ecosystem for seamless event management.

# 📱📱📱 Clientx 2.0

(the naming of our front experience visitor app)

## ℹ️General

**Clientx** is the attendee-facing component of the anyKrowd platform, purpose-built to enhance event experiences through a versatile, user-friendly app. This app enables seamless attendee engagement with event services, offering a range of configurable functionalities that cater to varied event setups. With its core flexibility and adaptability, Clientx serves as a central touchpoint for all visitor interactions, tailored to deliver smooth access, transactions, and personalized content based on the event's needs. (This section should introduce Clientx’s power and configurability without diving into specific features, which are detailed below.)

### Web app

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/7a88ec8b-bec5-420a-9d15-1d4cbd670a7a/image.png)

AnyKrowd’s platform offers a web-based experience by default. The front-end view is, by default, available in a web mode on any device/browser. A web app is consistently accessible for essential functions, such as the (guest) wallet view for top-ups, especially useful in RFID-driven events. These wearables often include a QR code that, when scanned by a phone camera, directs users to the (web)app's (guest) wallet view. A web app can range from a simple top-up interface to a fully comprehensive application with all features and modules enabled (or not), depending on the event configuration.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/662bf8d1-0aae-4eef-9f6e-f29061d0cb10/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/3c64c6a2-1c83-4389-8f0a-c19de9a6a775/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/60794ada-c436-44e6-8d81-65688b1df078/image.png)

### Native app

The front-end app can also be released as a Google or Apple native app. Typically, this takes between 3–14 days to pass through validation and be published in app stores, complete with relevant screenshots and descriptions. A native app offers a more refined experience and enables additional functionalities, such as push notifications. Ideally, a lead time of 4–6 weeks is recommended to prepare and launch a new native app.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/9f1ddb06-40a3-4a4d-9cd4-1753fd306743/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/77dc2a86-e88a-4b6c-a9fb-1302bdc3cdc5/image.png)

### Notifications

Native apps allow users to receive notifications, which must be enabled on the user’s device upon registration. Push notifications can be sent to all users or specific user segments. When a notification is opened, the app directs the user to the relevant content, and the view count for that content post is incremented by +1.

### Soft Update

Approximately every 2–6 weeks, anyKrowd releases updates to enhance platform features. Most improvements and new features are delivered through "soft updates" that do not require major structural changes. Web-based versions update automatically, while native apps prompt users with an update dialog upon opening the app. Once the update is completed and the app restarts, new features are accessible.

### Hard Update

Occasionally, anyKrowd releases a new major version of the platform that consolidates all prior soft updates and may introduce significant new features or changes requiring more extensive adjustments. A new native app must then be built and published in app stores. Although no downtime occurs, app stores' validation processes should be accounted for. Native apps typically auto-update between 22:00 and 06:00 if the device is connected to WiFi and charging.

## 👋🏼Welcome Screen / Login

The Welcome Screen is the first page users encounter in Clientx. Unless "public mode" or "full guest mode" is enabled, this serves as the main login interface where users can create an account or sign in.

Users can log in using:

- **Email** (manual account creation)
- **Social Login** options like Google, with other choices such as Facebook, Apple, or Phone Login available if enabled in **Adminx > Settings > Registration Settings**.

The **Welcome Message** displayed below the logo can be customized to reflect tenant branding or a tailored greeting, adjustable via **Adminx > Settings > App**. Social login options simplify the login process by automatically retrieving basic information (name, email, and profile image, if available) from the selected social account. If additional information is required, users will be prompted to complete the remaining registration fields.

For returning users with an email-based account, there’s a “Login” button at the bottom right of the screen for easy access.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/3a477b7c-9d11-4130-acbf-db4e3ddb78ba/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/bbe97a35-ef7d-4398-ae35-fb80028cad8b/image.png)

### Local Login

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/a81bb415-8a55-4461-aabf-2610a811eab4/image.png)

With the email-based login, users can create a tenant-specific account. Based on the settings in Adminx, they may need to complete specific profile fields and set a password. Once registered, they are immediately logged in.

### Social Login

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/f3ea135a-7084-4f4a-b3e7-4288e04bd7b3/image.png)

Social login options like Google, Facebook, or Apple allow users to log in with a single click. Only essential details (name and email) are retrieved, and no password is needed. If the tenant has additional registration requirements, users will be prompted to complete those fields.

### Forgot Password

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/6363906f-b493-4f08-935a-206cf59fddd6/image.png)

If users forget their password, they can initiate a reset by selecting the “Forgot Password?” option on the login screen. They will be prompted to enter their registered email address, and if the email exists in the system, a reset link will be sent to that address. This link allows users to set a new password and regain access to their account.

This option is accessible through both the **Login** screen and the **Log in with Email** flow.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/42e42a65-ed23-4e5b-a5b7-492bbd1b01e0/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/e9a400bf-bc60-4cb9-b9e3-54b8a36a11b7/image.png)

## 🏠Home

The **Home** screen in Clientx is a dynamic, fully customizable interface designed to fit the unique needs of each event or venue. Clientx isn’t a one-size-fits-all solution—it's a versatile toolbox that empowers you to decide what features to display, how they look, and how users interact with them. Every element on the Home screen, from wallet balances to news feeds, can be configured and tailored in **Adminx** to suit specific event requirements and user expectations.

Whether you’re enabling a simple payment system, a multi-currency wallet, or real-time event updates, Clientx’s modular design allows you to activate, deactivate, or adjust features on the go. This flexibility lets organizers make real-time changes based on crowd dynamics, user preferences, or operational needs, providing a responsive and engaging experience for attendees.

With anyKrowd, you have complete control over the user journey, ensuring the platform adapts effortlessly to various scenarios and event configurations. The power is in your hands to create an interface that aligns with your brand and operational goals.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/81d49a96-b086-4caa-b05d-b63fa08ba1bd/06723f86-a1c6-4649-9f36-f25cb9402356.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/7e0273e2-282e-4166-835c-d6dea91bff6a/aad29183-f5c5-4a24-900b-28c5f692cefe.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/3c36fbef-d6e0-486c-9594-21ecc7b5c5ca/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/23a89872-28f5-4bb3-a19b-877ec4bb44b1/image.png)

### Summary View

The starting view/page of Clientx displays the most important features for users. It shows the user’s identity with options to manage profile details, provides access to wallet balance across multiple currencies, and enables access to order history with the ability to request refunds. The most recent news and event updates are also visible. For RFID-driven events, features like “public mode” and “full guest mode” are optimized for situations where accounts are not mandatory, making guest wallets the primary interaction method. Every feature is configurable within anyKrowd to suit specific event requirements.

### Wallet Connectivity Status

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/88d6db96-91bb-4948-9a54-9d09659c2b72/image.png)

When the user has an internet connection, the wallet balance updates automatically in real time. If the user is offline, the app displays a message indicating the loss of connectivity, and the wallet balance is no longer displayed as it is not being updated. However, users can still make payments offline, as the personal Payment QR code is cached in the phone’s memory (native app only).

### Payment QR Code

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/a32f9a66-c3fe-47a7-a7d5-6b3b8c5c767e/image.png)

The personal Payment QR code is used to make payments at all Staffx POS devices. Linked directly to the user’s wallet, it contains all necessary information and functions offline. The Payment QR code remains valid for a specified duration (configured in Adminx App Settings) and is cached in the phone’s memory (native app only). If the QR code expires, it cannot be used for payments until refreshed. When a user opens the Payment QR code, the phone automatically increases brightness for optimal scanning.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/a94d582b-2539-4a74-bc8b-0098b6a3e0a6/image.png)

### RFID (Use Cases)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/c0569a0b-ee8c-4e84-acb5-51023836ee4c/image.png)

RFID in the anyKrowd platform offers a flexible, guest-first payment solution designed for a seamless event experience. With an RFID wristband or card, attendees can make cashless payments through a **guest wallet** linked to a QR code, which provides all the necessary functionality without requiring an app or account. This setup makes RFID ideal for first-time or casual users, enabling a smooth, accessible entry point.

For events that encourage deeper engagement, organizers can configure RFIDs to allow attendees to link or create a full account during key touchpoints, such as the refund process. This transition brings users into the Clientx app or web environment, unlocking all additional features such as transaction history, loyalty rewards, and the ability to top up or manage wallets online.

**Key RFID Applications** include:

- **Guest-First Experience**: Provides quick, easy access to cashless payments through a QR-linked guest wallet without requiring an app. Users can later create an account if desired, allowing them to retain wallet balances and access enhanced features or can experience in “full guest mode” an quick & easy guest flow & refund process.
- **Company Spending Cards**: Pre-paid or postpaid RFID cards can be distributed to employees, clients, or guests, with all transactions tracked under one company account. System Tags can be used to segment users for personalized engagement.
- **Birthday Packages & Gift Vouchers**: RFID-enabled vouchers can carry pre-loaded balances for special events, along with associated tickets or perks, and can automatically segment users for personalized engagement.
- **Table Reservations**: RFID cards can represent a shared budget for reserved tables, available as pre-paid, postpaid, or split (e.g., 50% up front, 50% on arrival). These can be single cards tied to an account or a set of cards linked to a shared wallet.

Additionally, anyKrowd’s RFID system allows multiple cards to be linked to a single Wallet. This feature is ideal for groups or companies, enabling one Wallet to support multiple users, such as friends, family members, or colleagues, creating a cohesive group experience with centralized spending control.

### Linked RFID (Wristband / Card)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/e37d19fd-c64e-417d-a375-a9fcbd3ed200/image.png)

Users can link multiple RFIDs to their account/wallet. When an RFID is linked, it acts as an extension of the wallet/Payment QR code, allowing payments at Staffx POS devices. Users can view, delete, or link new RFIDs as needed. Linking RFIDs is optional but may be required for certain event configurations, such as “RFID-first” events. In such cases, attendees can use a wristband or card with a QR code that opens a wallet view when scanned, enabling top-ups via a web interface, tracking transaction history (wallet history button), requesting refunds, and accessing essential event information.

### Linking an RFID

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/04e9ca44-7fe9-4224-9364-b3013c1c4643/image.png)

When users click the “RFID” icon, an overview of all linked RFIDs is displayed.

To link a new RFID, users click the “+” button, which prompts them to allow camera access and opens the phone’s camera. The user scans the QR code on the RFID wristband or card and confirms it by scanning again. Once confirmed, the RFID is successfully linked to the account, and any remaining balance on the RFID is transferred to the user’s wallet.

### News Wall

The News Wall appears on the **Home** screen of the Clientx (web) app, showcasing all published content and events relevant to the user. Posts can be visible to all users or targeted to specific segments based on set criteria.

- **Interaction**: Users can click on any post or event to open a detailed view with more information. Each post includes a “View Details” button for easy access.
- **Push Notifications**: When new content is published, push notifications can be sent to notify users of updates. (optional)
- **Customization**: Posts can be fully customized using HTML/CSS to align with the event or venue branding. For more detailed configuration, refer to **Adminx > Manage > Content**.

Posts appear on the Home page as **content posts** on the News Wall and can be opened via the “View Details” button.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/4040b41a-b2db-4266-8845-5b16a70b3fac/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/07e8a6e5-b067-47f8-acce-b806ac5c16d9/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/acbff66e-ec0b-4a1d-922d-37b21198d263/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/ea904e16-cdef-4139-ac1e-9c8126657f7a/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/e4ed0783-450c-4876-894f-2b5d2b55a199/image.png)

## 👤 Profile / Account

The core of Clientx is a user’s profile or account, which serves as a foundation for meaningful engagement. By encouraging account creation and onboarding as many users as possible, you unlock powerful community-building tools. We recommend converting as many people as possible into clientx accounts, whether through ticket sales, data imports, or social media integrations.

**Conversion Channels:**

- **Ticket Sales** (including historical sales data)
- **Imports** from existing email databases
- **Social Media Integrations**, converting followers from platforms like Facebook or Instagram

The ultimate goal is to grow a strong community around your platform, identifying and understanding your visitors. This community-building approach is a core component of anyKrowd’s platform, providing valuable insights and connection opportunities for organizers.

**Guest to Profile Conversion**:
Visitors using a guest RFID (wristband or card) can later create a profile as part of the refund process. During this process, they are prompted to create an account, enabling them to receive refunds and access other personalized features.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/1df7b62a-72f5-4519-af62-5dff29e9da3a/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/69ac4aac-e312-4262-8fcd-0de4bbcef37f/image.png)

### 🟦Manage / Edit Profile Details

When logged into the Clientx app, users can click on “Manage” next to their profile name at the top. Here, they can view and edit details, toggle notification settings (opt-in/out), upload a (new) profile picture, review Legal Consents (Terms & Conditions + Privacy Policy), change their password, log out, or delete their account. The app version number is displayed at the bottom of this page, indicating the software version currently in use.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/909a6bab-a3b7-4428-988f-2d6d8649424c/image.png)

### 🟦Notifications Management

In the Notifications section, users can view and adjust their notification settings, choosing to opt in or out of specific types of notifications:

- **Email Notifications**: Toggle to receive or stop receiving notifications via email.
- **Push Notifications**: Toggle to enable or disable push notifications on the device.
- **SMS Notifications**: Toggle to opt in or out of SMS notifications. (currently still under development)

These options allow users to control how they receive updates and alerts from the platform, tailoring the experience to their preferences.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/4a109cc5-74b1-4562-b4ac-f3d866cd7e26/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/5f33dc66-5524-460c-a530-06f48f165a5d/image.png)

### 🟦Legal & Terms and Conditions

Users can review the **Terms & Conditions** and **Privacy Policy** directly within the app. These documents can be configured and customized for each tenant via **Adminx > Settings > App**. anyKrowd provides a template for both, which the Project Manager (PM) can fill in and adjust to meet specific needs, ensuring that customers are informed of their rights and obligations.

This step is mandatory for acceptance on Google and Apple app stores for native apps and is a legal requirement for organizers to provide to end users.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/2426f826-1c33-40c3-9f12-a0882baee3fe/image.png)

### 🟦Install App

When using the web app, users may see a pop-up prompting them to install the native app if it is available. Additionally, an “Install App” button is displayed, which directs users to the correct native app download via a deeplink for Apple or Google. This deeplink needs to be configured in **Adminx > Settings > App** for this mechanism to function correctly.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/81831b9f-4eeb-4c82-8bca-e34c7b64572c/image.png)

### 🟦Change Password

The “Change Password” option allows users to update their current password. Selecting this button will prompt the user to enter a new password, enhancing account security. This feature is useful if users suspect unauthorized access or simply wish to update their login credentials.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/c60347ce-1b3d-4c2b-a91d-2d7e1916b590/315dfdfe-1b54-472f-9ccb-ba4d57d272e5.png)

### 🟦Logout

The “Logout” button enables users to securely sign out of their account on the app. This is recommended after each session on shared devices to prevent unauthorized access to the account.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/fa9b8e09-3c92-44e0-99bc-fdd5f6e0c8a7/image.png)

### 🟦Delete Account

The “Delete Account” option allows users to permanently remove their account from the platform. Upon selecting this option, users will be prompted to confirm their decision, as this action is irreversible. Once confirmed, all account data and associated information will be permanently deleted.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/fa88d963-e76a-4aba-9eb6-bdc9e0e9b0ad/image.png)

### 🟦Version Number

At the bottom of the Profile Details screen, the app version number (e.g., Version 2.0.6) is displayed. This is particularly useful for troubleshooting or reporting issues. Users experiencing technical problems are encouraged to take a screenshot or note the version number when contacting support. While the web app is always updated to the latest version upon refresh, knowing the version is essential for native app users, especially if updates are pending.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/1ec54b0e-e71c-4fad-9849-ac40b6ccea62/bc3de2b1-09a3-4257-b71f-0a7e5610a824.png)

### 🟦Invoicing

If the tenant is configured to allow ‘Invoicing’ in Adminx App Settings, users can enter or edit their company details and activate invoicing, auto-invoicing, and auto-receipts. This setup triggers an invoice/receipt to be generated for each purchase, including the user's company information.

### 🟦Interest / Tag Management

If the tenant is configured with Public Tags, these appear to users as ‘Interests’. Users can select or deselect interests that are relevant to them. This allows for more detailed profiling based on these interests (public tags), which can then be utilized in the segments feature for targeted engagement.

System Tags, on the other hand, are invisible to users. These tags enable background tagging and segmentation without the user’s awareness, supporting refined user segmentation and personalization.

## 🪙Wallet

The Wallet feature provides a flexible, closed-loop payment solution that can be configured as either an app-based digital wallet or an RFID-based system. This setup incentivizes attendees to use the Wallet as their primary payment method, which not only speeds up transactions but also provides valuable data insights. By using the Wallet, organizers can enhance user engagement, reward loyalty, and create a seamless cashless experience—all while retaining control over every aspect of the payment ecosystem.

### 🟧Home Overview

On the Home screen, users can view their wallet, which displays the available balance and provides options for selecting multiple currencies if configured in Adminx. A currency will only be visible to users if there is a balance in that currency or if it is set to be “created automatically” for each user. Users can also choose to “add” money to their wallet if the currency is configured as “top-uppable.”

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/54980ffb-cb53-4ae6-ae74-7acf754ac595/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/af60e80d-750d-4b56-85f3-1c25a9404777/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/3ca5f030-5ea4-4808-83ea-372be1889b80/image.png)

### 🟧Add / Top Up

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/d4bbca59-f1bd-4f52-a1df-8e252a3f5302/image.png)

The “Add” button on the home screen allows users to add money to their wallet, opening the top-up screen. Users can add funds through “Packages” or a “Free Amount,” as configured in Adminx App Settings. If set up, a top-up message can provide extra information. Users can select a payment country from the top right, which adjusts available payment methods based on location. Once a user selects a package or inputs a free amount to top up and confirms by clicking the ‘Continue’ button, they are directed to the payment screen (external partner: Viva Wallet or Mollie). After completing the payment, users receive a confirmation screen (with an optional confirmation message if configured) and the funds are added to their wallet. A receipt is generated (visible in the Transactions overview), and a confirmation email is sent. For RFID-first or RFID-only events, top-ups are primarily done by scanning the QR code on the RFID wristband/card, which then opens the wallet top-up view via the web interface.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/b5a660f1-e76b-4cfa-8641-38d27ae13966/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/19053006-3cc1-49ea-b51c-5567abc2a303/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/3c057e3a-e610-4c49-8d79-512a6f9fcd33/image.png)

### 🟧Redeem Voucher

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/44d5fdd1-89d0-4c8d-a07f-8c9338ccc021/image.png)

Users can redeem vouchers directly within Clientx.

By clicking the “Add” button in the wallet on the Home screen, users access the top-up screen. At the bottom of this screen, a “Redeem Voucher” text button appears.

The **Redeem Voucher** screen allows users to easily add value or access specific perks by redeeming a voucher code. Users can enter the code manually or use their device's camera to scan a QR code, making the process both quick and user-friendly.

- **Input Voucher Code**: Users can type the code directly into the provided field. This is useful when a physical or printed voucher is provided without a QR code.
- **Use Camera**: The "Use camera" button allows users to scan a QR code for instant redemption. When selected, the app will prompt for camera permissions if not already granted, then open the camera for scanning.
- **Continue Button**: Once the code is entered or the QR is scanned, users tap **Continue** to proceed. If the voucher is valid, the app will apply the associated balance, ticket, or item to the user’s profile.

**Note**: Vouchers can include various benefits, such as wallet credit, specific event tickets, or discounts. This feature can be customized in Adminx to support different voucher types, providing flexibility for organizers to design unique promotional strategies.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/06ce50d7-b879-44fa-ac34-78a87615065e/image.png)

### 🟧Switch Currencies

If your wallet contains multiple currencies (top-uppable), you can click the small arrow on the top right next to the currency name to select a different currency, or swipe left and right through the different wallets to navigate between them.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/5ca6bf3d-789f-4b32-838a-f30e1ad59750/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/6b96dd4d-980c-4439-adf2-170d0242fb67/image.png)

### 🟧Manage Wallet

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/7fedae3c-a807-4fcd-8d94-bd93cb488052/image.png)

This button on the Home screen allows users to manage their wallet settings.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/6e5f5db7-bbb1-4d32-8631-209bc8abf2b2/image.png)

The **Wallet** feature within Clientx serves as a powerful tool to attract, engage, and retain users while offering them seamless and transparent spending options. A digital wallet simplifies the event experience, allowing attendees to top up, manage funds, and make cashless transactions, creating a streamlined, frictionless flow that enhances both convenience and engagement.

### 🟧Key Benefits of a Digital Wallet

- **Effortless Top-Ups and Management**: Users can easily add funds to their Wallet pre-event, during the event, or even post-event via the refund process. With multiple currencies and top-up packages configured by organizers, attendees have flexibility and control over their event spending, making it easy for them to stay engaged and ready to participate.
- **Real-Time Transaction Tracking**: The Wallet provides instant access to transaction history, allowing users to view, track, and manage all their event-related purchases in one place. Each transaction offers detailed insights, and by tapping into individual entries, attendees can access receipts with VAT breakdowns—perfect for expense tracking or accounting. This transparency reduces the need for manual invoicing, saving time and minimizing overhead for both users and organizers.
- **Enhanced Transparency and Trust**: By providing a clear, accessible record of all spending, the Wallet builds trust with attendees. VAT receipts are readily available, ensuring that users don’t need to request additional documentation. This transparency supports a positive experience and reinforces your event’s commitment to a seamless, user-friendly ecosystem.
- **Data-Driven Engagement**: A digital wallet is more than just a payment tool; it’s a strategic gateway to user engagement. Since the Wallet fulfills a core attendee need (spending ability), it naturally encourages users to sign up and participate. Once attendees activate or use the Wallet, they become part of your community, opening up opportunities for further engagement, loyalty programs, and targeted communications. You can leverage this connection to deepen loyalty and incentivize repeat attendance.
- **Flexible Timing for User Conversion**: The Wallet offers multiple touchpoints for user conversion, allowing you to bring users into your ecosystem at any stage. Users might initially join pre-event to top up funds, during the event to make cashless payments, or even post-event to request a refund. Each of these entry points provides a seamless pathway to registration, encouraging users to create an account and continue engaging with your brand.

The Wallet transforms event payments into a rich opportunity for engagement, combining ease of use with powerful transparency and insights. By converting payments into a digital, data-driven experience, you turn a simple transaction into an ongoing relationship with your community.

### 🟧Transactions

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/b6cd2ac5-be23-490a-9f8c-bc2d88667655/image.png)

Clicking the ‘History’ button opens a page displaying all transactions for the user. Clicking on a specific transaction reveals its details. The tenant’s VAT information (configured in Accountancy Settings in Adminx) appears on each receipt. Note that VAT is not applied to top-ups, as VAT is only added when the funds are spent on actual products. Receipts for spending show VAT details and breakdowns, which can be downloaded or screenshotted for accounting purposes, similar to a restaurant receipt. If the user has enabled ‘Invoicing’ and entered Company Details, this information will also be included on all receipts.

### 🟧Refunds

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/59afe588-5bac-442c-acf6-dbf755505acb/image.png)

Clicking this button allows users to manage their refund requests.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/df336d9b-5a80-4b94-8df3-8552f8796779/image.png)

The **Refunds** screen allows users to request refunds for any unused balance in their Wallet through a simple, self-service option. This screen is designed to be flexible, with multiple settings customizable in **Adminx > Settings > App** to align with the organizer's policies and preferences.

- **Refund Banner**: At the top, a configurable Refund Banner displays any applicable processing fees for handling requests (e.g., €0.50). Organizers can edit this message in Adminx to keep users informed about refund charges.
- **Request Refund Button**: The central **Request refund** button is the main action users select to initiate a refund. The system then checks the user’s eligibility for a refund based on criteria set in Adminx, such as refundable currencies, age of top-ups, package-specific rules, and online vs. manual top-up eligibility.
- **Refund Processing Time Notice**: Below the request button, a message indicates the expected processing time for refunds (e.g., up to 14 days). This period is determined by the **Refund Processing Days** setting in Adminx, allowing the organizer to define the timeline based on their operational needs.
- **Refund Requests Overview**: At the bottom, users can track the status of their refund requests in real time. Each entry shows:
    - **Status Indicator**: Color-coded status updates (e.g., pending, approved, refunded, declined, or canceled).
    - **Amount**: The requested or refunded amount in the local currency.
    - **Timestamp**: The date and time of the refund request for easy tracking.

All refund settings and processing controls are managed by the Refund Manager in Adminx, ensuring an efficient, transparent, and user-friendly refund experience that minimizes manual intervention and enhances attendee satisfaction.

Clicking the **“Request Refund Button”** will open the “Request Refund” page

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/b0e84d5e-9f6b-4346-ad6a-3e1956b5d748/image.png)

### 🟧Request Refund

The **Request Refund** screen enables users to initiate a refund for eligible balances in their Wallet, with transparent details about what is refundable and what is not. The screen is structured to guide users through the refund process, while providing event organizers control over refund configurations in **Adminx**.

- **Refund Amount Field**: Users enter the desired refund amount here, up to the maximum eligible balance. This field dynamically reflects what can be refunded based on the eligibility settings defined in Adminx.
- **Refund Description**: Positioned below the title, this brief description offers users guidance on the refund request process.
- **Info Panel**: This panel breaks down the Wallet balance to clarify refundable and non-refundable amounts:
    - **Current Balance**: The total balance in the user’s Wallet, including both refundable and non-refundable funds.
    - **Not Refundable**: Shows the non-refundable portion, broken down by categories such as:
        - **Vouchers**: Non-refundable by default unless the entire currency is set to be refundable in full in **Adminx > Settings > Currencies**.
        - **Discounted Top-Ups**: Promotional or discounted top-ups that may be marked as non-refundable based on Adminx settings.
        - **Warranty Product Returns**: Any credits provided for warranty products (like eco cups).
    - **Amount Refunded**: Amount to be requested as refund
    - **Refund Fee (Incl VAT)**: The handling fee for refund requests, configurable by organizers in **Adminx > Settings > App.**
- **Refund Received**: This summary, at the bottom, calculates the net amount the user will receive after the refund fee deduction, providing full transparency.
- **Continue Button**: Tapping **Continue** submits the refund request according to the configured eligibility rules in Adminx.

### 🟧Adminx Configurability

Event organizers have comprehensive control over refund eligibility and criteria, customizable in **Adminx** to suit the financial policies and objectives of the event:

- **Currency Refundability**: Set in **Adminx > Settings > Currencies**, organizers can designate each currency as fully refundable, partially refundable, or non-refundable.
- **Packages and Staffx Top-Ups**: Eligibility for specific package refunds and Staffx-based top-ups can be configured in **Adminx > Settings > App**.
- **Vouchers and Promotions**: By default, vouchers are non-refundable; however, setting full currency refundability in Adminx can extend refund eligibility to associated vouchers.

This **Request Refund** screen empowers users by clearly detailing their refund options, while Adminx settings offer organizers flexibility to tailor refund rules, balancing transparency for users with operational efficiency for event management.

## 🍹Self Order

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/20030ae8-8366-41e0-9b01-f47732fcda4d/image.png)

If **Self-Order** is activated in AdminX and configured within the Sales Catalogue, a **Self-Order** button will appear on the home screen. This feature enables users to place orders directly from their devices.

- **Accessing Self-Order**:
    
    Depending on the AdminX configuration, users may need to:
    
    - Manually select their location from a list.
    - Scan a QR code assigned to a specific spot or table.
    
    This configuration (spot selection or QR validation) is managed in AdminX under Sales Catalogue settings. Once the location is validated, the correct menu or sales catalogue linked to that spot becomes available, allowing users to browse and order items.
    
- **Order Processing**:
    
    Once an order is placed, a ticket is printed at the designated location via the PrintX server. This ticket alerts staff to prepare the order for either **pickup** or **delivery** to the user.
    

> Note: Self-Order currently offers flexibility for orders with or without payment, depending on the event's configuration.
> 

---

⚠️ Availability Notice

This functionality is partially available in V2 and is under active development for further improvements.

## 🔗Share Wallet

The **Share Wallet** feature allows users to share their wallet balance with others, making it easy for friends or family to add funds or contribute to a shared event experience.

### How to Enable Share Wallet

1. **Activate in AdminX**:
    - Navigate to **AdminX > Settings > App**.
    - Toggle on **Activate share wallet top-up in ClientX**.
    - Once enabled, the **Share Wallet** button will appear on the ClientX home screen, allowing users to access the feature.
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/0af55a0e-cd20-4910-8bd3-ef4a9ef48f31/image.png)
    

---

### How It Works

1. **Activate Sharing**:
    - From the home screen, users can tap the **Share Wallet** button. This opens the phone's native sharing options, allowing them to share a unique link via text, email, WhatsApp, or other supported platforms.
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/1ae9bc1a-0701-4a2e-8d75-40bf90ef6c20/image.png)
        
2. **Guest View & Top-Up**:
    - When someone opens the shared link, they see a **Guest View** of the wallet, available in both web and native app formats. This view allows others to top up the wallet but does not grant payment permissions.
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/5a527d91-a3b1-4aff-9c8e-b9d23acfed13/image.png)
        
3. **Payment Access**:
    - Only the primary wallet holder can make payments with the wallet via a **Payment QR code**. However, if the wallet is linked to an RFID, all connected RFIDs can be used to make payments at StaffX POS devices.
4. **Customizable Text**:
    - The text displayed under the wallet balance (e.g., currency or special instructions) can be configured in AdminX under **currency settings**. This customization allows for tailored messaging to fit the event's needs or audience.

---

### 🎟 Use Cases

- **Group Pots**: Friends attending an event together can create a shared "group pot" by topping up one user’s wallet via the shared link. This simplifies expenses and ensures everyone can contribute to the group’s spending fund without managing multiple wallets.
- **Parental Support**: For family events or festivals where children may have limited spending control, parents can monitor and top up a child’s wallet remotely, giving them access to funds while maintaining control over spending.
- **Event Sponsorships**: Sponsors or partners can use the shared wallet link to quickly add funds to a guest’s wallet, facilitating sponsored experiences or promotions.

---

### 💡 Tips & Tricks

- **Security with RFID Linking**: When wallets are linked to RFIDs, attendees can make payments at StaffX POS devices with any of the linked RFIDs. This is ideal for families or friend groups who want shared payment access, but be mindful of security if sharing among large groups.
- **Effective Messaging**: Customize the text below the wallet balance in AdminX to guide users effectively. For example, "Top up to enjoy faster service!" or "Add funds to unlock exclusive offers!" This messaging can improve engagement and clarify how to use the feature.
- **Encourage Early Top-Ups**: Promote the use of Share Wallet before the event to encourage attendees to add funds in advance. This reduces onsite top-up congestion and creates a smoother event experience.
- **Limit Payment Access**: For users who only want others to add funds but not spend them, remind them that they control access to payment permissions. Only the primary user or RFID-linked users can make purchases.

## 🎟️Tickets

If a user has tickets, a **Tickets** button will appear in the top right corner of the home screen above the wallet. This button displays the total number of tickets the user holds, and tapping on it directs them to the **Events** section under the **My Tickets** tab. Here, users can view all events for which they hold tickets.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/c4882bb1-97d8-4c3b-bbd8-1a8dfb5e60db/image.png)

### How It Works

1. **Ticket Access**:
    - When users tap the **Tickets** button, they are directed to the **My Tickets** tab, where each ticketed event is displayed in a list format.
        
        ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/6f7cccf2-90be-472d-990b-ca5d87786240/image.png)
        
    - Users can see the event details, including the event name, date, location, and the number of tickets they hold for each event.
2. **Account Requirements**:
    - For tickets to be visible in **My Tickets**, users must be logged in with the same account associated with the email to which tickets were assigned.
    - If a user cannot find their tickets, they might be logged in with a different account, or the ticket may have been assigned to an alternate email (such as through a friend or due to a typo during purchase).

---

### 🎟 Use Cases

- **Event Access Verification**: Users can quickly verify their tickets for upcoming events and display them at entry for a seamless check-in experience. Having tickets readily accessible in the app reduces entry delays and ensures all necessary event information is easily available.
- **Community Onboarding and Engagement**:
    - **Integrated Benefits**: When users have their tickets integrated within the app, it serves as a seamless gateway into the event’s community. By encouraging attendees to view their tickets in the app, organizers can introduce them to features like exclusive offers, in-app top-ups, event maps, and real-time updates.
    - **Incentives to Use the App**: Offering special benefits to users who access their tickets via the app significantly drives engagement. For example, attendees with app-based tickets could enjoy benefits such as:
        - **Cheaper Drinks or Top-Up Discounts**: Exclusive in-app discounts incentivize attendees to start using the app early, encouraging them to top up and explore other features.
        - **Special Packages**: Access to unique in-app-only packages (like VIP lounges or early bird access) creates added value for app users.
        - **Fastlane Entry**: Fastlane access for app-based ticket holders promotes convenience and faster entry, enhancing the overall attendee experience.
        - **In-App Top-Up**: With in-app tickets, attendees can top up funds directly in the app or have a voucher attached to it, eliminating the need to stand in line at physical top-up stations. This convenience improves the user experience and reduces congestion at top-up points.
    - **Effective Communication**: Since attendees generally rely on their tickets for entry, providing digital tickets in the app ensures they engage with all ticket-related updates and reminders. This makes ticketing an effective tool to onboard users into the app, where they can access exclusive event content and benefits.
- **Segmented In-App Ticketing Options**:
    - **Public Ticketing Partner Links**: For broader audience reach, public ticketing links can be shared across social media platforms like Facebook and Instagram, driving general ticket sales.
    - **In-App Exclusive Tickets**: By offering exclusive, segmented tickets within the app, organizers can provide unique options that aren’t available to the general public. These might include discounted rates, VIP packages, or member-only offers.
    - **Targeted Promotion**: In-app ticket segmentation allows organizers to tailor ticket offers based on attendee types, loyalty levels, or previous purchase behavior. For example, repeat attendees could receive special discounts or perks, while new users might get an introductory offer. This segmented approach not only increases ticket sales but also strengthens attendee loyalty and engagement.

---

### 💡 Tips & Troubleshooting

- **Ensure Account Consistency**: Remind users to log in with the same email account they used during ticket purchase to avoid visibility issues in the **My Tickets** tab.
- **Double-Check Email Entries**: During ticket purchase, encourage users to verify their email address to prevent tickets from being assigned to an unintended email.
- **Alternate Accounts**: If users don’t see their tickets, suggest they check alternate accounts or emails they might have used during purchase or ask friends if they were supposed to receive the tickets.

- **View Details**: Tapping on an individual ticket entry provides further event details, helping users stay informed about event timings, location, and other critical information.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/087fef43-d5fa-46c1-b896-0daae38a84cf/image.png)

- **Ticket(s)**: Opens the tickets and allows the user to add the event to their calendar.
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/34eff19d-1c53-4870-9e93-cc1d682a66b4/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/4a466a05-220f-4589-947b-e986d37c0408/image.png)
    
- **QR Code**: Users can enlarge or reduce the QR code size for easier scanning, especially useful at fixed access control gates so it can be adjusted to fit the reader.
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/04f4aa5e-5ab2-438e-8430-64170db21941/image.png)
    
- **Edit Ticket**: If enabled in Adminx event settings, an “Edit Ticket” button will appear. Clicking on this allows the user to update the ticket holder’s name and email. The new recipient will then receive an email with the message “Your friend sent you a ticket.” This ticket can be downloaded from the email and will be visible in the recipient’s profile.
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/48cc404f-e093-4cbc-b703-e17676dfbbdb/image.png)
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/ae42f6c9-454f-4e39-a55e-7a540e8b33ce/image.png)
    
- **Download**: Users can download the ticket via the “Download” button at the bottom.
    
    ![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/48d3fd39-ced2-44b5-8f78-2ad28a572ce5/image.png)
    

### Buy Tickets / Ticket Selection

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/82f25769-03ba-4ac2-adf8-e5a0ad41f821/image.png)

Clicking the **"Buy Tickets"** or **"Buy More"** button opens the **Buy Tickets** screen. This interface can also display **"Register"** if only free ticket type(s) are configured for the event. If an **External Link** is configured, this button will redirect users to the specified external ticketing site, as set in **Adminx > Manage > Events**. The ticket types shown here can include both anyKrowd ticket types (like in this example) and external tickets managed through integrated partners like SeeTickets or Eventix.

**Ticket Types** may include:

- **Members-Only Invitations**: Visible only to profiles tagged with a specific system tag (e.g., #member), as configured in **Adminx > Settings > Tags**. This invitation type can also be limited to a specific quantity per user.
- **Public Tickets**: Available to guests or any users, with or without a profile, depending on the access configuration.

In the HTML content post, a **"Buy Tickets"** button may still link to the public ticket shop of the integrated partner. Clicking this link directs users to the partner's site for purchase.

To close the **Buy Tickets** screen and return to the event detail page, users can click the **“X”** icon at the top of the screen.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/fc210b76-9fc2-46b3-a6b9-ff55d20380e6/image.png)

### Ticket Details / Checkout

Once tickets are added to the cart, users proceed to the **Ticket Details / Checkout** screen. Here, users can complete the required personalization details for each ticket, ensuring each ticket is linked to the correct attendee.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/528e9bff-4329-403f-8a63-914fc6387b18/image.png)

**Personalization and Checkout Process**

- **Ticket Holder Details**: Clicking **"Add Members"** or **"Continue"** directs users to the personalization section, where they fill out the details of each ticket holder. This personalization is currently a mandatory step, ensuring each ticket is accurately assigned.
- **Fast-Checkout (Upcoming Feature)**: A fast-checkout option, which would allow users to purchase multiple tickets by only entering the primary buyer’s details, is on the development backlog. This feature would streamline checkout for users accessing tickets via **guest mode** or **public mode**.

Finally, users can review the **Checkout** button at the bottom to complete the purchase once all required information is filled out.

### Checkout Options

The **Checkout** screens provide users with flexible options to complete their ticket purchase, depending on their Wallet balance and the type of ticket they’re acquiring.

---

Left Screen: Wallet Checkout

In the leftmost screen, users have sufficient funds in their Wallet to cover the ticket cost, allowing for a quick checkout. The **Pay Now** button confirms the purchase instantly using the available balance. If the ticket is free, a future update will replace "Pay Now" with **Register Now** for a smoother user experience. This adjustment is currently planned on the development backlog.

---

Middle Screen: Top-Up & Pay

The middle screen illustrates a scenario where the user's Wallet balance is insufficient to cover the ticket cost. In this case, the **Top-Up & Pay** button is displayed, redirecting the user to the payment gateway to add the necessary funds and complete the purchase in a single step.

---

Right Screen: Viva Payment Gateway

Upon selecting **Top-Up & Pay**, users are directed to the payment gateway, shown here with **Viva Wallet**. The payment screen provides various payment methods configured in **AdminX > Settings > App** and on the Viva platform. The options are also influenced by the user's device (e.g., Google Pay or Apple Pay availability) and regional payment preferences.

In this example, **Bancontact** (a popular Belgian payment method) is available. Users can choose to:

1. **Open the Bancontact app** directly from their bank on their device.
2. **Scan the QR code** with another device or app that supports Bancontact, facilitating payment through their preferred method.

Additional options may include Visa, Mastercard, and other region-specific methods, depending on configurations in AdminX and Viva. For more specific configurations or options, users should consult their anyKrowd Project Manager or their Viva Account Manager to ensure payment methods align with user and event needs.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/76b811fd-27e5-4872-8f21-f7872540770b/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/a7460a5d-8622-42e3-8f1b-ad5feb1c1209/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/a2a4e6bc-6fc7-4b74-a7c3-e37c0c35030f/image.png)

## ❌Bookings

> Currently unavailable in Version 2. This feature is under development for future releases.
> 

---

### 🎟 Potential Use Cases

- **VIP Table Reservations**: Allow attendees to book VIP tables or reserved seating areas directly through the app. This provides a streamlined experience for VIP guests, allowing them to secure premium seating ahead of time and enhancing the exclusivity of their event experience.
- **Activity and Workshop Registration**: For events with scheduled activities or workshops, the Bookings feature could be used to manage attendee registrations. This ensures that popular activities don’t get overcrowded and allows organizers to maintain an optimal experience for all attendees.
- **On-Site Services**: Enable attendees to book on-site services such as personal lockers, phone charging stations, or even exclusive meet-and-greets with performers. This can enhance the attendee experience by providing added convenience and special access.
- **Transportation and Accommodation**: For larger, multi-day events, allow attendees to book transportation options or accommodation directly through the app. Partnering with local hotels or transportation services could offer attendees a one-stop solution for all their event-related bookings.
- **Waiting List Management**: For high-demand bookings, enable a waiting list option. If a reserved spot becomes available (due to cancellations or no-shows), the system can automatically notify users on the waiting list to RSVP, or allow organizers to select someone manually, based on the event's policy. This is especially useful for managing premium experiences or bookings within the hospitality industry, such as resort or hotel amenities.

---

### 💡 Future Tips & Best Practices

- **Early Access and Upselling**: For VIPs or loyal customers, offer early access to bookings, allowing them to secure reservations before general availability. Additionally, use upselling tactics within the booking process, such as suggesting premium packages or add-ons (e.g., champagne service with VIP tables).
- **Automated Confirmation and Reminders**: Set up automated confirmations and reminders for all bookings. This reduces the risk of no-shows and provides attendees with timely reminders, improving their event experience and reducing operational challenges on-site.
- **Flexible Cancellations and Modifications**: Implement a clear cancellation and modification policy that attendees can manage directly through the app. Flexibility in booking changes can improve customer satisfaction and reduce the workload for event staff.
- **Capacity Management**: Use bookings to effectively manage capacity for different event areas. By limiting and tracking the number of bookings, organizers can ensure that spaces like VIP areas, workshops, or special experiences don’t become overcrowded.
- **Efficient Waitlist Utilization**: When a spot becomes available, the waitlist feature can automatically trigger notifications to users in the queue, offering them a limited time to confirm. Alternatively, organizers can manually select attendees based on predefined criteria, ensuring the waitlist is managed according to event policies. This is particularly valuable in high-demand settings, such as exclusive workshops, VIP lounges, or resort services.

## 🎉Events

The **Events** tab, accessible from the bottom navigation bar, provides users with a centralized view of all available events. Users can toggle between two tabs: **All Events** and **My Tickets**.

### Navigation Options

- **View Details**: Clicking **View Details** on any event displays the detailed event page, where users can see event-specific information, including timing, location, lineup, and additional content (e.g., artist profiles, schedule).
- **Buy Ticket**: If tickets are available for purchase, a **Buy Ticket** button will appear at the bottom of the event page. This button may link to:
    - An external ticketing provider (if integrated).
    - An in-app ticket purchasing option through AnyKrowd.
    
    > Note: If the user already owns tickets for the event, an additional Tickets button will appear, providing direct access to their ticket(s).
    > 

---

### 🎟 Use Cases

- **Exploring Event Details**: Users can browse through all upcoming events in **All Events**, providing a convenient way to explore event options, read descriptions, check the lineup, and review ticket options. This overview helps attendees plan ahead and builds excitement by providing a sneak peek into what each event offers.
- **Ticket Purchasing and Quick Access**: The in-app **Buy Ticket** button allows for seamless ticket purchasing within AnyKrowd, improving user convenience. Once tickets are bought, they’re directly accessible under **My Tickets**, simplifying check-in on event day.
- **In-App Ticket Exclusives**: By offering exclusive tickets or segmented ticket options in the app, organizers can promote special perks or discounted tickets that aren’t available through external ticketing partners. This could include early bird specials, VIP packages, or loyalty discounts only accessible to app users.

---

### 💡 Tips & Tricks

- **Promote In-App Engagement**: Encourage users to check event details in the app by offering app-exclusive content, such as artist previews, schedules, or special in-app-only promotions. This drives more traffic to the app, providing users with a richer experience while familiarizing them with the platform.
- **Use “My Tickets” for Fast Check-In**: Having tickets readily available under **My Tickets** in the app enables users to access their tickets quickly, facilitating faster check-ins and reducing queues. This is especially beneficial for high-attendance events where streamlined entry is essential.
- **Segmentation for In-App Tickets**: If using an external ticketing partner for broad sales, consider offering in-app ticketing for segmented audiences (e.g., VIP access, discounted group rates). This not only promotes app engagement but also allows targeted offers for loyal users or community members. Additionally, sharing public ticketing links on social media (like Facebook or Instagram) directs general sales traffic, while in-app segmentation drives community-focused sales.
- **Highlight Benefits for App-Based Tickets**: Reinforce the advantages of purchasing and viewing tickets in the app, such as potential discounts, fastlane access, exclusive event updates, or in-app-only experiences. Messaging around these benefits (e.g., “Enjoy faster check-in and exclusive offers by using the app!”) can increase app downloads and active usage.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/2cd5d2d9-57d8-4c20-b028-1682d9b325b3/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/0c9bf3a1-3f06-4b4b-b715-8af274a53a8b/image.png)

## 🛒Shop

The **Shop** is the public (web) storefront for the tenant, configurable via AdminX under **Shop**. This section allows event organizers to display and sell products or merchandise directly to attendees. Categories are displayed for easy navigation, and users can click on any category to view available products within that selection.

### Key Features

- **Product Details**:
    - Clicking on a product displays detailed information about the item, including description, price, and any available options (e.g., sizes, colors).
    - Users can add products to their cart directly from this view, making it easy to build a personalized shopping list.
- **Shopping Cart**:
    - Accessible via the cart icon in the top right corner, the **Shopping Cart** provides an overview of all selected products. It includes a **Checkout** button at the bottom, allowing users to complete their purchase when ready.

> Note: This feature is currently not fully operational in Version 2 and is under development for future releases.
> 

## ❌Quiz / Surveys

> Currently unavailable in Version 2. This feature is under development for future releases.
> 

---

### 🎟 Potential Use Cases

- **Attendee Feedback**: Use surveys to collect feedback on various aspects of the event, such as event satisfaction, venue facilities, and staff interactions. Gathering insights from attendees can help organizers improve future events and enhance overall attendee experience.
- **Engagement Through Quizzes**: Offer interactive quizzes to engage attendees, educate them on event details, or promote brand partnerships. For example, a quiz about the event’s history or trivia about performing artists can create fun engagement opportunities.
- **Post-Event Surveys**: After the event, post-event surveys can be sent to attendees for feedback on their experience. These surveys could include questions on event satisfaction, areas of improvement, and likelihood of attending future events.
- **Sponsor and Partner Insights**: Quizzes and surveys provide an excellent platform for sponsors and partners to gain insights into audience preferences. Sponsors can leverage surveys to understand their target demographics better, or quizzes can be used to promote sponsor-related trivia and increase brand awareness.

## 🗺️Maps

The **Maps** section in the app offers an interactive, zoomable map experience that provides users with important venue details. Configurable via **Adminx > Maps**, this feature allows organizers to upload custom maps or use Google Maps, making it highly adaptable to various event setups.

Organizers can add **interactive, clickable markers** that provide specific information about selected locations, guiding users to points of interest, entrances, parking areas, and more. These markers enhance navigation within the venue and can be tailored to showcase important information relevant to each event.

For example, in this scenario with **Asgaard**, a youth home and event venue, the map highlights:

- **Main Entrance**: Denoted by a marker, it directs users to the main access point, including details on nearby artist-only parking and visitor guidance.
- **Public Parking**: Another marker designates the public parking area, with additional information on facilities such as charging points and motorhome parking.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/16e06046-0b98-45b9-800b-0e312cd87ecf/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/5368f74d-54ca-42f5-9eb4-392550674c1d/image.png)

Additionally, customized maps, such as venue-specific layouts or festival grounds, can be uploaded to replace or supplement Google Maps. These custom maps give a branded experience, providing an opportunity for event organizers to creatively represent their layout and improve attendee navigation.

This flexible mapping feature not only improves the user experience but also supports efficient venue management, allowing attendees to move through the event space more seamlessly.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/7edc3083-2924-43e3-95d9-60193c8f5011/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/fc976b9e-cc14-49f8-a91a-df617cfccb04/image.png)

## ⌛Timetables

The **Timetables** section provides an overview of all schedules configured for the tenant, including tracks (stages) and activities (artists). This feature helps attendees plan their event experience by offering detailed information on performances, stages, and timings.

### Key Features

- **Overview View**: Users can view the entire event schedule segmented by day and stage. Each stage is organized with time slots showing the artist or activity performing during that time.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/6212faa0-c3c2-4d8c-b542-175f97e05c80/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/d7d5c9c8-9092-4ca0-95bf-913fc599cd16/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/d8ed3eaa-b8a8-4b84-b4e4-6567302408bd/image.png)

- **Detailed View**:
    - Clicking on an activity opens a detailed profile for the artist or performance, providing biographical information, genre, and embedded multimedia (such as SoundCloud or Spotify) to let attendees preview the artist’s work.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/2cf6d7f0-51fe-4877-adc1-6f0430fed291/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/1a50be94-2d65-4c2f-8304-cf49c4c20912/image.png)

- **Favorite Feature**:
    - Users can mark activities as favorites by tapping the heart icon next to each activity. Favorited activities are highlighted within the timetable.

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/32b1d5e2-17f9-4c36-ba02-9ef24104a897/image.png)

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/25e4c768-1cbb-4924-bbb0-dfc005640c3f/image.png)

- **Favorites View**: A filter option allows users to view a timetable of only their favorited activities. *(This functionality is under further development for V2.)*

### 🎟 Use Cases

- **Personalized Event Planning**: Attendees can curate their event experience by marking favorite performances and filtering the timetable to show only these selections. This makes it easier for them to organize their day and prioritize performances or activities of interest.
- **Pre-Event Hype and Engagement**: The detailed artist profiles, complete with bios and embedded media, allow users to explore artists beforehand, creating excitement for the event. This feature is especially valuable for events with lesser-known acts, as it encourages attendees to discover new music or performances.
- **Supporting Multiple Stages**: For multi-stage events, the Timetables section allows attendees to quickly switch between stages and view what’s happening across the venue. This is particularly beneficial for festivals or conferences where multiple sessions occur simultaneously.
- **Building Connections Through Multimedia**: By providing previews through embedded SoundCloud or Spotify links, attendees can engage with artists in advance. This builds a deeper connection with performers and creates a more immersive experience, especially when the artist’s music or background resonates with the attendee.

---

### 💡 Tips & Tricks

- **Encourage Early Engagement**: Promote the timetable in advance to encourage attendees to explore the lineup, favorite artists, and plan their schedule. For example, send push notifications prompting users to start exploring the schedule and building their itinerary.
- **Optimize Detailed View with Multimedia**: Add artist profiles that go beyond simple biographies. Include multimedia like music previews or video links to engage users and encourage them to add new artists to their favorites list.
- **Utilize the Favorites View**: Encourage attendees to use the **Favorites View** to simplify navigation on event day. By filtering the schedule to show only their favorited activities, users can focus on their chosen experiences without getting overwhelmed by the full lineup.
- **Highlight Special Performances**: Use color-coding or visual tags to highlight unique or limited-time performances (such as headliners or special guests) on the timetable. This draws attention to key acts and helps guide attendees towards must-see performances.
- **Event-Based Recommendations**: Depending on user behavior, consider displaying recommendations for similar artists or events. If a user favors electronic music, for instance, suggest other artists in that genre or related stages to enhance their experience.

## ❌Friends

> Currently unavailable in Version 2. This feature was partly present in V1 but needs improvements in future releases before it will be used.
> 

---

### Overview

The **Friends** feature allows users to build connections within the app, creating a more social and collaborative event experience. When this feature is fully developed, users will be able to add friends, interact with them, and plan event activities together.

### Key Features (Under Development)

- **Friend Connections Through Ticket Purchases**: Users who purchase tickets for each other will automatically become friends in the app, making it easier to invite each other to future events, activities, or bookings.
- **Easy Friend Adding**: Users can add friends by scanning each other's personal QR code, simplifying the connection process at events.
- **Shared Event Planning**:
    - **Invite Friends to Events and Registrations**: Easily invite friends to ticket sales or activity registrations.
    - **Group Bookings**: Reserve tables, subscribe to guest lists, and coordinate activities together within a group.
    - **Visibility of Friend Activities**: View events or activities friends plan to attend, fostering a shared experience.
- **Social Features**:
    - **Chat and Group Chat**: Engage in one-on-one chats or create group chats to coordinate plans and stay connected.
    - **Wallet Sharing**: Share wallet funds or top-ups with friends, enhancing convenience for group spending.
- **Future Enhancement – “Find My Friends” in AR**: With the planned AR Layer, users will be able to locate friends at events, festivals, or venues using the **Find My Friends** feature, making it easier to meet up within large crowds.

# 🧿🧿🧿Adminx 
(the naming of our Backend platform)

# 🧿 Report

## 📊 Dashboard

The **Dashboard** provides a comprehensive overview of platform performance, covering key areas such as top-ups, sales, and cash flow. Each section can be customized using timestamp filters, allowing admins to view data for specific time frames.

---

### ⏳ Timestamp Filters

The timestamp filters allow you to adjust the date range for the data displayed in the dashboard. Options include:

- **Last 24h | Last 7 days | Last 30 days | Last 90 days | Last 365 days | ALL**

Selecting a filter will update the data in the purple boxes on the dashboard, recalculating and refreshing the displayed metrics based on the chosen timeframe.

---

### 💳 Wallet Top-Ups

This section provides an overview of all successful top-ups processed on the platform. Each top-up adds funds to a wallet (usable via the App or RFID). Top-up categories include:

- **Online Topups**: Top-ups done via ClientX (web/app) by a user.
- **Card Topups**: On-site top-ups done via a StaffX POS with a Card present.
- **Cash Topups**: On-site top-ups done via a StaffX POS in cash.
- **Vouchers Topups**: Top-ups done through Vouchers.
- **Tickets Topups**: Top-ups done via Tickets (ticket types with wallet balance).
- **External Topups**: Top-ups processed via an external partner like Eventication or In2Event.
- **AdminX Topups**: Manual or imported top-ups done directly in AdminX.

> Total amount topped up: Displays the total of all top-ups processed.
> 

---

### 🛒 Sales

This section offers a summary of all successful sales transactions on the platform, detailing different payment methods and overall spend.

- **Wallets Transactions**: Sales orders paid using a wallet (APP or RFID).
- **Cards Transactions**: Sales orders paid with a Card (onsite).
- **Cash Transactions**: Sales orders paid in cash.
- **Total Spendings**: Sum of all sales orders done.
- **Credited Sales**: Transactions refunded due to warranty products (e.g., ECO returns).
- **Sales Result**: Calculated as **Total Spendings minus Credited Sales**.

---

### 💵 Cashflows

The **Cashflows** section provides a summary of all cash flows on hand, segmented by payment method. This includes totals from top-ups and sales orders across each payment category.

- **Online amount**: Total via ClientX (web/app) (top-ups + self-orders).
- **Card amount**: Total via cards on StaffX (top-ups + sales orders).
- **Cash amount**: Total via cash on StaffX (top-ups + sales orders).

### 💸 Refunds

A summary of all processed refunds, categorized by the method of processing:

- **Online Refunds**: Processed via ClientX (web/app).
- **Manual Refunds**: Processed via StaffX/AdminX.

> Total amount refunded: Sum of Online Refunds and Manual Refunds.
> 

---

### 💰 Total Amount Left on Wallets

This represents the remaining balance on all wallets across the platform, which is unspent.

- **Wallets linked to users**: Wallets associated with a user account.
- **Guest wallets**: Wallets without a user account (guest RFID).

> Note: This metric is unaffected by timestamp filters, providing a real-time snapshot of wallet balances.
> 

---

### 📅 Upcoming Events

A chronological list of upcoming events, displaying essential details like **Timestamp** and **Expected Guest Count** for each event.

---

### 📆 Last Events

Quickly access key performance metrics for the most recent events, including **Ticket Sales** and **Cashless Transactions** summaries, for an overview of financial and attendance results.

---

### 📈 New Users per Month (Last Year)

A graphical representation showing the number of new users onboarded to the platform each month over the past year, providing insight into user growth trends.

---

### 🚫 Turnover

> Note: This metric is deprecated and should not be used. Please refer to Report → Finance for accurate turnover data.
> 

# 📑 Activity Log

The **Activity Log** provides a comprehensive, chronological record of all activities performed on the platform by staff or admin users, allowing for transparent tracking of user actions and platform events.

---

### 📜 Exhaustive View

This section displays an exhaustive overview of all activity on the platform. Every action taken by a (staff) user is logged here in chronological order, offering a detailed audit trail.

---

### 🔍 Filters

The **Activity Log** includes filter options to help narrow down specific activities or users:

- **Username/Email Filter**: Use the **"Pick a value"** bar to select a username or email address. This will filter the activity log to display actions by that specific user only.
- **Activity Type Filter**: Use the **"Type"** bar to filter by the type of activity, showing only actions related to a specific activity category.

---

# 💰 Transaction Log

The **Transaction Log** provides an exhaustive overview of all financial transactions on the platform, including payments, refunds, and top-ups, allowing admins to monitor financial activities in detail.

---

### 📜 Exhaustive View

This section displays a comprehensive list of all transactions:

- **Status "Paid"**: Indicates a transaction was successful.
- **Status "Created"**: Indicates the transaction was initiated but never completed by the user.

---

### 🔍 Filters

Use the following filters to refine transaction searches:

- **Transaction Number or ID**: Search for a specific transaction using its unique number or ID. *(Note: This feature is currently unavailable in V2.)*
- **Transaction Type Filter**: Filter by specific transaction types to display only relevant transaction categories.

# 💳 Top Ups

The **Top Ups** section provides an overview of all top-up transactions, categorized by their status. This section allows admins to monitor and manage top-up activities effectively.

---

### 🔄 Open

A list of all **Open** top-ups. These are top-ups that have been initiated by the user but not yet completed.

---

### 💸 Refunded

An overview of all **Refunded** top-ups. These are transactions refunded directly via AdminX with Viva Wallet.

---

### ✅ Paid

An overview of all **Paid** top-ups.

- If the **Status** is marked as **successful**, the top-up was processed correctly via Viva.
- In cases of unsuccessful processing, options to **Refund** or **Top Up** will appear:
    - **Refund**: Returns the transaction to the original card via Viva.
    - **Top Up**: Adds the intended amount to the user's RFID tag(s) or wallet (app user).

# 🖨️ Printx Log

The **Printx Log** provides a chronological overview of all orders that have been printed or are pending printing. This section helps admins track and manage the print status of orders effectively.

---

### 📜 Exhaustive View

A comprehensive list of all orders that are or should have been printed.

- If an order has not been printed, there will be **no timestamp** under the **Printed** column.
- You can click the button on the right to **re-print** any unprinted order.

---

### 🔄 Print Non-Printed

If an order is not printed (no printed status), it remains queued in the print server.

- Clicking this button will **re-print all non-printed orders** that are in the print queue.

# 💵 Refunds

The **Refunds** section provides an exhaustive overview of all refund requests and statuses. This allows admins to track, manage, and process refunds in a streamlined manner.

---

### 📝 All

An exhaustive overview of all refund requests.

---

### ⏳ Pending

An overview of all refunds that are still **Pending**.

- **Pending** means that the refund has been requested by the user and is awaiting admin approval.
- You can manually approve or deny specific refunds, or use the **Approve / Decline all requests** buttons at the top right to process all at once.

---

### ✅ Approved

An overview of all refunds that have been **Approved**.

- Once approved, the refund appears in the **Approved** tab.
- Here, you can view the amount to be refunded and the associated IBAN.

> You can process these transactions manually via your homebanking software, or by using the Generate SEPA button at the top right to create a SEPA file (.xml) with all refunds bundled. This file can be uploaded to your bank's system. If processing manually, don’t forget to mark the refund as Refunded to confirm it has been completed.
> 

---

### 💸 Refunded

An overview of all **Refunded** transactions. These have been marked as refunded either manually or through SEPA file processing.

---

### ❌ Failed

An overview of all refunds that have **Failed**. Failures may occur during automatic refund processing (e.g., via Mollie).

---

### 🚫 Denied

An overview of all refund requests **Denied** by an admin.

---

### 🛑 Cancelled

An overview of all refund requests that were **Cancelled** by the user via the (web)app.

---

### 📂 Generated SEPA Files

An overview of all **Generated SEPA** files.

- You can see the total number of transactions and total refund amount for each SEPA file.
- There is also a button to (re)download each SEPA (.xml document) if needed.

# 💰 Finance

The **Finance** section provides comprehensive reporting options, allowing admins to generate and review financial reports based on daily, monthly, and yearly data.

---

### ⏳ Daily Revenue Filters

> Note: These filters are no longer in use.
> 

---

### 📅 Day Reports

An overview of all generated day reports for the current month.

- The platform generates a day report for every 24 hours of activity.
- The **timestamp** of a day report starts at 12:00 noon and ends at 12:00 noon the next day.
- Use the **"Previous"** and **"Next"** buttons to navigate between months.
- You can choose to **include free orders** (processed for free via StaffX with "Permission Free Orders") in the report.

Each **Day Report** can be downloaded as a **PDF** or **XLSX** file:

- The **Summary** icon provides a condensed view of the report.
- The **Detailed** icon offers a full, detailed version of the report.

> Monthly Accumulation: At the bottom of the page, you can generate a Month Report that accumulates all day reports for the month.
> 

---

### 📅 Month Reports

A **Month Report** can be generated at the bottom of the page as a **PDF** or **XLSX** and is always in **Detailed** format, bundling all day reports from a specific month.

- Click the **red refresh** button at the bottom to regenerate the latest month report.

---

### 📆 Year Reports

A **Year Report** can be generated from the top right of the page.

- This report bundles all day and month reports into a comprehensive annual summary.
- Clicking the **red refresh** button will refresh or regenerate the year report.

# 🧑‍💼 Staff Performance

The **Staff Performance** section provides tools to analyze and review the performance of staff members over various timeframes, activities, and events.

---

### 📅 Date Range Filters

Use these filters to select the date range for viewing staff performance data.

- **Last Day**: Filters staff performance (summary) to show only today's data.
- **Last 7 Days | Last 30 Days | Last 90 Days | Last 180 Days | Last 365 Days**: Filters staff performance data to the selected timeframe.
- **Custom Range**: Manually select a date range by filling in the **From** and **To** fields.
- **Event-Specific**: Select a specific event to view the performance (summary) for that event only.

---

### 📊 Performance Summary

Displays a graph representing the staff’s performance categorized by types of activities. This offers a quick visual insight into team contributions.

---

### 📋 Detailed Performance

Provides a detailed, comprehensive overview of all active staff members within the selected date range.

- **Individual Staff View**: To view detailed performance metrics for a specific staff member, click the button on the right. This opens the staff performance view for that individual.
- **Staff Activity**: By clicking **Staff Activity** in the top right, you can switch to an activity-focused view. This view shows a chronological list of all orders processed by the selected staff member.
- **Order Details**: To access more information about a particular order, click the **View** button next to the relevant activity.

# 🧾 Invoices

### 📅 Overview per Year

> Note: This functionality is currently not operational.
> 

The **Overview per Year** provides a summary of all generated invoices by users on the platform.

---

### ⚙️ Invoice Generation Settings

If the **"Client can generate an invoice for their top-up"** setting is enabled in **Settings > App**, users can generate an invoice by entering their company details and activating invoicing mode in their profile settings.

- **Organizer Access**: These invoices, once generated, can be downloaded by organizers to support accounting and bookkeeping tasks.
- **Invoice Prefix**: Organizers can set up an **Invoice Prefix** within **Accountancy Settings** in **Settings > App** for easier identification and sorting.

# 🛠️ Manage

## 📰 Content

> Use Case: Content posts are ideal for building a narrative around an event, providing countdowns, exclusive previews, or engaging with users post-event by sharing highlights and feedback prompts.
> 

### 🔍 Overview of Posts

Provides an overview of all created Content Posts, showing metrics such as **views** and **hearts** (likes).

- **Status**: Posts with the status "Draft" are not visible on the (web)app. Only "Published" posts are accessible to all users or specific segments you’ve targeted.

> Tip: Regularly review post engagement through views and likes to understand what content resonates most with your audience. High engagement content can help shape future posts and refine your content strategy.
> 

---

### ✏️ Edit

This feature allows you to modify the content of the post.

> Use Case: Updating information on existing posts is useful for events or offers where details may change over time, such as lineup updates, venue information, or last-minute promotions. Use this feature to keep content relevant and accurate.
> 

---

### 🗑️ Delete

Enables you to permanently delete a content post.

> Note: Be cautious when deleting posts, as this action is irreversible. If you think the content might be reused or repurposed later, consider keeping it as a draft instead of deleting.
> 

---

### ⚠️ Main Alert

A **Main Alert** is a popup message that appears when users (re)open the (web)app. It is typically used for **urgent messages** that need to be seen by all users, such as last-minute changes, event cancellations, or major updates.

1. **Content Requirements**: Enter a **title** and add **text/images/HTML** as needed.
2. **Enable the Alert**: Toggle “Show the main alert” to activate.
3. **Disable the Alert**: Uncheck “Show the main alert” when you no longer need it displayed.
4. **Notification Options**: Opt for "send notification on save" to push the alert immediately upon saving.
5. **Save and Confirm**: Click "Save changes" to finalize.

> Tip: Use this feature sparingly for only the most important information to avoid alert fatigue among users. Overuse may desensitize users to future alerts.
> 

> Use Case: Main Alerts are especially useful in emergency situations (e.g., weather issues affecting an outdoor event) or for driving attention to critical announcements like ticket sales for popular events.
> 

> Pro Insight: Consider designing Main Alerts to align with your brand voice and visual identity (e.g., font size, color schemes via HTML) to make them recognizable but unobtrusive.
> 

---

### ➕ Create New Content Post

Allows the creation of a new **Content Post** to communicate updates, engage users, or share important information. Content posts appear on the user’s feed and can include images, links, or HTML for enriched formatting.

- **Status**: Determines the visibility of the content post.
    - **Published**: Visible on the (web)app for the intended audience.
    - **Draft**: Keeps the content unpublished until it’s ready.
- **Scheduling Posts**: Use "Post at" to set a future publication date/time (functionality currently under development).
- **Title**: Create a clear, engaging title to capture user interest.

### 💡 Use Cases and Options

- **Linking to Events**: Select an event under "Events" to make the content post appear on the event's detail page. This is useful for event-related posts, like artist announcements or special promotions tied to that specific event.
- **Targeting Specific Segments**: Use "Segments" to reach a defined audience segment (segments are managed in Settings/Segments). For example, create posts targeted to VIP attendees or loyal customers to offer exclusive content or discounts.
- **Push Notifications**: Enabling "Send Notification on Save" triggers a notification each time you save the post. Notifications require a **Title** and **Summary Text** for clarity.
    
    > Tip: Use notifications selectively to prevent overwhelming users. Reserve them for high-value updates like last-minute ticket releases or exclusive offers.
    > 
    
    > Pro Insight: Consider the timing of your push notifications to optimize reach. Early in the day or just before peak engagement times (e.g., event evenings) may yield higher visibility.
    > 
- **Main Image**: Upload a main image to enhance the post's visual appeal on the ClientX Home feed. This image will help attract attention to the post.

### 📢 Content Details

- **Summary Text**: This brief description (up to 255 characters) gives context on the feed and serves as the notification text.
- **Content**: Use the text editor to craft your message, which can include **text**, **images/videos**, and **HTML**. While HTML customization is available for branding purposes, avoid using complex CSS that could alter the layout unexpectedly. (JavaScript is not supported).
    
    > Tip: Experiment with multimedia elements like music embeds (from SoundCloud or Spotify) to create a richer experience, especially for artist or performance announcements.
    > 
    
    > Pro Tip: Encourage engagement by linking your posts with specific calls-to-action (CTAs), such as "Book Now," "Listen on Spotify," or "See Full Line-Up." Make these CTAs clear and easy to follow, leveraging HTML links if needed.
    > 
    
    > Shortcut Tip: Use CTRL/CMD+SHIFT+V to paste content from external sources without carrying over unwanted formatting. This is helpful when copying text from sources like Facebook, ensuring clean and consistent styling.
    > 

### 🎨 HTML Customization with 🤖KontentBoy

For advanced HTML/CSS customization, KontentBoy can help you generate and refine content posts to match your brand’s style and layout preferences. By providing the right resources (like a website URL or flyer), you can get KontentBoy to replicate specific styling to maintain brand consistency.

👉 [Access KontentBoy for HTML Customization](https://chatgpt.com/g/g-Bcupd3VfK-kontentboy-anykrowd)

---

### 🛠 Tips for Getting the Best Results with 🤖KontentBoy

1. **Provide the Organizer’s Website or Flyer**
    - **Website URL**: Share the URL of the organizer’s or venue’s website. KontentBoy can “scrape” the style, replicating the layout, colors, and overall aesthetic.
    - **Event Flyer**: Copy and paste event flyers or banners into the prompt, asking KontentBoy to take inspiration from them. This is ideal if the event has unique colors or a particular look and feel.
    
    **Example Prompt**:
    
    > "Use the style from [website link] and create an HTML section with a centered title, a brief event description, and a 'Buy Tickets' button in the same colors as the site."
    > 
2. **Replicate an Existing Layout**
    - If you like a specific design from an external site or previous project, you can paste that code or content into KontentBoy and ask it to replicate or tweak it. This is especially useful for consistent branding across different channels.
    
    **Example Prompt**:
    
    > "Here’s a section from our website [paste HTML/CSS here]. Can you recreate this and adapt it for our event’s content post with a call-to-action button?"
    > 
3. **Custom Fonts and Scripts**
    - **Limitations**: Custom fonts and scripts are not currently supported on the anyKrowd platform.
    - **Alternative**: Stick with web-safe fonts like Arial, Helvetica, and Times New Roman, or prompt KontentBoy to use standard font families close to the brand’s look. Specify your font choices if needed.
4. **Using Images in HTML/CSS**
    - To include images, host them externally on a service like Imgur or your own server. You can then insert these images as backgrounds, sponsor logos, or visual elements within your HTML content.
    
    **Example Prompt with Image Hosting**:
    
    > "Use this logo [insert image URL from Imgur] as the background image of a header section. Place the event title in the center with a semi-transparent overlay."
    > 

---

### 📈 Use Cases & Practical Examples for 🤖KontentBoy

### Call-to-Action (CTA) Buttons

Adding CTA buttons within HTML/CSS is a powerful way to drive actions directly from content posts. KontentBoy can create buttons linking to internal or external pages, such as ticket sales, top-ups, or pre-registrations.

**Prompt Example**:

> "Create a 'Buy Tickets' button with rounded edges and a bold blue font. Link it to [ticket URL]. Position it at the bottom of the content post."
> 

**Use Cases**:

- Direct link to ticket purchases
- CTA for top-up pages (for event cashless payments)
- Link for pre-registering for an event

### Replicating Brand Styles

KontentBoy can take design cues from the provided resources and replicate brand-specific styling across posts, ensuring a cohesive look.

**Prompt Example**:

> "Replicate the color scheme from our website and use it to style a two-column layout with an event description on the left and a sponsor logo carousel on the right."
> 

**Use Cases**:

- Color scheme matching for brand cohesion
- Sponsor logos integrated seamlessly
- Highlighting VIP sections or special event perks

### Embedded Media for Engagement

Enhance content by embedding SoundCloud, Spotify, or video players, especially for artist or event promotions.

**Prompt Example**:

> "Embed a SoundCloud player below the artist bio with a 'Play Now' button. Use a border that matches our brand's accent color."
> 

**Use Cases**:

- Artist promos with music previews
- Video previews for exclusive content
- Livestream links or other live media features

---

### 📝 Mini-Guide: How to Refine 🤖KontentBoy’s Output

1. **Start with Broad Specifications**: Begin with a general description of what you want, including layout and purpose.
    
    **Example Prompt**:
    
    > "Create a three-part section with event highlights, artist lineup, and a 'Buy Tickets' button. Use a dark theme with white text."
    > 
2. **Add Finetuning Instructions**: After KontentBoy provides an initial response, add specific instructions to adjust details like alignment, spacing, color, or layout.
    
    **Examples**:
    
    - “Increase the padding around the artist lineup.”
    - “Use a lighter shade of gray for the text.”
    - “Align the CTA button to the center and increase its size.”
3. **Experiment and Test**: KontentBoy’s responses improve with trial and error. If the first result doesn’t fit, tweak your prompt slightly or ask KontentBoy to try a different approach.
4. **Ask for Explanations**: If you don’t understand a part of the code, ask KontentBoy for clarification or a step-by-step explanation. This can help you understand how to make your own edits later.
5. **Iterate for Best Results**: Small changes and incremental adjustments are the key to perfecting KontentBoy’s output. Keep refining until you achieve the exact look and feel you’re aiming for.

---

### 🔗 Advanced Examples for Internal Linking and Embedded Content

### Internal Links

Using internal `#` links allows you to direct users to specific app pages or spotlight new features. These links are powerful tools for enhancing user engagement and directing them towards important actions.

**Examples of Internal Links and Their Use Cases**:

- **Timetables Link**
    - **Link**: `#/timeTables/`
    - **Use Case**: Promote your event schedule with an early “sneak preview” of the timetables, exclusive to app users.
- **Specific Timetable Link**
    - **Link**: `#/timeTables/detail/1` (replace `1` with the specific timetable ID)
    - **Use Case**: Direct users to a highlighted timetable.
- **Top-Up Page Link**
    - **Link**: `#/top-up`
    - **Use Case**: Encourage users to top up their wallet for cashless payments.

### GPS Navigation Button

For venues or events, adding a button that links to GPS navigation can be useful for helping users find their way.

- **Google Maps**: `https://maps.google.com/?q=VENUE_ADDRESS`
- **Waze**: `https://waze.com/ul?q=VENUE_ADDRESS`
    
    **Prompt Example**:
    
    > "Create a ‘Navigate to Venue’ button with links to Google Maps and Waze for [insert venue address]. Add small icons of Google Maps and Waze."
    > 

### Embedding Full Pages

You can also use KontentBoy to help you embed full pages or sections, like a website’s FAQ or an artist’s bio, to provide a seamless in-app experience.

**Prompt Example**:

> "Embed the FAQ section from [insert website URL] in a scrollable, responsive layout that fits within the app’s frame."
> 

By using 🤖KontentBoy and following this mini-guide, you can create compelling, branded content that effectively engages your audience, drives conversions, and maintains a professional, consistent appearance on the anyKrowd platform. Be creative, experiment, and refine each element to maximize your impact!

# 📅 Event (Management)

The **Event** section in AdminX provides a structured interface for viewing, managing, and configuring all aspects of your events. It includes both **general action buttons** in the top-right corner for overall management and **event-specific action buttons** next to each event entry for more granular control.

---

### Overview of Events

Displays all created events in a comprehensive list. Use:

- **Top-Right General Action Buttons** for bulk actions or overarching settings.
- **Event-Specific Action Buttons** beside each event for actions focused on individual events.

---

### 📆 Upcoming Events

A dedicated list of all upcoming events, providing easy access for preparation and monitoring.

---

### 📅 Past Events

This section contains all past events, along with an extra **Download Report** button. This report consolidates all data related to sales, tickets, and attendance, making it valuable for post-event analysis.

---

### 🗂 All Events

A combined view of both upcoming and past events, offering a complete historical overview in one place.

---

### 👥 Participants

The **Participants** button opens the list of attendees for a specific event:

- **Participants List**: Shows all individuals with tickets for the event. Tickets may be sourced from external integrations or anyKrowd tickets (purchased, received via vouchers, or manually assigned).
- **Download List**: Export the participant list for record-keeping or additional analysis.

**Important**:

- Avoid using the **“+Add”** button, as it is no longer functional. Instead, use **Assign Tickets** from the main events tab to add tickets for users.
- **Cancel Ticket**: Use the red button next to a participant’s name to cancel a ticket. A prompt will ask if you want to process the cancellation with or without a refund. Choose based on the circumstances.

---

### 🛂 Access Control

The **Access Control** section allows you to manage entry permissions and configure specific entry settings for an event. This screen provides toggles and settings to customize access precisely to your event's needs:

- **Activate Check-In Permission for StaffX**: Toggle this setting to permit staff members to perform check-ins at designated zones or gates.
- **Auto Redeem Vouchers at StaffX Entrance**: Enable this setting to allow vouchers (linked to tickets) to be automatically redeemed and connected to an attendee’s RFID at the time of check-in, streamlining entry.

Further options within **Access Control** include:

- **Staffs & Ticket Types (Check-In Permissions)**: Use this to specify which ticket types particular staff members can check in. This feature can help manage complex events with multiple ticket categories.
- **Roles & Ticket Types (Check-In Permissions)**: Similar to the staff-specific permissions, this allows for defining ticket check-in rights based on user roles, offering more granular access control.
- **Event Zones**: Enable this setting if you have specific zones within the event that require separate check-in procedures.
- **Event Gates**: Activate to manage and designate particular entry points or gates within the event venue.
- **Ticket Types & Zones**: Link specific ticket types to designated zones or gates, setting conditions for automatic check-in based on timestamps.
- **Staffs & Gates**: Assign specific staff members to designated gates, providing them control over those entry points only.

> Tip: Ensure all access control settings are configured accurately before the event to avoid entry complications. This is particularly important for larger events with complex entry requirements.
> 

---

### 🔄 Enable ‘Active Now’ Page

This feature allows you to change the **event detail page** content for a specific event once it is live. It’s useful for showing live updates or modifying event information while it’s in progress.

> Note: This functionality is not currently operational in V2.
> 

---

### 📝 Copy Event

The **Copy** button enables quick replication of an event’s settings, which is convenient for setting up recurring or similar events. It copies the event settings but **excludes attendees and generated tickets**.

- **What’s Copied**: Event configurations, schedules, and settings.
- **Best Practice**: Treat the copied event as if it’s new. Update all necessary fields and confirm each setting to avoid discrepancies.

> Reminder: Double-check all duplicated details, as new features or recent updates may require additional configuration adjustments.
> 

---

### 🌉 Bridge Integrations

Currently unavailable in V2, this feature is intended to facilitate integration with external API devices, such as automated access control gates (e.g., turnstiles or tourniquets).

---

### 🖼️ Image Gallery

The **Image Gallery** feature lets you upload additional images specific to this event:

- **Main Image**: This image is displayed on the event feed.
- **Additional Images**: Any images added here will appear in the event’s detailed view. The first image in the gallery will display instead of the main image when the event is opened in detail view.

> Tip: Use this feature to enhance the visual appeal of the event, showcasing event highlights, key performers, or venue ambiance.
> 

---

### 📊 Statistics

Opens the **Statistics** page for the selected event, providing real-time insights into attendance, ticket sales, and other event-related metrics.

> Note: For comprehensive statistics, use the Report or Download Event Report options from the Past Events section, as the Statistics function is not fully updated for V2.
> 

---

### ✏️ Edit

This button allows you to adjust the event details in real-time. You can update information such as date, location, or ticket types if required.

---

### 🗑️ Delete

The **Delete** button permanently removes the selected event from the platform.

> Caution: Ensure all event data is backed up or confirmed as unnecessary before proceeding, as deletion is irreversible.
> 

## 🎉 Create New Event

Clicking the **+ Create** button opens the edit/new event screen, where you can configure key settings and details about the event. Here’s a breakdown of each field and its purpose.

---

### 🏗️Event Settings

- **Status**:
    - Choose between **Draft** and **Published**.
    - Events in **Draft** are not visible on ClientX; only **Published** events appear to users. This setting is similar to content posts, allowing you to work on events privately until they're ready for release.
- **Refundable**:
    - Checking this box allows users to cancel and refund their ticket directly via ClientX (a refund fee may apply). This option provides flexibility for users who may not be able to attend.
- **Name**:
    - Enter the event’s name, which will be displayed prominently as the title on the feed (Home) and in the Events section. Use a name that clearly represents the event to make it easily identifiable for attendees.
- **Address**:
    - Set the location or venue for the event. You can either manually create a new address or use the **search/autocomplete** feature powered by Google Maps for known locations.
    - Important: Selecting an address ensures that it appears correctly in the greyed-out location fields, helping attendees easily locate the venue.
- **Target to Segments**:
    - This option allows you to limit the visibility of the event to specific user segments. Choose the desired segment(s) and click **Add** to target this event for only those users.
    - Useful for events aimed at particular groups, such as VIP guests or segmented audiences based on demographics.
- **Send Notification on Save**:
    - Enabling this toggle will send a **push notification** each time you click **Save** while the toggle is on. Use this to alert users of event updates or new events.
    - Note: Be mindful of the frequency of notifications, as each save will trigger one if enabled.

---

### 📅Date & Time

- **Start Datetime** and **End Datetime**:
    - Set the event’s start and end times. If the event ends exactly at midnight (00:00), select the following calendar day as the end date.
    - These times will appear on the feed, in the Events chapter, and on user tickets.
- **Delayed Delivery**:
    - Use this setting to control when QR codes on tickets become visible. By setting a **Delayed Delivery** date, you can keep the QR code hidden until a specific date, ideal for controlled access or timed releases.
- **Limit Tickets**:
    - This feature, available only with anyKrowd’s ticketing, lets you set a maximum number of tickets across all ticket types for the event. Helps prevent overbooking by capping ticket sales.
- **Limit Tickets per User**:
    - Another ticketing feature that allows you to restrict the number of tickets each user can hold for the event. Set a user-specific limit to manage ticket distribution effectively.

---

### 👁️Visibility & Interactivity

- **ClientX Can See What Friends Are Going to an Event**:
    - This toggle, when enabled, shows users which of their friends are attending the event. Note: This feature may be partially operational until the full **Friends** functionality is implemented in V2.
- **Allow Users to Edit Ticket Recipient**:
    - Activating this feature allows users to transfer tickets to others by changing the ticket’s recipient details (name and email).
    - The new recipient receives an email notification stating, “Your friend has sent you a ticket,” with a button to access the ticket in the app. This is great for peer-to-peer transfers and enhances user convenience.

---

### 🖼️Visual Settings

- **Main Image**:
    - Every event requires a main image (suggested dimensions: **1200x628px** or **1920x1005px**). This image serves as the event’s visual on the feed (Home) and in the Events chapter, so use high-quality images to capture user attention.

---

### 🃏RFID & Custom Layouts

- **Card Creation Costs**:
    - Set a charge for creating a guest wallet with RFID, which is applied to the first top-up. StaffX allows for exceptions. This option is primarily useful for managing RFID cost recovery.
- **RFID Devices**:
    - Shows the count of RFID devices connected to users specifically for this event, as opposed to app-level RFIDs in **AdminX > Settings > App**. You also have the option to disconnect devices if needed.
- **Custom Ticket Layout**:
    - Upload a background image for all ticket types associated with this event. This can also be set globally at the app level (**AdminX > Settings > App**) or customized per ticket type.

---

### 💰Sales Catalogues

- **Sales Catalogues**:
    - Check the catalogues that will be active for this event. Only selected catalogues will appear in StaffX and other related configurations (e.g., onboarding settings). This is useful for events with specific sales channels.

### 🎫Ticket Types: Detailed Guide

The **Ticket Types** section is crucial for setting up ticket options for an event. This feature allows organizers to create tickets that users can either purchase or register for, providing flexibility in ticketing types, limits, and additional configurations. Here's a step-by-step breakdown:

---

### Overview

- **Ticket Types** are essential for defining the types of access or bookable options available for an event. These can be free or priced tickets.
- If **no external Tickets link** is provided, created ticket types will be visible in ClientX, and users can interact with them directly on the platform.
- **No Ticket Types created?** No purchase or registration button will appear on the event detail page. For example:
    - If a free ticket (e.g., “Registration”) is created, a **Register** button appears on ClientX.
    - For a priced ticket (e.g., “Regular Ticket” at €15), a **Buy Tickets** button will show.

### External Tickets Link

- If the event uses an **external ticket shop** (e.g., on your website or a third-party service), enter the link under **Tickets Link (External)**. A **Buy Tickets** button will appear on ClientX, redirecting users to this link.

---

### ➕Creating a Ticket Type

To add a new ticket type, click on **+ Add**. This opens the **Edit Ticket Type** window where you can configure specific settings for each ticket.

### 🧰Ticket Type Settings

- **Offline Ticket**:
    - Toggle **Offline Ticket** if you want to generate a limited number of tickets and download them as a PDF. These tickets are managed offline, and you won’t be able to generate more than the specified amount.
    - Leave this off for other types of tickets, as offline functionality is currently limited and may be expanded in future updates.
- **Name**:
    - This is the displayed name of the ticket type, visible to users on ClientX and in downloaded tickets (PDF format). Choose a descriptive name that fits the event’s branding.
- **Color**:
    - Choose a background color for the ticket type, providing visual distinction on ClientX.
- **Price**:
    - Set the ticket price here. This field is ignored for imported/integrated tickets managed by external systems, as their pricing is controlled outside of anyKrowd.
- **Currency**:
    - Specify the currency associated with the ticket price. This currency will be displayed in ClientX for the user’s purchase experience.
- **VAT Percentage**:
    - Enter the applicable VAT (tax) percentage for this ticket type, which will be reflected in the final price calculation.
- **Max Cap**:
    - This limits the total number of tickets that can be sold for this type.
    - Enter `1` for unlimited sales or `0` to mark it as “sold out.”
- **Limit Tickets per User**:
    - Enable this to restrict the number of tickets a user can hold for this specific type. For example, set to 10 for “Birthday Guestlist” to allow a maximum of 10 tickets per user.
- **Description**:
    - Add a brief description for the ticket type. This will be displayed on ClientX during the ticket selection process but does not appear elsewhere.
- **Custom Datetime**:
    - If this ticket type has a unique start/end time (e.g., a dinner that starts 2 hours before the main event), use **Custom Datetime** to display a specific time on the ticket.

---

### 🚼 Sales Channels

- **Door Sales**:
    - When enabled, this ticket type is hidden from ClientX and only available for purchase at the event entrance via StaffX.
    - A **Sell Tickets at the Door** button appears in StaffX, and purchased tickets are checked in immediately.
- **Remote Sales**:
    - Enabling this makes the ticket type available only for remote sales, not public purchase on ClientX. Tickets sold remotely appear in the user’s ClientX account and can be used for check-in later.
    - Example: Promoters selling tickets in different locations might use **Remote Sales** so that tickets are held in the app, accessible for later check-in.

### Key Differences

- **Door Sales**: Ticket is checked in immediately upon purchase.
- **Remote Sales**: Ticket is generated in ClientX for later check-in at a different location or time.

---

### 👀Visibility Options

- **Hide QR on Ticket**:
    - This hides the QR code in ClientX and PDF versions, turning the ticket into a proof of ownership rather than a scannable code.
    - Unhide at any time if needed, but note that downloaded/printed versions won’t automatically update with the QR.
- **Limit to Segments**:
    - Segment your ticket type to control its visibility for specific groups. Here are some use cases:
        - **#hide Tag**: Create a hidden ticket type by assigning the system tag `#hide`. Only users you manually add to this segment will see the ticket.
        - **Birthday Filter**: Restrict visibility to users with a specific attribute, such as “Birthday Month August,” making this ticket available only to those celebrating in August.
    - Important: After choosing segments, click **Add** to confirm. Remember to **Save** the ticket type and **Save** the event to retain changes.

---

### 🛃Additional Ticket Customization

- **Assign Tags**:
    - Use this to apply public or system tags to ticket holders. Currently, tags are only assigned to the buyer, not all attendees.
    - Example: Use tags to mark users with a specific role or interest, aiding in post-event analysis.
- **Assign Voucher Groups**:
    - Assign one or more voucher groups to this ticket type. For example:
        - **Entrance + €10 Voucher**: Attendees receive a €10 voucher, which can:
            - Be scanned and linked to an RFID at check-in
            - Be redeemed on ClientX later as spending credit
    - Click **Add** after selecting vouchers to confirm.

---

### Organizing Ticket Types

- **Order Ticket Types**:
    - Use the **Order Ticket Types** button to define the order in which tickets are displayed on ClientX.
    - Ordering helps with visibility and priority, especially for highlighting VIP or limited-edition tickets at the top of the list.

---

### Location & Event Details

- **Custom Locations**:
    - Use this if the event requires specific, event-only locations. This helps with event-specific reporting. Otherwise, leverage the main **Locations** feature in **AdminX > Settings** for broader use.
- **Description**:
    - **Summary**: Write a brief overview (max 255 characters) for display on the ClientX home feed.
    - **Content Editor**: Add detailed information about the event, visible on the event’s detail page in ClientX. This can include text, HTML/CSS, images, etc., offering flexibility to match your brand’s look.

---

### Upselling Products

- **Upselling Products**:
    - Highlight products from the webshop related to this event. When configured, a **Related Products** page will appear within the event in ClientX, promoting additional items that users may be interested in purchasing.
    - **Note**: This feature is currently under development in V2 as the webshop requires further integration.

## 🚪Gates & Zones

These sections require further clarification from Julien. Generally, they are used for designating specific areas within an event venue to streamline check-in processes and monitor attendee movement.

---

## 🎟️ Event Combos

The **Event Combos** section enables the creation of combined ticketing options. This feature is integrated within the anyKrowd ticketing system, allowing you to group multiple events or ticket types into a single combo for streamlined access and enhanced attendee convenience.

1. **Creating a New Combo**:
    - Click **+Create** to begin a new combo.
    - Enter a **Name** for the combo.
    - Add a **Description** (visible only in ClientX for reference).
    - Choose the related events to include and click **Add**.
2. **Publishing Status**:
    - **Draft**: Combo is not visible in ClientX.
    - **Published**: Combo is accessible to attendees in ClientX.
3. **Visual Customization**:
    - Upload a **Custom Ticket Layout** for a unique visual on tickets within the combo. This layout can be downloaded by the user from ClientX or sent via email as a PDF.
4. **Ordering Ticket Types**:
    - Use the **Order Ticket Types** button to define the sequence of ticket types in the combo. This order is reflected in the user’s ticket view in ClientX, providing a structured display.

> Tip: Combos are ideal for bundled event access or special packages, such as multi-day festival passes. Customize each combo’s appearance and structure to optimize user experience.
> 

---

## 🎫 Assign Tickets

The **Assign Tickets** functionality allows admins to distribute tickets directly to users. Here’s how to assign tickets step-by-step:

1. **Select the Event**: Choose the event for which you are assigning tickets.
2. **Notification Settings**:
    - (Un)check **Send Tickets Assigned Email**: Opt to notify users via email upon ticket assignment.
    - Customize the notification template through **AdminX > Settings > Notifications** if desired.
3. **Free Tickets Option**:
    - (Un)check **Free Tickets**: Marking tickets as free removes their price from reporting. Otherwise, tickets will reflect their standard value in reports.
4. **Assigning Process**:
    - Select a user and ticket type, specifying the ticket quantity.
    - Confirm your selection with the **Assign Tickets** button.

> Note: If assigning tickets to someone who is not a registered user, use the +Create User button in the top-right or go to AdminX > Manage > User to add them manually.
> 

> Tip: Use the Free Tickets setting for complimentary tickets to staff or VIPs. This keeps your sales reporting accurate by excluding unpaid tickets.
> 

---

## 📥 Import Tickets

The **Import Tickets** function streamlines bulk ticket uploads. Use this feature to upload a list of tickets for an event in a predefined format.

1. **Accessing the Import Interface**:
    - Click **Import Tickets** on the top-right to open the imports page.
    - Review past imports with the “eye” icon for detailed status.
2. **Using the Import Template**:
    - Download the template via **Download Template** to ensure your import file matches the required format.
    - The **ak_ticket_type_name** field in the template is optional and may be left blank.
3. **Preparing the Import List**:
    - Ensure your file contains the following: First Name, Last Name, Email, Ticket Type, and **Ticket Value** (QR code data). The **Ticket Value** links the QR code to specific ticket types for access verification.
4. **Finalizing the Import**:
    - Upload the completed list. Confirm the details, then process the import to create tickets within the system.
    - Optional: Check **Users Will Receive Ticket Email** if you want users to receive email notifications for the imported tickets.

> Important: Only select Send Ticket Email if necessary, especially if users have already received tickets through other means.
> 

> Tip: Use this for pre-registered users or when transferring tickets from other systems.
> 

---

### 🗑️ Bin

The **Bin** is a repository for deleted events, providing an option to review and restore items if needed. This feature ensures that deleted events can be recovered if removed accidentally.

> Tip: Regularly clear the Bin to maintain a clean interface. Only restore events that are essential.
> 

## 📅 Booking

> Note: This module/chapter is currently not implemented or available in V2 and is under development for future releases.
> 

---

### 📝 Overview of Bookings

*Placeholder text – feature not currently available in V2.*

---

### ⏳ Pending

*Placeholder text – feature not currently available in V2.*

---

### ✅ Confirmed

*Placeholder text – feature not currently available in V2.*

---

### ❌ Denied

*Placeholder text – feature not currently available in V2.*

---

### ⚙️ Manage Booking Items

*Placeholder text – feature not currently available in V2.*

## 👤 User

### 📊 Overview of Users

In the anyKrowd platform, a “user” is defined as anyone who has created an account on the client web or native app. Based on configurations in **Settings/Registration**, user details may be **optional or mandatory** fields alongside the obligatory ones like **First Name, Last Name, and Email Address** (Phone Number will be added in a later release). Users must also (read and) accept the **Terms & Conditions and Privacy Policy** upon account creation.

**Note**: For **imported users**, this acceptance step is mandatory upon their first login. It’s not completed at the moment of import.

Each user can:

- Hold **multiple wallets** (each currency constitutes a separate wallet).
- Own various **ticket types** across multiple events.
- Access a **unique Personal QR Code** that is valid for a specific duration. QR validity can be configured in **AdminX/Settings/App**.

💡 **Tip**: If users accidentally create multiple accounts (for example, using different emails for ticket purchases, app downloads, or friend invitations), they may encounter issues with tickets or wallets. This often results in support inquiries. Use the **search bar** to locate a user, even if they have multiple accounts under similar names.

### 🔍 Filters

Use the **Filter** options to narrow down the user list based on specific attributes.

### 📁 Export CSV

Click this button to generate a full export of the user base in **.csv format**.

### 📁 Export XLSX

Click this button to generate a full export of the user base in **.xlsx format**.

### 🏷️ Mass Assign Tags

This feature allows you to assign tags to multiple users simultaneously. While it’s helpful, it has limited flexibility. For more detailed tagging, consider using the **Tags settings** or **Prospects** features found in **AdminX/Settings/Tags**.

### 👁️ View

Clicking the **eye icon** next to a user in the overview will open the **user detail page**. Here, you can view detailed information about the user, including:

- **Profile Details**: This includes information provided by the user during registration or at the time of import.
- **Edit User Options**: Clicking the light green **Edit** button allows you to:
    - Modify all user information.
    - Assign tags.
    - Enable **Contributor** or **Overspending** modes.
    - Reset the user’s password.
    - Enable or edit **Invoicing** options, including auto-invoicing and auto-receipts.

🔹 **Contributor Mode**: Currently unsupported; requires further development.
🔹 **Overspending Mode**: Allows users to have a **negative wallet balance**. Note that this feature requires updates to support multicurrency functionality.

You can also view:

- The user’s **wallet balances** (in various currencies).
- **Latest transactions** (click “Click here for detailed data” for a deeper look).
- An overview of all **Event Tickets** associated with this user.

### 🔄 View QR

This option allows you to view and download the **Personal QR Code** of the user, including a timestamp that indicates its validity.

### 💰 Wallets

Clicking the **wallet icon** next to a user opens the wallets view for this specific user, where you can see all wallets automatically created. Each wallet corresponds to a currency, has a unique ID, balance, and transaction history.

You can:

1. Use the **Exchange Balance** button to move funds between wallets.
2. Create a new wallet using the **+ Create** button.

For specific **top-ups, wallet expiry, or refunds**:

1. First, select the wallet by clicking **View**.
2. This opens the wallet detail page, where you can find action buttons for **+ TopUp, Expire**, or **Refund**.

### Top-Up

Select an **amount** and **payment method**. When performing a top-up as an admin, use “AdminX TopUp” as the payment method and add a **reference** or description. This reference is visible in AdminX, StaffX, and ClientX for easy tracking. If adding to cash or card totals for accounting purposes, use the **cash** or **card** payment methods.

### Expire

The **Expire** button triggers a popup to confirm wallet expiry. This action is irreversible and will appear in all references across AdminX, StaffX, and ClientX.

### Refund

Clicking the **Refund** button provides a summary of:

- **Current Balance**: The total balance left in the wallet.
- **Refundable Balance**: The amount eligible for a refund based on current settings.
- **Online Refundable Balance**: (Future feature, under development).

Choose the **amount** to refund and the **payment method**:

- **Wire Transfer**: Processes a refund to the user’s IBAN. (IBANs are only supported for EU accounts, not for UK/US or intercontinental wire transfers).
- **Cash**: Use this method if you’re giving a cash refund in person.
- **Online**: Select this for online refunds (still under development for future automatic processing).

All refunds processed here will appear in the **AdminX/Report/Refund Management system** as pending, where you can approve or deny each refund. This ensures all refunds are recorded and processed through the standard SEPA file export for your bank.

### 🚫 Ban / Block Temporarily

This feature allows you to **ban** or **temporarily block** a user. You can specify a **reason** and **duration** for temporary blocks. A banned user loses access to the app, wallets, and tickets.

### 🔑 Reset Password

Clicking this button sends a **password reset email** to the user. The user can click the link in the email to reset their password and will be prompted to log in again after setting a new one.

### 🖼️ User Image Gallery

Access and view extra images uploaded by the user or admin.

### 📈 Statistics

Clicking this button opens the **user’s statistics and transaction details page**.

### ✏️ Edit

Click this button to open the **edit user window**, where you can modify all user details, including tags, contributor settings, and overspending permissions.

### 🗑️ Delete

Use this option to **delete the selected user** from the platform.

### ➕ Create New User

This feature allows you to create a new user manually. Some common use cases include:

- Generating a **Generic User QR** for staff logins at specific locations.
- Creating a real user account for **ticket distribution or wallet funding**. You can either set up a password or trigger a password reset for the user after saving.

### 📂 Imports

The **Imports** button opens the **User Imports page**, where you can:

1. View past imports.
2. Import new users by **downloading and filling in the template**. Ensure the format matches the template exactly to avoid errors.

💡 **Tip**: Use the slider “**users will receive onboarding email**” if you want the imported users to receive an onboarding email. This can be configured in **AdminX/Settings/Notifications**.

### 📂 Prospects

The **Prospects** feature is similar to user imports but offers additional tagging options. This feature is particularly useful for:

- **Segmenting users** based on ticket sales data, music genre preferences, ticket type, etc.
- **Applying membership statuses** or other system tags.

With Prospects, you can tag imported users upon import, allowing for easier segmentation and targeted communications.

## 💰 Wallets

### 📊 Overview of Wallets

This section provides an **overview of all wallets** for all users, including **guest wallets**. Each wallet corresponds to a currency and reflects the balance for each user account.

### 🔍 Filters

You can use filters to tailor your view of wallets:

- **Negative Balances Only**: Shows wallets with a negative balance.
- **Guest Wallets Only**: Filters the view to display only guest wallets.
- **Currency Type**: Allows you to filter wallets by specific currency types.

### 👁️ View

Clicking the **View** button next to a wallet opens the **wallet details page** for that specific user. Here, you’ll see all wallets that have been automatically created, each with a unique ID, balance, and transaction history.

Key actions on the Wallet Detail page include:

1. **Exchange Balance**: Transfer balances between different wallets of the same user.
2. **+ Create**: Add a new wallet for the user manually.

To manage top-ups, expiries, or refunds, follow these steps:

1. Select the wallet by clicking the **View** action button to open the **Wallet Detail page**.
2. Here, you’ll find action buttons for **+ TopUp, Expire**, or **Refund**.

### 💸 + TopUp

Clicking **+ TopUp** allows you to add funds to the wallet:

- **Amount**: Enter the top-up amount.
- **Payment Method**: Choose the method for this top-up. Use “**AdminX TopUp**” when performing top-ups as an admin. Be sure to include a **reference/description** for easy tracking in reports. This reference will appear across AdminX, StaffX, and ClientX for consistency.

💡 **Tip**: Use “**cash**” or “**card**” payment methods if you want the amount to appear in your day totals for accounting purposes.

### ⏳ Expire

Clicking the **Expire** button opens a confirmation popup:

- **Confirmation**: Confirm the expiry of this wallet balance. This action is **irreversible** and will be logged in AdminX, StaffX, and ClientX under wallet details.

### 🔄 Refund

Clicking the **Refund** button allows you to process a refund for the user:

- **Current Balance**: Displays the user’s remaining wallet balance.
- **Refundable Balance**: Shows the amount that’s refundable based on the current configuration.
- **Online Refundable Balance**: Displays the balance eligible for online refunds (future feature, still in development).

Once you choose the **amount** to refund, select a **payment method**:

- **Wire Transfer**: Processes the refund to the user’s IBAN account. Note that IBANs are only supported for **EU bank accounts** (does not support UK/US or intercontinental transfers).
- **Cash**: Select this if the refund has been made in cash.
- **Online**: Choose this for online refunds (currently in development for future automated processing).

Upon confirmation, the refund request will be added to the **AdminX/Report/Refund Management system**. It will remain pending until approved or denied, allowing for centralized processing alongside other refunds. This standard process ensures all refunds are captured in the SEPA file export for your banking records.

### 🔝 Top-Up Wallets

The **Top-Up Wallets** button in the top-right corner of the screen opens the **Top-Ups Imports page**. Here you can view past imports and start new ones.

To initiate a new **Top-Up Import**:

1. Click **Import Top-Ups** at the top-right corner.
2. Choose the **import type**: You can mass top-up by **emails, RFID UUID numbers, or wallet IDs**.
3. **Download the correct template** for your selected import type.
4. Fill in the template with the correct information (emails, RFID UUID numbers, wallet IDs, amounts, currency types).
5. Upload the completed file to process the import.

💡 **Tip**: Ensure the template is filled accurately to avoid errors during import. This feature is ideal for handling mass top-ups efficiently.

## 📊 Sales

The **Sales** chapter details the setup and management of **Sales Catalogues** within the anyKrowd **Staffx POS** system. Sales Catalogues are critical for defining the products available at various sales points, controlling pricing, and organizing items into manageable categories. This configuration is essential for bars, food stands, merchandise outlets, and self-order stations.

---

### 📂 Sales Catalogues Overview

**Sales Catalogues** represent structured menus for each point of sale on **Staffx** devices. They dictate what products are available and allow customization for specific locations or device groups, such as bars, kiosks, or merchandise stands. Catalogues are also necessary if you’re using the **Printx** system, as each printer connects to a specific catalogue.

💡 **Tip**: To streamline operations, you may want to create separate catalogues for each unique sales environment, like “Main Bar” or “Food Stand,” and duplicate catalogues as needed for Printx configurations.

---

### 🔍 Overview of Catalogues

On the **Catalogue Overview** page, you’ll find a list of all existing catalogues, along with the following action buttons:

- **💙 Set as Default**: Sets the catalogue as the primary default. This default setting can be especially useful when you have multiple catalogues but want one to be prioritized, such as for primary bar sales.
- **📑 Duplicate**: Creates a copy of an existing catalogue, including its configuration. **⚠️ Note**: In V2, product-specific price variations within categories aren’t duplicated, so it’s essential to review all settings, especially price variations, after duplicating.
- **✏️ Edit**: Opens the **Edit Sales Catalogue** page, allowing for modifications to the catalogue’s configuration.

### 🛠 Editing a Catalogue

The **Edit Sales Catalogue** page is where you configure the core settings that define how the catalogue behaves on Staffx and Clientx. Here’s a breakdown of each setting:

1. **📝 Catalogue Name**: This is the display name for the catalogue (e.g., "Main Bar" or "Snack Stand"), which helps staff easily identify it in reports and on Staffx devices.
2. **💱 Default Currency**: Defines the main currency for transactions within this catalogue. This currency is displayed on Clientx and Staffx during the sales process.
3. **📱 Device Groups**: Link device groups to this catalogue. **Device groups** represent specific printers or devices configured through **AdminX > Settings > Devices**. This feature allows orders from this catalogue to print on designated devices if you are using Printx.
4. **🚫 Disable Payments for Self Orders**: Toggle this setting to allow self-orders to be processed without immediate payment. This is especially useful for **self-order kiosks** where customers can place orders, then pay upon delivery.
5. **🔍 Segmenting the Catalogue**: You can segment catalogues to restrict access for specific user groups. When segmentation is enabled, only users in the defined segment can access the catalogue. Attempting to sell to a non-segmented user on Staffx will trigger a warning, allowing staff to either proceed with or cancel the transaction. This feature is beneficial for VIP areas, exclusive product offers, or memberships.

### 📑 Managing Categories in Catalogues

Each **Sales Catalogue** contains **Categories** that help organize products into logical groups, making it easier for staff to locate items on **Staffx**. Examples of categories might include “Soft Drinks,” “Alcoholic Beverages,” “Food,” etc.

- **➕ Create Category**: Adds a new category within the catalogue. For instance, you could add “Snacks” to separate food items from drinks.
- **↕️ Sort Categories**: This lets you arrange the order of categories as they appear on Staffx, prioritizing popular categories if needed.
- **✏️ Edit / 🗑 Delete Categories**: Modify or remove existing categories as needed. Before deleting a category, ensure it’s not critical for device or segment assignments.

---

### 📋 Managing Products within Categories

After setting up a category, you can add specific products to it by clicking the **Products** button next to the category name. This opens a detailed view where you can add and organize products.

1. **➕ Add Product**: Here, you add products that have already been created in the **Products** section to the selected category. To set up a product for this button, follow these steps:
    - **Select Price Variations**: Each product can have different price variations based on currency or location. When adding a product to a category, you must select the relevant price variations for that specific catalogue. Price variations must be preconfigured in the **Products** section, as they define how a product is priced based on the selected catalogue or location.
    - **Product Customization**: Customize each product button by setting the name, selecting a background color, and choosing from the available price variations for the product within this catalogue. Each button represents a unique product instance on Staffx, so accurate configuration is crucial.
2. **↕️ Sort Products**: Allows you to reorder products within the category to prioritize certain items (e.g., place frequently ordered items like water or soda at the top).

Each product entry includes:

- **📌 Name**: This is the clickable button name for each product on **Staffx**.
- **💵 Sales Price**: The price displayed to customers, which can vary depending on the selected price variations.
- **📊 VAT Percentage**: The tax rate applied to the product. Ensure this is set correctly for compliance and accurate reporting.
- **🎨 Color**: Choose a background color for the product button. Using colors strategically can help staff quickly locate high-demand items.

🔧 **Product Actions**: Use the **Edit** (✏️) and **Delete** (🗑) buttons to modify or remove a product from the category.

---

### 🎉 Discounts

The **Discount** functionality allows you to apply discounts across the catalogue. Here’s how to set up a discount:

- **🏷 Discount Name**: Provide a name like "Happy Hour" or "Seasonal Discount" for easy reference.
- **💲 Discount Type**: Choose either **Percentage of Price** (e.g., 10% off) or **Fixed Amount** (e.g., €2 off each item).
- **🔢 Discount Amount**: Enter the specific discount value.

**⚠️ Note**: Discounts in V2 are limited and may require further development for complex setups. For now, use basic discounts with caution and verify that they apply as expected.

---

### 🗑 Deleting a Catalogue

To delete a catalogue, click the **Delete** button next to the catalogue name. Note that each new catalogue includes a **warranty products** category by default, useful if your setup integrates with **ECO**. If you don’t use ECO, you can repurpose the category or disable the “warranty” setting before deleting it.

---

### 📥 Importing Catalogues

The **Catalogue Imports** page provides a history of all previous imports. To import a new catalogue:

1. **📄 Download the Template**: Use the provided template to format the import file accurately.
2. **📤 Upload the File**: Select the file and confirm by clicking **Upload**.

⚠️ **Important**: Catalogue imports should be reviewed by the Product Manager (PM) before execution to prevent configuration mismatches.

---

### ✨ Creating a New Catalogue

When creating a new sales catalogue, follow these detailed steps:

1. **📝 Name**: Enter a descriptive name, such as "Bar Menu" or "VIP Drinks". Clear names help prevent confusion in reports and on Staffx.
2. **💱 Default Currency**: Define the currency that transactions will use. This will appear on **Clientx** and **Staffx**.
3. **📱 Device Groups**: Select relevant device groups, especially if you’re using **Printx** for printing orders. Device groups are defined in **AdminX > Settings > Devices**.
4. **🚫 Disable Payments for Self Orders**: Enable this if you want users to place orders without paying upfront. It’s commonly used for **self-order kiosks** where customers pay upon delivery.
5. **🔍 Segmenting the Catalogue**: Select user segments if you want the catalogue to be visible only to certain groups. This feature is ideal for restricted access areas (e.g., VIP-only products). If a non-segmented user tries to order, Staffx will display a warning, giving staff the option to cancel or proceed.

After configuring your new catalogue, **Save** to store all settings.

### 🛒 Products

The **Products** section is essential for managing all items that can be sold within **Clientx** and **Staffx**. Products can range from beverages and food items to merchandise or tickets. Additionally, if a product has a refundable component (like eco-cups or battery packs), it’s classified as a **Warranty Product** and managed separately under that chapter.

---

### 📋 Overview of All Products

This page displays a list of all products, whether created manually or imported. You can use the **Search** bar to locate specific products by name or other identifiers.

---

### ⚙️ Actions in Product Management

- **✏️ Edit**: Opens the **Product Detail** page for the selected product, where you can update its name, pricing variations, stocks, and other linked features.
- **🗑️ Delete**: Permanently deletes the product from the active catalog. **⚠️ Warning**: Ensure the product is not linked to any active sales catalogues before deletion.
- **🔄 Update Stocks**: Takes you to the **Update Stock** page, allowing you to upload a new stock reality or download a re-order slip. The re-order slip can be used as a template for further stock adjustments. This is relevant for products with **Managed** or **Cross Stock** types.
- **📥 Import**: Opens the **Products Imports** page, displaying an overview of all processed imports. Use the **Import Products** button at the top right to upload a new product file. **⚠️ Important**: Always use the provided template, and consult the PM before importing, as changes are irreversible.

---

### ➕ Creating a New Product

Clicking **Create** opens a blank product setup form with the following fields:

1. **Name**: The product name, a required field for identification.
2. **Description**: This field is intended for **Clientx Self-Order** and provides additional product details, but it’s not fully operational in V2. Future updates will enable this feature.
3. **Picture**: Upload an image to represent the product in **Clientx Self-Order** and **Staffx POS**. To maintain a polished catalog, use consistent image styles and dimensions for products within the same category.
4. **Save**: Once the initial details are filled out, click **Save** to create the product. This redirects you to the **Edit Product** page, where further configurations can be applied.

---

### 🛠️ Editing Product Details

In the **Edit Product** page, you can specify pricing, stock management, and additional product features:

- **Add Price**: Allows you to create one or multiple price variations for the product.
    - **Price Variation Name**: This is required and is for internal use only, such as "Regular," "VIP," "Discounted," "Happy Hour," etc. Although it won’t be visible in Clientx, it helps differentiate variations internally.
    - **Currency**: Select the currency for this price variation.
    - **Amount**: Set the amount to be charged for this variation.
    - **Tax Percentage**: Specify the VAT or applicable tax rate for this price.
    - **Linked Warranty Product**: Use this field to link a **Warranty Product** (such as an eco-cup or refundable item) to the product variation. **Note**: You need to create the warranty product first before it can be linked here.
    - **Set as Default**: Mark this variation as the default price when the product is accessed.
- **Stocks**: Define stock levels and management options for the product.
    - **Stock Type**:
        - **Infinity**: This is the default setting with no stock limit.
        - **Managed**: Allows you to set specific stock levels, including **Current Stock**, **Minimum Stock**, and **Maximum Stock**.
        - **Cross Stock**: Useful for composite items like cocktails or mixed drinks. Cross stock lets you add multiple sub-products (modifiers) to this primary product.
    - **Background Color**: You can assign a color to the product button in **Staffx POS**, making it visually distinctive and improving ease of use.

---

### 📐 Additional Configurations

- **Device Group(s)**: This setting links a **Printer** or other device group to the product. If enabled, it directs specific items to print at a designated location (useful for kitchens, bars, or ticket booths).
- **Segment(s)**: You can limit product availability to specific user segments. For instance, a product could be offered at a unique price only for #VIP members. **Tip**: Combine with segments for personalized product visibility.
- **Discounts**: While the discount functionality appears in the interface, it’s not yet fully functional in V2. Wait for future updates before enabling this feature.

---

### 🗑️ Bin

The **Bin** provides a history of deleted products. Here, you can review and restore deleted products as necessary. This feature is especially useful if a product was deleted accidentally or if seasonal items need to be reactivated.

### 🌍 Warranty Products

Warranty Products allow you to implement a refundable item system within your event or sales structure. These products, such as reusable cups or other returnable items, have a warranty fee associated with them, which can be refunded upon item return.

### 📝 Overview of Warranty Products

The **Warranty Products** overview provides a list of all configured warranty items. This section works similarly to regular products but includes a **warranty fee** that can be returned to the customer. Given the added configuration complexity of warranty items, consulting with the Project Manager (PM) is recommended before setup, especially if:

- **Multiple Currencies** are involved. Example: You may want eco products (like cups) to be purchasable in various currencies but only refundable in a dedicated "eco currency." This can help limit the usage of refunded amounts, making them specific to eco products.
- **Sales Configuration** requires segmentation for warranty products or integration with other POS systems.

> Tip: Warranty products are often used with items like cups at festivals, where a deposit ensures the item is returned to reduce waste.
> 

### 📋 Actions Available in Warranty Products

- **Edit**: Click the ✏️ button next to a warranty product to modify its details, including price variations and warranty configurations.
- **Delete**: The 🗑️ button allows for the deletion of a warranty product. **Warning**: Ensure that the product is not actively used in a sales catalogue before deletion.

### ➕ Creating a New Warranty Product

Clicking the **+ Create** button opens the "Create Warranty Product" page, where you can configure a new warranty item. This process is similar to creating regular products but includes additional considerations for warranty return:

1. **Name**: Define the product’s name (e.g., "Eco Cup").
2. **Description**: Provide a description (currently not visible on clientx).
3. **Picture**: Optionally upload an image for the product. This is displayed in clientx self-order and staffx sales (POS) systems.
4. **Stocks**:
    - **Stock Type**: Choose from **Infinity**, **Managed**, or **Cross-stock**.
        - *Infinity*: Unlimited stock.
        - *Managed*: Track inventory levels with set minimum and maximum stock limits.
        - *Cross-stock*: Link to other products for inventory management.
    - **Background Color**: Choose a background color for the warranty product button on staffx POS for visual differentiation.
    - **Device Group**: Assign a printer or POS device group if the warranty product requires a specific device configuration.
    - **Segment(s)**: Segment the product if it’s only intended for a specific user group (e.g., #VIP only).

### 🏷️ Configuring Product Prices and Variations

After creating the warranty product, the **Edit Warranty Product** page allows you to add and manage price variations. Each warranty product can have different price options to reflect various conditions:

1. **Price Variations**: Click **Add Price** to set multiple price options for the warranty product, such as:
    - **Regular Price**: Default sale price (e.g., €1.00 for an Eco Cup).
    - **VIP Price**: A reduced or exclusive price for VIP users.
    - **Return Price**: Set a return price if applicable (e.g., €0.00 when refunded).
2. **Amount and Currency**: Define the amount for each price variation and select the currency.
3. **Tax Percentage**: Input the applicable tax for each variation.
4. **Warranty Product Link**: Link to another warranty product if necessary (e.g., link "Eco Cup" to a different deposit item for tracking returnable items).
5. **Set Default Price**: Choose the default price to be displayed in sales interfaces.

## ❓ Quiz

The **Quiz** module is currently **unavailable in V2** and is under development for a future release. This module is intended to provide interactive quiz functionalities that may be used for audience engagement, knowledge checks, or event-related gamification.

### 📝 Overview of Quizzes

An upcoming feature that will display all created quizzes, allowing admins to manage and monitor quiz performance and participation.

### 📂 Categories

This section will organize quizzes into various categories for easy management and searchability. Categories will help segment quizzes by topic, event, or audience type.

### ➕ Create New Quiz

The **Create New Quiz** feature will enable users to build quizzes with customized questions, answers, and scoring logic. Expect to find settings for quiz duration, scoring parameters, and category assignments.

---

> 🚀 Future Release Note: Both Quiz and Shop modules are under development and will bring interactive and commercial functionalities to the anyKrowd platform. Stay tuned for updates on these features in upcoming versions of the platform.
> 

## 🛍️ Shop

The **Shop** module is currently **unavailable in V2** and will be released in a later version. This feature is planned to support e-commerce capabilities within the anyKrowd platform, allowing event organizers to sell merchandise, exclusive items, or other event-related products directly through the platform.

### 📝 Overview of Categories

The **Categories** overview will list all product categories, allowing easy access and organization of products within the Shop. Categories help in organizing items like merchandise, apparel, and memorabilia for better user experience and navigation.

### ✏️ Edit

The **Edit** feature will allow administrators to modify category details, such as name, description, and category-specific settings. This is essential for keeping product categories up-to-date and relevant for users.

### 🗑️ Delete

The **Delete** function will enable administrators to remove a category. Before deletion, it’s advisable to check if the category is still linked to any active products to avoid potential disruptions.

### 📦 Orders

The **Orders** section will provide an overview of all shop-related transactions. Here, admins will be able to view, manage, and process customer orders, track order statuses, and handle any returns or exchanges. Expect detailed order information, including customer details, order items, and payment status.

### ➕ Create New Category

The **Create New Category** button will allow admins to set up new categories for organizing products within the Shop. Each category can be customized with a name, description, and potentially, image or icon for improved visual organization.

---

> 🚀 Future Release Note: Both Quiz and Shop modules are under development and will bring interactive and commercial functionalities to the anyKrowd platform. Stay tuned for updates on these features in upcoming versions of the platform.
> 

## 👥 Staff

The **Staff** module in anyKrowd AdminX is designed for managing staff members who will interact with various event functions through StaffX. This section allows you to create, configure, and manage staff accounts, define their roles, set permissions, and create onboarding QR codes for easy access.

---

### 📝 Overview of All Staff

In the **Staff** overview, you’ll see a list of all staff members, whether created manually, imported, or integrated through third-party platforms. This list displays key details:

- **Name**: The name of the staff member.
- **Email**: The email identifier linked to the staff account.
- **Roles**: The assigned role(s) for the staff user, defining their permissions within StaffX.
- **Logged user(s)**: The count of active sessions where the staff account is currently logged in on StaffX devices.

**Search and Action Buttons**:

- **🔍 Search Bar**: Quickly locate a staff account by name or email.
- **✏️ Edit**: Modify existing staff account details.
- **🗑️ Delete**: Remove a staff account from the system.
- **📥 Import**: Import multiple staff accounts in bulk.
- **🚫 Bulk Action**: Currently disabled in V2.
- **➕ Create New Staff**: Manually create a new staff account.

---

### 🚀 Staff Onboardings

**StaffX Onboarding** QR codes streamline staff login for specific roles and events. This feature is particularly useful for event-based or temporary staff, allowing quick configuration and limited access based on predefined roles.

### 📄 Onboarding Overview

- Lists all created onboarding QR codes, including **Event**, **Preferred Sales Catalogue**, **Preferred Location**, **Role(s)**, and **Max Usage**.
- **✏️ Edit**: Modify an existing onboarding configuration.
- **🗑️ Delete**: Remove an onboarding QR from the system.
- **➕ Create a New Onboarding**: Configure a new onboarding QR to control access and permissions for specific roles and events.

### 🛠️ Staff Onboarding Configuration

When creating or editing a staff onboarding QR:

1. **Name**: Define a recognizable name for the onboarding QR.
2. **🎟️ Event Selection**: Choose the event for which this onboarding QR will apply.
3. **🛒 Preferred Sales Catalogue**: Assign a default sales catalogue for this onboarding.
4. **📍 Preferred Location**: Set a reporting location linked to the staff user’s activities.
5. **🎭 Roles**: Select the role(s) associated with this onboarding. For example:
    - A “Bartender” role might include sales permissions.
    - A “Barmanager” role might include permissions to handle cash transactions and access sales activity reports.
6. **🚪 Gates**: Specify gate access if applicable.
7. **🔢 Max Usage**: Set the number of times the QR can be used (default: unlimited with -1).
8. **🔒 Secure Onboarding**: Enable a security pass requirement for extra control.
9. **Login Methods**: Define the methods by which staff can identify themselves after scanning the onboarding QR.
    - **ClientX Login QR/RFID**: Allows login via a linked ClientX account or RFID.
    - **StaffX Login ID/QR**: Supports login through StaffX ID or a generated QR code.
    - **StaffX Account Creation**: Enables creating a new staff account after scanning by filling in a name, email, and password. Enable “StaffX Login ID” for subsequent logins with this method.
    - *Note*: Multiple methods can be enabled, but consult with the PM to avoid overly complex login flows.

---

### 🔑 Roles

The **Roles** page provides an overview of all defined roles, each comprising a set of permissions. Roles simplify the permission assignment process, especially when dealing with large teams.

1. **➕ Create a New Role**:
    - **Name**: Assign a name to the role for identification.
    - **Assigned Voucher Groups**: Specify voucher groups available to this role.
    - **Tappable Currencies**: Choose which currencies the role can handle.
2. **🔓 Permissions Overview**: Define which actions each role is allowed to perform, making it easy to grant or restrict access as needed. Common permissions include:
    - **AdminX Access**: Grants access to AdminX.
    - **Sales Manager**: Allows sales-related management actions.
    - **Order Flow and Check-In**: Permits order handling and attendee check-in processes.
    - **Reporting and Activity Log**: Access to generate reports and view activity logs.
    - **Cash/Card Transactions**: Permission to process payments.
    - **Ticket Sales**: Allows ticket sales at doors or remote locations.
3. **Editing and Deleting Roles**:
    - **✏️ Edit**: Modify the permissions within a role.
    - **🗑️ Delete**: Remove a role, ensuring it’s not assigned to active users before deletion.

Common roles you might create include:

- **F&B Sales**: Limited access for bar staff.
- **Sales with Cash/Card**: Sales role with additional permissions to handle cash or card transactions.
- **Barmanager**: Access to sales activities and order updates.
- **Top-Up Specialist**: Focused role for managing top-ups in specific or all currencies.

*Tip*: Use roles to bundle permissions effectively and reduce configuration complexity.

---

### 🔓 Permissions

Permissions are individual settings that control the access levels of staff members within StaffX and AdminX. Each permission can be toggled on or off depending on the role’s requirements:

- **AdminX Access**: Grants access to AdminX platform functionalities.
- **Sales Manager**: Provides permissions to manage sales-related activities.
- **Order Flow**: Allows the user to process orders within StaffX.
- **Check-In**: Grants permission for attendee check-in operations.
- **Top-Up**: Allows top-up functionality for assigned currencies.
- **Refund**: Enables refund processing.
- **Activity Log**: Provides access to view the activity log.
- **Free Orders**: Allows the creation of free orders.
- **Reporting**: Permits generating and viewing reports.
- **Cash/Card Transactions**: Enables handling of cash and card payments.
- **Manual Entries**: Allows entry of manual transactions.
- **Fetch Staff Vouchers**: Ability to retrieve vouchers assigned to staff.
- **Sell Ticket at the Door/Remotely**: Allows ticket sales for events at the venue or remotely.
- **Change Location**: Permits changing the assigned location of a staff member.
- **Update Orders**: Provides permission to update existing orders.

*Note*: For a smooth setup, consult with the PM when enabling or disabling permissions for critical roles.

---

### 📥 Import Staff Accounts

Bulk-import staff accounts for large-scale events or venues, streamlining setup:

- **Choose File**: Upload the import file based on the anyKrowd template.
- **Update Existing Users**: Toggle to update existing accounts by email.
- **Create Role-Based Vouchers** 🎟️: Generate vouchers associated with specific roles.
- **Onboarding Email**: Enable to send onboarding emails post-import, configured in **AdminX/Settings/Notifications**.

*Important*: Always use the provided template and consult the PM if needed.

---

### ➕ Create New Staff Member 👤

Clicking the **Create** button opens the "Create New Staff Member" page, where you can set up a new staff account with detailed options:

1. **Basic Information**:
    - **First Name** and **Last Name**: Required for identifying the staff user.
    - **Email**: Unique email identifier used for logging into the StaffX system.
    - **Password**: Set a password for the account, along with **Password Confirmation** to avoid errors.
2. **Account Configuration**:
    - **Default Printer Group**: Assign a default printer group if the staff member will be interacting with specific printing tasks. This is particularly useful for POS roles where receipts or tickets need to be printed regularly.
    - **Staff App Timeout** ⏳: Set the session timeout in seconds to control auto-logout for inactive sessions.
    - **Type**: Choose between **General** (accessible for all events) or **Specific Events** if you want to restrict this account's access to particular events only.
3. **Role and Permissions Assignment**:
    - **Roles**: Select a role from the pre-defined options to assign permissions collectively. Roles are recommended for standardized control.
    - **Direct Permissions**: If no role is assigned, you can manually toggle individual permissions, such as **Sales Manager**, **Order Flow**, **Reporting**, and **Check-In**.
    - **Full Permissions**: Option to enable full access to all features and functions in StaffX and AdminX.
    - **AdminX Access**: Toggle this option if the staff member should have access to the AdminX platform (use with caution as it grants broad access).
4. **Save**: Once all fields are completed, click **Save** to create the new staff account.

*Note*: It is recommended to consult the PM when assigning critical roles and permissions to ensure alignment with event policies.

---

### 📑 Staff Imports Log

The **Staff Imports Log** tracks each bulk import action with details on:

- **Date**
- **Status**
- **Errors**
- **Imported Count**
- **Total Items**

Use this for troubleshooting and ensuring successful staff onboarding.

## 📲 Self Order

The **Self Order** feature enables users to place orders directly by scanning a QR code for a specific spot or table location. This functionality requires setting up **Spots** (QR codes or manual locations) and configuring the **Sales Catalogue** to activate self-ordering options within ClientX. This guide provides a step-by-step overview of creating, configuring, and managing Self Order spots and sales catalogue configurations.

---

### 📍 Overview of All Spots

In **Spots Manager**, you can view and manage all created spots for self-ordering. Each spot corresponds to a specific location where a user can place an order, such as:

- Tables (e.g., Table 1, Table 2)
- Zones (e.g., VIP area, General seating)
- Other designated areas (e.g., DJ Booth, Bar area)

### Key Actions:

- **🔍 Search**: Quickly find specific spots by name.
- **✏️ Edit**: Modify details for an existing spot.
- **🗑️ Delete**: Remove a spot from the system.
- **📥 Download (Single)**: Obtain the QR code for a specific spot, allowing users to scan and order from that location.
- **📥 Download (All)**: Download all created spots' QR codes in a batch, useful for printing and distributing in event areas.

---

### ➕ Create a New Spot

To create a new spot for self-ordering, follow these steps:

1. **Name (Friendly ID)**: Assign a unique, easily recognizable name to the spot. For example, use names like "Table 1," "VIP Zone," or "Bar Area" for better identification.
2. **Sales Catalogue Configuration**:
    - Select an active sales catalogue configuration to link to this spot.
    - **Note**: The sales catalogue setup defines which menu items are available for self-ordering from this spot. This configuration should be checked with the PM to ensure alignment with sales and event policies.
3. **Manual Location**:
    - Toggle on **Manual Location** if you want users to select a specific (sub-)location after scanning the spot’s QR code. This feature is particularly useful when one QR code serves multiple locations, such as a group of tables (e.g., “Table 1, Table 2, Table 3”) or if you just want to enable self order with manual location selection.
4. **Save**: Once all fields are complete, click **Save** to create the spot.

---

### 🛒 Sales Catalogue Configuration

**Sales Catalogue Configuration** is essential for controlling the menu items available for each self-order spot. This part should always be reviewed with a PM due to its impact on event sales strategy and setup complexity.

### Steps to Configure Sales Catalogue:

1. **Name**: Enter a descriptive name for the sales catalogue configuration.
2. **Event**:
    - Assign the event that this configuration applies to, or select **No specific event** if it’s a general setup.
3. **Time Restrictions**:
    - **Starts at** and **Ends at**: Define the active period for this sales catalogue, controlling when items are available for order.
4. **Sales Catalogue Selection**:
    - Choose the sales catalogue (e.g., OASIS BAR) that will be used for this configuration.
5. **Auto-Open Self Order**:
    - Enable this option to automatically open the self-order menu when users access a spot. This streamlines the ordering process for end-users.
6. **Available Spots**:
    - Assign spots to this sales catalogue configuration, defining where users can place orders from.
7. **Save**: Click **Save** to activate the sales catalogue configuration.

*Note*: Consult the PM to ensure the setup aligns with sales and event logistics.

## 📅 Timetables

The Timetables feature is designed to manage and schedule various activities, such as performances, talks, or events, across designated tracks or stages. For a timetable to be visible in **Clientx**, ensure it is enabled in **Adminx > Settings > App > App Menu**.

---

### 🗂️ Overview of All Timetables

- **Description**: This section provides a complete overview of all created timetables. You can have multiple timetables, and only those with the **Published** status will appear on Clientx for end-users.

### 🎼 Tracks

- **Definition**: Tracks are integral parts of a timetable. Think of each track as a distinct stage, area, or zone where activities will be scheduled.
- **Purpose**: Tracks allow you to categorize activities within a timetable, making it easier for users to locate specific events within the schedule.

---

### 🔄 Actions on Timetables

- **✏️ Edit**: Clicking this button lets you modify the details of a timetable. This action opens the **Edit Timetable** page, where you can adjust the timetable’s name, status, dates, and associated events.
- **🗑️ Delete**: Clicking this button allows you to delete a timetable from the system if it’s no longer needed.

---

### 🎤 Activities

- **Core of Timetables**: Activities represent the events or content within a timetable, such as artist performances, speaker sessions, or workshops. Each activity is scheduled within a track and can be further customized.
- **Manage Activities**: Use the **Manage Activities** page to view, edit, or create activities.

### 📄 Creating an Activity

- **Icon**: Upload an icon that will represent the activity on Clientx.
- **Image**: Attach a descriptive image that will be shown in the activity detail on Clientx.
- **Background Color**: Set a background color for the activity’s button on Clientx.
- **Background Color Opacity**: Adjust the opacity of the background color to add a transparency effect, if desired.
- **Detailed Description**: This content can be enhanced with text, images, or embedded media (e.g., YouTube links) to provide engaging details on Clientx.
- **Requirements**: Each activity requires a **name**, **status** (draft or published), **summary text**, and **detailed description** to make it visible and informative for users.

---

### 🆕 Create New Timetable

- **Create Button**: Click **+Create** to initiate a new timetable.
- **Timetable Requirements**:
    - **Name**: Provide a unique name for the timetable.
    - **Status**: Set the timetable’s status to **Published** to make it visible in Clientx.
    - **Dates**: Define the **Start Date** and **End Date** for the timetable’s visibility period.
    - **Events**: Link the timetable to a specific event. This syncs the timetable image with the event’s image on Clientx.

⚠️ **Important**: Make sure to click on the **Add** button after selecting an event. If this step is missed, the timetable won’t be correctly linked to the event and might not display in Clientx.

---

### 🗑️ Bin

- **Purpose**: The **Bin** section provides an overview of all deleted timetables, allowing you to review and restore any accidentally removed timetables.

---

### 🎭 Tracks Management within Timetables

To manage tracks within a specific timetable, click on the **Tracks** button next to the timetable you wish to organize. This opens the **Manage Tracks** section for that timetable.

### 📂 Managing Tracks

- **🆕 Create Track**: Click **+Create Track** to add a new track.
    - **Name**: Provide a title for the track, such as "Main Stage" or "VIP Lounge."
    - **Status**: Set to **Published** for the track to be visible on Clientx.
    - **Description**: Add a description that will help users understand what activities or events this track includes.
- **✏️ Edit**: Use this button to edit the details of an existing track.
- **🗑️ Delete**: Click to delete a track if it’s no longer needed or if the schedule has changed.

---

### ⏱️ Adding Slots to Tracks

**Slots** allow you to allocate specific activities to designated time periods within each track.

### How to Add a Slot:

1. **Click +Add Slot** next to the track where you want to schedule an activity.
2. **Activity**: Choose an activity from the dropdown list.
3. **Background Color**: Set a custom background color to make the slot visually distinct on Clientx.
4. **Start and End Dates**: Define the precise timing for the activity within the track.

This feature allows for a highly customizable schedule and provides an organized view on Clientx for end-users.

---

Each of these sections contributes to a fully interactive and organized timetable, enhancing the Clientx experience by providing a structured and visually engaging way for users to navigate events and activities.

📝 **Note**: Always consult with the PM if there are questions about specific configuration needs or if advanced timetable customization is required.

## 🎟️ Vouchers

The **Vouchers** feature enables the creation of QR code packages with assigned values. These vouchers can be redeemed by **Clientx** and **Staffx** users, and they may also be linked to tickets or staff integrations. Vouchers support handling both with and without RFID.

### 🗂️ Overview of Voucher Groups

- **Description**: Voucher Groups represent a set of vouchers of a specific type. Before generating voucher groups, you must first define voucher types. This section provides an overview of all generated voucher groups.
- **Vouchers** 🏷️: Click this button to view the voucher codes, track their usage status, and download them as a .pdf for easy distribution and reference.

### 🔄 Actions on Voucher Groups

- ✏️ **Edit**: Use this option to edit the details of an existing voucher group.
- 🗑️ **Delete**: Click to delete a voucher group from the system if it’s no longer required.

---

### 🎟️ Voucher Types

A **Voucher Type** must be created before you can generate a voucher group. This configuration allows you to define specific attributes for vouchers, including appearance, validity, and assigned items.

### How to Create a New Voucher Type

1. **Create Button**: Click **+Create** to begin a new voucher type.
2. **Name**: Assign a name to identify the voucher type.
3. **Valid At** & **Expires At** (optional): Define the time frame during which this voucher can be redeemed. If left blank, the voucher will be redeemable indefinitely.
4. **Custom Voucher Layout**: Toggle this option if you wish to upload a custom background image for the voucher. This design feature allows for a unique visual distinction and is displayed on vouchers generated as PDFs.

### Adding Items to a Voucher Type

- **Items**: Each voucher type consists of **items** that are assigned to the voucher.
- **Add Item**: Click **Add Item** to define the contents of the voucher. Items can include:
    - **Tickets**: Select ticket quantities specific to certain events or ticket types.
    - **Wallet Balance**: Assign a specific currency and balance amount.
    - **Tags Assignment**: Define tags that will be allocated to users upon voucher redemption.
- **Save** the voucher type once all items are configured. Voucher types can be associated with multiple voucher groups for various uses.

---

### 🆕 Create New Voucher Group

To generate a new set of vouchers, follow these steps:

1. **Create Button**: Click **+Create** under Voucher Groups.
2. **Name**: Enter a unique name for the voucher group.
3. **Voucher Type**: Select the voucher type previously defined to specify what the vouchers in this group will contain.
4. **Generate Amount**: Enter the number of vouchers to be created within this group.
5. **Dynamic**: Enable this only when advised by the PM, as it’s primarily used for integration purposes.
    - **Note**: When enabled, the voucher items will be generated dynamically and tied to specific entities within the system. Such vouchers cannot be downloaded or exported.

---

### 🎫 Managing Individual Vouchers

Once a voucher group is created, each individual voucher can be monitored and managed:

- **Voucher Codes**: Each voucher in a group is generated with a unique code.
- **Used Status**: The system tracks whether each voucher has been redeemed.
- 🗑️ **Delete**: Remove individual vouchers if necessary.

## 🗺️ Maps

The **Maps** feature enables the creation and management of event maps, helping users easily navigate the event location. To make a map visible in **Clientx**, it must be:

- **Unhidden** in **Adminx > Settings > App > App Menu** (like other chapters that can be toggled for visibility).
- Set to **Published** status.

---

### 🗂️ Overview of All Maps

- **Purpose**: Provides an overview of all created maps. You can manage multiple maps within the system.
- **Visibility**: Maps must be **Published** and **Unhidden** in **App Menu Settings** to be visible in **Clientx**.

---

### 🔄 Actions on Maps

- **✏️ Edit**: Clicking this button allows you to edit an existing map. Modify details such as the name, background image, and status.
- **🗑️ Delete**: This button lets you delete a map from the system if it's no longer needed.

---

### 🆕 Create New Map

1. **Create Button**: Click the **+Create** button to start creating a new map.
2. **Map Requirements**:
    - **Name**: Provide a unique name for the map.
    - **Status**: Set the map’s status to **Draft** or **Published**. Only **Published** maps will appear on **Clientx** if they are also unhidden in **App Menu Settings**.
3. **Map Base**:
    - By default, a map is generated based on a Google Map section that can be adjusted to the event’s location.
    - If preferred, you can upload a custom **Image** to represent your venue or event location visually.
4. **Customizing the Map**:
    - **Background Color**: Set a background color overlay to replace the Google Maps background.
    - **Save and Preview**: Save the original upload and preview it in **Clientx** to ensure accuracy before further customization.
    - **Zoom Controls**: Use the **+** and  buttons to zoom in or out and adjust the view of the map image.
    - **Use Current Map Bounds on Save**: Enable this option to save the current zoom level when clicking **Save**. Refresh **Clientx** (perform a hard refresh) to see the updated view.
    - **Tip**: Adjusting the correct settings for your map display may require testing; consult with the **PM** if assistance is needed, as this feature is subject to future upgrades.

---

### 📂 Bin

- **Purpose**: The **Bin** provides an overview of deleted maps, allowing you to review and restore any maps that were accidentally removed.

# 🃏RFIDs

The RFID feature is essential for managing batches of RFID devices, particularly for large-scale events requiring quick identification and access management. To import RFID data, you’ll need a list of RFID codes provided by the supplier. If you’re using anyKrowd RFID devices, ensure you have the correct batch or box details for the ones you plan to import.

## 🗂️ Overview of RFID Groups

RFID Groups are organized batches of RFID devices. Each RFID Group contains details for the specific RFID codes you’ve uploaded, including their status, processing information, and activation. Here, you can view the list of all RFID Groups, check processing details, and manage their status.

## 🔍 View

Use the **View** option to inspect the specific details of an RFID Group. Each RFID device includes:

- A unique **UID** and **Token**.
- A **QR Code**, which you can view by clicking the “eye” icon. This QR Code allows you to scan and see the guest wallet associated with that RFID.
- **Status** information, showing if it’s a guest wallet or if it’s linked to a specific user.
- **Payconiq** status, indicating if the RFID is enabled for payment.

This view enables you to confirm the details of each RFID, ensuring the devices are ready for the event.

## 💶 Topup

The **Topup** option (accessed by clicking the € icon) allows you to add funds to RFID wallets in bulk for a specific group.

1. **Top Up Amount**: Specify the amount you want to add to each RFID wallet.
2. **Currency**: Choose the currency for the top-up.
3. **Payment Method**: Select the payment method (e.g., *adminx top up*, *cash payment*, or *card payment*).
4. **Reference**: Enter a reference label, which will be visible in Clientx, Staffx, and Adminx for tracking purposes.

This feature is especially useful for distributing funds to specific groups, like crew members or VIP guests, providing them with designated spending power.

## ✅ Activate

Clicking the **Activate** button enables all RFID devices within a group, making them functional for transactions or access. Activation is crucial for allowing RFID devices to work seamlessly at events, ensuring Staffx users won’t need to manually create guest wallets upon each scan. Instead, activated RFIDs automatically create guest wallets, ready for immediate use.

## ✏️ Edit

The **Edit** option allows you to rename an existing RFID Group, keeping your organization accurate and intuitive.

## 🗑️ Delete

The **Delete** button permanently removes an RFID Group from the system. Only use this if you’re sure the RFID Group is no longer needed, as this action cannot be undone.

## ⚠️ Warning Message

If any issues arise during import, such as UID length discrepancies, a warning message will appear. If this happens, consult with the PM to verify the RFID file and ensure correct data formatting before re-uploading.

## 🆕 Create RFID Group

To create a new RFID Group:

1. Click the **+Create** button.
2. **Name**: Provide a unique name for the RFID Group.
3. **File**: Upload the file containing the RFID data. Ensure you use the correct format from the template.
4. Click **Save** to finalize the group creation.

For data formatting, use the downloadable **template file** provided in the top-right corner. Ensure your uploaded data matches the template to avoid import errors.

# ⚙️ Settings

This chapter details the **AppSettings** configuration, which is essential for setting up the core functionality of the anyKrowd platform. **Proceed with caution** and consult a PM before making changes, especially if the online environment or event is live, as certain adjustments may disrupt active configurations.

---

## 🖥️ App

This section covers the general application settings, controlling the fundamental behavior of the platform and clientx user experience.

---

### 📝 Editing Tenant Settings

**Name**

- The **Name** field represents the tenant or clientx (web) app name. The app’s URL slug (web address) often aligns with this name, though it can be modified. Note that this name appears in emails and push notifications sent from the platform.

**💾 Save Button**

- Changes are applied only after clicking "Save." It is recommended to use the **primary "Save" button in the top-right** for consistency, especially after configuring multiple settings on this page.

---

### ⚙️ Toggle Options

- **👁️ Hide Tenant Name**
    - (Un)check this to hide the tenant name on the welcome screen and the wallet section of the clientx home dashboard.
- **🌐 Enable Public Mode**
    - (Un)check this to activate a mode where login is not required for viewing clientx content. Users are prompted to log in only when performing actions that require payment or registration.
- **👥 Enable Full Guest Mode**
    - (Un)check to allow users to explore clientx without any login or account creation prompts. Useful for RFID-focused setups, enabling quick refunds via IBAN, email, and name without formal onboarding.
- **🧾 Enable VAT Printer Tickets**
    - (Un)check to include VAT-compliant details (set in "Accountancy Settings") on tickets printed via printx, creating VAT-compliant tickets for customers if needed.

---

### 📋 Additional Settings

- **📜 Ticket Code Type**
    - Select the default ticket code type. QR codes are recommended, as barcodes are currently unsupported.
- **🔲 Ticket QR Code Size**
    - Choose between "Normal" or "Small" for the size of QR codes displayed in clientx and on printouts.
- **🏷️ Logo**
    - Upload the tenant logo displayed at the top-center of the clientx dashboard. A transparent logo is recommended for a cleaner appearance on various backgrounds.
- **🖼️ Background Image**
    - Set the background image displayed throughout the entire clientx experience.
- **📱 App Icon**
    - This image serves as the app icon in the app stores (max 512x512). Preferably, use an icon with a solid background for better visibility.
- **📲 Enable Install App Popup**
    - Enable this setting to prompt webapp users to download the native app. When enabled, provide iOS (Apple) and Android URLs. Users who accept are redirected to the appropriate app store.

---

### 📂 App Menu Visibility

Control which sections of the app are visible to users by (un)checking relevant boxes under **App Menu to (un)hide any of the chapters visibility in ClientX**

### 🛠️ Setting Toggles

- **🔄 Allow Orders Even if Out of Stock for Clientx**
    - (Un)check to allow orders in clientx even when items are out of stock, enabling flexible stock management.
- **🔄 Allow Orders Even if Out of Stock for Staffx**
    - Same functionality as above, but for orders through staffx.
- **📧 Activate Door Sales Email Field for Staffx**
    - Enable this to allow staff to input an email during door sales. Tickets are sent to the provided email and are automatically checked in upon successful payment.
- **📧 Activate Remote Sales Email Field for Staffx**
    - Similar to door sales but intended for remote ticket sales. Tickets are sent via email and visible in clientx if the email matches a registered user.
- **🛒 Activate Segmented Sales for Clientx**
    - Activates segmented sales, allowing certain products or services to be restricted to specific user segments within clientx. This feature also requires configuration at the product level.
- **🛒 Activate Segmented Sales for Staffx**
    - Similar functionality as above, but applied to staffx sales. Staff will see a prompt if attempting a sale to a user outside the assigned segment, with the option to cancel or continue.
- **🔑 Magic Login for Clientx**
    - Enable to allow users to log in directly from "View Now" email links, primarily used for ticket integrations.
- **📄 Invoicing**
    - Enables invoicing in clientx, allowing users to input company details for personalized VAT-compliant receipts.
- **🧾 Receipt**
    - Automatically sends users a receipt via email for each purchase.
- **🚀 Onboarding for Staffx**
    - Activates onboarding via QR codes generated in **Manage > Staff > Onboardings**.
- **🔗 Link User to RFID on Ticket Scan**
    - Allows linking a user's wallet balance to an RFID identifier upon ticket check-in. Works with voucher groups assigned to ticket types.
- **🔗 Link Ticket to RFID on Ticket Scan**
    - Used in conjunction with the above setting to link tickets to RFID identifiers.
- **👤 Display Ticket User Details on Scan**
    - Shows user details upon ticket check-in via staffx.
- **🔗 Share Wallet Top-Up in Clientx**
    - Activates a "Share Wallet" button in clientx, allowing users to share their wallet link for group top-ups.
- **🔍 User QR Scan at Entrance in Staffx**
    - Allows check-in via personal QR codes in staffx, beyond just ticket QR codes.
- **🎟️ Buy Ticket in Clientx**
    - Enables the "Buy Ticket" button within the events section of clientx, depending on ticket and event configurations.

---

### 🎨 Color Configuration

**🎨 Primary Color**

- Choose the primary color for styling clientx.

**⚙️ Secondary & Tertiary Colors**

- These fields are placeholders for future styling capabilities, anticipated in a future release.

---

### 💳 Payments

Configure payment and refund settings:

- **🕒 Personal QR Code Expiration**
    - Set the expiration time (in hours) for personal QR codes. Default is 999 hours for maximum compatibility with multiday events.
- **🔄 Use Staffx QR Code if Same Email as Clientx**
    - Enables staffx QR codes for logins when using matching email addresses, especially useful for integrations with Eventication or In2Event accreditation.
- **💸 Refund Transaction Cost**
    - Define the fee (if any) for online refunds in clientx. This fee is deducted from the refunded amount.
- **💸 Staffx Refund Transaction Cost**
    - Set the fee for refunds processed onsite via staffx, usually set to 0 for cash refunds.
- **💰 Staffx Default VAT for Manual Products**
    - Default VAT rate for manually entered products in staffx; can be adjusted on a case-by-case basis.
- **💸 Charge Top-Up Fee to Customer (Staffx)**
    - Enable or disable a fee for each top-up processed onsite via staffx. Online top-up fees can only be adjusted by an anyKrowd PM.
- **🛡️ Include Product Warranty in Product Price (Staffx)**
    - (Un)check to include or exclude warranty costs from product prices shown in staffx sales catalogs.

### 🔄 Refund Settings

Enable and configure refund-related options:

- **🔄 Enable Refund**
    - Activates the refund feature in clientx, displaying a "Refunds" button for users. When enabled, additional settings become available for detailed control over refund options.
- **📢 Refund Information Banner**
    - Set a custom message for the refund page, explaining the process, costs, or timelines involved. This helps manage user expectations and reduce support queries.

### Additional Refund Options:

- **🔄 Manual Online Refund**
    - Allows users to request refunds for online top-ups through clientx.
- **🔄 Top-Up Packages Refund**
    - Enables refunds for top-up packages. When disabled, only free amounts (not part of packages) are refundable.
- **📅 Online Refund: Top-Up Age**
    - Define how many days a top-up can remain eligible for refunds. For example, if set to 7, top-ups older than 7 days won’t be refundable.
- **🔄 Manual Refund of Staffx Top-Ups**
    - Allows refunds for onsite top-ups via staffx. If disabled, only online top-ups will be eligible for refunds.
- **🕒 Manual Refund Processing Days**
    - Set the estimated number of days for processing refunds. Displaying this timeframe on the refund page can help manage user expectations.

---

### 🔄 Payment Method Settings

Configure various payment methods and additional charges:

- **🏷️ RFID Addon Type**
    - Placeholder functionality; not currently active. This will allow adding or discounting charges for RFID-based payments in a future release.
- **🏷️ QR Addon Type**
    - Placeholder functionality for future QR-based discounts or charges.
- **💵 Enable Cash Payments**
    - Activate the "Cash" payment option in staffx. Configure the **Cash Addon Type** to apply a specific charge, either a fixed amount, a percentage, or no added charge.
- **💳 Enable Card Payments**
    - Activates the "Card" payment option. If **Card Present Payments** is disabled, a confirmation screen will appear to ensure the payment has been processed outside anyKrowd’s platform.
- **📡 Enable RFID**
    - Allows RFID-based payments in staffx, letting users pay with RFID cards or wristbands.
- **🔍 Enable QR**
    - Enables QR code payment in staffx, allowing users to pay via app QR codes.

---

### 🧾 Card Creation Costs

Define general costs for creating RFID cards or wristbands for wallets:

- **Enable Card Creation Costs**
    - Activate this feature to apply charges for creating RFID cards/wristbands. Configure separate costs for new users, existing users, and set a default VAT rate. This charge is automatically added to the first top-up of a newly created guest wallet with an RFID attached.

---

### 🌐 Online Payment Settings

Configure online payment options and external provider integrations:

- **Online Payment Type**
    - Choose an external provider like **VivaWallet** or **Mollie**. Alternatively, select "Disabled" if online top-ups are not allowed.
- **VivaWallet Merchant ID**
    - Input your VivaWallet Merchant ID, which can be found in your Viva account under **Settings > API**.
- **VivaWallet Source Code (Optional)**
    - Set a specific source code for funds if needed. This can help with categorizing incoming payments in your Viva account.
- **VivaWallet Enable Automated Bank Transfers for Refunds**
    - Currently inactive. Future functionality to support automatic online refunds.
- **VivaWallet Multi Merchant Mode**
    - Enables MMID mode, allowing easier device onboarding and backup fund transfers to anyKrowd in case of misconfigurations.
- **Payconiq Preferred Mode**
    - Activates a Payconiq-branded design for the clientx wallet, enhancing the Payconiq experience.
- **Payconiq Top-Up**
    - Enables direct top-up via Payconiq QR codes, which can be printed on cards or wristbands for user convenience.

### Accepted Payment Methods:

- **💳 Payment Method: Credit Card**
    - Enable credit card payments.
- **💳 Payment Method: iDEAL**
    - Enable iDEAL payments (Netherlands-specific).
- **💳 Payment Method: Apple Pay**
    - Enable Apple Pay.
- **💳 Payment Method: Google Pay**
    - Enable Google Pay.
- **💳 Payment Method: PayPal**
    - Enable PayPal.
- **💳 Payment Method: Bancontact**
    - Enable Bancontact (Belgium-specific).
- **💳 Payment Method: Payconiq**
    - Enable Payconiq payments.
- **🌍 Select Payment Countries**
    - Choose specific countries for which certain payment options are available. This feature filters or enables payment options on the Viva web payments page based on the user’s selected country.

---

### 👋 Welcome Page

Customize the **Welcome Page** content, which appears to users prompted to log in or create an account. This screen is the first interaction for users unless **Public Mode** or **Full Guest Mode** is enabled.

- **Welcome Title**
    - The title displayed at the top of the welcome page.
- **Welcome Line**
    - A friendly line or message displayed below the title, easing users into the login or signup process.

---

### 🧾 Accountancy Settings

Important settings for VAT compliance and valid ticketing:

- **Invoice Prefix**
    - Define a prefix for invoices generated by anyKrowd, helping differentiate these from other invoices in your bookkeeping.
- **Company Information**
    - Input the company name, VAT ID, IBAN (and BIC), and full address. This data is used on VAT tickets and refund processing documents, especially for SEPA file generation in the refund manager.

---

### 💰 Wallet Top-Up

Configure wallet top-up options for both clientx and staffx users.

- **💵 Enable Free Input**
    - Enable or disable the option for users to input a custom top-up amount.
- **📦 Enable Top-Up Packages**
    - Allow users to select from predefined top-up packages. **Add Package** to create new packages, each with its own configuration:
        - **📛 Name**
            - Name of the package, displayed to users.
        - **📝 Description**
            - Brief description visible in clientx.
        - **📷 Icon**
            - Upload an icon for the package, or leave it blank to use the default clientx icon.
        - **💲 VAT Percentage**
            - Set a VAT rate for the package, varying by country or purpose.
        - **💰 App Price / On-Site Price**
            - Configure different prices for app (clientx) and onsite (staffx) purchases, supporting promotional pricing or variations.
        - **🏷️ Assign Tags**
            - Tags can be used to categorize packages, such as creating a package that activates a membership upon purchase.
        - **🪙 Package Contents**
            - Add multiple currencies or values, e.g., a €50 + €10 bonus package. Currencies can vary to make parts of a package refundable or non-refundable.
- **🧾 Client Can Generate Invoice for Top-Up**
    - Allow clients to add their company details and receive an invoice for the top-up.
- **💵 Minimum Amount Required**
    - Set a minimum top-up amount for custom entries, encouraging package purchases or larger custom amounts.
- **📢 Introduction Before Top-Up Message**
    - Message displayed on the top-up screen. Use variables like,, etc., to personalize the message.
- **📢 Confirmation Message After Successful Top-Up**
    - Display a custom message after a top-up completes, which can include sponsor messages or additional info.

---

### 🆔 RFID Devices

Displays the total count of RFID devices (cards/wristbands) connected to the platform. Be cautious when using **Disconnect Devices**, as this will remove all connected devices. Consult with a PM before proceeding.

---

### 🔔 Notifications

**Note**: This feature is currently inactive. No configuration is needed.

---

### 📑 App Content

Manage legal texts for your app:

- **Terms & Conditions** and **Privacy Policy**
    - Customize these essential documents to reflect the tenant’s policies. Accurate setup is necessary before filing for a native app, as app store approval requires completed terms and privacy policies. anyKrowd provides templates, but these can be customized.

---

### ⏰ Wallet Expiry

Set wallet expiration options. Use caution, as changes take effect immediately upon saving:

- **Expiration Types**:
    - **Expire on Date**: Expire wallets on a specific date.
    - **Expire After Inactivity Days**: Set an automatic expiration after a defined period of inactivity, commonly used to encourage regular usage (e.g., for clubs or recurring events).
    - **Expire Immediately**: Immediately expire all wallets on confirmation.

---

### 🎫 Custom Ticket Layout

Enable custom ticket designs for all events and ticket types within this tenant. This setting can also be applied individually at the event or ticket level.

---

### 📲 Migration Message (Clientx V1)

Displays a message on old V1 apps instructing users to update to V2. Useful for directing users to the app store to download the latest version, ensuring compatibility with platform changes.

## 🎉 Discounts

The **anyKrowd Discount System** enables various types of discounts, allowing flexibility in pricing and promotions across different transaction types. Discounts can be set globally or applied specifically to sales, tickets, bookings, or webshop purchases. Currently, segmented discounts and discounts based on payment type are under development, so this functionality should be avoided until the V2 migration completes.

### 🌍 Global Discount

This feature allows a platform-wide discount applicable to all payments:

- **Discount Name**
    - Enter a name for the discount, which will be displayed wherever the discount is applied.
- **Discount Type**
    - Select the type of discount:
        - **Percentage of Price**: Applies a percentage-based discount.
        - **Fixed Amount**: Deducts a fixed amount from the total price.
- **Discount Amount**
    - Specify the value of the discount based on the selected type.

💾 Saving this configuration in the top-right corner enables the global discount. To disable it, click the "Delete" button and save the changes again.

---

### 💸 Sales Discount

This discount applies exclusively to **Sales transactions** managed through Staffx.

- **Discount Name**
    - Input the name for this discount, specific to sales transactions.
- **Discount Type**
    - Choose between:
        - **Percentage of Price**
        - **Fixed Amount**
- **Discount Amount**
    - Define the discount amount based on the selected type.

💾 Save in the top-right corner to activate the Sales Discount. Delete to remove the discount from the platform.

---

### 🎟️ Tickets Discount

This discount is specifically applied to **Ticketing transactions**.

- **Discount Name**
    - Name the discount to clarify it applies to tickets.
- **Discount Type**
    - Select the discount type:
        - **Percentage of Price**
        - **Fixed Amount**
- **Discount Amount**
    - Set the discount value according to the chosen type.

💾 Save in the top-right corner to enable the Tickets Discount. Use "Delete" to disable it.

---

### 📅 Bookings Discount

The Bookings Discount is intended solely for **Bookings transactions**.

- **Discount Name**
    - Enter the name for the bookings discount.
- **Discount Type**
    - Choose from:
        - **Percentage of Price**
        - **Fixed Amount**
- **Discount Amount**
    - Specify the discount amount based on your chosen type.

💾 Save to apply this discount to bookings. Delete to remove the discount.

---

### 🛍️ Webshop Discount

Apply this discount exclusively to **Webshop transactions**.

- **Discount Name**
    - Name the discount to indicate its application within the webshop.
- **Discount Type**
    - Select the type of discount:
        - **Percentage of Price**
        - **Fixed Amount**
- **Discount Amount**
    - Define the discount amount based on the selected type.

💾 Click "Save" to activate the Webshop Discount, and use "Delete" to disable it.

## 🎫 Tags

Tags are fundamental to anyKrowd’s platform, serving as building blocks for **user segmentation, targeted interactions, and customized user journeys**. By tagging users with specific identifiers, you can segment them into various categories, enabling personalized communication, access control, and exclusive offerings. This is particularly useful for events, where specific groups of attendees (e.g., VIP guests, staff, different music fans) may need tailored experiences.

anyKrowd distinguishes between two main types of tags:

1. **Public Tags**: Visible to users in Clientx, allowing them to select or identify interests themselves - When displayed it shows in Black
2. **System Tags**: Hidden from end-users and used exclusively within Adminx, facilitating backend segmentation and operational control. - When displayed it shows in Grey

Let’s dive into each type and how they can be effectively used:

---

### 👥 Public Tags

Public Tags appear in Clientx as Interests, where users can view and select tags that align with their preferences or interests. These tags help users filter content and give admins the flexibility to create interest-based experiences. Public Tags also aid in **self-segmentation**, allowing users to opt into categories that resonate with them, enhancing engagement and relevance.

### Creating a New Public Tag

To create a Public Tag, follow these steps:

1. Go to **Settings > Tags** and ensure you are in the "Public Tags" section.
2. **Click on “+Create”** in the top-right corner to access the tag creation form.
3. **Name**: Provide a descriptive name (e.g., #techno, #house, #urban, #top50). Names should be intuitive to users and align with interests or segments you want to define.
4. **Parent Tag** (optional): Choose an existing tag as a parent if you want to create a tag hierarchy.
5. **Expiration Days**: Define the duration (in days) the tag should remain active. For example, if the tag is part of a limited-time campaign, set it to expire at the end of the promotion.
    - *Upcoming Feature*: Future releases will allow setting expiration in hours or by specifying a fixed date and time, giving more precision for temporary or event-based tags.
6. **Type of Tag**: Ensure this is set to “Public” so it’s visible to users within Clientx.
7. **For New Users**:
    - **Auto-assign to new users**: Toggle this to automatically assign the tag to every new user. This is ideal for universal tags like #NewUser or #WelcomeMember, where all new sign-ups receive the tag.
8. **For Existing Users**:
    - **Do Nothing**: Choose this if you don’t want to apply the tag to any current users.
    - **Add to Everyone**: Use this option to assign the tag to all existing users in bulk (may take a few minutes with large databases).
9. **Save the Tag**: Click **Save** in the top-right corner to finish. The tag will now be listed in Public Tags and will be selectable by users in Clientx.

### Practical Use Cases for Public Tags

Public Tags are especially useful for interest-based tagging, allowing users to personalize their experience based on what they enjoy. Here are some examples:

- **Music Interests**: Tags like #techno, #house, #urban, #top50 can allow users to select their preferred music styles, helping them navigate to relevant content and events within Clientx.
- **Access Levels**: Use tags such as #VIP or #GeneralAccess to let users identify their access level, giving them visibility into what’s accessible based on their status.
- **Event-Specific Interests**: For multi-genre festivals, users can select tags based on the stages or zones they prefer, like #MainStage or #ElectronicZone, making their experience more tailored to their tastes.

**Tip**: Encourage users to update their Public Tags based on their evolving preferences. This keeps their experience personalized and relevant.

### Editing or Deleting a Public Tag

- **Edit**: Click the **Edit** icon next to a tag to adjust its details, such as changing the name, updating the expiration, or modifying assignment settings.
- **Delete**: Click the **Delete** icon to permanently remove the tag from the platform. This action removes the tag from all users.

---

### 🔒 System Tags

System Tags are internal and do not appear to users within Clientx. Instead, they allow admins to create complex segmentation behind the scenes. These tags can be used for backend operations, such as differentiating user types, setting access controls, or enabling targeted notifications to specific groups.

System Tags offer **enhanced flexibility and control** over how users are grouped and managed. Here’s how to use them effectively:

### Creating a New System Tag

To create a System Tag, follow these steps:

1. In the **Tags** section, switch to “System Tags” by selecting it from the menu.
2. **Click on “+Create”** in the top-right corner to access the System Tag creation interface.
3. **Name**: Enter a name for backend use (e.g., #InternalStaff, #Member, #BigSpender, #NoSpending). The name should clearly indicate its purpose.
4. **Expiration Days**: Define the number of days the tag should remain active.
    - *Upcoming Feature*: Future versions will allow for expiration in hours or by specifying an exact date and time, ideal for tags that should expire at the end of a specific event or period.
5. **Type of Tag**: Ensure “System” is selected to mark it as backend-only.
6. **For New Users**: Enable auto-assignment if all new users should automatically receive this tag.
7. **For Existing Users**: Use this setting to apply the tag to all current users if needed.
8. **Save the Tag**: Click **Save** to complete. The tag will now be available in Adminx under System Tags for backend operations.

### Practical Use Cases for System Tags

System Tags offer flexibility and precision for internal management. Below are some examples to illustrate their value:

- **User Spending Behavior**:
    - **#BigSpender**: Use this tag to identify users who frequently make high-value purchases. You could then send them exclusive offers or early access to events as a reward.
    - **#NoSpending**: Tag users who haven’t made any purchases to target them with promotions or incentives, encouraging them to engage with the platform.
- **Staff and Artist Management**:
    - **#InternalStaff**: This tag allows you to send updates or push notifications exclusively to staff, ensuring operational messages reach the intended audience.
    - **#Artist** or **#VIPGuest**: For events, tag artists or VIP guests separately (or automatically via a voucher that they redeem). This segmentation can help with personalized event access, benefits or backstage management.
- **Membership and Loyalty Programs**:
    - **#Member**: Tag users as members to grant them exclusive privileges, such as discounted tickets or access to members-only content. This can also be used to track and analyze membership behavior for loyalty programs. These tags can also be configured inside a voucher, top-up package & ticket type or imported via “Prospects” onto the platform.

**Tip**: System Tags are powerful for backend segmentation. Use them to refine your audience for operational messages, exclusive access, or targeted promotional campaigns. Regularly update System Tags to ensure accuracy as user behaviors and event requirements evolve.

### Editing or Deleting a System Tag

- **Edit**: Modify tag details by clicking the **Edit** button. You can adjust the expiration, name, or assignment settings.
- **Delete**: Remove the tag by clicking **Delete**, which will permanently dissociate it from all users.

---

### 🔄 Tag Sequences

*Note: Tag Sequences are currently under development and are not functional at this time.*

Tag Sequences will eventually allow for **automated workflows triggered by tag assignments**. This feature is ideal for managing user journeys based on their status or activities. For example, a new user tagged as #NewUser might enter a sequence that sends them onboarding messages or guides them through the platform’s key features over a series of days.

**Example Use Case for Tag Sequences**:
Once activated, a Tag Sequence could guide users tagged with #VIPGuest through a customized welcome series #step1 - #step2 - etc, introducing them to premium features or exclusive access. This type of automation enhances user engagement and ensures they experience the full value of their VIP status.

## 🎯 Segments

Segments in anyKrowd are incredibly versatile and offer powerful ways to categorize, engage, and target specific user groups for various marketing and operational strategies. By using segments, you can create specific audience subsets based on detailed criteria, allowing for personalized engagement that enhances the user experience and drives conversions. This segmentation tool can significantly boost event participation, maximize sales, and deepen user loyalty.

Segments leverage a combination of **Tags**, **Filters**, and **User Attributes**. This enables event organizers and administrators to create audience-specific experiences, whether by offering exclusive deals, customizing content, or delivering specialized notifications.

---

### 🔍 Why Use Segments?

Segments provide a powerful method to tailor experiences and communication with precision. By setting up segments, you can:

- **Increase Engagement**: Customize notifications and promotions to make them more relevant.
- **Drive Revenue**: Identify high-value customers and offer them exclusive deals, encouraging spending.
- **Build Loyalty**: Reward regular attendees or early adopters with special privileges or access to VIP areas.
- **Operational Efficiency**: Segment staff or volunteers (e.g., #InternalStaff) for targeted communication, ensuring smooth event operations.

These benefits are essential for creating a personalized, impactful event experience that not only meets but exceeds user expectations.

---

### 💡 Practical Examples of Segments

To better understand how segments work, here are some real-world examples of segments you might create:

- 🛍️ **High Spenders**: Users who have spent over a specific threshold, such as 100€ on merchandise. This segment is ideal for targeting with exclusive offers like early access to new merch or discounted bundles.
- 🕺 **Music Preferences**: Create segments based on users' music interests by using public tags such as #techno, #house, #urban, and #top50. With this, you can target specific music lovers with event invitations tailored to their favorite genres, improving attendance and satisfaction.
- 🎂 **Birthday Special**: Users whose birthdays fall within the current month. This segment can receive birthday discounts or special offers, fostering a personal connection with your brand.
- 👩‍💼 **Staff Notifications**: Use system tags like #InternalStaff to send notifications exclusively to your team, ensuring only staff receive operational messages. Similarly, segments like #artists or #vipguests are useful for specialized notifications.
- 🌍 **Regional Audience**: Users from a specific region who have attended previous events. This is useful for location-based campaigns and invitations for local events or guests.

---

### 📋 Segment Management: Overview, Active, and Deleted

The **Segments** page provides an organized view of all segments, divided into three categories for ease of management:

1. **Overview**: Displays all existing and previously created segments. You can quickly view all the segments that have been set up, along with their current configurations.
2. **Active**: Shows only the active segments that are currently in use and accessible for campaigns, targeting, or analysis.
3. **Deleted**: Lists segments that have been marked for deletion but may still be recoverable. This is a useful archive for segments that may need reactivation.

> Tip: Regularly review and update your segments to ensure they are aligned with your event goals and user engagement strategy.
> 

---

### 🔍 Viewing and Analyzing a Segment

Clicking the **View** button opens the segment details page, where you can perform several key actions:

- **Adjust Filters**: Modify the criteria of the segment based on updated requirements.
- **Export Users**: Export the segment data in **CSV** or **XLSX** format for offline analysis or import into other systems.
- **Mass Assign Tags**: Quickly assign a new tag to all users within the segment, allowing you to further categorize or adjust their status.

This view is essential for keeping your segments relevant and ensuring that the user data aligns with your current campaign or operational goals.

> Important Note: The +Create / Imports & Prospects button on the top navigation is not for creating new segments. It’s designed for user chapter operations and can be confusing. Always use the +Create button within the segments section to create new segments.
> 

---

### ✏️ Editing an Existing Segment

The **Edit** option allows you to make modifications to an existing segment's configuration. This is useful if you need to update the segment's filters or criteria without creating a new segment from scratch.

> Warning: Changes to active segments can impact any ongoing campaigns or user engagement strategies linked to that segment. Always verify that modifications align with your goals before saving changes.
> 

---

### 🗑️ Deleting a Segment

Use **Delete** to remove a segment from your list. Deleted segments are moved to the **Deleted** category and can still be recovered unless permanently removed.

> Best Practice: Archive segments that you may reuse in the future, rather than permanently deleting them. This ensures you don’t lose valuable configurations or insights.
> 

---

### ➕ How to Create a New Segment

To set up a new segment, follow these steps:

1. **Click +Create**: Locate this button in the top-right corner of the segments page to begin a new segment.
2. **Name the Segment**: Choose a descriptive name for easy identification. This could be based on the segment’s purpose, e.g., "VIP Spend Over 100€" or "August Birthdays."
3. **Add Filters**: Click **Add Filter** to start setting specific criteria. A wide variety of filters are available, allowing for highly targeted segmentation.

---

### 🔄 Available Filters

Each filter adds specific conditions that users must meet to be included in the segment. Here’s an in-depth look at each filter option and its use case:

- **Admin**: Currently not in use, reserved for future functionality.
- **Approved**: Tracks whether an account has been approved. (This is typically used in a registration workflow but not actively in use currently.)
- **Firstname / Lastname / Full Name**: Standard fields for name data, mandatory by default.
- **Nickname**: Optional user-definable field. Not used in all tenant setups but can be enabled if needed for personalization.
- **Postal Code**: Useful for creating geographic-based segments.
- **Function Title**: Typically used for corporate events where users’ job roles are relevant for targeting.
- **City**: Another geographic filter, especially useful for local or regional events.
- **Gender**: Enables demographic-based segmentation.
- **Email**: Required data field; useful for campaigns involving email communication.
- **Created**: Filters users by the date they created their account.
- **Date of Birth / Birthday**: These allow you to target users based on specific dates.
- **Birthday Month**: Ideal for monthly birthday promotions, selecting users with birthdays in a specific month.
- **Age**: Segment users by age, useful for age-restricted content or promotions.
- **Tags**: This filter allows for selection of public or system tags, creating powerful, combined targeting capabilities.
- **Is Contributor**: Not currently in use, reserved for future functionality.
- **Spent**: Filter based on user spending behavior. Currently considers only the default currency.
- **Amount of Events**: Filter based on the minimum number of events a user has attended, helping target loyal attendees.
- **Quiz Tier**: Not yet active, reserved for future use.
- **Has Attended Event**: Track attendance at specific events.
- **Has Tickets for Event**: Filter based on users who have tickets for specific events.

> Tip: Combine multiple filters to create very specific segments. For instance, you could filter users who are both female and under 30 and have spent over 50€.
> 

---

### 📌 Tag Assignment in Segments

Tags play a pivotal role in the segmentation process, offering a flexible way to both categorize users and dynamically manage audience groups based on real-time interactions. When setting up segments, tags can be used in two ways:

1. **Filtering on Existing Tags**: If users already have tags assigned to them (e.g., `#techno`, `#BigSpender`), you can filter on these tags to create a segment. This approach is ideal for refining your audience based on their pre-existing preferences or characteristics. Combined with other filters, it allows for highly targeted segment creation.
2. **Assigning Tags in New Segments**: When you create a new segment, you can choose to assign a tag to all users who fall into this segment dynamically. This is a "living" segment, meaning the tag assignment happens in real-time as users meet or leave the criteria of the segment. This feature is especially useful for time-sensitive campaigns or operational needs, as the tag reflects the user's current segment status.

> Note: Tags assigned within a segment remain active for users as long as they are part of the segment. Once they no longer meet the segment criteria, the tag is automatically removed.
> 

---

### 🎯 Use Cases for Public and System Tags in Segments

Tags offer a dynamic way to further categorize users within segments, allowing for refined, highly customized targeting:

- **Public Tags**: Visible to users and generally used for personal interests or self-selection. Public tags make it easy to categorize users based on their preferences, enhancing their experience with tailored content and offers. Examples include:
    - `#techno`, `#house`, `#urban`, `#top50` – These tags help users select their preferred music styles, which can then be used to notify them about events featuring those genres.
    - **Use Case**: Target users tagged with `#house` for exclusive early-bird tickets to upcoming house music events. This creates a sense of personalization and enhances user engagement.
- **System Tags**: Hidden from users and primarily used for backend segmentation and operational needs. These tags enable efficient management and communication with specific user groups without impacting their visible profile. Examples include:
    - `#BigSpender`: Tag users who have spent significantly, enabling targeted rewards like loyalty discounts or exclusive merchandise offers.
    - `#NoSpending`: Identify users who haven’t made a purchase, allowing you to design campaigns encouraging their first spend, such as discounts on initial purchases.
    - `#InternalStaff`: This tag is crucial for internal communication, letting you send operational updates only to staff members without confusing other users.
    - `#vipguests`: Segment VIP guests for exclusive access notifications or personalized messages regarding special event privileges.

Using both public and system tags within segments allows for a comprehensive, granular targeting strategy that can significantly enhance user engagement and operational efficiency. Whether for personalized event invitations, operational updates, or exclusive rewards, tags empower you to maintain precise control over user interactions and messaging.

---

### 💾 Saving and Managing New Segments

After configuring the filters:

- **Click Save** to activate the segment.
- This segment will then appear under the **Active** segments list.

It’s important to keep segments organized and up-to-date. Ensure that each segment serves a clear purpose and aligns with your event goals.

> Pro Tip: Always test segments before launching major campaigns to confirm they meet your criteria. A well-optimized segment setup can save time and improve campaign effectiveness by delivering messages to the right audience.
> 

## 📠 Devices (Printers)

The **Devices** section primarily refers to printer devices at this stage. This module allows for the setup and management of printer devices within **anyKrowd**, facilitating the printing of tickets, receipts, or other event-related materials. Devices are organized into **Device Groups**, which can be linked to specific products, categories, or user roles, thus streamlining the printing workflow based on event needs.

These devices leverage **PrintX**, an external software that scans and identifies available printers on the network (often running on a NUC mini-computer). Once identified, these printers are accessible for configuration and use within **Adminx**.

---

### 📋 Overview of Devices: Groups (Printer Groups)

In this section, you’ll find a list of all created **Device Groups**. Each group can be customized and associated with specific event requirements.

- **Purpose**: Organize and assign printer groups based on event needs or logistical constraints.
- **Edit/Save Functionality**: Edit a group to assign printers and click **Save** in the top right corner to confirm changes.

---

### 🔑 API Keys

API Keys are essential for establishing a secure connection between **PrintX** software and **Adminx**. This connection allows PrintX to communicate with anyKrowd’s platform, registering devices that are available for use.

- **Creating an API Key**:
    - Click **API Keys** to create a new key.
    - The **Operations/Field department** typically handles API setup and device registration on-site. Contact them for assistance if you encounter issues.

---

### 🆕 Create New Device Group

Creating a **Device Group** allows for organizational flexibility in managing which devices are linked to specific areas, users, or event aspects.

- **Steps to Create**:
    - Click **+ Create** to initiate a new Device Group.
    - Enter a **Name** for the group. This name should reflect the function or placement of the devices (e.g., “Main Entrance Printers” or “VIP Area Printers”).
    - Optionally, mark **Set as default** if this group should be the primary choice for all printing activities.
    - Click **Save** to finalize the creation.
- **Use Cases**:
    - **Default Group**: Set a frequently used device group as default for events with standard printing needs.
    - **Specific Groups for Roles**: For example, create separate groups for **staff roles** such as “Front Desk Staff Printers” and “Merchandise Printers.”

---

### 🎯 Practical Applications of Device Management

The **Device Groups** feature in anyKrowd allows for highly customized and efficient printing setups tailored to the specific needs of your event’s layout and operational flow. Here are some practical applications:

- **Bar or Location-Specific Printing**: Create a **Device Group** for each bar or location that requires printing services. For example, a group called “Main Bar Printers” or “VIP Lounge Printers” can be set up to handle orders specific to these areas. This setup ensures that each bar or location has its own printing workflow, minimizing confusion and improving service speed.
- **Waiter and Bartender Coordination**: Set up a **Device Group** dedicated to each (group of) waiter(s) paired with a specific bartender. This allows the bartender to fulfill tickets exclusively generated by their assigned waiter(s), streamlining order processing and enhancing service coordination. For example, “Waiter Group 1 Printers” could be set up to route orders directly to a bartender dedicated to that waiter group.
- **Dedicated Printing for Bars, Kitchens, and Cocktail Bars**: Configure separate **Device Groups** for each service area, such as the bar, kitchen, and cocktail bar. By assigning categories or products to these groups (e.g., drinks to the bar, food items to the kitchen, and cocktails to the cocktail bar), each item on an order can print simultaneously in the respective preparation area. This setup allows each section to prepare items in parallel, enhancing order accuracy and reducing wait times for customers.
- **VAT Ticket Reprinting**: Create a **Device Group** specifically for (re)printing VAT tickets. If a visitor requests a physical VAT receipt, you can easily reprint the necessary ticket from a dedicated VAT printer without interrupting other operations. This group can be labeled “VAT Ticket Printers” for easy identification.
- **ECO Return Points for QR Refunds**: Designate a **Device Group** for ECO Return Points that handle QR Refund printing. This setup allows each ECO Return Point to print receipts with QR codes indicating the eco value, which visitors can scan to request a refund to their bank account. This is particularly useful for events with eco-friendly practices, where attendees can return items and reclaim their eco deposits efficiently.
- **Self-Order Area Support**: Set up **Device Groups** for self-order areas, ensuring that specific printers handle orders from these locations. Dedicated bartenders and runners can then focus on fulfilling orders placed through self-service kiosks or mobile apps. This setup enables faster service in self-order areas and ensures these orders are directed to the correct preparation stations.

---

By leveraging **Device Groups** with these use cases in mind, you can create a seamless and efficient printing infrastructure tailored to your event’s needs. Each group functions independently, ensuring targeted, accurate printing for different sections and services within your event. Collaborate with the **Field/Operations team** to finalize setups, especially for complex workflows or multiple device integrations.

## 📝 Registration Settings

These settings define the core requirements for every tenant’s setup. They control what data fields users see and are required to fill in during account creation to access the platform. Configuring these settings is one of the first steps when onboarding a new tenant.

---

### **General Settings**

- **User Registration Approval**:
    - Enabling this option activates an approval process for user registrations. Every user account created must be approved by an admin before the user can log in and access the platform. This feature is particularly useful for private communities or exclusive member clubs where access needs to be controlled.
    - ⚠ **Note**: This feature is still under testing and is currently not widely used.
- **Ask New Users for Interests**:
    - This feature prompts new users to select their interests (based on Public Tags) during signup. Interests are typically used to personalize the user experience in Clientx.
    - You can configure these interests using **Parent Tags** and **Sub-Tags**:
        - **Example Configuration 1**: Set up a **Parent Tag** called `#music` with **Sub-Tags** like `#techno`, `#house`, `#urban`, and `#top50`. Users would first select `#music` as a general interest, and then refine their choice by selecting specific genres from the sub-tags.
        - **Example Configuration 2**: Alternatively, you could create each genre as an individual parent tag (e.g., `#techno`, `#house`), allowing users to select genres directly without a main category.
    - Configuring tags this way enables targeted recommendations, notifications, or event suggestions based on users' selected music preferences. The tag setup can be customized in Adminx to best suit your audience and event needs.
- **Set User Account as Validated on Creation**:
    - Automatically validates every new user account upon creation, bypassing the need for email verification. This allows users immediate access to the platform post-registration without waiting for confirmation. Disabling this option prompts the system to send a verification email upon account creation.
    - ⚠ **Note**: Social logins (e.g., Facebook, Apple, Google) don’t require email verification, as validation is managed through the social platform itself.
- **Guest Wallet Creation (Staffx)**:
    - This setting allows staff to add contact details (email and phone number) to a guest wallet created by scanning an unknown RFID. It adds a layer of personalization to guest wallets, making them less anonymous.
    - Example use case: At an event, when a visitor is issued a temporary RFID that isn’t linked to their account, the staff can create a guest wallet and add identifiable contact information, which could be useful for follow-up communication or customer support.

---

### **Registration Form Settings**

In this section, you can define which fields are displayed to users and which ones are mandatory for account creation.

- **Checkboxes**:
    - **Show**: Displays the field on the registration form.
    - **Required**: Makes the field mandatory to complete registration.

For instance, if you set "Show" for Postal Code and "Require" for Gender, the user will need to provide gender information but won’t be required to fill in their postal code. However, essential fields like Email and Date of Birth are typically mandatory due to platform requirements.

---

### **Social Login Settings**

- **Facebook Social Login Secrets**:
    - Allows users to log in with their Facebook account. The Client ID and Client Secret are filled in by anyKrowd developers.
    - **Example**: Useful for events targeting younger audiences who prefer quick login options via social media.
- **Apple Social Login Secrets**:
    - Similar to Facebook but specifically for Apple accounts. This is required if any other social logins are enabled, especially for apps intended for the App Store.
    - **Example**: For exclusive, member-only clubs targeting high-profile clients who often use Apple devices.
- **Google Social Login**:
    - Enables Google as a login option.

---

### **Login by Phone** 📱

- This is a newer feature (introduced in v1.32 "Captain America" update) allowing users to log in with their phone number. It functions similarly to login options in apps like Snapchat, where users receive a verification text message.
- **Use Case**: Particularly useful for international events where email might not be the preferred method of communication or for quick, on-the-go access without relying on email.

## 📬 Notifications

The **Notifications** section on the anyKrowd platform allows you to manage and customize various notifications that are sent from the system, primarily via email. These notifications can be tailored to suit your brand's style and needs. Note that these are different from **push notifications** sent via Content or Event management systems, which are typically managed separately.

---

### 🛠 General Settings

1. **Background Color**:
    - Choose a background color for your notification emails to match your brand's identity.
    - For example, if your brand logo is white and transparent, you might want to set a darker background color for better visibility and branding.
2. **Background Image**:
    - You can also upload a background image that aligns with your brand, further enhancing the visual appeal of your emails.
    - This feature is useful for adding logos, patterns, or promotional images to reinforce brand consistency.
3. **Disable All User Email Notifications**:
    - This setting lets you turn off email notifications entirely, limiting outgoing emails strictly to essentials like account creation.
    - Useful if you prefer to send notifications through other channels or want to reduce the volume of system emails.

---

### 📧 Notification Settings

The **Notification Settings** list displays all the configurable email notifications available on the platform.

- **Preview and Edit**: You can click the "eye" icon to preview a notification’s content with test parameters and use the "Set" button to adjust it.
- **Predefined and Customizable Notifications**:
    - Some notifications, like account creation (for social registrations), are **hardcoded** and can't be modified, while others need to be set and approved for use, especially for specific integrations.
    - Notifications requiring customization include options like “third-party ticket integrations” and “assign tickets.” To enable these features, the email templates must be created and approved first.

### 📌 Examples of Notification Types:

1. **Account Creation (Social Registration)**:
    - An automated email for users who sign up via social media accounts. This helps them confirm and secure their account on the platform.
2. **Booking Request Notifications**:
    - Includes booking confirmations, cancellations, and updates for both guests and hosts, offering detailed information about the booking status.
3. **Invoice Notifications**:
    - Users receive invoices for their orders or top-ups, ensuring they have a digital record for transactions made on the platform.
4. **Refund Notifications**:
    - Notifications related to refund requests, including approvals, declines, and cancellations, to keep users informed about their request status.

---

### ✏️ Customizing a Notification

To customize a notification template:

1. **Choose a Notification to Edit**:
    - Go to the Notification Settings and select a notification type you want to personalize (e.g., **Ticket Purchase** notification).
2. **Edit the Content (if applicable)**:
    - You can modify the **subject line** and **body** of the email template.
    - **Example**: For a ticket purchase notification, you might use a subject like *"Your Ticket foris Ready!"* and a body that includes details such as the participant’s name and event date.
3. **Available Variables**:
    - Use predefined variables to personalize the message dynamically:
        - `:eventName` – Inserts the event name.
        - `:eventParticipantName` – Inserts the participant's name.
        - `:eventDateTime` – Adds the event date and time.
        - `:downloadTicketLink` – Provides a link for the user to download their ticket.
        - Other variables may be available depending on the type of notification.
    - These variables help create a tailored experience for the recipient, making the notification feel specific to them.
4. **Preview and Save**:
    - Click "Preview" to check how the email will look with the inserted variables.
    - Once satisfied, hit "Save" to apply the changes.

---

### 💼 Practical Use Cases for Notifications

Here are some strategic ways to optimize your notification settings to align with your brand and enhance user engagement on the platform:

- **Enhance Logo Visibility**:
    - If your logo is a transparent PNG with a white or light color scheme, set a **black background** for all notifications. This ensures that your logo stands out clearly and gives your emails a polished, professional look.
- **Customize Backgrounds for Brand Consistency**:
    - Use a **personalized background image** that reflects your brand's identity. A customized background helps each notification feel unique to your brand and provides a cohesive experience across all user communications.
- **Optimize Ticket Import or Third-Party Integration Emails**:
    - Customize the email templates for **ticket imports or third-party ticket integrations**. Include a clear call to action and highlight the benefits of using your app at the event:
        - Encourage users to download and use the app for a smoother event experience, as opposed to printing out tickets or just accessing them via PDF.
        - Emphasize features like quick entry scanning, real-time updates, and exclusive event information available only through the app.
- **Personalize User Import Onboarding Emails**:
    - When importing a database of users and onboarding them through the platform, **edit the onboarding email** to make a strong first impression:
        - Craft a compelling message with clear calls to action encouraging users to download and explore your app.
        - Highlight the app’s benefits, such as easy access to event tickets, notifications about upcoming events, and personalized recommendations based on their interests.

By leveraging these practical customizations, you can make each notification feel more intentional and brand-aligned, while also driving user actions that enhance their event experience and engagement with your platform.

## 📲 QR Manager Overview

The **QR Manager** in anyKrowd provides a basic QR code generation feature, allowing event organizers to create QR codes with deep links to specific URLs. Though still under development and limited in functionality, it offers a convenient way to produce QR codes directly on the platform. These QR codes can link users to any URL of choice, such as a website or a specific app page.

---

### QR Codes

To create a QR code:

1. **Click on the “+Create” button** in the top-right corner of the QR Manager page. This opens the QR code creation screen.
2. **Enter a Name**: This is the internal reference for the QR code, which helps identify its purpose.
3. **Specify a Deep Link**: Input the URL you want the QR code to link to. This could be any external link, such as a direct download link for the app or a registration page.
    - **Tip**: If the deep link field is left blank, the QR code will default to the platform's homepage.
4. **Optional - Disable Onboarding Flow**: Select this option if you wish to bypass the onboarding slides (if enabled), directing users straight to the target page or app.

*Example*: Use this feature to create a QR code that directs visitors straight to the event’s app download page or a pre-event registration link.

### Onboarding Slides

The **Onboarding Slides** feature allows organizers to create a set of introductory slides that users see the first time they log in to the platform. These slides can be used to explain how the app works or highlight key features, ensuring users are well-informed before they start using the app.

To set up onboarding slides:

1. **Enable the “Onboarding Slides” toggle**.
2. **Click “+Create”** to add new slides, providing relevant information or instructions for users.

*Note*: Currently, this feature is under development in V2 and may have limited functionality. Organizers may not be able to customize or add multiple onboarding slides at this time. However, this feature might be expanded in future releases to allow for more customization.

---

### Practical Recommendations: Efficient QR Code Use (Internal and External)

While the anyKrowd QR Manager is available, we suggest organizers consider external QR code tools for broader QR code applications due to their enhanced functionality.

1. **External Tools Like Linktree**: Tools like [**Linktree**](https://linktr.ee/) allow for multiple buttons on a single landing page, which can be highly effective for event communication. For example:
    - **Create Buttons for Key Actions**: Use buttons like “Download on Apple,” “Download on Android,” and “Access Web App” to cater to different user needs.
    - **Centralize Event Links**: Include links to timetables, ticket purchases, or special offers, all under one QR code that you can place on printed materials or display screens.
2. **QR Code Placement Suggestions**:
    - **At Entrances and Bars**: Place QR codes prominently at event entrances and on bar counters, allowing visitors to quickly download the app or access relevant information without crowding.
    - **Top-Up Stations**: Use QR codes at top-up stations, enabling users to download the app for an easier payment process.
    - **Flyers and Menus**: Include QR codes on flyers, menus, and other printed materials, encouraging users to download the app or view the web app without standing in line.
3. **Onboarding with QR Codes**: Primarily, the value of QR codes lies in **onboarding** new users smoothly. QR codes can streamline app downloads or registrations by providing a scannable link to the platform.

---

### Summary of Recommendations

- **Primary Use for Onboarding**: QR codes generated via the anyKrowd platform are best used for linking to onboarding resources, such as the app download page or a quick registration link.
- **Consider External QR Tools**: For multi-functional QR code setups (like providing multiple links or buttons), tools like Linktree may offer a more user-friendly and adaptable solution.
- **Strategic Placement**: Utilize QR codes at various touchpoints across the event venue, from entrances to top-up stations, to encourage app downloads and improve user flow.

## 🛠️ Bridge

The **Bridge** functionality in anyKrowd enables API integrations with third-party access control systems, such as speedgates or turnstiles with external displays. This feature is currently specialized and used selectively, primarily at Zuco, to control automatic turnstiles (tourniquets) and manage secure access control points for events. Plans are underway to evolve this feature further, potentially updating it into a broader **TerminalX** system for enhanced functionality.

### 🔑 API Keys

The **API Keys** feature within the Bridge module is crucial for establishing secure connections between anyKrowd and connected external devices. API Keys act as authentication tokens, allowing external access systems to communicate securely with anyKrowd, ensuring data integrity and security.

- **Create API Key**: To generate a new API Key, click the **+ Create** button in the top-right corner of the Bridge interface. Enter a descriptive **Name** for the key (e.g., "Zuco Turnstile Access") to help identify its specific use. After saving, you’ll see a unique **API Token** generated, which should be shared with the external device to enable secure access.

*💡 Note*: Only share the API Key with trusted third-party systems, as it grants access to specific functions within anyKrowd.

### 🔄 Integration Settings

The Bridge module includes **Integration Settings** designed to control access functionalities, though they are limited at this stage.

- **Event Entrance**: Enable this option to activate **event-based entrance control**. This feature allows access control systems to verify users against event-specific data within anyKrowd. For instance, only users with valid credentials, tickets, or access rights for an event will be allowed through the turnstiles. This feature is particularly useful for events that need to streamline entry based on ticket validations or guest list checks.

### 📅 Future Development

While the Bridge module currently supports specific integrations, future updates are planned to broaden its use and make it more versatile. Potential updates may rebrand this feature as **TerminalX**, with expanded support for various types of access control devices and configurations.

The Bridge is especially suited for event environments where high-security access management is needed, or in setups with automatic entry points that rely on real-time authorization from anyKrowd.

## 🔗 Integrations

The **Integrations Hub** within anyKrowd is a vital tool for configuring and enabling third-party services that complement the platform’s event management features. Through strategic partnerships with leading companies like **See Tickets**, **Eventix**, and **UTick**, anyKrowd streamlines user onboarding, ticketing, access control, and payment processes. The goal is to create a unified, efficient experience for both organizers and attendees, ensuring that each integration drives user engagement and simplifies event logistics.

Below is an overview of each available integration, including setup recommendations and specific benefits:

---

### 🎟️ See Tickets (formerly Paylogic)

The **See Tickets** integration offers a comprehensive ticket syncing process, allowing any tickets bought via See Tickets to be automatically accessible within anyKrowd. Key benefits and recommendations include:

- **Dual Confirmation Emails**: Users receive two emails: a ticket confirmation from See Tickets and a follow-up from anyKrowd, encouraging them to explore app-exclusive features.
- **App-Only Incentives**: Organizers can offer segmented discounts, exclusive content, or special top-up packages as incentives for users to download and use the app. Examples include additional tokens, exclusive in-app content, or discounts not available outside the app.
- **Pre-Event Top-ups**: By using the app, attendees can top up their accounts before arriving, bypassing the need to stand in line at the event. This is especially valuable for events using RFID cards for entry and payments.
- **Enhanced Entry Options**: The app allows users to enter with digital tickets instead of handling physical PDFs or printed tickets, creating a seamless entry experience.
- **Proven Onboarding Impact**: Integrating ticket purchases with app engagement has demonstrated significant increases in user adoption, especially when paired with incentives. Proven cases show a high onboarding rate when users can benefit directly from app-based features.

To maximize this integration, organizers should discuss specific incentive strategies with a PM to ensure optimal user engagement and app adoption.

---

### 🏅 In2Event

**In2Event** is an **Accreditation** solution for managing staff and crew logistics. It provides streamlined access control for event staff, ensuring role-based permissions and efficient entry processes. Key benefits include:

- **Streamlined Staff Management**: In2Event syncs staff roles and permissions with anyKrowd, providing organizers a single source of truth for managing staff access and responsibilities.
- **Role-Based Access**: Staff members can be assigned specific access permissions, ensuring only authorized personnel can access restricted areas.
- **Integration Setup**: This integration requires careful setup with a PM to align with event-specific needs, particularly for large-scale events with diverse staffing requirements.

This integration enhances the organizer’s control over staff access, ensuring that permissions are managed efficiently and securely.

---

### 🚪 Starnet

The **Starnet** integration allows for **automated access control** by syncing tickets purchased through anyKrowd with Starnet’s entry systems. This integration is particularly valuable for venues with automated entry points, such as turnstiles and speed gates. Benefits include:

- **Automatic Ticket Recognition**: Tickets bought through anyKrowd are recognized instantly by Starnet’s system, allowing for smooth entry without manual verification.
- **Self-Check-in at Venues**: Starnet’s access systems support QR and RFID-based entry, enabling users to scan and enter independently.
- **Ideal for High-Volume Events**: This integration is designed for venues handling large crowds, as it minimizes entry bottlenecks and enhances crowd flow through automated access points.

---

### 🎫 Eventix

**Eventix** provides a robust ticketing integration with anyKrowd, similar to See Tickets. This integration offers:

- **Automatic Ticket Syncing**: Tickets purchased through Eventix are instantly accessible within the anyKrowd app, simplifying the ticket management process for users.
- **App-Based Incentives**: Organizers can offer exclusive app benefits such as discounts or exclusive event content, incentivizing users to interact with the app beyond ticketing.
- **User Onboarding**: Eventix users are smoothly onboarded into the anyKrowd app, consolidating all event-related functionalities, including ticket access, top-ups, and exclusive notifications, into one platform.

This integration simplifies the ticketing process for attendees, ensuring a consistent and cohesive experience from purchase to event participation.

---

### 🛠️ Eventication

The **Eventication** integration is a powerful tool for **Crew Accreditation**. This integration allows anyKrowd to manage and synchronize crew roles and permissions efficiently, but requires particular attention to user data accuracy. Important points include:

- **Automated Crew Check-In**: Crew members registered in Eventication can be identified at anyKrowd checkpoints using a QR or RFID code that syncs across platforms, streamlining the accreditation process.
- **Role and Reward Sync**: Roles and access levels set in Eventication can be configured to correspond with specific permissions and benefits in anyKrowd, facilitating organized crew management.
- **Avoiding Duplicate and Invalid Entries**: It is crucial that the crew list in Eventication contains only unique, verified user records. Any double entries or invalid email addresses can cause errors in synchronization, impacting access control and crew management. **We recommend working with a PM to ensure this integration is set up correctly**, as ensuring data integrity is vital to avoid disruptions during the event.

Eventication is ideal for events with complex crew structures, allowing for efficient and automated crew management and access control.

---

### 🧾 Foo Tickets

**Foo Tickets** is a **WooCommerce integration** that enables organizers to handle ticket sales directly through their own e-commerce websites. Key features include:

- **Customizable Ticket Sales**: Foo Tickets allows for extensive customization within WooCommerce, making it ideal for organizers with specific branding and ticketing needs, like Zillion events.
- **Seamless Integration with anyKrowd**: Although configured externally, tickets sold through Foo Tickets are compatible with anyKrowd’s ticketing and access management features.
- **Requires Setup Support**: Due to its complex configuration requirements, this integration may need additional setup assistance, especially for unique ticketing structures.

This integration is best suited for organizers who prefer using their own e-commerce infrastructure for ticketing but still want to leverage anyKrowd’s event management functionalities.

---

### 🍺 Beermate

The **Beermate** integration enables cashless transactions through QR codes, specifically designed for drink and vending machines at events. Benefits include:

- **Instant Payment with QR Codes**: Attendees can scan their personal QR codes at Beermate machines to make cashless purchases, facilitating quick service at high-demand areas.
- **Reduced Queues at Drink Stations**: Beermate’s integration reduces waiting times by allowing attendees to order and pay instantly, improving the overall event experience.
- **Efficient for Self-Service Points**: This setup is particularly useful at self-service points where speed is essential, making it ideal for events focused on streamlined, fast transactions.

---

### 🎟️ UTick

**UTick** is the latest addition to anyKrowd’s ticketing integrations, primarily designed for venues like **Spiroudome**. This integration allows:

- **Integrated Ticket Management**: UTick tickets are instantly accessible in the anyKrowd app, allowing users to manage their tickets alongside other app-based functionalities.
- **Enhanced User Experience**: By consolidating ticketing and event-related features in the app, users enjoy a seamless experience from ticket purchase to event entry, especially when paired with features like top-ups and exclusive content.

UTick offers organizers a straightforward, cohesive ticketing solution that enhances the user experience by centralizing ticket access within the anyKrowd platform.

---

By utilizing these integrations, anyKrowd enables organizers to deliver a fully streamlined experience across all facets of event participation, from ticketing and crew management to cashless payments and automated entry. Each integration is designed to meet the unique demands of different events, enhancing both the operational efficiency for organizers and the event experience for attendees.

## 💰 Currencies

The **Currencies** module, also referred to as **"Multicurrency" (MC)**, is a feature within the anyKrowd platform that enables organizers to create, manage, and customize multiple active currencies for diverse event purposes. These currencies can be tailored with unique rules, target user groups, and functionalities, offering significant flexibility for event operations. The Multicurrency feature allows currencies to be configured separately for specific purposes like eco-friendly initiatives, VIP perks, or tokens exclusive to staff or artists, enhancing the overall attendee experience and operational efficiency.

---

### 🎯 Use Cases for Custom Currencies

These use cases illustrate some of the ways event organizers can leverage custom currencies:

- **Default Event Currency**
    - 📌 **Purpose**: Acts as the main currency for transactions, such as purchases at food stalls, bars, and merchandise booths.
    - 🔧 **Configuration**: Set this currency as the **Default Currency** to ensure it is automatically added to each user’s wallet upon account creation. This designation means it will appear in **ClientX** for all attendees, and it becomes the primary currency for reporting and system automation.
    - ⚠️ **Note**: Only one currency can be set as the default. Setting the default currency is crucial, so consult the Project Manager (PM) to confirm the selection, as it impacts reporting and transactions across the platform.
- **Eco Return Token (Refundable Currency)**
    - ♻️ **Purpose**: Used to promote sustainable practices, like incentivizing attendees to return eco-friendly items, such as cups.
    - 🔧 **Configuration**: Enable **Refundable Currency** for this token so attendees can reclaim any remaining balance when they return designated items. Use **Refund in Full** to allow full refund eligibility under specific return conditions.
    - 🎟 **Use Case**: An **Eco Coin** token can encourage environmentally friendly behavior by offering a refund incentive for returned items, adding value to the attendee experience and supporting sustainability goals.
- **Crew or Artist Tokens (Selective Access)**
    - 🛠 **Purpose**: Restricted tokens for exclusive benefits for crew members, artists, or other special groups.
    - 🔧 **Configuration**: **Do not enable Create Automatically** for these tokens. These tokens should be selectively assigned, usually through integrations like ticketing or accreditation, or distributed via vouchers. The wallet for these tokens is created only for specific users as they receive tokens.
    - 👁 **Visibility**: Set **Show in ClientX** to "Off" to keep the token hidden from general users. Enable **Show in Reporting** to capture any transactions in financial reports.
- **Welcome Drink or Promo Token**
    - 🍹 **Purpose**: A one-time-use token that provides a complimentary item (e.g., a drink) as a reward for certain actions, like downloading the app or registering early.
    - 🔧 **Configuration**: Set as **non-refundable** and enable **Show in ClientX** so attendees can view it in their wallet. **Top-uppable** should be disabled, as this is intended to be a single-use incentive.
    - 🎁 **Use Case**: A **Welcome Drink Token** can reward users for engaging with the platform, such as downloading the app, while encouraging further interaction at the event.
- **Birthday Coin for Celebrations**
    - 🎂 **Purpose**: A special currency for attendees celebrating a birthday, redeemable for perks like a free drink or exclusive item.
    - 🔧 **Configuration**: Set the **ClientX Order** to prioritize this token’s visibility during the attendee’s birthday period. The token should be configured to expire after the birthday celebration to prevent misuse.
    - 🌟 **Example**: A **Birthday Coin** could be valid only during the birthday timeframe, allowing users to enjoy a unique perk in honor of their special day.
- **VIP Comfort Token**
    - 👑 **Purpose**: A premium currency for VIP guests, granting access to complimentary items or specific areas, enhancing the VIP experience.
    - 🔧 **Configuration**: Set a **Burning Weight** to ensure that this token is used first if multiple currencies are available. **ClientX Order** should also be configured to make this currency highly visible in VIP wallets.
    - 🌟 **Example**: VIP attendees may use a **Comfort Token** for free or discounted items, prioritizing their access and improving their event experience.

### 👀 Overview of Currencies

The **Overview of Currencies** page provides a list of all created currencies, with action buttons to **Edit** or **Delete** each currency. While these functions are straightforward, it’s essential to understand that any adjustments made here can impact the live event experience and financial reporting.

- **Edit**: Opens the **Edit Currency** page, where you can modify all settings for a specific currency. Changes applied here, such as adjusting visibility or updating the burning weight, will reflect in real time.
- **Delete**: Permanently removes a currency from the system. Deleting a currency can have major implications on reports, user balances, and event flow. **Consult the PM** before deleting any currency to avoid disruptions.

### Create New Currency: Detailed Guide

Creating a new currency in anyKrowd involves setting up various configurations to ensure that it aligns with your event’s specific requirements. Each option below has a unique function that controls how the currency will behave within ClientX, StaffX, and reporting. This guide provides detailed descriptions to help you make informed decisions about each setting.

---

### Currency Configuration Options

1. **Name, Prefix, and Suffix**
    - **Name**: The full name of the currency, which is mandatory for identification (e.g., “Festival Coin” or “Eco Token”).
    - **Prefix**: The symbol that represents the currency, such as an emoji, letter, or character (e.g., €, CR, or 🍺). This helps users quickly recognize the currency in transactions.
    - **Suffix**: Optional field that allows for an additional label after the currency amount (e.g., “EUR” or “USD”). This is useful when distinguishing among multiple currency types.
2. **Default Currency**
    - **Purpose**: Sets this currency as the main, default currency for all users. The Default Currency is automatically added to every user's wallet upon account creation.
    - **Configuration**: Only one currency can be marked as the default. This designation is critical for operational consistency, as it becomes the primary currency for all automated processes, reporting, and transactions.
    - **Consultation**: **Discuss with your Project Manager (PM)** to confirm the choice of default currency, as this selection affects reporting and overall platform behavior.
    - **Example**: If "Festival Coin" is chosen as the default currency, it will appear in all users’ wallets by default and be used as the primary currency for purchases.
3. **Refundable Currency**
    - **Definition**: When enabled, this setting allows users to request a refund of any **unspent balance** in their wallet. This feature is especially useful for refundable transactions or deposits.
    - **Mechanics**: The refund amount is capped at the original topped-up amount. For example, if a user topped up €50 but accumulated an additional €100 through returns (such as Eco Tokens), they can only refund the topped-up €50 unless "Refund in Full" is enabled.
    - **Usage in Eco Programs**: For tokens like **Eco Coins**, this configuration helps to ensure refunds are only issued based on actual topped-up amounts, providing an incentive for eco-friendly actions (e.g., cup returns) without overextending refund capabilities.
    - **Important**: Carefully evaluate whether this setting aligns with your event’s policies, especially for tokens that can be "farmed" or accumulated (such as eco incentives).
4. **Refund Currency in Full**
    - **Purpose**: This setting, when enabled, allows the entire balance in the wallet to be refunded, bypassing the capped refund based on the topped-up amount.
    - **Best Use**: Ideal for scenarios like **Volunteer Tokens** or eco-friendly programs where users are assured of a full refund upon meeting specific return conditions, such as returning all issued tokens or items.
    - **Example**: For events where attendees are guaranteed a full refund (e.g., returning rental items or eco-friendly cups), enabling "Refund Currency in Full" ensures the entire amount in the currency wallet is eligible for refund.
5. **Show Currency in Reporting**
    - **Functionality**: Determines whether transactions using this currency appear in financial reports.
    - **Best Practice**: Enable for currencies tied to financial transactions or event revenue, such as general admission tokens or food and beverage currencies. For promotional tokens, such as free drink vouchers, consider disabling this option to avoid clutter in reports.
6. **Show Currency in ClientX**
    - **Purpose**: Controls the visibility of this currency in users' wallets within ClientX.
    - **Use Case**: Enable for general-purpose tokens that attendees need to see, like the main event currency. For specialized tokens (e.g., Crew Tokens or Artist Tokens), disable visibility to keep them hidden from general users.
    - **Example**: Display "Festival Coin" to all attendees, but hide "Crew Token" to limit access to specific user groups.
7. **Top-uppable**
    - **Definition**: Allows users to add funds to this currency through ClientX or StaffX.
    - **Best Use**: Enable for commonly used currencies, such as the main event currency, to allow continuous top-ups. Disable for one-time-use or promotional tokens, such as complimentary drink vouchers.
    - **Example**: Enable top-up for "Festival Coin" to facilitate user spending throughout the event. For a token like "Welcome Drink," disable top-up to limit usage to the initial allocation only.
8. **Create Automatically**
    - **Purpose**: Automatically creates a wallet for this currency in each user’s account upon registration.
    - **Recommended Use**: Enable only for essential currencies, such as the Default Currency, which should be present in every attendee’s wallet. For selective tokens (e.g., Crew Tokens or Artist Tokens), **do not enable** this feature. These tokens should be manually distributed via vouchers, ticketing, or integrations as needed.
    - **Important Note**: Use this setting for universally required currencies only, such as the main currency needed by all users. **Selective tokens** like Crew Tokens should be distributed manually to avoid unnecessary wallet creation.
9. **Exchange Rate (versus Default Currency)**
    - **Purpose**: Sets the exchange rate between this currency and the default FIAT currency (Euro).
    - **Application**: Carefully adjust this rate based on event financial strategies. For example, if 1 token = €1.18, configure the exchange rate accordingly to maintain accurate reporting.
    - **Impact**: Incorrect exchange rates can lead to discrepancies in top-ups and financial tracking. Always double-check these values for accuracy.
10. **Burning Weight**
    - **Definition**: Determines the priority of currency usage when multiple currencies are available in a user's wallet.
    - **Use Case**: Essential for events with tiered currencies, such as VIP or premium tokens, where organizers may want to prioritize these over general tokens.
    - **Example**: Assign a lower burning weight to "VIP Token" to ensure it is used before "Festival Coin," enhancing the VIP experience by granting prioritized access to premium benefits.
11. **ClientX Order** and **StaffX Order**
    - **Purpose**: Defines the display order of currencies within the ClientX and StaffX wallets, allowing organizers to control which tokens appear at the top of the list.
    - **Use Case**: Set primary tokens to appear at the top for better user experience. For VIP experiences, position premium tokens prominently to enhance accessibility.
    - **Example**: Place "Festival Coin" first for general users, but prioritize "VIP Token" for VIP wallets, making it easily accessible for premium users.
12. **Description**
    - **Function**: Allows for additional context or messaging related to the currency, visible in the wallet.
    - **Best Practice**: Clearly explain the purpose or redemption conditions for the currency. For example, for **Eco Tokens**, add a note like “Refundable upon eco-friendly item return” to ensure users understand the redemption rules.
    - **Benefit**: Descriptions help reduce confusion, especially for tokens with specific use cases, by providing transparency on how and when they can be redeemed.
    
    Ignore the bottom part “Spending Limits” this is a functionality that is not working for the moment and not in use.
    

---

### FIAT Currency

- **Definition**: The FIAT currency in anyKrowd is set to Euro (€) by default, serving as the base currency for all token exchanges and reports.
- **Purpose**: This standard FIAT currency creates a reliable reference point for all currency conversions within the platform, allowing each custom token to be linked back to a real-world Euro value for accurate reporting and analytics.
- **Limitations**: Currently, the platform supports only one FIAT currency, which is set to Euro (€). Future updates may enable the use of multiple FIAT currencies.

---

### Configuring Exchange Rates for Custom Tokens

Exchange rates determine how each token translates into Euro (€) values in your reports. Properly configuring exchange rates allows you to control whether a token's usage reflects as revenue, as well as how it affects financial insights. Here are some key configurations and their specific use cases:

- **Exchange Rate of 1**:
    - **Example**: Setting an exchange rate of `1` means each token is equal to €1.
    - **Use Case**: Commonly used for standard event currencies, such as a "Festival Coin," where each token reflects a true Euro equivalent. For instance, if a cocktail costs 10 Festival Coins, this would add €10 to your sales revenue if the token’s exchange rate is set to 1.
    - **Impact**: When the exchange rate is 1, the total value of tokens spent will be fully reflected in revenue reports, aligning token spending directly with Euro values.
- **Exchange Rate Variations**:
    - **Example - 0.5**: Setting an exchange rate of `0.5` means each token is valued at €0.50.
    - **Use Case**: Useful for tokens with a lower perceived value or specific promotional currencies, such as a “Discount Coin” that reduces the cost per item. This configuration allows organizers to offer tokens at a discount while maintaining visibility in financial reports.
    - **Example - 1.5**: An exchange rate of `1.5` means each token represents €1.50.
    - **Use Case**: This higher value might be used for VIP tokens or tokens granted through a premium package, where spending each token has a more substantial impact, reflecting a premium experience or product.
- **Exchange Rate of 0**:
    - **Purpose**: Setting the exchange rate to `0` makes the token **value-neutral in reports**. This ensures that token usage does not inflate sales revenue, while still tracking engagement.
    - **Use Case - Free Tokens**: If you want to offer complimentary tokens as part of a promotion or reward, such as giving 10 Free Tokens equivalent to €10 in value, setting an exchange rate of `0` will ensure these tokens do not add to revenue totals. For instance, if attendees redeem Free Tokens for a €10 cocktail, it will not be counted as €10 in sales, keeping financial reports accurate.
    - **Alternative Use**: For instances where you wish to track free tokens as though they had revenue impact, you could set the exchange rate to `1`. In this case, giving out 10 Free Tokens would add €10 to revenue reports, even though they were distributed without actual payment. This approach might be useful for tracking the potential value of promotions.

---

### Special Use Cases for Exchange Rates

- **Welcome Drink Token**:
    - **Purpose**: A one-time-use token meant to offer attendees a complimentary item, such as a welcome drink.
    - **Configuration**: Set the exchange rate to `0` so that each use of the Welcome Drink Token does not add to revenue, allowing you to keep these promotions separate from actual sales revenue.
    - **Impact**: This approach provides a clean separation between promotional giveaways and actual sales, keeping your revenue reporting focused on paid transactions.
- **Free Tokens for Event-Wide Use**:
    - **Purpose**: Tokens distributed to attendees for spending on event items, without costing them directly.
    - **Configuration**: If these Free Tokens are given on a 1:1 basis, meaning they are intended to be spent like real money, you have the option to either set their exchange rate to `1` or `0`:
        - **Exchange Rate 1**: If you set it to `1`, each Free Token redeemed will add its Euro equivalent to the total sales revenue. For example, if an attendee redeems 10 Free Tokens on a €10 cocktail, €10 will be recorded as revenue.
        - **Exchange Rate 0**: If set to `0`, these tokens will not contribute to sales revenue totals, accurately reflecting that no real money was exchanged.
    - **Choosing the Configuration**: The choice between `1` and `0` depends on how you want these tokens reflected in your reports. Setting the exchange rate to `1` might be useful for tracking the full potential value of what you’ve given out, while setting it to `0` accurately keeps it separate from actual revenue.

---

### Understanding Exchange Rate Mechanics in Reporting

- **Revenue Impact**: Exchange rate settings directly affect how each token appears in your financial reports. Tokens with exchange rates of `1` or higher will contribute to your total sales, while those set to `0` remain revenue-neutral.
- **Flexible Reporting**: Custom exchange rates allow you to adjust the perceived and reported value of tokens to match the intended event experience, whether it’s premium VIP access, complimentary perks, or eco-friendly incentives.

By carefully configuring exchange rates, organizers can ensure that tokens serve their intended purpose without compromising the accuracy of revenue data. This customization is key to aligning event operations with financial reporting goals and maximizing flexibility in token usage.

## 📍 Locations

The **Locations** module in the anyKrowd platform serves as the central management hub for defining physical or operational spaces within an event. Accurate configuration of locations is essential for effective reporting, ensuring that revenue and activities are correctly attributed to specific areas. When setting up locations, it’s advised to work closely with the PM to maintain consistency and avoid errors.

---

### 📜 Overview of all Locations

In the **Locations** overview, you can see a list of all created locations along with an action button to **Edit** or **Delete** each entry. Each location can also include sublocations, allowing a hierarchical organization of areas within the event. For instance:

- A **main area** could be a large venue zone such as “Artist Village.”
- **Sublocations** within this zone might include distinct bars, food trucks, or merch stands (e.g., “Bar 1 – Artist VIP,” “Foodtruck 2 – Artist Village”).

Including distinct names for main and sublocations is highly recommended for clarity in **AdminX** (locations, catalogs, onboarding configurations) and to streamline reporting in dashboards. For example:

- **FOODCOURT | Burgers**
- **MAIN STAGE | Champagne Bar**

Creating clear, detailed location names helps keep operational areas organized and enhances overall reporting accuracy.

---

### 🛠️ Location Management Actions

1. **Edit**: Allows you to modify existing locations. This opens the same form as the **Create New Location** page, enabling changes to names, parent locations, and more.
2. **Delete**: Permanently removes a location. Exercise caution, as deleted locations cannot be restored and could impact historical data in reporting.
3. **Bin**: Temporarily removes a location and can be recovered if needed, making it safer than a permanent deletion.

---

### ➕ Create New Location

Clicking the **+Create** button allows you to define a new location within your event setup. When creating a location, you will need to configure specific parameters:

- **Name**: Assign a unique and descriptive name for the location.
- **Parent Location**: If the new location is a sub-area within a larger space, select a pre-existing **Parent Location**. To set a location as a parent, first create and save it, then add child locations as sublocations.
- **Default Location**: Enable this setting if you want this location to serve as the fallback default for staffX users without an assigned location. **Note**: This setting is critical for cases where no other specific location is linked.

Locations are predominantly applied in **Onboarding** processes. By assigning locations to specific **QR codes**, you ensure that staffX devices and logins are activated at the correct locations. Any revenue generated by a device at this location will be tagged accordingly, enabling precise filtering in reports and dashboards.

---

### 📋 Practical Setup Examples

To illustrate, here are some sample setups that demonstrate practical location configurations:

1. **Main Event Areas**:
    - Example: **Food Court** with multiple sublocations such as “Bar 3.1 – Foodcourt” and “Pizza Saporito.”
    - These sublocations assist in tracking sales and operational flow within the designated food service zone.
2. **Artist VIP Zones**:
    - Example: **Artist Village** with sublocations like “Bar 1 – Artist VIP” or “Merch Stand – Artist Area.”
    - Separate sublocations within a VIP or restricted area provide granular tracking of activity within exclusive sections.
3. **Sustainability Initiatives**:
    - Example: **Eco Cup Return Point** within the venue.
    - Locations such as “Eco Point 1” allow tracking of specific activities, such as sustainable product returns, adding value to eco-reporting efforts.

These examples demonstrate how setting up parent and child locations can improve organizational clarity and ensure that financial data is accurately aligned with event areas.

# 👷‍♂️👷‍♂️👷‍♂️Staffx 
(the naming of our Staff facing / POS environment)

## General

Staffx is the core tool that is used on-site, at the Venue, or at the event.

Where AdminX is mainly the tool for an organizer (admin) or anyKrowd crew member to configure and manage the platform, and ClientX is the tool that used by the visitor, StaffX is the tool that is used by crew members / staff members on-site at the event.

Crew members, often volunteers, often arrive right on time (or late) for the event and need to be trained in a short period of time to learn to work with the software / their part of the software, to do their job on-site. StaffX is the portable management tool that crew members can use on-site. It’s driven by adminx’s configuration, like sales catalogues, roles & permissions, onboarding qr’s, that eventually allow a user to easily onboard onto the staffx platform and is using it for it’s role at the event on-site, wether it’sa bartender, barmanager, ticket checkin staff, somebody from the accreditation, or the organization itself with an admin login or onboarding qr code with full permissions to do a little bit of everything and keep track of reports, staffx can do it all if configured properly. Do this together with your PM. To loginto Staffx, you need a domain name (tenant nameslug - same as clientx) + email + password to login or scan an onboarding qr that gives you the correct rights. You can fill these credentials in manually if you have a staffx account, or create an onboarding qr for your account to login onto staffx. This is the best way to do it, so you can give an ANYKROWD location to anykrowd-staff qr codes so everything is logged of anykrowd actions under an anykrowd location tag. This is the cleanest way and should always be advised to create / have for every project so that anyKrowd crew members that are on-site supporting all can scan this and use staffx correctly.

Once logged in, you need to select an event to work on. Either the events are created, or there is a “GLOBAL SALES EVENT” configured to process all the sales on. This mainly used for venues or locations that open frequently so that you don’t always need to change events every openingday before you start and onboarding qr’s can be configured once and stay that way and keep working. Otherwise if you work with unique events every time, you need to reprogram the onboarding qr’s (as they are event related). Something to discuss with the PM. Once an (active) event is selected, you are on the homescreen of staffx. This screen has buttons with chapters. The visibility of these buttons depend on the role/permissions your account has. If you have full permissions, you will see all the buttons like the screenshot below. Clicking any of these buttons will open that specific chapter. Clicking the top right HOME button will return you to this screen (home / dashboard) and clicking the LOGOUT button (topright) will log you out back to the starting screen. In this case, the staffx is logged in on the tenant JEUX D’HIVER (recognizable by the logo at the top) for the event GLOBAL SALES EVENT (noticed by the visual at the top, this is the event visual main image). These differ for each event offcourse as they are fully customizable by adminx. In the bottom you see which staff account is currently logged in and on which email and below that is a button “ASSIGN RFID” - a user can click this button and then tap an RFID wristband/card against the staffx device to attach this rfid to the user account. Allowing it to login, if you get logged out, you can click “LOGIN WITH RFID” and login with your RFID that was previously attached. If an RFID is attached, you will see a button “DETACH RFID” instead and clicking it will allow you to detach the RFID from your account.

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/db56fcec-24b3-4c13-b143-06ffde84ad1c/image10.png)

“Location” is usually set within an onboarding qr so it’s added to the staffx upon login in .

“change event” is to select a different event, return to the screen before arriving on the dashboard, where you select an (active) event

“change location” is only shown if you have the permission and not shown if you don’t - this is to manually change your location, we advise not to use this but to use onboarding qr for every re-login.

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/0178d42c-1f47-4a8e-8a8c-b4accdb13c77/image7.png)

## 

## Entrance

This is the entrance chapter of Staffx. This is mainly used for staff/crew members that work at the entrance of the event or venue and need check-in features. This chapter is used to check-in visitors. Access Control. You can checkin a user if they have a ticket for the event selected. This can be an integrated, imported or anyKrowd entrance ticket, like a guestlist registration for example. It can be or can not be personalised. So you can search in the searchbar on name and email and this will check the attendee list (as can be found via AdminX/Manage/Events/Attendees) to look up for a user and select the user to manually check-in if necessary. The main functionality of this screen is the “SCAN QR” button that will trigger to open the camera + activate the infrared reader (if applicable on device, like for example the L2s, samsungs don’t have this feature on the hardware) to scan a ticket qr code. Not only can it scan ticket qr codes, it can only scan personal qr codes, if this feature is activated in Adminx/App/Settings . In this case it can also scan & check-in personal qr codes. Once it’s scanned, if it’s valid & first time checked in, you will see a successful screen (green box) to indicate the checkin was successful + show some information + a timestamp of checkin. If the ticket is valid but already used, you will see a popup that the user was already check-ed in. If the qr code is not valid you will receive a red error box. The goal of this chapter is to check-in users via tickets or personal qr’s. Your attendees checked in vs expected (tickets) is shown next to Guests: x / x.

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/a16479cc-7f1e-4d09-ab3f-d05b83a47406/image5.png)

### Ticket / Personal QR scanning

Clicking the SCAN QR button allows a user to start scanning for a QR code (can be ticket / personal qr code) to check-in the guest(user). See description above. On the checkin screen after checking in a personal qr you will see the extra option to ban/block temporarily this user. This is mainly used by doormen/hosts at the entrance of a nightclub to monitor how many guests are inside and have the option to ban/block a user for misbehaviour. You will have the option to enter a reason and confirm. When user checks in again, he will have a orange or red color instead of green to signal there is a ban/block active for this user.

### Sell Remote

This is a feature that needs to be enabled in the ticket type configuration of specific ticket types in order to activate the option to sell tickets remotely. Once a ticket type has this activated, a button will appear on a staffx / event / entrance that has this ticket type added to the event, a button will appear “sell tickets remotely” in the entrance chapter. Clicking this button will allow you to “sell” this ticket type via the payment methods activated. You can also enable the settings to activate an email field for this. this way it can for example also be used for “Guestlist” tickets, that you “sell remotely” via email for free. The recipient of a remote sale will receive an email about this with the ticket downloadable in .pdf and a button to discover the ticket on the (web)app clientx. This functionality is used for example by Den Glade Vikingn (DGV) for their street promo team that is selling tickets (cash / card / with dgv app) on the streets but always ask an email at checkout. This way the recipient receives ticket via email, and DGV is farming email addresses for every ticketsale on the street and the users are prompted up front to discover the DGV app and already onboard before going to the club and benefit from the app benefits and promotions that are only available there. It’s tools like this that can greatly help the boost / creation of a community.

### Sell at door

Sell at the door works the exact same way as sell remote , but the difference is that that doorsale tickets are checked in at the moment of purchase. There is no qr code that can be checked in at a later moment or location, it’s checked in at the moment of purchase, better for the scenario where you want to sell entrance fees and let the user in right away or give him a proof of entrance (like a stamp or bracelet) or something like that to get in. In this case there is no need to generate a ticket and the user can just enter the location. The email field that can be added if you want is to farm email addresses for every checkout, your choice.

### Search user or ticket

As described above under “Entrance”.

### Expected guests vs. Checked in guest

A summary view of the total expected and already checked-in persons. giving you a real time view of who is in, and who is still to be expected.

## Sales

This is the POS system within anyKrowd. It’s configured by AdminX/Sales mainly and works as the tool for the crew to make sales. These can be F&B sales, a merchandise stand, an ice scream shop, or a ticket vendor at the entrance, whatever you are selling you can configure in the anyKrowd sales system. En sales catalogue must be chosen to be able to perform sales. If no sales catalogue is selected, it auto selects the default one or prompts you to select a sales catalogue. Sales catalogues are also configured inside an onboarding qr, to easily onboard multiple locations with multiple different sales catalogues on fresh devices just given to a crew member. If alles is correct, you will see a sortlike screen like the screenshot below, of a sales catalogue. To select a different sales catalogue, hold & press the SALES button on the home / dashboard screen to select a different catalogue. Note this functionality is not preferred to use like that, because the location tag does not travel with you if you change sales catalogues like this on your device, it’s always best to use an onboarding qr code to login onto a new device / catalogue / location because all the correct info sits in the onboarding qr code so that is the preferred method to login a new device or to switch locations. Logout + log back in with new onboarding qr code at the new location is the preferred way to handle these movements.

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/e97f00e4-eca4-4d0d-bfc4-f16010a4aa55/image6.png)

At the top left we have the “Home” button to go back to the dashboard / home page.

At the top right there are 2 smaller buttons shown.

The “?” is to check balance of a rfid that is presented by a visitor. Click the “?” icon and scan an RFID wristband or card to check the balance on that RFID. A smaller popup at the top of the screen will appear saying what is left on the RFID wallet.

The “printer” icon at the topright, is only shown to logged in staff accounts that have the “printer toggle” permission. This is a toggle that allows you to turn on/off printing for this specific device. You have to hold the button for 5+ seconds to toggle it from red/green (off/on).

Then we see the categories. Categories are created in adminx/sales inside a catalogue and can be named whatever and have an image uploaded as you can see in the example above. We have categories “tips” “alcool + wines” “cocktails” etc . Clicking on a catalogue opens the catalogue and shows its products

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/4e95510a-a301-4590-ade6-1742a73317fa/image16.png)

To select a product a user needs to click on the product to add quantity +1. To remove a product, click on the “number” to decrease the quantity -1. This is very intuïtive to work with, just click on products to add, click on the numbers to decrease, simple. You can add products from different categories and these all add up to the same order. The total of your order can be seen in the bottom left corner. If you click on that, you will open the order detail view. Showing an overview of the total order + the payment options to checkout. The payment options buttons are only shown if they are activated in App/Settings and the staff user has the correct permissions to accept these. In the screenshots below my user has all permissions enabled

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/221902f3-42b4-4c73-a2ea-a158165b866b/image18.png)

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/3f03e9c1-023c-46ca-ae6a-05eb7a3104f2/image4.png)

To process the order, in this view simply click the payment option to continue to process / finalise the order or close this screen and then you are back on the main screen with the orange bar in the bottom. The bottom shows the total of the order as mentioned above, and the right bottom side in the bar shows the quickbuttons to the payment buttons. Clicking them will activate the payment. If you click card, you will be prompted to accept the cardpayment and confirm if you have received it (on your own external terminal) or the viva app will be opened is card present payments is enabled and the payment can process directly via staffx + viva , once the payment is completed in viva , you will be returned to staffx and see the user confirmation screen of a successful payment, the contents of the order, and the remaining wallet balance + transactionlog of the order to the user in an inverted display so you can tilt your device, so it’s readable for the customer and you as staff member can use the rest of the green confirmation screen to see an overview of your order that you just processed as a crew member.

If you click cash, you will be prompted to confirm that you have received the cash, then you will process the order and receive the confirmation screen.

If you click the RFID icon, the RFID reader will be activated, if you then hold a RFID it will read the RFID and show you a successful return screen if there is money on the wallet left, or a “not enough money” return screen (red) if the wallet balance is to low on this RFID wallet attached to process / complete this order. More information will be shown on the return screen to identify the issue / what is missing and either solve the configuration error (if it’s an error, like a price variation missing for a certain currency type) or tell the visitor to topup more money in order to be able to complete the transaction.

If you click the QR button in the bottom right orange bar, the QR camera and/or infrared will be prompted / start scanning (depending on the settings in Staffx/Settings) to scan a personal qr code of a clientx (web)app. If the QR code scanned is valid and have money, the same applies ase written above in regards to RFID payment.

Eco Cups, and the whole “warranty return” principle are also handled in Staffx Sales. For this there is a “warranty return” category that can contain a warranty return product, for example an Eco Cup. In this warranty return category, usually named “ECO” with a recycle icon, is used to give back / return eco cups to a visitor. For example the eco cup costs 2€ but can be returned, then a warranty return (credited sales) needs to occur, giving back the 2€ on this users wallet for bringing the eco cup back. Depending on the configuration and eco policy of currencies, this can vary and be different for multple tenants or events configurations. Good practices must be explained and followed.

Clicking the little red trashcan icon/button on staffx sales will prompt to clear the order so you can start fresh.

## Users

This is the chapter to handle everything regarding users on-site and is mainly used by the top-up crew.

The user chapter allows a crew member to identify a visitor via User QR or RFID, or use the search bar to search for users (name / email). the search bar can be useful in case a visitor loses it’s phone, crew member can search of the user, find it’s wallet, link a (new) rfid wristband/card and this becomes an extension of the wallet and the visitor can continue with it’s journey and use this rfid to pay with an existing wallet. When the phone battery is back, he can check the spendings after etc all functionalities remain, the RFID is an extension of a clientx (guest) wallet. Clicking the “User QR” button will trigger the device to scan for a personal qr - when a valid one is scanned, the user detail window pops open with the features for the staff member to use. these features are also permission driven so it depends on the role / permissions what buttons you see here and can be used on this staff account. in this example I have full permissions and I just scanned a user qr of my account.

Click “User QR” + Scan Personal QR code of “Michael-David Passy”

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/eeaa71f4-9c82-4e3f-aaf0-73a91fe4fe65/image23.png)

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/aee454b3-e845-4bd5-92b8-76eba3b73b52/image14.png)

This opens the user detail page of in this case “Michael-David Passy” - we see that I have 6€ on my wallet and we see all the buttons / features that i can now do as a crew member.

- Top Up - to add money to the wallet , this can be packages or free input amount, paid by cash or card, this money is added to the wallet of this user. to topup money as staffx for a visitor, select a package or enter an amount, and then click the cash or card button to chose your payment method. If card present payments are enabled, pressing card will trigger the viva app to open and process the payment. a confirmation screen will be shown if the topup was successful and the money will be added to the user / rfid wallet.
- Link - if you want to link an (extra) RFID to this user. Click the button and scan an RFID to attach an (extra) RFID to this account. An RFID can have multiple rfid’s connected.
- Voucher - to add a voucher to this user - you will need a voucher (qr) code to redeem the voucher (created in Adminx/Manage/Vouchers)
- Accreditation - feature that can be used for accreditation purposes to scan a (external partner) QR code like from Eventication. This needs to be detailed further. Check this with your PM
- Refund - if you want to perform a staffx refund on this user - let’s say this user wants the 6€ back in cash, you can decide to refund this user, give 6€ in cash, and the wallet will be put to 0€. A cost can be configured in Adminx/App/Settings for this service if you want
- History - clicking this button will open the history screen; It’s similar to the clientx transaction detail log of a user, it shows the transactions done, and if you click it you open it for more detail. This is useful is an error has happened on-site and a visitor claims there has been a mistake, a crew member can check the history / transactions and spot the error and then manually correct it with either a top-up, voucher, or update order, depending on the policy on how to correct mistakes at this specific event. Multiple ways to do it. More staffx (sales) best practices should be written and added to the Kodex.

## Zone

Requires more explanation from Julien to describe this feature best

## Warranty return

This is a separate chapter for warranty returns. This is mostly not used anymore for the moment as warranty return can be configured inside a sales catalogue, in a warranty return category. This is mostly done by bar crew that work in the staffx sales module anyway so they don’t need a separate chapter warranty return to handle this. This chapter can (if it does not get removed) still be used if there is a warranty return point that only handles returns - this can be a permission inside a role that you create on adminx/manage/staff. If used this chapter allows you to return warranty return products and return (add) money on the wallet in return for these products. If the warranty return price is 2€ for an eco cup and a user brings back 10 cups, the wallet gets 20€. In which currency or if refundable depends on the configurations of the currencies and warranty return price variation. To be checked with a PM.

## Activity

This chapter is the activity log. On this chapter, if you have the permission to access this, you can search for transactions, staff, users, in order to find a transaction. You can then open this transaction in detail and (if you have the permissoin) update the order to make adjustments and corrections if a mistake has happened. For example if a user was charged 2 beers instead of one, someone with the activity & update order permission can look up this transaction via activity and update the order, remove 1 beer, so that 1 beer is refunded / added to the wallet of the user that made the order. This is a permission / feature usually given to a barmanager or a champion of the organization because you don’t want this feature enabled for every bartender as it can also be used fraudulently so this must be profiles that you trust. The button “show my activity” allows you to filter on your activity only instead of the full / all activity. Showing only your transactions / transactions done on this staff device / account compared to seeing all transactions from everyone accounts / all devices. The buttons “Cash” “Card” and “Wallet” allow you to filter on payment type that you select. Swiping an order should trigger to reprint an order.

![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/de196a1d-d844-495e-862c-95ef6a2e1236/image3.png)

## Printer

Not used for the moment (to be validated with operations/field). Main purpose for this was to have a visual “order flow” of incoming orders and the option to reprint / mark orders as done. For when printers would break down you have a visual overview of all orders processed by devices / self-order so that you can mark which ones are done / and slide them to reprint the ticket (if needed) but this chapter is currently not used for the moment as you can also reprint via the activity chapter.

## Day Reporting

This chapter allows you to check your day reports on your staffx device if you have the permission. You can check day reports (in detail) and swipe them to print them on the default printer. This prints out your day total so you have a printed copy.

## Staff Reporting

This chapter allows you to check your staff reports on your staffx device if you have the permission to do so. You can check staff reports from active staff. Only active staff profiles for this event will be shown. click on a staff name to open the detailed report or “swipe” it in order to trigger to print it on the default printer.

## Settings

Clicking this button opens the Settings chapter of Staffx. In here you are able to configure some settings for your device.

- Default QR Scanner : select which default scanner should be selected for scanning qr codes . Select camera so you don’t always have to click on the “camera” icon on staffx before you scan a qr code. use “ir” if you work with an l2s and use infrared as main scan option. none for none, the option to do them manually is always available.
- Mounted mode : feature not ready yet / fully functional / in use - this feature would allow you to have mounted mode enable and have all payments methods always listening so you can improve the speed or working behind the bars by having all options always on. further improvements / updates might be required before you can use this functionality
- Display User Confirmation : if you enable this, you show a user confirmation screen to show to the customer after staffx sales has processed an error. if the screen is not showing, this setting should be turned on
- Invert User Display : the option to invert the user confirmation screen so that it is easy to use at the bar - so you can tilt your device - and have a part readable for you and a confirmation screen inverted readable for the customer.
- the button in the bottom “clear app data” - if staffx is experiencing an issue, clicking this button clears the cache memory and forces the user to login again. Clicking this buton, then manually closing (killing) the app and re-opening it (StaffX if V1, Staffx MC if V2) on the device and then logging back in (via an onboarding qr code) is usually the best quick fix for 90+% of the problems. Log/out back in, hard close / reopen your app, click the “clear app data” button and do the above, combination of these, should do the trick for most issues that (can) happen on site and is something that should be the first reaction for most issues / cases.
- 
    
    ![](https://prod-files-secure.s3.us-west-2.amazonaws.com/66393916-3dd6-4b7f-ae81-699eed5fab5a/ed0e4ba9-f595-443b-ad08-69d344a5ff67/image12.png)
    

# 💼💰💰Incremental Value Cases

[]()