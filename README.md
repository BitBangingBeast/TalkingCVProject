# Talking CV Project

## Description

The Talking CV project is a React-based application designed to showcase a dynamic Curriculum Vitae (CV) with integrated video sections. This innovative approach allows users to navigate through different CV sections, such as education, work experience, and a motivation letter, with accompanying videos that play in Picture-in-Picture (PiP) mode or within a designated area on the screen. The data for each section, including video paths and positioning, is stored in a local JSON database, making it easy to update and maintain.

## Features

- **Dynamic Section Navigation**: Smoothly scroll through CV sections with the click of a button or automatically as videos end.
- **Video Integration**: Each CV section includes a related video, enhancing the presentation and providing additional context.
- **Responsive Design**: Video player positioning and size adjust based on screen size, ensuring a seamless experience across devices.
- **Local JSON Database**: All CV data is stored in a local JSON file, allowing for easy updates and customization.
- **Public Resources**: All resources, including videos and images, are stored in the public folder for straightforward access and management.

## How to Clone and Run the Project

### Clone the Repository

Open your terminal and run the following command to clone the repository:
git clone:  `https://github.com/BitBangingBeast/WebCV.git`

### Navigate to the Project Directory

After cloning, move into the project directory:

### Install Dependencies

Ensure you have Node.js and npm installed on your machine. Run the following command to install the project dependencies: `npm install`


### Start the Development Server

To run the project locally, start the development server:  `npm start `
This command will launch the project in your default web browser. If it doesn't automatically open, you can manually visit [http://localhost:3000](http://localhost:3000).

## Updating the CV Data

The CV data can be found and modified in the `src/data/index.json` file. This JSON file contains structured data for each CV section, including titles, descriptions, video paths, and positioning information. Update this file as needed to reflect your CV details.

## Adding Resources

All resources (videos, images, etc.) should be placed in the `public` folder. Ensure you update the paths in your JSON database accordingly to point to the correct files within this folder.



