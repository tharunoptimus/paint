# The documentation of the API used in this project

## Introduction
- The API is a RESTful API that allows you to access the data of the project.
- The API is available at the following URI: `http://localhost:3003/api/paint`
- The API is used by the frontend application to Get, Post, Put and Delete data.

## Endpoints for the `/api/paint`
- `GET /preview/paints`: Returns all the data of a paint data only if the user is logged in.
    - It returns all paints owned by the user after the user has logged in.
    - The Data of the paints is used in the home page to show the preview

- `POST /edit/title`: Allows the user to edit the title of the paint.
    - Need to send 
        - `paintId`: The id of the paint that is going to be edited.
        - `title`: The new title of the paint.
        - `userId` : The id of the user that is editing the paint.`
    - It returns a 204 status code if the title is edited successfully.

- `POST /edit/save` : Allows the user to save the paint.
    - Need to send 
        - `paintId`: The id of the paint that is going to be saved.
        - `data` : The data of the paint in base64.
        - `userId` : The id of the user that is saving the paint.`
    - It returns a 204 status code if the paint is saved successfully.

- `PUT /save` : Allows the user to save the paint.
    - Need to send 
        - `paintId`: The id of the paint that is going to be saved.
        - `data` : The data of the paint in base64.
    - It returns a 204 status code if the paint is saved successfully.
    - It differs from the `POST /edit/save` endpoint because it does not require the userId. 
    - This endpoint is used to automatically save the paint when the user is logged in and while editing the paint.

- `DELETE /delete` : Allows the user to delete the paint.
    - Need to send 
        - `paintId`: The id of the paint that is going to be deleted.
    - It returns a 204 status code if the paint is deleted successfully.