# express-starter
This is a starter project to quickly bootstrap an express project with mvc and handlebars views.

This sample is super basic. It includes a sample user model and controller for use with mongoDB.

Run the gulp build after changing styles `npm run build`

This will be serverless. Right now you can add something like [ClaudiaJS](https://www.claudiajs.com/) on fairly easily. For now, the only werid thing is that app.js does not start listening. Run `npm run start:local` for a local install. Claudia will build a file for a Lambda function which will work with app.js.

### Styling
I chose to use simple styling from Google [Material Design Lite](https://getmdl.io/components/index.html). The goal is to get an application running as quickly as possible without having to style very much. MDL does a great job of that. I find the lite version is faster than the full [Material Design](https://material.io/), but go ahead and add that if you want.

Both libraries use [Material Icons](https://google.github.io/material-design-icons/).

This includes [atomic-scss](https://github.com/internetErik/atomic-scss) out of the box. I find it is fantastic for quickly getting things going.

### Directory Structure
The 'app' directory contains most of the relevant stuff. All of the Controllers, Models and Views are in there.

'public' is for the static files needed for the site.

'config' is for basic configuration as well as database settings.

'sass' is for all of the sass source files.